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
        Schema::create('prod_ord_hdr1s', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order')->index();
            $table->char('plant', 4);
            $table->char('sloc', 4);
            $table->string('material', 20);
            $table->foreignId('work_center_id')->constrained('work_centers');
            $table->char('supply_area', 4)->nullable();
            $table->char('receiving_area', 4)->nullable();
            $table->string('mat_desc');
            $table->decimal('target_qty_ou', 15, 4)->comment('Target Quantity in Order UOM ');
            $table->string('target_uom_ou',   10)->comment('Target UOM in Order UOM ');
            $table->decimal('target_qty_bu', 15, 4)->comment('Target Quantity in Base UOM ');
            $table->string('target_uom_bu',   10)->comment('Target UOM in Base UOM ');
            $table->date('date_created');
            $table->date('basic_start');
            $table->date('basic_finish');
            $table->date('date_released')->nullable();
            $table->date('date_started_actual')->nullable();
            $table->date('date_finished_actual')->nullable();
            $table->date('production_date');
            $table->date('delivery_date');
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->unique(['order', 'material']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prod_ord_hdr1s');
    }
};
