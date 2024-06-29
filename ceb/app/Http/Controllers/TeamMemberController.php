<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    /**
     * Listar tareas asignadas
     */
    public function listTasks(Request $request)
    {
        // Verificar si el usuario tiene el rol de team-member
        if (auth()->user()->role !== 'team-member') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Lógica para listar tareas
        return response()->json(['message' => 'Listado de tareas']);
    }
}
