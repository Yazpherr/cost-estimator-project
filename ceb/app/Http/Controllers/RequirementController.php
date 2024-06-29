<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Requirement;

class RequirementController extends Controller
{
    public function createRequirement(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'priority' => 'required|string|max:50',
            'estimation' => 'required|numeric',
        ]);

        // Generar el unique_id para el requerimiento
        $uniqueId = 'REQ-' . str_pad(Requirement::count() + 1, 3, '0', STR_PAD_LEFT);

        // Añadir el unique_id a los datos validados
        $validatedData['unique_id'] = $uniqueId;

        $requirement = Requirement::create($validatedData);

        return response()->json(['message' => 'Requerimiento creado exitosamente', 'requirement' => $requirement]);
    }
}
