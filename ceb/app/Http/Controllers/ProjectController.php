<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (Auth::user() && Auth::user()->role === 'product-owner') {
                return $next($request);
            }
            return response()->json(['message' => 'Unauthorized'], 403);
        });
    }

    public function myProjects()
    {
        try {
            $productOwner = Auth::user()->productOwner;

            if (!$productOwner) {
                return response()->json(['error' => 'El usuario no es un product owner'], 403);
            }

            $projects = Project::where('product_owner_id', $productOwner->id_po)->get();

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
            $productOwner = Auth::user()->productOwner;

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

        $project->update($request->all());

        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->noContent();
    }
}
