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
        Schema::create('approve_statuses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('pr_number')->nullable();
            $table->bigInteger('po_number')->nullable();
            $table->string('position')->nullable();
            $table->string('status');
            $table->string('approved_by')->nullable();
            $table->integer('user_id')->nullable();
            $table->dateTime('approved_date')->nullable();
            $table->integer('seq');
            $table->text('message')->nullable();
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
        Schema::dropIfExists('approve_statuses');
    }
};
