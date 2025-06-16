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
        Schema::table('po_materials', function (Blueprint $table) {
            $table->decimal('net_price', 15, 3)->change();
            $table->decimal('total_value', 15, 3)->change();
        });

        Schema::table('pr_materials', function (Blueprint $table) {
            $table->decimal('price', 15, 3)->change();
            $table->decimal('total_value', 15, 3)->change();
            $table->decimal('valuation_price', 15, 3)->change();
        });

        Schema::table('material_net_prices', function (Blueprint $table) {
            $table->decimal('price', 15, 3)->change();
        });

        Schema::table('material_valuations', function (Blueprint $table) {
            $table->decimal('valuation_price', 15, 3)->change();
        });

        Schema::table('history_material_valuations', function (Blueprint $table) {
            $table->decimal('valuation_price', 15, 3)->change();
        });

        Schema::table('temp_material_valuations', function (Blueprint $table) {
            $table->decimal('valuation_price', 15, 3)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
