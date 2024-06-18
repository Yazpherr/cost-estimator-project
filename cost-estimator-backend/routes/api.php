<?php

use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;


Route::apiResource('roles', RoleController::class);

Route::get('/', function () {
    return 'La API de Roles está funcionando correctamente';
});
