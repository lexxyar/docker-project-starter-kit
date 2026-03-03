<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

trait HasDeletedBy
{
    public static function bootHasDeletedBy()
    {
        // Set deleted_by when model is deleting
        static::deleting(function ($model) {
            // It makes sense only if model use SoftDeletes trait
            if (in_array(SoftDeletes::class, class_uses($model))) {
                if (auth()->user()) {
                    if (!$model->isDirty('deleted_by')) {
                        $model->created_by = auth()->id();
                    }
                }
            }
        });
    }

    public function deletedBy(): BelongsTo
    {
        $modelClass = config('auth.providers.users.model', \App\Models\User::class);
        return $this->belongsTo($modelClass, 'deleted_by');
    }
}
