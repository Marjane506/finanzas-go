<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movimiento;
use App\Models\Categoria;
use Carbon\Carbon;

class ResumenController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        // Mes seleccionado o el actual
        $mes = $request->query('mes', now()->month);
        $anio = $request->query('anio', now()->year);

        // Rango del mes
        $inicio = Carbon::create($anio, $mes, 1)->startOfDay();
        $fin = Carbon::create($anio, $mes, 1)->endOfMonth()->endOfDay();

        // Movimientos del mes
        $movimientos = Movimiento::where('user_id', $user->id)
            ->whereBetween('created_at', [$inicio, $fin])
            ->get();

        // Totales
        $totalIngresos = $movimientos->where('tipo', 'ingreso')->sum('cantidad');
        $totalGastos = $movimientos->where('tipo', 'gasto')->sum('cantidad');
        $balance = $totalIngresos - $totalGastos;

        // Gráfico circular → gastos agrupados por categoría
        $gastosPorCategoria = Categoria::where('user_id', $user->id)
            ->withSum(['subcategorias.movimientos as total_gastos' => function ($q) use ($inicio, $fin) {
                $q->where('tipo', 'gasto')
                    ->whereBetween('created_at', [$inicio, $fin]);
            }], 'cantidad')
            ->get()
            ->filter(fn($c) => $c->total_gastos > 0)
            ->map(fn($c) => [
                'categoria' => $c->name,
                'total' => $c->total_gastos,
            ])
            ->values();

        // Gráfico de barras → gastos por día
        $gastosPorDia = $movimientos
            ->where('tipo', 'gasto')
            ->groupBy(fn($m) => $m->created_at->format('d'))
            ->map(fn($items) => $items->sum('cantidad'));

        return inertia('Resumen', [
            'mes' => $mes,
            'anio' => $anio,
            'totalIngresos' => $totalIngresos,
            'totalGastos' => $totalGastos,
            'balance' => $balance,
            'gastosPorCategoria' => $gastosPorCategoria,
            'gastosPorDia' => $gastosPorDia,
        ]);
    }
}
