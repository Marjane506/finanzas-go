<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use App\Models\Categoria;

class CreateDefaultCategories
{
    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        $user = $event->user;

        // Categorías por defecto
        $defaults = [
            'Alimentación',
            'Transporte',
            'Vivienda',
            'Salario',
            'Inversiones',
        ];

        foreach ($defaults as $name) {
            Categoria::create([
                'name' => $name,
                'user_id' => $user->id,
            ]);
        }
    }
}
