<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrescriptionsTable extends Migration
{
    /**
     * Ejecutar las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id(); // ID de la receta
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade'); // ID del paciente
            $table->string('patient_name'); // Nombre del paciente
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade'); // ID del doctor
            $table->string('doctor_name'); // Nombre del doctor
            $table->string('medication_name'); // Nombre de la medicación
            $table->text('usage_instructions'); // Instrucciones de uso
            $table->timestamps();
        });
    }

    /**
     * Revertir las migraciones.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prescriptions');
    }
}

