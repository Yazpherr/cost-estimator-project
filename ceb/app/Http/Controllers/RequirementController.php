<?php

namespace App\Http\Controllers;

use App\Models\ProjectMember;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RequirementController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // Crear un nuevo requerimiento
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id_pro',
            'team_member_id' => 'nullable|exists:team_members,id_tm', // Permitir valores nulos
            'name' => 'required|string|max:255',
            'component_type' => 'nullable|string|max:255',
            'complexity_level' => 'nullable|integer',
            'function_points' => 'nullable|integer',
            'justification' => 'nullable|string', // Validación para justificación
        ]);

        try {
            $user = Auth::user();

            // Verificar si el usuario es Product Owner o Team Member
            if ($user->role !== 'product-owner' && $user->role !== 'team-member') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            // Obtener el product_owner_id desde la tabla product_owners
            $productOwner = $user->productOwner;

            if (!$productOwner) {
                return response()->json(['error' => 'El usuario no es un product owner'], 403);
            }

            $requirement = Requirement::create([
                'project_id' => $request->project_id,
                'team_member_id' => $request->team_member_id,
                'project_owner_id' => $productOwner->id_po,
                'name' => $request->name,
                'component_type' => $request->component_type,
                'complexity_level' => $request->complexity_level,
                'function_points' => $request->function_points,
                'justification' => $request->justification,
            ]);

            return response()->json($requirement, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo crear el requerimiento', 'details' => $e->getMessage()], 500);
        }
    }

    // Actualizar un requerimiento existente
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'component_type' => 'nullable|string|max:255',
            'complexity_level' => 'nullable|integer',
            'function_points' => 'nullable|integer',
            'justification' => 'nullable|string', // Validación para justificación
        ]);

        try {
            $user = Auth::user();

            // Verificar si el usuario es Product Owner o Team Member
            if ($user->role !== 'product-owner' && $user->role !== 'team-member') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $requirement = Requirement::findOrFail($id);

            $requirement->update([
                'name' => $request->name,
                'component_type' => $request->component_type,
                'complexity_level' => $request->complexity_level,
                'function_points' => $request->function_points,
                'justification' => $request->justification,
            ]);

            return response()->json($requirement, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar el requerimiento', 'details' => $e->getMessage()], 500);
        }
    }





    
    // Obtener los requerimientos de un proyecto asignado al team member
    public function getProjectRequirements($projectId)
    {
        try {
            $user = Auth::user();

            // Verificar si el usuario es Team Member
            if ($user->role !== 'team-member') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $teamMember = $user->teamMember;

            if (!$teamMember) {
                return response()->json(['error' => 'El usuario no es un miembro del equipo'], 403);
            }

            // Obtener los requerimientos del proyecto asignado al team member
            $requirements = Requirement::where('project_id', $projectId)
                ->where('team_member_id', $teamMember->id_tm)
                ->get();

            return response()->json($requirements, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudieron obtener los requerimientos', 'details' => $e->getMessage()], 500);
        }
    }

    // Obtener todos los requerimientos
    public function getAllRequirements()
    {
        try {
            $user = Auth::user();

            // Verificar si el usuario es Product Owner o Team Member
            if ($user->role !== 'product-owner' && $user->role !== 'team-member') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            // Obtener todos los requerimientos
            $requirements = Requirement::all();

            return response()->json($requirements, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudieron obtener los requerimientos', 'details' => $e->getMessage()], 500);
        }
    }
}
