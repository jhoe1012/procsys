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
        Schema::create('material_net_prices', function (Blueprint $table) {
            $table->id();
            $table->string('vendor');
            $table->string('plant');
            $table->string('mat_code', 20);
            $table->string('currency', 10);
            $table->decimal('price', 15, 2);
            $table->decimal('per_unit');
            $table->string('uom', 10);
            $table->date('valid_from');
            $table->date('valid_to');
            $table->decimal('min_order_qty');
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
        Schema::dropIfExists('material_net_prices');
    }
};
