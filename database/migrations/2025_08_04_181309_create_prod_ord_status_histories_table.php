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
        Schema::create('prod_ord_status_histories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order');
            $table->char('status', 4);
            $table->foreignId('user_id')->constrained('users');
            $table->dateTime('date_time_stamp');
            $table->boolean('is_active');
            $table->char('ins_upd', 1)->comment("I = Status is new (Inserted record into ProdOrd_Status) U = Status is updated (Updated record in ProdOrd_Status)");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prod_ord_status_histories');
    }
};
