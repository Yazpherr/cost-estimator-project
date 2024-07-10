<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration {
    public function up() {
        try {
            Schema::table('projects', function (Blueprint $table) {
                $table->foreign('product_owner_id')->references('id_po')->on('product_owners')->onDelete('cascade');
            });
        } catch (Exception $e) {
            Log::error('Error adding foreign keys to projects table: ' . $e->getMessage());
            throw $e;
        }
    }

    public function down() {
        try {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropForeign(['project_owner_id']);
            });
        } catch (Exception $e) {
            Log::error('Error dropping foreign keys from projects table: ' . $e->getMessage());
            throw $e;
        }
    }
};
