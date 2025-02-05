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
        Schema::create('pr_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pr_headers_id')->nullable()->constrained('pr_headers')->onDelete('cascade');
            $table->string('status', 10)->nullable();
            $table->integer('item_no');
            $table->string('mat_code', 20);
            $table->string('short_text');
            $table->decimal('qty');
            $table->string('ord_unit', 10);
            $table->decimal('qty_ordered')->nullable();
            $table->decimal('qty_open')->nullable();
            $table->decimal('price', 15, 2);
            $table->decimal('per_unit');
            $table->string('unit', 10);
            $table->decimal('total_value', 15, 2);
            $table->string('currency');
            $table->date('del_date');
            $table->string('mat_grp')->nullable();
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
        Schema::dropIfExists('pr_materials');
    }
};
