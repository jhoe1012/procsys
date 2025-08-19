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
        Schema::create('so_items', function (Blueprint $table) {
            $table->id();
            $table->string('okey', 30);
            $table->string('supa', 10);
            $table->string('plant', 10);
            $table->integer('item_no');
            $table->string('old_mat_code', 20);
            $table->string('material', 20)->nullable();
            $table->string('material_desc');
            $table->string('uom', 10)->nullable();
            $table->decimal('order_qty', 9, 4);
            $table->decimal('alloc_qty', 9, 4);
            $table->boolean('is_obc');
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->timestamps();
            $table->foreign('okey')->references('okey')->on('so_headers')->onDelete('cascade')->index();
            $table->string('remarks')->nullable();
            $table->unique(['okey', 'old_mat_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('so_items');
    }
};
