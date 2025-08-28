<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared("
            CREATE OR REPLACE FUNCTION public.log_approvers_changes()
            RETURNS trigger
            LANGUAGE plpgsql
            AS $$
            DECLARE
                change_no BIGINT;
            BEGIN

            -- INSERT ACTION
            IF TG_OP = 'INSERT' THEN
                INSERT INTO chg_headers (
                    data_type,
                    data_refno,
                    user_id,
                    \"timestamp\",
                    data_chgtyp
                )
                VALUES (
                    'Approvers',
                    NEW.id,
                    NEW.updated_by,
                    CURRENT_TIMESTAMP,
                    'I'
                )
                RETURNING data_chgno INTO change_no;

                INSERT INTO chg_details (
                    data_type, data_refno, data_table, data_field,
                    data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                ) VALUES
                    ('Approvers', NEW.id, 'approvers', 'type', change_no, 'I', NULL, NEW.type,
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'type')),
                    ('Approvers', NEW.id, 'approvers', 'plant', change_no, 'I', NULL, NEW.plant,
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'plant')),
                    ('Approvers', NEW.id, 'approvers', 'user_id', change_no, 'I', NULL, (SELECT name FROM users WHERE id = NEW.user_id),
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'user_id')),
                    ('Approvers', NEW.id, 'approvers', 'prctrl_grp_id', change_no, 'I', NULL, (SELECT prctrl_desc FROM prctrl_grps WHERE id = NEW.prctrl_grp_id),
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'prctrl_grp_id')),
                    ('Approvers', NEW.id, 'approvers', 'position', change_no, 'I', NULL, NEW.position,
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'position')),
                    ('Approvers', NEW.id, 'approvers', 'amount_from', change_no, 'I', NULL, NEW.amount_from::text,
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'amount_from')),
                    ('Approvers', NEW.id, 'approvers', 'amount_to', change_no, 'I', NULL, NEW.amount_to::text,
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'amount_to')),
                    ('Approvers', NEW.id, 'approvers', 'seq', change_no, 'I', NULL, NEW.seq::text,
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'seq')),
                    ('Approvers', NEW.id, 'approvers', 'desc', change_no, 'I', NULL, NEW.\"desc\",
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'desc')),
                    ('Approvers', NEW.id, 'approvers', 'updated_by', change_no, 'I', NULL, (SELECT name FROM users WHERE id = NEW.updated_by),
                        (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'updated_by'));
                RETURN NEW;
            END IF;

            -- UPDATE ACTION
            IF TG_OP = 'UPDATE' THEN
                IF (
                    (OLD.type IS DISTINCT FROM NEW.type) OR
                    (OLD.plant IS DISTINCT FROM NEW.plant) OR
                    (OLD.user_id IS DISTINCT FROM NEW.user_id) OR
                    (OLD.prctrl_grp_id IS DISTINCT FROM NEW.prctrl_grp_id) OR
                    (OLD.position IS DISTINCT FROM NEW.position) OR
                    (OLD.amount_from IS DISTINCT FROM NEW.amount_from) OR
                    (OLD.amount_to IS DISTINCT FROM NEW.amount_to) OR
                    (OLD.seq IS DISTINCT FROM NEW.seq) OR
                    (OLD.\"desc\" IS DISTINCT FROM NEW.\"desc\") OR
                    (OLD.updated_by IS DISTINCT FROM NEW.updated_by)
                ) THEN

                    INSERT INTO chg_headers (
                        data_type,
                        data_refno,
                        user_id,
                        \"timestamp\",
                        data_chgtyp
                    )
                    VALUES (
                        'Approvers',
                        NEW.id,
                        COALESCE(NEW.updated_by, OLD.updated_by),
                        CURRENT_TIMESTAMP,
                        'U'
                    )
                    RETURNING data_chgno INTO change_no;

                    IF OLD.type IS DISTINCT FROM NEW.type THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'type',
                            change_no, 'U', OLD.type, NEW.type,
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'type')
                        );
                    END IF;

                    IF OLD.plant IS DISTINCT FROM NEW.plant THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'plant',
                            change_no, 'U', OLD.plant, NEW.plant,
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'plant')
                        );
                    END IF;

                    IF OLD.user_id IS DISTINCT FROM NEW.user_id THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'user_id',
                            change_no, 'U',
                            (SELECT name FROM users WHERE id = OLD.user_id),
                            (SELECT name FROM users WHERE id = NEW.user_id),
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'user_id')
                        );
                    END IF;

                    IF OLD.prctrl_grp_id IS DISTINCT FROM NEW.prctrl_grp_id THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'prctrl_grp_id',
                            change_no, 'U',
                            (SELECT prctrl_desc FROM prctrl_grps WHERE id = OLD.prctrl_grp_id),
                            (SELECT prctrl_desc FROM prctrl_grps WHERE id = NEW.prctrl_grp_id),
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'prctrl_grp_id')
                        );
                    END IF;

                    IF OLD.position IS DISTINCT FROM NEW.position THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'position',
                            change_no, 'U', OLD.position, NEW.position,
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'position')
                        );
                    END IF;

                    IF OLD.amount_from IS DISTINCT FROM NEW.amount_from THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'amount_from',
                            change_no, 'U', OLD.amount_from::text, NEW.amount_from::text,
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'amount_from')
                        );
                    END IF;

                    IF OLD.amount_to IS DISTINCT FROM NEW.amount_to THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'amount_to',
                            change_no, 'U', OLD.amount_to::text, NEW.amount_to::text,
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'amount_to')
                        );
                    END IF;

                    IF OLD.seq IS DISTINCT FROM NEW.seq THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'seq',
                            change_no, 'U', OLD.seq::text, NEW.seq::text,
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'seq')
                        );
                    END IF;

                    IF OLD.\"desc\" IS DISTINCT FROM NEW.\"desc\" THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'desc',
                            change_no, 'U', OLD.\"desc\", NEW.\"desc\",
                            (SELECT col_description('approvers'::regclass, attnum) FROM pg_attribute WHERE attrelid = 'approvers'::regclass AND attname = 'desc')
                        );
                    END IF;

                END IF;

                RETURN NEW;
            END IF;

            RETURN NEW;
            END;
            $$;

            DROP TRIGGER IF EXISTS trg_log_approvers_changes ON approvers;

            CREATE TRIGGER trg_log_approvers_changes
            AFTER INSERT OR UPDATE ON approvers
            FOR EACH ROW
            EXECUTE FUNCTION public.log_approvers_changes();
        ");
    }

    public function down(): void
    {
        DB::unprepared("
            DROP TRIGGER IF EXISTS trg_log_approvers_changes ON approvers;
            DROP FUNCTION IF EXISTS public.log_approvers_changes();
        ");
    }
};
