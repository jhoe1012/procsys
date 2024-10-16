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
        Schema::create('purchasing_groups', function (Blueprint $table) {
            $table->id();
            $table->string('mat_code', 20);
            $table->string('plant');
            $table->string('purch_grp');
            $table->string('unit_issue', 10)->nullable();
            $table->integer('plan_deliv_time')->default(0);
            $table->integer('gr_proc_time')->default(0);
            $table->float('min_lot_size')->default(0);
            $table->float('max_lot_size')->default(0);
            $table->float('fix_lot_size')->default(0);
            $table->float('rounding_value')->default(0);
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchasing_groups');
    }
};
