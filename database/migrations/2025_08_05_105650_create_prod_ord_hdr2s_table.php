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
        Schema::create('prod_ord_hdr2s', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order')->index();
            $table->integer('order_seq_no');
            $table->string('material', 20);
            $table->decimal('target_qty_ou', 15, 4)->comment('Target Quantity in Order UOM ');
            $table->string('target_uom_ou',   10)->comment('Target UOM in Order UOM ');
            $table->decimal('target_qty_bu', 15, 4)->comment('Target Quantity in Base UOM ');
            $table->string('target_uom_bu',   10)->comment('Target UOM in Base UOM ');
            $table->char('plant', 4);
            $table->char('sloc', 4);
            $table->date('date_delivered');
            $table->decimal('over_delivery_tolerance');
            $table->boolean('unlimited_over_deliver')->nullable()->comment("Yes - Unlimited over delivery; No - Over delivery based on OverDelTol");
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->unique(['order', 'order_seq_no', 'material']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prod_ord_hdr2s');
    }
};
