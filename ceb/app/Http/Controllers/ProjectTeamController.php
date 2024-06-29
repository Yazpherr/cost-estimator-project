<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;

class ProjectTeamController extends Controller
{
    public function assignTeamMember(Request $request, $projectId)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'nullable|string|max:255',
        ]);

        $project = Project::findOrFail($projectId);
        $project->teamMembers()->attach($validatedData['user_id'], ['role' => $validatedData['role']]);

        return response()->json(['message' => 'Miembro del equipo asignado exitosamente', 'project' => $project]);
    }

    public function removeTeamMember(Request $request, $projectId, $userId)
    {
        $project = Project::findOrFail($projectId);
        $project->teamMembers()->detach($userId);

        return response()->json(['message' => 'Miembro del equipo removido exitosamente', 'project' => $project]);
    }
}

