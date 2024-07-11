<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\RequirementController;
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
        // Route::resource('professions', ProfessionController::class)->except(['index', 'show']);
        //Route::resource('profesiones', ProfessionController::class)->except(['index', 'show']);

        // MOD TABLA PROFESIONES
        Route::post('crear-profesion', [ProfessionController::class, 'store']); // Crear una nueva profesión
        Route::get('obtener-profesiones', [ProfessionController::class, 'index']); // Obtener todas las profesiones
        Route::put('actualizar-profesion/{id}', [ProfessionController::class, 'update']); // Actualizar una profesión
        Route::delete('eliminar-profesion/{id}', [ProfessionController::class, 'destroy']); // Eliminar una profesión
    });

    // RUTA PARA JEFES DE PROYECTO
    Route::middleware('role:product-owner')->group(function () {
        Route::get('mis-proyectos-po', [ProjectController::class, 'myProjectsProductOwner']);
        Route::post('crear-proyecto', [ProjectController::class, 'store']);
        Route::get('proyectos', [ProjectController::class, 'index']);
        Route::get('proyecto/{id}', [ProjectController::class, 'show']);
        Route::put('actualizar-proyecto/{id}', [ProjectController::class, 'update']);
        Route::delete('eliminar-proyecto/{id}', [ProjectController::class, 'destroy']);


        // REQUERIMIENTOS
        Route::post('crear-requerimiento', [RequirementController::class, 'store']); // Ruta para crear requerimientos
        Route::get('obtener-requerimientos', [RequirementController::class, 'getAllRequirements']); // Ruta para obtener todos los requerimientos



        // REGISTRO DE TEAM MEMBERS
        Route::get('obtener-miembros-equipo', [TeamMemberController::class, 'getTeamMembers']); // Obtener todos los miembros del equipo
        Route::post('crear-miembro-equipo', [TeamMemberController::class, 'store']); // Crear un nuevo miembro del equipo
        Route::put('actualizar-miembro-equipo/{id}', [TeamMemberController::class, 'update']); // Actualizar un miembro del equipo
        Route::delete('eliminar-miembro-equipo/{id}', [TeamMemberController::class, 'destroy']); // Eliminar un miembro del equipo

        Route::post('asignar-miembro-proyecto', [ProjectMemberController::class, 'store']); // Asignar un miembro a un proyecto
        Route::delete('eliminar-miembro-proyecto/{id}', [ProjectMemberController::class, 'destroy']); // Eliminar un miembro de un proyecto

        // ASIGNAR REQUERIMIENTOS A LOS MIEMBROS DEL PROYECTO
        Route::put('asignar-requerimiento/{id}', [RequirementController::class, 'assignTeamMember']);
    });

    // RUTAS PARA MIEMBROS DEL EQUIPO
    Route::middleware('role:team-member')->group(function () {
        // aca escriir las rutas de proyectos y requerimientos
        // Obtener los proyectos a los que el miembro del equipo está asignado
        // Route::get('mis-proyectos', [ProjectController::class, 'myProjects']);
        Route::get('mis-proyectos-tm', [ProjectController::class, 'myProjectsTeamMember']);

        // Obtener los requerimientos asignados al miembro del equipo
        Route::get('proyecto/{projectId}/requerimientos', [RequirementController::class, 'getProjectRequirements']);

        // Interactuar con los requerimientos
        Route::put('actualizar-requerimiento/{id}', [RequirementController::class, 'update']);
        Route::delete('eliminar-requerimiento/{id}', [RequirementController::class, 'destroy']);

    });
});
