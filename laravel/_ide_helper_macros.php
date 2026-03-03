<?php

namespace Illuminate\Database\Schema {
    /**
     * @mixin \Illuminate\Database\Schema\Blueprint
     */
    class Blueprint
    {
        /**
         * @param string $onDelete
         * @param string $onUpdate
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function changersUuid(string $onDelete = 'set null', string $onUpdate = 'cascade'): void
        {
        }

        /**
         * @param string $onDelete
         * @param string $onUpdate
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function deletedByUuid(string $onDelete = 'set null', string $onUpdate = 'cascade'): void
        {

        }

        /**
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function dropChangersUuid(): void
        {

        }

        /**
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function dropDeletedByUuid(): void
        {

        }

        /**
         * @param string $onDelete
         * @param string $onUpdate
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function createdByUuid(string $onDelete = 'set null', string $onUpdate = 'cascade'): void
        {

        }

        /**
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function dropCreatedByUuid(): void
        {

        }

        /**
         * @param string $onDelete
         * @param string $onUpdate
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function updatedByUuid(string $onDelete = 'set null', string $onUpdate = 'cascade'): void
        {

        }

        /**
         * @return void
         * 
         * @see \App\Traits\HasChangersBlueprints
         */
        public function dropUpdatedByUuid(): void
        {

        }
    }
}
