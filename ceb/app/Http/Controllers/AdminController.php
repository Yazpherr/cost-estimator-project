<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Crear una nueva tarea
     */
    public function createTask(Request $request)
    {
        // Verificar si el usuario tiene el rol de admin
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Lógica para crear una tarea
        return response()->json(['message' => 'Tarea creada con éxito']);
    }
}
