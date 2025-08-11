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
        Schema::table('vendors', function (Blueprint $table) {
            $table->string('email_1')->nullable()->after('email_addr');
            $table->string('email_2')->nullable()->after('email_1');
            $table->string('payment_terms')->nullable()->after('email_2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn(['email_1', 'email_2', 'payment_terms']);
        });
    }
};
