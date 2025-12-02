<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;


class CreateDefaultCategories
{
    public function handle(Registered $event): void {}
}
