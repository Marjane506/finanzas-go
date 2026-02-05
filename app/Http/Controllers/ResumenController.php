<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movimiento;
use App\Models\Categoria;
use Carbon\Carbon;
use DateTime;

class ResumenController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $mes = (int) $request->query('mes', now()->month);
        $anio = (int) $request->query('anio', now()->year);


        $inicio = Carbon::create($anio, $mes, 1)->startOfDay();
        $fin = Carbon::create($anio, $mes, 1)->endOfMonth()->endOfDay();

        $movimientos = Movimiento::where('user_id', $user->id)
            ->whereYear('fecha', $anio)
            ->whereMonth('fecha', $mes)

            ->get();

        $totalIngresos = round($movimientos->where('tipo', 'ingreso')->sum('cantidad'), 2);
        $totalGastos = round($movimientos->where('tipo', 'gasto')->sum('cantidad'), 2);
        $balance = round($totalIngresos - $totalGastos, 2);

        $categorias = Categoria::where('user_id', $user->id)
            ->with(['subcategorias.movimientos' => function ($q) use ($inicio, $fin) {
                $q->where('tipo', 'gasto')
                    ->whereBetween('fecha', [$inicio, $fin]);
            }])
            ->get();

        $gastosPorCategoria = $categorias
            ->map(function ($categoria) {
                $total = round($categoria->subcategorias->flatMap->movimientos->sum('cantidad'), 2);
                return [
                    'categoria' => $categoria->name,
                    'total' => $total,
                ];
            })
            ->filter(fn($c) => $c['total'] > 0)
            ->values();

        $gastosAgrupados = $movimientos
            ->where('tipo', 'gasto')
            ->groupBy(fn($m) => Carbon::parse($m->fecha)->format('d'))
            ->map(fn($items) => round($items->sum('cantidad'), 2));

        $totalDias = $inicio->daysInMonth;

        $gastosPorDia = [];
        for ($d = 1; $d <= $totalDias; $d++) {
            $dia = str_pad($d, 2, '0', STR_PAD_LEFT);
            $gastosPorDia[$dia] = $gastosAgrupados[$dia] ?? 0;
        }

        $gastosPorMes = collect($gastosPorDia)->map(function ($valor, $dia) {
            return [
                'label' => $dia,
                'valor' => round((float) $valor, 2)
            ];
        })->values();

        $gastosPorSemana = Movimiento::where('user_id', $user->id)
            ->where('tipo', 'gasto')
            ->whereBetween('fecha', [$inicio, $fin])
            ->get()
            ->groupBy(function ($mov) {
                return floor((Carbon::parse($mov->fecha)->day - 1) / 7) + 1;
            })
            ->map(function ($items, $semana) {
                return [
                    'label' => "Semana $semana",
                    'valor' => round($items->sum('cantidad'), 2),
                ];
            })
            ->values();

        $gastosPorAnioRaw = Movimiento::where('user_id', $user->id)
            ->whereYear('fecha', $anio)
            ->where('tipo', 'gasto')
            ->selectRaw('MONTH(fecha) as mes, SUM(cantidad) as total')
            ->groupBy('mes')
            ->pluck('total', 'mes');

        $gastosPorAnio = collect(range(1, 12))->map(fn($mes) => [
            'label' => DateTime::createFromFormat('!m', $mes)->format('M'),
            'valor' => round((float) ($gastosPorAnioRaw[$mes] ?? 0), 2),
        ]);

        $consejos = $this->generarConsejosIA($totalIngresos, $totalGastos, $gastosPorCategoria);

        return inertia('Resumen', [
            'mes' => $mes,
            'anio' => $anio,
            'totalIngresos' => $totalIngresos,
            'totalGastos' => $totalGastos,
            'balance' => $balance,
            'gastosPorCategoria' => $gastosPorCategoria,
            'gastosPorDia' => $gastosPorDia,
            'gastosPorSemana' => $gastosPorSemana,
            'gastosPorMes' => $gastosPorMes,
            'gastosPorAnio' => $gastosPorAnio,
            'consejos' => $consejos,
        ]);
    }

    private function generarConsejosIA($totalIngresos, $totalGastos, $gastosPorCategoria)
    {
        $consejos = [];

        if ($totalGastos > $totalIngresos) {
            $diff = round($totalGastos - $totalIngresos, 2);
            $consejos[] = "Este mes has gastado más de lo que ingresaste. Estás en negativo por " . number_format($diff, 2) . " €.";
        }

        foreach ($gastosPorCategoria as $cat) {
            $porcentaje = $cat['total'] / max($totalIngresos, 1);
            $p = round($porcentaje * 100);

            if ($porcentaje > 0.30) {
                $consejos[] = "Has destinado un {$p}% de tus ingresos a {$cat['categoria']}.";
            }

            if ($porcentaje > 0.50) {
                $consejos[] = "Tu gasto en {$cat['categoria']} domina tu presupuesto.";
            }
        }

        if ($totalGastos > $totalIngresos * 0.75) {
            $consejos[] = "Has utilizado más del 75% de tus ingresos.";
        }

        if ($totalGastos < $totalIngresos * 0.40) {
            $consejos[] = "Estás gastando menos del 40% de tus ingresos. ¡Genial!";
        }

        if (empty($consejos)) {
            $consejos[] = "Tu presupuesto está equilibrado este mes.";
        }

        $key = array_rand($consejos);

        return [$consejos[$key]];
    }
}
