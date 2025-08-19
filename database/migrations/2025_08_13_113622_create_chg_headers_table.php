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
        Schema::create('chg_headers', function (Blueprint $table) {
            $table->bigIncrements('data_chgno');
            $table->string('data_type', 40);
            $table->integer('data_refno');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamp('timestamp')->useCurrent();
            $table->char('data_chgtyp', 1); // I=Insert, U=Update, D=Delete
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chg_headers');
    }
};
