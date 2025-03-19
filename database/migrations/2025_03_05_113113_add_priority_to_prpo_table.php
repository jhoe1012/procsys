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
            $table->smallInteger('seq')->default(0)
                ->comment('0: Draft, 1: For Approval, 2: Approved, 3: Rejected/Cancelled');
        });

        Schema::table('po_headers', function (Blueprint $table) {
            $table->smallInteger('seq')->default(0)
                ->comment('0: Draft, 1: For Approval, 2: Approved, 3: Rejected/Cancelled');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pr_headers', function (Blueprint $table) {
            $table->dropColumn('seq');
        });

        Schema::table('po_headers', function (Blueprint $table) {
            $table->dropColumn('seq');
        });
    }
};
