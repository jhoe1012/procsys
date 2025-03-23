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
        Schema::create('po_headers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('po_number')->unique();
            $table->string('control_no')->nullable();
            $table->string('vendor_id');
            $table->string('created_name');
            $table->date('doc_date');
            $table->string('plant');
            $table->text('header_text')->nullable();
            $table->text('approver_text')->nullable();
            $table->decimal('total_po_value', 15, 2);
            $table->string('status')->nullable();
            $table->dateTime('release_date')->nullable();
            $table->integer('appr_seq')->nullable();
            $table->string('deliv_addr')->nullable();
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
        Schema::dropIfExists('po_headers');
    }
};
