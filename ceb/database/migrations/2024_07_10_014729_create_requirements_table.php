<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('requirements', function (Blueprint $table) {
            $table->id('id_req'); // Usar una clave primaria incremental
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('team_member_id');
            $table->unsignedBigInteger('project_owner_id');
            $table->string('name'); // Nombre del requerimiento
            $table->string('component_type'); // Tipo de componente
            $table->string('complexity_level'); // Nivel de complejidad
            $table->integer('function_points')->nullable();
            $table->timestamps();

        });
    }

    public function down() {
        Schema::dropIfExists('requirements');
    }
};
