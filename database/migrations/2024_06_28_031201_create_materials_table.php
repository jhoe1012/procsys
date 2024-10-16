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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('mat_code', 20)->unique();
            $table->string('mat_desc');
            $table->string('old_mat_code', 20)->nullable(true);
            $table->string('mat_type', 10)->nullable(true);
            $table->string('mat_grp_code', 20)->nullable(true);
            $table->string('base_uom', 10)->nullable(true);
            $table->string('order_uom', 10)->nullable(true);
            $table->decimal('min_rem_shelf_life')->default(0);
            $table->decimal('total_shelf_life')->default(0);
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
        Schema::dropIfExists('materials');
    }
};
