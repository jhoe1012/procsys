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
        Schema::create('prctrl_grps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plant_id')->constrained('plants');
            $table->string('prctrl_grp', 255);
            $table->string('prctrl_desc', 255);
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();
            $table->unique(['plant_id', 'prctrl_grp']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prctrl_grps');
    }
};
