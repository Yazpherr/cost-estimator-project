<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// importacion de modelos
use App\Models\User;
use App\Models\TeamMember;
use App\Models\ProjectOwner;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Registro de un nuevo usuario
    //  */
    public function register(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Devolver errores de validación si los hay
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            // Crear el usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'team-member', // Asignar el rol 'team-member' automáticamente
            ]);

            // Crear el registro en la tabla team_members
            TeamMember::create(['user_id' => $user->id]);

            // Generar un token JWT para el usuario
            $token = JWTAuth::fromUser($user);

            // Devolver el usuario y el token
            return response()->json(compact('user', 'token'), 201);

        } catch (\Exception $e) {
            // Manejar cualquier error inesperado
            return response()->json(['error' => 'No se pudo registrar el usuario', 'details' => $e->getMessage()], 500);
        }
    }


    /**
     * Registro de un nuevo product-owner por el admin
     */
    public function registerProductOwner(Request $request)
    {
        try {
            // Verificar si el usuario tiene el rol de admin
            if (auth()->user()->role !== 'admin') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            // Validar los datos de entrada
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            // Devolver errores de validación si los hay
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Crear el product-owner
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'project-owner',
            ]);

            // Crear el registro en la tabla project_owners
            ProjectOwner::create(['user_id' => $user->id]);

            // Devolver el usuario creado
            return response()->json($user, 201);

        } catch (\Illuminate\Database\QueryException $e) {
            // Manejar errores de base de datos
            return response()->json(['error' => 'Error de base de datos', 'details' => $e->getMessage()], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Manejar errores de validación
            return response()->json(['error' => 'Error de validación', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Manejar cualquier otro error inesperado
            return response()->json(['error' => 'No se pudo registrar el product-owner', 'details' => $e->getMessage()], 500);
        }
    }



    /**
     * Inicio de sesión de un usuario
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ]
        ]);
    }

    /**
     * Cierre de sesión de un usuario
     */
    public function logout()
    {
        try {
            // Invalidar el token
            JWTAuth::invalidate(JWTAuth::getToken());

            // Devolver mensaje de éxito
            return response()->json(['message' => 'Successfully logged out']);

        } catch (\Exception $e) {
            // Manejar cualquier error inesperado
            return response()->json(['error' => 'No se pudo cerrar sesión', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtener el usuario autenticado
     */
    public function user()
    {
        try {
            // Devolver el usuario autenticado
            return response()->json(auth()->user());

        } catch (\Exception $e) {
            // Manejar cualquier error inesperado
            return response()->json(['error' => 'No se pudo obtener el usuario', 'details' => $e->getMessage()], 500);
        }
    }
}
