<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id('id_tm');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('profession_id')->nullable(); // Permitir valores nulos hasta definir la relación
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('team_members');
    }
};
