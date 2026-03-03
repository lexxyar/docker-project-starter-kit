<?php

namespace App\Traits;

use Illuminate\Database\Schema\Blueprint;

/**
 * @method void changersUuid(string $onDelete = 'set null', string $onUpdate = 'cascade')
 * @method void deletedByUuid(string $onDelete = 'set null', string $onUpdate = 'cascade')
 * @method void dropChangersUuid()
 * @method void dropDeletedByUuid()
 */
trait HasChangersBlueprints
{
    private function addChangersBlueprints(): void
    {
        // changersUuid (created_at, updated_at)
        Blueprint::macro('changersUuid', function (string $onDelete = 'set null', string $onUpdate = 'cascade') {

            $modelClass = config('auth.providers.users.model', \App\Models\User::class);

            /** @var \App\Models\User $model */
            $model = app($modelClass);
            $relatedTable = $model->getTable();
            $idFieldName = $model->getKeyName();

            /** @var $this Blueprint */
            $this->uuid('created_by')->nullable();
            $this->foreign('created_by')
                ->references($idFieldName) // user id
                ->on($relatedTable)
                ->onUpdate($onUpdate)
                ->onDelete($onDelete);

            $this->uuid('updated_by')->nullable();
            $this->foreign('updated_by')
                ->references($idFieldName) // user id
                ->on($relatedTable)
                ->onUpdate($onUpdate)
                ->onDelete($onDelete);
        });

        Blueprint::macro('dropChangersUuid', function () {
            /** @var $this Blueprint */
            $this->dropForeign('created_by');
            $this->dropColumn('created_by');

            $this->dropForeign('updated_by');
            $this->dropColumn('updated_by');
        });

        // deleted_by
        Blueprint::macro('deletedByUuid', function (string $onDelete = 'set null', string $onUpdate = 'cascade') {

            $modelClass = config('auth.providers.users.model', \App\Models\User::class);

            /** @var \App\Models\User $model */
            $model = app($modelClass);
            $relatedTable = $model->getTable();
            $idFieldName = $model->getKeyName();

            /** @var $this Blueprint */
            $this->uuid('deleted_by')->nullable();
            $this->foreign('deleted_by')
                ->references($idFieldName) // user id
                ->on($relatedTable)
                ->onUpdate($onUpdate)
                ->onDelete($onDelete);
        });

        Blueprint::macro('dropDeletedByUuid', function () {
            /** @var $this Blueprint */
            $this->dropForeign('deleted_by');
            $this->dropColumn('deleted_by');
        });

        // created_by
        Blueprint::macro('createdByUuid', function (string $onDelete = 'set null', string $onUpdate = 'cascade') {

            $modelClass = config('auth.providers.users.model', \App\Models\User::class);

            /** @var \App\Models\User $model */
            $model = app($modelClass);
            $relatedTable = $model->getTable();
            $idFieldName = $model->getKeyName();

            /** @var $this Blueprint */
            $this->uuid('created_by')->nullable();
            $this->foreign('created_by')
                ->references($idFieldName) // user id
                ->on($relatedTable)
                ->onUpdate($onUpdate)
                ->onDelete($onDelete);
        });

        Blueprint::macro('dropCreatedByUuid', function () {
            /** @var $this Blueprint */
            $this->dropForeign('created_by');
            $this->dropColumn('created_by');
        });

        // updated_by
        Blueprint::macro('updatedByUuid', function (string $onDelete = 'set null', string $onUpdate = 'cascade') {

            $modelClass = config('auth.providers.users.model', \App\Models\User::class);

            /** @var \App\Models\User $model */
            $model = app($modelClass);
            $relatedTable = $model->getTable();
            $idFieldName = $model->getKeyName();

            /** @var $this Blueprint */
            $this->uuid('updated_by')->nullable();
            $this->foreign('updated_by')
                ->references($idFieldName) // user id
                ->on($relatedTable)
                ->onUpdate($onUpdate)
                ->onDelete($onDelete);
        });

        Blueprint::macro('dropUpdatedByUuid', function () {
            /** @var $this Blueprint */
            $this->dropForeign('updated_by');
            $this->dropColumn('updated_by');
        });
    }
}
