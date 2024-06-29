<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProjectManagerController;
use App\Http\Controllers\TeamMemberController;

// Rutas de autenticación
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Rutas protegidas por autenticación JWT
Route::middleware('auth:api')->group(function () {
    // Ruta para cerrar sesión
    Route::post('logout', [AuthController::class, 'logout']);

    // Ruta para obtener el usuario autenticado
    Route::get('user', [AuthController::class, 'user']);

    // Ruta para registrar un product-owner (solo admin)
    Route::post('register-product-owner', [AuthController::class, 'registerProductOwner'])->middleware('role:admin');

    // Rutas protegidas por roles
    Route::middleware(['auth:api'])->group(function () {
        // Rutas para administradores
        Route::post('admin/task', [AdminController::class, 'createTask'])->middleware('role:admin');

        // Rutas para product-owners
        Route::post('project/task', [ProjectManagerController::class, 'createTask'])->middleware('role:product-owner');

        // Rutas para miembros del equipo
        Route::get('tasks', [TeamMemberController::class, 'listTasks'])->middleware('role:team-member');
    });
});
