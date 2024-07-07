<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('project_members', function (Blueprint $table) {
            // Eliminar la columna project_id existente
            $table->dropForeign(['project_id']);
            $table->dropColumn('project_id');

            // Agregar la nueva columna project_code
            $table->string('project_code')->after('id');

            // Definir la clave foránea con la tabla projects usando project_code
            $table->foreign('project_code')->references('project_code')->on('projects')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('project_members', function (Blueprint $table) {
            // Restaurar la columna project_id
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');

            // Eliminar la columna project_code
            $table->dropForeign(['project_code']);
            $table->dropColumn('project_code');
        });
    }

};
