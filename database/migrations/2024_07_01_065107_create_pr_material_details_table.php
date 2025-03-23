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
        Schema::create('pr_material_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pr_materials_id')->nullable()->constrained('pr_materials')->onDelete('cascade');
            $table->bigInteger('document');
            $table->integer('item_no');
            $table->string('status');
            $table->decimal('qty');
            $table->string('unit', 10);
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
        Schema::dropIfExists('pr_material_details');
    }
};
