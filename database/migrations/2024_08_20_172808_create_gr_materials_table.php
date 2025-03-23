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
        Schema::create('gr_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gr_header_id')->constrained('gr_headers')->onDelete('cascade');
            $table->foreignId('po_material_id')->constrained('po_materials');
            $table->integer('item_no');
            $table->string('mat_code', 20);
            $table->string('short_text');
            $table->decimal('gr_qty', 15, 2);
            $table->string('unit', 10);
            $table->date('po_deliv_date');
            $table->string('batch')->nullable();
            $table->date('mfg_date')->nullable();
            $table->date('sled_bbd')->nullable();
            $table->bigInteger('po_number');
            $table->integer('po_item');
            $table->boolean('dci')->default(false);
            $table->boolean('is_cancel')->default(false);
            $table->dateTime('cancel_datetime')->nullable();
            $table->integer('cancel_by')->nullable();
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
        Schema::dropIfExists('gr_materials');
    }
};
