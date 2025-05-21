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
        Schema::table('pr_headers', function (Blueprint $table) {
            $table->foreignId('prctrl_grp_id')->nullable()->constrained('prctrl_grps');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pr_headers', function (Blueprint $table) {
            $table->dropColumn('prctrl_grp_id');
        });
    }
};
