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
    // Solo permitir acceso a project owners
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (Auth::user() && Auth::user()->role === 'project-owner') {
                return $next($request);
            }
            return response()->json(['message' => 'Unauthorized'], 403);
        });
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation Error', 'details' => $validator->errors()], 400);
        }

        try {
            // Crear el usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'team-member',
            ]);

            // Crear el registro en la tabla team_members
            $teamMember = TeamMember::create([
                'user_id' => $user->id,
                // No definimos profession_id aquí
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
            'profession_id' => 'required|exists:professions,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation Error', 'details' => $validator->errors()], 400);
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
