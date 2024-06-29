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
        Schema::table('users', function (Blueprint $table) {
            // Actualizar la columna 'role' para asegurar el valor predeterminado
            $table->enum('role', ['admin', 'project-owner', 'team-member'])->default('team-member')->change();
        });
    }

    /**
     * Revertir las migraciones.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Revertir la columna 'role' a string sin valores predeterminados específicos
            $table->string('role')->change();
        });
    }
};
