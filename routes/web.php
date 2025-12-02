<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\MovimientoController;
use App\Http\Controllers\PresupuestoController;
use App\Http\Controllers\SubcategoriaController;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->name('home');

//Route::get('/test-overlay', function () {
//    return Inertia::render('TestOverlay');
//});

Route::get('/categorias', [CategoriaController::class, 'index'])
    ->middleware(['auth'])
    ->name('categorias');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // PERFIL
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // PRESUPUESTO
    Route::post('/presupuesto_inicial', [PresupuestoController::class, 'storeInicial'])
        ->name('presupuesto.inicial');

    Route::post('/presupuesto', [PresupuestoController::class, 'store'])
        ->name('presupuesto.store');

    Route::post('/presupuesto/reiniciar', [PresupuestoController::class, 'reiniciar'])
        ->name('presupuesto.reiniciar');

    // CATEGORÍAS CRUD
    Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
    Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');

    // SUBCATEGORÍAS
    Route::post('/subcategorias', [SubcategoriaController::class, 'store'])->name('subcategorias.store');
    Route::put('/subcategorias/{subcategoria}', [SubcategoriaController::class, 'update'])->name('subcategorias.update');
    Route::delete('/subcategorias/{subcategoria}', [SubcategoriaController::class, 'destroy'])->name('subcategorias.destroy');
    //MOVIMIENTOS
    Route::post('/movimientos', [MovimientoController::class, 'store'])
        ->middleware('auth')
        ->name('movimientos.store');
});

require __DIR__ . '/auth.php';
