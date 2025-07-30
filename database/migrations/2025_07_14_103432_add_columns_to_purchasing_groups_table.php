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
        Schema::table('purchasing_groups', function (Blueprint $table) {
            $table->char('item_cat', 1)->nullable()->comment('L = Stock Item | N = Non-stock Item');
            $table->string('sloc_ep', 4)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchasing_groups', function (Blueprint $table) {
            $table->dropColumn('item_cat');
            $table->dropColumn('sloc_ep');
        });
    }
};
