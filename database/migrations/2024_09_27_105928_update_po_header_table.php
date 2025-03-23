<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('po_headers', function (Blueprint $table) {
            if (! Schema::hasColumn('po_headers', 'deliv_date')) {
                $table->date('deliv_date')->nullable();
            }
            if (! Schema::hasColumn('po_headers', 'notes')) {
                $table->text('notes')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('po_headers', function (Blueprint $table) {
            if (Schema::hasColumn('po_headers', 'deliv_date')) {
                $table->dropColumn('deliv_date');
            }

            if (Schema::hasColumn('po_headers', 'notes')) {
                $table->dropColumn('notes');
            }
        });
    }
};
