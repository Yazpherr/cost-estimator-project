<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecutar las migraciones.
     */
    public function up()
    {
        Schema::create('project_owners', function (Blueprint $table) {
            $table->id('id_po');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            // Definir la clave foránea con la tabla 'users'
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Revertir las migraciones.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_owners');
    }
};
