<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasCreatedBy
{
    public static function bootHasCreatedBy()
    {
        // Set created_by when model is created
        static::creating(function ($model) {
            if (auth()->user()) {
                if (!$model->isDirty('created_by')) {
                    $model->created_by = auth()->id();
                }
            }
        });
    }

    /**
     * Return user relation, whos created record
     */
    public function createdBy(): BelongsTo
    {
        $modelClass = config('auth.providers.users.model', \App\Models\User::class);
        return $this->belongsTo($modelClass, 'created_by');
    }
}
