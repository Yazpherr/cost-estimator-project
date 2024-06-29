<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluation;

class EvaluationController extends Controller
{
    public function createEvaluation(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'requirement_id' => 'required|exists:requirements,id',
            'evaluator_id' => 'required|exists:users,id',
            'evaluation' => 'required|string|max:255',
        ]);

        $evaluation = Evaluation::create($validatedData);

        return response()->json(['message' => 'Evaluación asignada exitosamente', 'evaluation' => $evaluation]);
    }

    public function getEvaluationsByProject($projectId)
    {
        $evaluations = Evaluation::where('project_id', $projectId)->get();

        return response()->json($evaluations);
    }
}
