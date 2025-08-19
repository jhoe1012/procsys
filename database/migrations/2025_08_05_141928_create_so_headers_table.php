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
        Schema::create('so_headers', function (Blueprint $table) {
            $table->id();
            $table->string('okey', 30)->index()->unique();
            $table->string('stor', 10);
            $table->string('customer', 10)->nullable();
            $table->date('order_date');
            $table->date('delivery_date');
            $table->string('order_type', 3);
            $table->string('order_number', 50);
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->timestamps();
            $table->string('remarks')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('so_headers');
    }
};
