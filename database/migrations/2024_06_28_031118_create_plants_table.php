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
        Schema::create('plants', function (Blueprint $table) {
            $table->id();
            $table->string('plant', 20)->unique();
            $table->string('name1');
            $table->string('lot_no')->nullable();
            $table->string('street')->nullable();
            $table->string('street2')->nullable();
            $table->string('district')->nullable();
            $table->integer('postal_code')->nullable();
            $table->string('city')->nullable();
            $table->string('country_code')->nullable();
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
        Schema::dropIfExists('plants');
    }
};
