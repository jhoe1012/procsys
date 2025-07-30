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
        Schema::table('gr_materials', function (Blueprint $table) {
            $table->decimal('base_qty', 15, 4)->nullable();
            $table->string('base_uom', 10)->nullable();
            $table->decimal('base_amount', 10)->nullable();
            $table->string('plant', 4)->nullable();
            $table->string('sloc', 4)->nullable();
            $table->decimal('prior_qty', 15, 4)->nullable();
            $table->decimal('prior_val', 15, 4)->nullable();
            $table->integer('movement_type')->nullable();
            $table->bigInteger('gr_number_ref')->nullable();
            $table->integer('item_no_ref')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gr_materials', function (Blueprint $table) {
            $table->dropColumn('base_qty');
            $table->dropColumn('base_uom');
            $table->dropColumn('base_amount');
            $table->dropColumn('plant');
            $table->dropColumn('sloc');
            $table->dropColumn('prior_qty');
            $table->dropColumn('prior_val');
            $table->dropColumn('movement_type');
            $table->dropColumn('gr_number_ref');
            $table->dropColumn('item_no_ref');
        });
    }
};
