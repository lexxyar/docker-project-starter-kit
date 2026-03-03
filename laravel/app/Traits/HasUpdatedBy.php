<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasUpdatedBy
{
    public static function bootHasUpdatedBy()
    {
        // Set updated_by when model is created
        static::creating(function ($model) {
            if (auth()->user()) {
                if (!$model->isDirty('updated_by')) {
                    $model->updated_by = auth()->id();
                }
            }
        });

        // Updating updated_by when model is updated
        static::updating(function ($model) {
            if (auth()->user()) {
                if (!$model->isDirty('updated_by')) {
                    $model->updated_by = auth()->id();
                }
            }
        });
    }

    /**
     * Return user relation, whos updated record
     */
    public function updatedBy(): BelongsTo
    {
        $modelClass = config('auth.providers.users.model', \App\Models\User::class);
        return $this->belongsTo($modelClass, 'updated_by');
    }
}
