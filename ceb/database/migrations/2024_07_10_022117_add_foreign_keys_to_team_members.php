<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration {
    public function up() {
        try {
            Schema::table('team_members', function (Blueprint $table) {
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('profession_id')->references('id_prof')->on('professions')->onDelete('cascade');
            });
        } catch (Exception $e) {
            Log::error('Error adding foreign keys to team_members table: ' . $e->getMessage());
            throw $e;
        }
    }

    public function down() {
        try {
            Schema::table('team_members', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->dropForeign(['profession_id']);
            });
        } catch (Exception $e) {
            Log::error('Error dropping foreign keys from team_members table: ' . $e->getMessage());
            throw $e;
        }
    }
};
