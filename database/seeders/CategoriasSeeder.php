<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class CategoriasSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first(); // ← Agregado: obtener el primer usuario creado

        DB::table('categorias')->insert([
            [
                'name' => 'Alimentación',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Transporte',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Vivienda',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Salario',
                'user_id' => $user->id,
            ],
            [
                'name' => 'Inversiones',
                'user_id' => $user->id,
            ],
        ]);
    }
}
