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
                    ('Approvers', NEW.id, 'approvers', 'type', change_no, 'I', NULL, NEW.type, 'Type'),
                    ('Approvers', NEW.id, 'approvers', 'plant', change_no, 'I', NULL, NEW.plant, 'Plant'),
                    ('Approvers', NEW.id, 'approvers', 'user_id', change_no, 'I', NULL, (SELECT name FROM users WHERE id = NEW.user_id), 'Approver'),
                    ('Approvers', NEW.id, 'approvers', 'prctrl_grp_id', change_no, 'I', NULL, (SELECT prctrl_desc FROM prctrl_grps WHERE id = NEW.prctrl_grp_id), 'PR Control Group'),
                    ('Approvers', NEW.id, 'approvers', 'position', change_no, 'I', NULL, NEW.position, 'Position'),
                    ('Approvers', NEW.id, 'approvers', 'amount_from', change_no, 'I', NULL, NEW.amount_from::text, 'Amount From'),
                    ('Approvers', NEW.id, 'approvers', 'amount_to', change_no, 'I', NULL, NEW.amount_to::text, 'Amount To'),
                    ('Approvers', NEW.id, 'approvers', 'seq', change_no, 'I', NULL, NEW.seq::text, 'Sequence'),
                    ('Approvers', NEW.id, 'approvers', 'desc', change_no, 'I', NULL, NEW.\"desc\", 'Description'),
                    ('Approvers', NEW.id, 'approvers', 'updated_by', change_no, 'I', NULL, (SELECT name FROM users WHERE id = NEW.updated_by), 'Created By');
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
                            'Changed type from \"' || COALESCE(OLD.type, '') || '\" to \"' || COALESCE(NEW.type, '') || '\"'
                        );
                    END IF;

                    IF OLD.plant IS DISTINCT FROM NEW.plant THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'plant',
                            change_no, 'U', OLD.plant, NEW.plant,
                            'Plant'
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
                            'Approver'
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
                            'PR Control Group'
                        );
                    END IF;

                    IF OLD.position IS DISTINCT FROM NEW.position THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'position',
                            change_no, 'U', OLD.position, NEW.position,
                            'Position'
                        );
                    END IF;

                    IF OLD.amount_from IS DISTINCT FROM NEW.amount_from THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'amount_from',
                            change_no, 'U', OLD.amount_from::text, NEW.amount_from::text,
                            'Amount'
                        );
                    END IF;

                    IF OLD.amount_to IS DISTINCT FROM NEW.amount_to THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'amount_to',
                            change_no, 'U', OLD.amount_to::text, NEW.amount_to::text,
                            'Amount'
                        );
                    END IF;

                    IF OLD.seq IS DISTINCT FROM NEW.seq THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'seq',
                            change_no, 'U', OLD.seq::text, NEW.seq::text,
                            'Seq'
                        );
                    END IF;

                    IF OLD.\"desc\" IS DISTINCT FROM NEW.\"desc\" THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'desc',
                            change_no, 'U', OLD.\"desc\", NEW.\"desc\",
                            'Description'
                        );
                    END IF;

                    IF OLD.updated_by IS DISTINCT FROM NEW.updated_by THEN
                        INSERT INTO chg_details (
                            data_type, data_refno, data_table, data_field,
                            data_chgno, data_chgtyp, data_oldvalue, data_newvalue, short_text
                        ) VALUES (
                            'Approvers', NEW.id, 'approvers', 'updated_by',
                            change_no, 'U',
                            (SELECT name FROM users WHERE id = OLD.updated_by),
                            (SELECT name FROM users WHERE id = NEW.updated_by),
                            'Changed updated_by from \"' || COALESCE((SELECT name FROM users WHERE id = OLD.updated_by), '') ||
                            '\" to \"' || COALESCE((SELECT name FROM users WHERE id = NEW.updated_by), '') || '\"'
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
