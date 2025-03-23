<?php

namespace App\Trait;

trait CreatedUpdatedBy
{
    public static function bootCreatedUpdatedBy(): void
    {
        static::creating(function ($model) {
            if (! $model->isDirty('created_by')) {
                $model->created_by = auth()?->user()?->id;
            }

            if (! $model->isDirty('updated_by')) {
                $model->updated_by = auth()?->user()?->id;
            }
        });

        static::updating(function ($model) {
            if (! $model->isDirty('updated_by')) {
                $model->updated_by = auth()?->user()?->id;
            }
        });
    }
}
