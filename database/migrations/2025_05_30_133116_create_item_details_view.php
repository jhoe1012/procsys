<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            CREATE  VIEW  view_item_details AS
            SELECT
                pr_materials.id,
                pr_headers.pr_number,
                pr_materials.mat_code,
                po_headers.po_number AS doc,
                CASE
                    WHEN po_materials.status = 'X' THEN po_materials.po_qty * -1
                    ELSE po_materials.po_qty
                END AS qty,
                po_materials.unit AS unit,
                'Ordered' AS sts,
                po_materials.item_no AS itm
            FROM
                pr_headers
            INNER JOIN pr_materials ON
                pr_materials.pr_headers_id = pr_headers.id
            INNER JOIN po_materials ON
                po_materials.pr_material_id = pr_materials.id
            INNER JOIN po_headers ON
                po_headers.id = po_materials.po_header_id
            UNION
            SELECT
                pr_materials.id,
                pr_headers.pr_number,
                pr_materials.mat_code,
                gr_headers.gr_number AS doc,
                CASE
                    WHEN gr_materials.is_cancel = TRUE THEN gr_materials.gr_qty * -1
                    ELSE gr_materials.gr_qty
                END AS qty,
                gr_materials.unit AS unit,
                'Received' AS sts,
                gr_materials.item_no AS itm
            FROM
                pr_headers
            INNER JOIN pr_materials ON
                pr_materials.pr_headers_id = pr_headers.id
            INNER JOIN po_materials ON
                po_materials.pr_material_id = pr_materials.id
            INNER JOIN po_headers ON
                po_headers.id = po_materials.po_header_id
            LEFT JOIN gr_materials ON
                gr_materials.po_material_id = po_materials.id
            LEFT JOIN gr_headers ON
                gr_headers.id = gr_materials.gr_header_id
            ORDER BY
                doc,
                mat_code ,
                itm");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        DB::statement('DROP VIEW IF EXISTS view_item_details');
    }
};
