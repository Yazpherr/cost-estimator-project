<?php

namespace App\Http\Controllers;

use App\Models\ProjectMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectMemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request)
    {
        // Verificar si el usuario autenticado es product owner
        $user = Auth::user();
        if ($user->role !== 'product-owner') {
            return response()->json(['error' => 'Unauthorized', 'details' => 'Only product owners can assign team members to projects'], 403);
        }

        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id_pro',
            'team_member_id' => 'required|exists:team_members,id_tm',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation Error', 'details' => $validator->errors()], 422);
        }

        try {
            $projectMember = ProjectMember::create([
                'project_id' => $request->project_id,
                'team_member_id' => $request->team_member_id,
            ]);

            return response()->json($projectMember, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo asignar el miembro al proyecto', 'details' => $e->getMessage()], 500);
        }
    }
    public function destroy($id_pm)
    {
        try {
            $projectMember = ProjectMember::findOrFail($id_pm);
            $projectMember->delete();

            return response()->json(['message' => 'El miembro del equipo ha sido eliminado correctamente.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Project Member Not Found', 'details' => $e->getMessage()], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => 'Database Error', 'details' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }


}
