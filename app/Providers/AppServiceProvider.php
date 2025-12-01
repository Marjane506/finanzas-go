<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => auth()->user(),
                ];
            },

            'presupuestoActual' => function () {
                if (!auth()->check()) {
                    return null;
                }

                return auth()->user()
                    ->historialPresupuestos()
                    ->latest()
                    ->first();
            },
        ]);
    }
}
