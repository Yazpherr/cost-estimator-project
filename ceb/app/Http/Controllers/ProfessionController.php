<?php

namespace App\Http\Controllers;

use App\Models\Profession;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfessionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');

    }

    public function index()
    {
        try {
            $professions = Profession::all();
            return response()->json($professions, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las profesiones', 'details' => $e->getMessage()], 500);
        }
    }

    public function getProfessionsForPO()
    {
        return Profession::all();
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|unique:professions|max:255',
                'salary' => 'required|numeric',
            ]);

            $profession = Profession::create($validatedData);

            return response()->json($profession, 201); // Código 201 para creación exitosa
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Responder con errores de validación
            return response()->json(['errors' => $e->errors()], 422); // Código 422 para errores de validación
        } catch (\Exception $e) {
            // Responder con errores de servidor
            return response()->json(['error' => 'No se pudo crear la profesión', 'details' => $e->getMessage()], 500); // Código 500 para errores del servidor
        }
    }

    public function show($id)
    {
        return Profession::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        try {
            // Buscar la profesión por ID
            $profession = Profession::findOrFail($id);

            // Validar los datos de entrada
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:255|unique:professions,name,' . $id . ',id_prof',
                'salary' => 'required|numeric',
            ]);

            // Si la validación falla, lanzar una excepción con los errores
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Actualizar la profesión con los datos validados
            $profession->update($request->all());

            // Devolver la profesión actualizada
            return response()->json($profession, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Manejar error si la profesión no es encontrada
            return response()->json(['error' => 'Profesión no encontrada'], 404);
        } catch (\Exception $e) {
            // Manejar cualquier otro error inesperado
            return response()->json(['error' => 'No se pudo actualizar la profesión', 'details' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $profession = Profession::findOrFail($id);
        $profession->delete();

        return response()->noContent();
    }

    public function getTeamMembersWithSalaries($id)
    {
        try {
            $project = Project::findOrFail($id);

            // Obtener los miembros del equipo asignados al proyecto con sus salarios
            $teamMembers = $project->teamMembers()->with('profession')->get();

            // Formatear los datos para incluir el salario de cada miembro del equipo
            $teamMembersWithSalaries = $teamMembers->map(function ($member) {
                return [
                    'id_tm' => $member->id_tm,
                    'name' => $member->user->name,
                    'email' => $member->user->email,
                    'profession' => $member->profession->name,
                    'salary' => $member->profession->salary,
                ];
            });

            return response()->json($teamMembersWithSalaries, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener los miembros del equipo', 'details' => $e->getMessage()], 500);
        }
    }
}

