<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_code')->unique(); // Código único del proyecto
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('project_owner_id');
            $table->integer('total_function_points')->nullable();
            $table->decimal('complexity_adjustment_values', 8, 2)->nullable();
            $table->decimal('estimated_effort', 8, 2)->nullable();
            $table->decimal('estimated_time', 8, 2)->nullable();
            $table->decimal('associated_costs', 10, 2)->nullable();
            $table->timestamps();

            // Clave foránea hacia project_owners
            $table->foreign('project_owner_id')->references('id_po')->on('project_owners')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }

};
