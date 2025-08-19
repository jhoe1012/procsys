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
        Schema::create('material_work_centers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('work_center_id')->constrained('work_centers')->onDelete('cascade');
            $table->char('plant', 4);
            $table->string('material', 20);
            $table->string('description', 40);
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_work_centers');
    }
};
