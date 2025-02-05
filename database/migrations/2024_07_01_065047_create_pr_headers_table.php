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
        Schema::create('pr_headers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('pr_number')->unique();
            $table->string('created_name');
            $table->date('doc_date');
            $table->string('requested_by')->nullable();
            $table->string('plant');
            $table->text('reason_pr')->nullable();
            $table->text('header_text')->nullable();
            $table->decimal('total_pr_value', 15, 2);
            $table->string('status')->nullable();
            $table->integer('appr_seq')->nullable();
            $table->dateTime('release_date')->nullable();
            $table->string('deliv_addr')->nullable();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pr_headers');
    }
};
