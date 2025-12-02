<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse

    {

        //dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 🔥 Crear categorías por defecto (sin listener)
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
            \App\Models\Categoria::create([
                'user_id' => $user->id,
                'name' => $cat['name'],
                'tipo' => $cat['tipo'],
            ]);
        }

        Auth::login($user);

        return redirect(route('categorias', absolute: false));
    }
}
