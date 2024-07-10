<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\SalaryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\ProfessionController;

// Rutas de autenticación
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);



// Rutas protegidas por autenticación JWT
Route::middleware('auth:api')->group(function () {
    // Ruta para cerrar sesión

    // Ruta para obtener el usuario autenticado
    Route::get('user', [AuthController::class, 'user']);


    // RUTA PARA ADMINISTRADORES
    Route::middleware('role:admin')->group(function () {
        Route::post('register-product-owner', [AuthController::class, 'registerProductOwner']); // registrar un product-owner (solo admin)
        Route::resource('professions', ProfessionController::class)->except(['index', 'show']);
        Route::resource('salaries', SalaryController::class);
    });

    // RUTA PARA JEFES DE PROYECTO
    Route::middleware('role:product-owner')->group(function () {
        Route::get('mis-proyectos', [ProjectController::class, 'myProjects']);
        Route::post('crear-proyecto', [ProjectController::class, 'store']);
        Route::get('proyectos', [ProjectController::class, 'index']);
        Route::get('proyecto/{id}', [ProjectController::class, 'show']);
        Route::put('actualizar-proyecto/{id}', [ProjectController::class, 'update']);
        Route::delete('eliminar-proyecto/{id}', [ProjectController::class, 'destroy']);

        // REGISTRO DE TEAM MEMBERS
        Route::post('registrar-miembro-equipo', [TeamMemberController::class, 'store']);
        Route::delete('eliminar-miembro-equipo/{id}', [TeamMemberController::class, 'destroy']);
        Route::post('asignar-miembro-proyecto', [ProjectMemberController::class, 'store']);
        Route::delete('remover-miembro-proyecto/{id}', [ProjectMemberController::class, 'destroy']);
    });



    // RUTAS PARA MIEMBROS DEL EQUIPO

    // Rutas accesibles para todos los roles autenticados
    Route::resource('professions', ProfessionController::class)->only(['index', 'show']);
});
