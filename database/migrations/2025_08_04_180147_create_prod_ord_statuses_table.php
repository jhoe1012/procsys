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
        Schema::create('prod_ord_statuses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order');
            $table->char('status', 4);
            $table->boolean('is_active')->default(false);
            $table->unique(['order', 'status']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prod_ord_statuses');
    }
};
