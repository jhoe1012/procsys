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
        Schema::create('gr_headers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('gr_number')->unique();
            $table->bigInteger('po_number');
            $table->string('created_name');
            $table->string('vendor_id');
            $table->string('plant');
            $table->date('entry_date');
            $table->date('posting_date')->nullable();
            $table->date('actual_date')->nullable();
            $table->string('delivery_note')->nullable();
            $table->text('header_text')->nullable();
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
        Schema::dropIfExists('gr_headers');
    }
};
