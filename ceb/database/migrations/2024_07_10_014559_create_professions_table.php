<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('professions', function (Blueprint $table) {
            $table->id('id_prof');
            $table->string('name');
            $table->decimal('salary', 8, 2); // Sueldo asociado a la profesión
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('professions');
    }
};
