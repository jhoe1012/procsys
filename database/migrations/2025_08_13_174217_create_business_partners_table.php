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
        Schema::create('business_partners', function (Blueprint $table) {
            $table->id();
            $table->string('bp_no', 20)->unique();
            $table->string('external_bp_no', 20);
            $table->string('grouping', 10);
            $table->string('name1', 255);
            $table->string('name2', 255)->nullable();
            $table->string('name3', 255)->nullable();
            $table->string('name4', 255);
            $table->integer('partner_cat')->nullable();
            $table->string('central_block', 20)->nullable();
            $table->string('archiving_flag', 20)->nullable();
            $table->string('not_released', 20)->nullable();
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
        Schema::dropIfExists('business_partners');
    }
};
