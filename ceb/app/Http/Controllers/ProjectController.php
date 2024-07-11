<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function myProjectsProductOwner()
    {
        try {
            $user = Auth::user();

            // Solo los Product Owners pueden acceder a esta función
            if ($user->role !== 'product-owner') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $productOwner = $user->productOwner;
            if (!$productOwner) {
                return response()->json(['error' => 'El usuario no es un product owner'], 403);
            }

            $projects = Project::where('product_owner_id', $productOwner->id_po)->get();

            return response()->json($projects, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudieron obtener los proyectos', 'details' => $e->getMessage()], 500);
        }
    }

    public function myProjectsTeamMember()
    {
        try {
            $user = Auth::user();

            // Solo los Team Members pueden acceder a esta función
            if ($user->role !== 'team-member') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $teamMember = $user->teamMember;
            if (!$teamMember) {
                return response()->json(['error' => 'El usuario no es un miembro del equipo'], 403);
            }

            $projects = Project::whereHas('projectMembers', function ($query) use ($teamMember) {
                $query->where('team_member_id', $teamMember->id_tm);
            })->get();

            return response()->json($projects, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudieron obtener los proyectos', 'details' => $e->getMessage()], 500);
        }
    }



    public function index()
    {
        return Project::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'total_function_points' => 'nullable|integer',
            'complexity_adjustment_values' => 'nullable|numeric',
            'estimated_effort' => 'nullable|numeric',
            'estimated_time' => 'nullable|numeric',
            'associated_costs' => 'nullable|numeric',
        ]);

        try {
            $user = Auth::user();

            // Solo los Product Owners pueden crear proyectos
            if ($user->role !== 'product-owner') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $productOwner = $user->productOwner;
            if (!$productOwner) {
                return response()->json(['error' => 'El usuario no es un product owner'], 403);
            }

            $project = Project::create([
                'name' => $request->name,
                'description' => $request->description,
                'product_owner_id' => $productOwner->id_po,
                'total_function_points' => $request->total_function_points,
                'complexity_adjustment_values' => $request->complexity_adjustment_values,
                'estimated_effort' => $request->estimated_effort,
                'estimated_time' => $request->estimated_time,
                'associated_costs' => $request->associated_costs,
            ]);

            return response()->json($project, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo crear el proyecto', 'details' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return Project::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'total_function_points' => 'nullable|integer',
            'complexity_adjustment_values' => 'nullable|numeric',
            'estimated_effort' => 'nullable|numeric',
            'estimated_time' => 'nullable|numeric',
            'associated_costs' => 'nullable|numeric',
        ]);

        try {
            $user = Auth::user();

            // Verificar si el usuario es Product Owner o Team Member y está asignado al proyecto
            if ($user->role === 'product-owner') {
                $productOwner = $user->productOwner;
                if (!$productOwner || $project->product_owner_id !== $productOwner->id_po) {
                    return response()->json(['error' => 'Unauthorized'], 403);
                }
            } elseif ($user->role === 'team-member') {
                $teamMember = $user->teamMember;
                if (!$teamMember || !$project->projectMembers->contains('team_member_id', $teamMember->id_tm)) {
                    return response()->json(['error' => 'Unauthorized'], 403);
                }
            } else {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $project->update($request->all());

            return response()->json($project, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar el proyecto', 'details' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $project = Project::findOrFail($id);
            $user = Auth::user();

            // Verificar si el usuario es Product Owner y está asignado al proyecto
            if ($user->role === 'product-owner') {
                $productOwner = $user->productOwner;
                if (!$productOwner || $project->product_owner_id !== $productOwner->id_po) {
                    return response()->json(['error' => 'Unauthorized'], 403);
                }
            } else {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $project->delete();

            return response()->noContent();
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo eliminar el proyecto', 'details' => $e->getMessage()], 500);
        }
    }
    // contar los puntos de funcion
    // En ProjectController.php
    public function calculateTotalFunctionPoints($projectId)
    {
        try {
            $project = Project::findOrFail($projectId);

            // Obtener todos los requerimientos asociados al proyecto
            $requirements = Requirement::where('project_id', $projectId)->get();

            // Sumar los puntos de función de todos los requerimientos
            $totalFunctionPoints = $requirements->sum('function_points');

            // Actualizar el total de puntos de función en el proyecto
            $project->total_function_points = $totalFunctionPoints;
            $project->save();

            return response()->json($project, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudieron calcular los puntos de función', 'details' => $e->getMessage()], 500);
        }
    }
    // CALCULAR COSTOS ASOCIADOS
    public function calculateAssociatedCosts($projectId)
    {
        try {
            $project = Project::findOrFail($projectId);

            // Obtener los miembros del equipo del proyecto
            $teamMembers = $project->projectMembers()->with('teamMember.profession')->get();

            $totalCost = 0;
            // Sumar los salarios de los miembros del equipo
            foreach ($teamMembers as $member) {
                $totalCost += $member->teamMember->profession->salary;
            }

            // Incluir el salario del jefe de proyecto
            $productOwner = $project->productOwner->profession->salary;
            $totalCost += $productOwner;

            $project->associated_costs = $totalCost;
            $project->save();

            return response()->json(['associated_costs' => $totalCost], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudieron calcular los costos asociados', 'details' => $e->getMessage()], 500);
        }
    }

    public function calculateEstimatedTime($projectId)
    {
        $project = Project::findOrFail($projectId);
        $functionPoints = $project->total_function_points;

        // Suponiendo que toma 3 horas producir 1 punto de función
        $hoursPerFunctionPoint = 3;
        $estimatedHours = $functionPoints * $hoursPerFunctionPoint;

        // Suponiendo que se trabaja 8 horas por día
        $hoursPerDay = 8;
        $estimatedDays = $estimatedHours / $hoursPerDay;

        // Actualizar el proyecto con el tiempo estimado en horas
        $project->estimated_time = $estimatedHours;
        $project->save();

        return response()->json($project, 200);
    }
    public function getTeamMembersWithSalaries($id)
    {
        try {
            $project = Project::findOrFail($id);

            // Obtener los miembros del equipo asignados al proyecto con sus salarios
            $teamMembers = $project->teamMembers()->with('profession')->get();

            // Formatear los datos para incluir el salario de cada miembro del equipo
            $teamMembersWithSalaries = $teamMembers->map(function ($member) {
                return [
                    'id_tm' => $member->id_tm,
                    'name' => $member->user->name,
                    'email' => $member->user->email,
                    'profession' => $member->profession->name,
                    'salary' => $member->profession->salary,
                ];
            });

            return response()->json($teamMembersWithSalaries, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener los miembros del equipo', 'details' => $e->getMessage()], 500);
        }
    }
}
