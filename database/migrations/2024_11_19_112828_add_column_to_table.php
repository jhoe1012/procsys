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
        Schema::table('pr_materials', function (Blueprint $table) {
            $table->decimal('conversion', 15, 2)->nullable();
            $table->decimal('converted_qty', 15, 2)->nullable();
            $table->decimal('valuation_price', 15, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pr_materials', function (Blueprint $table) {
            $table->dropColumn('conversion');
            $table->dropColumn('converted_qty');
            $table->dropColumn('valuation_price');
        });
    }
};
