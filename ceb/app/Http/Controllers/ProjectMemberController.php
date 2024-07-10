<?php

namespace App\Http\Controllers;

use App\Models\ProjectMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectMemberController extends Controller
{
    // Solo permitir acceso a project owners
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (Auth::user() && Auth::user()->role === 'project-owner') {
                return $next($request);
            }
            return response()->json(['message' => 'Unauthorized'], 403);
        });
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_code' => 'required|exists:projects,project_code',
            'team_member_id' => 'required|exists:team_members,id_tm',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation Error', 'details' => $validator->errors()], 400);
        }

        try {
            $projectMember = ProjectMember::create([
                'project_code' => $request->project_code,
                'team_member_id' => $request->team_member_id,
            ]);

            return response()->json($projectMember, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo asignar el miembro al proyecto', 'details' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $projectMember = ProjectMember::findOrFail($id);
            $projectMember->delete();

            return response()->noContent();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Project Member Not Found', 'details' => $e->getMessage()], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }
}
