<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class TeamMemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // Crear un nuevo miembro del equipo
    public function store(Request $request)
    {
        // Verificar si el usuario autenticado es product owner
        $user = Auth::user();
        if ($user->role !== 'product-owner') {
            return response()->json(['error' => 'Unauthorized', 'details' => 'Only product owners can create team members'], 403);
        }

        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'profession_id' => 'required|exists:professions,id_prof',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation Error', 'details' => $validator->errors()], 422);
        }

        try {
            // Crear el usuario
            $newUser = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'team-member',
            ]);

            // Crear el registro en la tabla team_members
            $teamMember = TeamMember::create([
                'user_id' => $newUser->id,
                'profession_id' => $request->profession_id,
            ]);

            return response()->json($teamMember, 201);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => 'Database Error', 'details' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'profession_id' => 'required|exists:professions,id_prof',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation Error', 'details' => $validator->errors()], 422);
        }

        try {
            $teamMember = TeamMember::findOrFail($id);
            $teamMember->update([
                'profession_id' => $request->profession_id,
            ]);

            return response()->json($teamMember, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Team Member Not Found', 'details' => $e->getMessage()], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => 'Database Error', 'details' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $teamMember = TeamMember::findOrFail($id);
            $teamMember->delete();

            return response()->noContent();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Team Member Not Found', 'details' => $e->getMessage()], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }
}
