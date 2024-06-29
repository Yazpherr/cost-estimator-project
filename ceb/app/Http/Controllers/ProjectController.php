<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function createProject(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'budget' => 'nullable|numeric',
            'resources' => 'nullable|string',
        ]);

        $project = Project::create($validatedData);

        return response()->json(['message' => 'Proyecto creado exitosamente', 'project' => $project]);
    }
}
