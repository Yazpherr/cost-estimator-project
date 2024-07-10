<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('requirements', function (Blueprint $table) {
            $table->id('id_req'); // Usar una clave primaria incremental
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('team_member_id')->nullable();
            $table->unsignedBigInteger('project_owner_id')->nullable();
            $table->string('name'); // Nombre del requerimiento
            $table->string('component_type')->nullable(); // Tipo de componente
            $table->integer('complexity_level')->nullable(); // Nivel de complejidad
            $table->integer('function_points')->nullable();
            $table->string('justification')->nullable();; // Tipo de componente
            $table->timestamps();

        });
    }

    public function down() {
        Schema::dropIfExists('requirements');
    }
};
