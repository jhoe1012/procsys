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
            $table->string('int_loc_1')->nullable();
            $table->string('int_loc_2')->nullable();
            $table->string('auth_group')->nullable();
            $table->string('lang_key')->nullable();
            // $table->string('currency')->nullable();
            // $table->string('payment_terms')->nullable();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn('int_loc_1')->nullable();
            $table->dropColumn('int_loc_2')->nullable();
            $table->dropColumn('auth_group')->nullable();
            $table->dropColumn('lang_key')->nullable();
            // $table->dropColumn('currency')->nullable();
            // $table->dropColumn('payment_terms')->nullable();
            $table->dropColumn('created_by')->nullable();
            $table->dropColumn('updated_by')->nullable();
        });
    }
};
