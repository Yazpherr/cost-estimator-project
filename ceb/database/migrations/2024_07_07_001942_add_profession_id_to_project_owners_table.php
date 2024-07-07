<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('project_owners', function (Blueprint $table) {
            $table->unsignedBigInteger('profession_id')->nullable()->after('user_id');

            // Definir la clave foránea
            $table->foreign('profession_id')->references('id')->on('professions')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('project_owners', function (Blueprint $table) {
            $table->dropForeign(['profession_id']);
            $table->dropColumn('profession_id');
        });
    }

};
