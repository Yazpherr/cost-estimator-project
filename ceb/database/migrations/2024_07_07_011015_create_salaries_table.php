<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('profession_id');
            $table->decimal('amount', 10, 2);
            $table->timestamps();

            // Clave foránea hacia professions
            $table->foreign('profession_id')->references('id')->on('professions')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('salaries');
    }

};
