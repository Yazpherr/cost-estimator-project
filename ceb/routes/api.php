<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\SalaryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProjectManagerController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\ProfessionController;

// Rutas de autenticación
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);



// Rutas protegidas por autenticación JWT
Route::middleware('auth:api')->group(function () {
    // Ruta para cerrar sesión
    Route::post('logout', [AuthController::class, 'logout']);

    // Ruta para obtener el usuario autenticado
    Route::get('user', [AuthController::class, 'user']);


    // RUTA PARA ADMINISTRADORES
    Route::middleware('role:admin')->group(function () {
        Route::post('register-product-owner', [AuthController::class, 'registerProductOwner']); // registrar un product-owner (solo admin)
        Route::resource('professions', ProfessionController::class)->except(['index', 'show']);
        Route::resource('salaries', SalaryController::class);
    });
    // RUTA PARA JEFES DE PROYECTO
    Route::middleware('role:project-owner')->group(function () {
        Route::get('my-projects', [ProjectController::class, 'myProjects']);
        Route::resource('projects', ProjectController::class);


        Route::resource('professions', ProfessionController::class)->except(['index', 'show']);
        // REGISTRO DE TEAM MEMBERS
        Route::post('team-members', [TeamMemberController::class, 'store']);
        Route::delete('team-members/{id}', [TeamMemberController::class, 'destroy']);
        Route::post('project-members', [ProjectMemberController::class, 'store']);
        Route::delete('project-members/{id}', [ProjectMemberController::class, 'destroy']);
    });

    // RUTAS PARA MIEMBROS DEL EQUIPO

    // Rutas accesibles para todos los roles autenticados
    Route::resource('professions', ProfessionController::class)->only(['index', 'show']);
});
