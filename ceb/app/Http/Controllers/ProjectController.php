<?php

namespace App\Http\Controllers;

use App\Models\Project;
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
}
