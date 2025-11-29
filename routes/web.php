<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\SubcategoriaController;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //BUDGETOVERLAY
    Route::post('/presupuesto-general', [ProfileController::class, 'setBudget'])
        ->middleware(['auth'])
        ->name('user.setBudget');

    //PRESUPUESTO

    Route::get('/presupuesto', function () {
        $user = auth()->user();

        return Inertia::render('Presupuesto', [
            'presupuesto' => $user->budget ? [
                'monto_inicial' => $user->budget,
                'saldo_actual'  => $user->budget // por ahora el mismo valor
            ] : null,
            'auth' => ['user' => $user]
        ]);
    })->middleware(['auth'])->name('presupuesto');



    //CATEGORíAS
    Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');
    Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
    Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');

    // SUBCATEGORÍAS
    Route::post('/subcategorias', [SubcategoriaController::class, 'store'])->name('subcategorias.store');
    Route::put('/subcategorias/{subcategoria}', [SubcategoriaController::class, 'update'])->name('subcategorias.update');
    Route::delete('/subcategorias/{subcategoria}', [SubcategoriaController::class, 'destroy'])->name('subcategorias.destroy');
});

require __DIR__ . '/auth.php';
