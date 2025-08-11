<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('cc_by_deliv_addr');
        });

        Schema::create('delivery_address_user', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('delivery_address_id')->constrained('delivery_addresses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_address_user');
    }
};
