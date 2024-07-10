<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration {
    public function up() {
        try {
            Schema::table('project_members', function (Blueprint $table) {
                $table->foreign('project_id')->references('id_pro')->on('projects')->onDelete('cascade');
                $table->foreign('team_member_id')->references('id_tm')->on('team_members')->onDelete('cascade');
            });
        } catch (Exception $e) {
            Log::error('Error adding foreign keys to project_members table: ' . $e->getMessage());
            throw $e;
        }
    }

    public function down() {
        try {
            Schema::table('project_members', function (Blueprint $table) {
                $table->dropForeign(['project_id']);
                $table->dropForeign(['team_member_id']);
            });
        } catch (Exception $e) {
            Log::error('Error dropping foreign keys from project_members table: ' . $e->getMessage());
            throw $e;
        }
    }
};
