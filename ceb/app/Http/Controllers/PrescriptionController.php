<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prescription;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PrescriptionController extends Controller
{
    /**
     * Crear una nueva receta.
     */
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'medication_name' => 'required|string|max:255',
            'usage_instructions' => 'required|string',
        ]);

        $doctor = Auth::user();
        $patient = User::find($request->patient_id);

        if (!$patient->hasRole('patient')) {
            return response()->json(['error' => 'El usuario especificado no es un paciente'], 400);
        }

        $prescription = Prescription::create([
            'patient_id' => $patient->id,
            'patient_name' => $patient->name,
            'doctor_id' => $doctor->id,
            'doctor_name' => $doctor->name,
            'created_at' => now(),
            'medication_name' => $request->medication_name,
            'usage_instructions' => $request->usage_instructions,
        ]);

        return response()->json(['message' => 'Receta creada exitosamente', 'prescription' => $prescription], 201);
    }

    /**
     * Actualizar una receta existente.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'medication_name' => 'required|string|max:255',
            'usage_instructions' => 'required|string',
        ]);

        $prescription = Prescription::find($id);

        // Verificar que el usuario es el doctor que creó la receta
        if (Auth::user()->id !== $prescription->doctor_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $prescription->update([
            'medication_name' => $request->medication_name,
            'usage_instructions' => $request->usage_instructions,
        ]);

        return response()->json(['message' => 'Receta actualizada exitosamente', 'prescription' => $prescription], 200);
    }

    /**
     * Mostrar una receta específica.
     */
    public function show($id)
    {
        $prescription = Prescription::find($id);

        // Verificar que el usuario es el paciente propietario de la receta o el doctor que la creó
        if (Auth::user()->id !== $prescription->patient_id && Auth::user()->id !== $prescription->doctor_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        return response()->json(['prescription' => $prescription], 200);
    }
}
