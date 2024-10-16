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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('supplier')->unique();
            $table->string('account_group');
            $table->string('tax_number')->nullable();
            $table->string('tax_number_2')->nullable();
            $table->string('name_1');
            $table->string('name_2')->nullable();
            $table->string('name_3')->nullable();
            $table->string('name_4')->nullable();
            $table->string('search_term')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('district')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('street')->nullable();
            $table->string('address')->nullable();
            $table->string('city_2')->nullable();
            $table->string('telephone_1')->nullable();
            $table->string('telephone_2')->nullable();
            $table->string('vat_reg_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
