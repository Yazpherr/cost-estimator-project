<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('requirements', function (Blueprint $table) {
            $table->id();
            $table->string('requirement_code')->unique(); // Código único del requerimiento
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('team_member_id');
            $table->integer('function_points')->nullable();
            $table->timestamps();

            // Clave foránea hacia projects
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');

            // Clave foránea hacia team_members
            $table->foreign('team_member_id')->references('id_tm')->on('team_members')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('requirements');
    }

};
