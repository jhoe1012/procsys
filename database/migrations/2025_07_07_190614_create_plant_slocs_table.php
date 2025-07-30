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
        Schema::create('plant_slocs', function (Blueprint $table) {
            $table->id();
            $table->string('plant', 4);
            $table->string('sloc', 4);
            $table->string('sloc_name', 32);
            $table->boolean('is_sloc_blocked')->default(false);
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();
            $table->unique(['plant', 'sloc']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plant_slocs');
    }
};
