<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('product_owners', function (Blueprint $table) {
            $table->id('id_po');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('profession_id')->nullable(); // Permitir valores nulos hasta definir la relación
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('product_owners');
    }
};
