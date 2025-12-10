<?php

namespace App\Listeners;

use App\Models\Categoria;
use Illuminate\Auth\Events\Registered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CrearCategoriasPorDefecto
{
    public function __construct()
    {
        //
    }

    public function handle(Registered $event): void
    {
        $user = $event->user;

        $defaultCategories = [
            // Gastos
            ['name' => 'Alimentación', 'tipo' => 'gasto'],
            ['name' => 'Transporte', 'tipo' => 'gasto'],
            ['name' => 'Vivienda', 'tipo' => 'gasto'],
            ['name' => 'Salud', 'tipo' => 'gasto'],
            ['name' => 'Educación', 'tipo' => 'gasto'],
            ['name' => 'Ocio', 'tipo' => 'gasto'],

            // Ingresos
            ['name' => 'Salario', 'tipo' => 'ingreso'],
            ['name' => 'Regalos', 'tipo' => 'ingreso'],
            ['name' => 'Intereses', 'tipo' => 'ingreso'],
            ['name' => 'Inversiones', 'tipo' => 'ingreso'],
        ];

        foreach ($defaultCategories as $cat) {
            Categoria::firstOrCreate([
                'user_id' => $user->id,
                'name' => $cat['name'],
                'tipo' => $cat['tipo'],
            ]);
        }
    }
}
