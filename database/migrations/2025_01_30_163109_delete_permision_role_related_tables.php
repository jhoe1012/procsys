<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('roles');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('user_role_relations');
        Schema::dropIfExists('role_permissions');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
