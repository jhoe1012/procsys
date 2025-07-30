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
        Schema::create('sloc_mats', function (Blueprint $table) {
            $table->id();
            $table->string('plant', 4);
            $table->string('sloc', 4);
            $table->string('material', 20);
            $table->decimal('qty_avail', 15, 4)->default(0);
            $table->decimal('qty_inxfer', 15, 4)->default(0);
            $table->decimal('qty_blocked', 15, 4)->default(0);
            $table->string('base_uom', 10);
            $table->timestamps();
            $table->unique(['plant', 'sloc', 'material']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sloc_mats');
    }
};
