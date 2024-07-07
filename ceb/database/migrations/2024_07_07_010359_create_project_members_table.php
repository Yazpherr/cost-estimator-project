<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('project_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('team_member_id');
            $table->timestamps();

            // Clave foránea hacia projects
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');

            // Clave foránea hacia team_members
            $table->foreign('team_member_id')->references('id_tm')->on('team_members')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_members');
    }

};
