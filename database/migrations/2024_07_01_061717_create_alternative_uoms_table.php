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
        Schema::create('alternative_uoms', function (Blueprint $table) {
            $table->id();
            $table->string('mat_code', 20);
            $table->string('alt_uom');
            $table->integer('counter');
            $table->integer('denominator');
            $table->integer('ean_num')->nullable();
            $table->string('ean_upc', 20)->nullable();
            $table->string('ean_category', 10)->nullable();
            $table->string('unit_of_weight', 10)->nullable();
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
        Schema::dropIfExists('alternative_uoms');
    }
};
