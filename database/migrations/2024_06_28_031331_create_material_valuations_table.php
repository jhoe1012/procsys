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
        Schema::create('material_valuations', function (Blueprint $table) {
            $table->id();
            $table->string('mat_code', 20);
            $table->string('plant', 20);
            $table->string('currency')->default('PHP');
            $table->decimal('valuation_price', 15, 2);
            $table->integer('per_unit')->default(1);
            $table->date('valid_from');
            $table->date('valid_to');
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
        Schema::dropIfExists('material_valuations');
    }
};
