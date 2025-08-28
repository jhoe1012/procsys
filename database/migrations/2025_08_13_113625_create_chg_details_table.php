<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up(): void {
        Schema::create('chg_details', function (Blueprint $table) {
            $table->id();
            $table->string('data_type', 40);
            $table->integer('data_refno');
            $table->string('data_table', 40);
            $table->string('data_field', 40);
            $table->integer('data_chgno');
            $table->char('data_chgtyp', 1);
            $table->string('data_oldvalue', 255)->nullable();
            $table->string('data_newvalue', 255)->nullable();
            $table->string('short_text')->nullable();

            $table->foreign('data_chgno')
                ->references('data_chgno')
                ->on('chg_headers')
                ->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chg_details');
    }
};
