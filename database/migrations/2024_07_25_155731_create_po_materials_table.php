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
        Schema::create('po_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('po_header_id')->constrained('po_headers')->onDelete('cascade');
            $table->foreignId('pr_material_id')->constrained('pr_materials');
            $table->string('status', 10)->nullable();
            $table->integer('item_no');
            $table->string('mat_code', 20);
            $table->string('short_text');
            $table->decimal('po_qty', 15, 2);
            $table->decimal('po_gr_qty', 15, 2);
            $table->decimal('net_price', 15, 2);
            $table->decimal('per_unit');
            $table->string('unit', 10);
            $table->decimal('total_value', 15, 2);
            $table->boolean('item_free')->default(false);
            $table->string('currency');
            $table->date('del_date');
            $table->string('mat_grp');
            $table->string('requested_by');
            $table->bigInteger('pr_number');
            $table->integer('pr_item');
            $table->text('item_text')->nullable();
            $table->decimal('conversion', 15, 2);
            $table->decimal('denominator', 15, 2);
            $table->decimal('converted_qty', 15, 2);
            $table->string('pr_unit', 10);
            $table->string('purch_grp')->nullable();
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
        Schema::dropIfExists('po_materials');
    }
};
