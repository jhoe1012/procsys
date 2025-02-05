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
        Schema::create('temp_material_valuations', function (Blueprint $table) {
            $table->id();
            $table->string('mat_code', 20);
            $table->string('plant', 20);
            $table->string('currency')->default('PHP');
            $table->decimal('valuation_price', 15, 2);
            $table->integer('per_unit')->default(1);
            $table->date('valid_from');
            $table->date('valid_to');
            $table->integer('created_by')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->string('stat', 10)->nullable();
            $table->text('remarks')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temp_material_valuations');
    }
};
