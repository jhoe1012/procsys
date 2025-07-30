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
        Schema::table('material_valuations', function (Blueprint $table) {
            $table->char('val_proc', 1)->nullable()->comment(' S =  Standard Price |  V = Moving Average Price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('material_valuations', function (Blueprint $table) {
            $table->dropColumn('val_proc');
        });
    }
};
