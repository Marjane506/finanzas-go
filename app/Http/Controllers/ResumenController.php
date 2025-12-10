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

        // Mes seleccionado o actual
        $mes = $request->query('mes', now()->month);
        $anio = $request->query('anio', now()->year);

        // Rango del mes
        $inicio = Carbon::create($anio, $mes, 1)->startOfDay();
        $fin = Carbon::create($anio, $mes, 1)->endOfMonth()->endOfDay();

        // Movimientos del usuario en el mes
        $movimientos = Movimiento::where('user_id', $user->id)
            ->whereBetween('created_at', [$inicio, $fin])
            ->get();

        // KPI del Mes

        $totalIngresos = $movimientos->where('tipo', 'ingreso')->sum('cantidad');
        $totalGastos = $movimientos->where('tipo', 'gasto')->sum('cantidad');
        $balance = $totalIngresos - $totalGastos;

        //Gastos por Categoría

        $categorias = Categoria::where('user_id', $user->id)
            ->with(['subcategorias.movimientos' => function ($q) use ($inicio, $fin) {
                $q->where('tipo', 'gasto')
                    ->whereBetween('created_at', [$inicio, $fin]);
            }])
            ->get();

        $gastosPorCategoria = $categorias
            ->map(function ($categoria) {
                $total = $categoria->subcategorias
                    ->flatMap->movimientos
                    ->sum('cantidad');

                return [
                    'categoria' => $categoria->name,
                    'total' => $total,
                ];
            })
            ->filter(fn($c) => $c['total'] > 0)
            ->values();


        //Gastos por día (para vista diaria y mensual)

        $gastosAgrupados = $movimientos
            ->where('tipo', 'gasto')
            ->groupBy(fn($m) => $m->created_at->format('d'))
            ->map(fn($items) => $items->sum('cantidad'));

        $totalDias = $inicio->daysInMonth;

        $gastosPorDia = [];
        for ($d = 1; $d <= $totalDias; $d++) {
            $dia = str_pad($d, 2, '0', STR_PAD_LEFT);
            $gastosPorDia[$dia] = $gastosAgrupados[$dia] ?? 0;
        }

        $gastosPorMes = collect($gastosPorDia)->map(function ($valor, $dia) {
            return [
                'label' => $dia,
                'valor' => (float) $valor,
            ];
        })->values();

        // Gastos por Semana

        $gastosPorSemanaRaw = Movimiento::where('user_id', $user->id)
            ->whereBetween('created_at', [$inicio, $fin]) // SOLO el mes actual
            ->where('tipo', 'gasto')
            ->selectRaw('WEEK(created_at, 1) as semana, SUM(cantidad) as total')
            ->groupBy('semana')
            ->pluck('total', 'semana');


        $primerDiaMes = Carbon::create($anio, $mes, 1);
        $ultimaSemana = $primerDiaMes->weeksInMonth; // devuelve 4 o 5 semanas

        $gastosPorSemana = collect(range(1, $ultimaSemana))->map(function ($semana) use ($gastosPorSemanaRaw) {
            return [
                'label' => "Semana $semana",
                'valor' => (float) ($gastosPorSemanaRaw[$semana] ?? 0),
            ];
        });

        // Gastos por Año (12 meses)


        $gastosPorAnioRaw = Movimiento::where('user_id', $user->id)
            ->whereYear('created_at', $anio)
            ->where('tipo', 'gasto')
            ->selectRaw('MONTH(created_at) as mes, SUM(cantidad) as total')
            ->groupBy('mes')
            ->pluck('total', 'mes');

        $gastosPorAnio = collect(range(1, 12))->map(fn($mes) => [
            'label' => DateTime::createFromFormat('!m', $mes)->format('M'),
            'valor' => (float) ($gastosPorAnioRaw[$mes] ?? 0),
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

        // Balance negativo
        if ($totalGastos > $totalIngresos) {
            $diff = $totalGastos - $totalIngresos;
            $consejos[] = "Este mes has gastado más de lo que ingresaste. Estás en negativo por " . number_format($diff, 2) . " €. Quizá puedas revisar gastos variables para volver a equilibrarte.";
        }

        // Categorías con alto porcentaje
        foreach ($gastosPorCategoria as $cat) {
            $porcentaje = $cat['total'] / max($totalIngresos, 1);
            $p = round($porcentaje * 100);

            if ($porcentaje > 0.30) {
                $consejos[] = "Has destinado un {$p}% de tus ingresos a **{$cat['categoria']}**. Reducirlo al 20–25% podría darte un margen de ahorro más cómodo.";
            }

            if ($porcentaje > 0.50) {
                $consejos[] = "Tu gasto en **{$cat['categoria']}** domina tu presupuesto este mes. Quizá puedas establecer un límite semanal o mensual para mantenerlo bajo control.";
            }
        }

        // Alto porcentaje general de gasto
        if ($totalGastos > $totalIngresos * 0.75) {
            $consejos[] = "Has utilizado más del 75% de tus ingresos. Un pequeño ajuste en uno o dos gastos podría ayudarte a cerrar el mes más holgado.";
        }

        // Gastos muy bajos (positivo)
        if ($totalGastos < $totalIngresos * 0.40) {
            $consejos[] = "Estás gastando menos del 40% de tus ingresos. ¡Excelente! Podrías considerar aumentar tu ahorro este mes.";
        }

        // Si no hay alertas
        if (empty($consejos)) {
            $consejos[] = "Tu presupuesto está equilibrado y tus gastos están controlados. ¡Buen trabajo este mes! 🌟";
        }

        // IA Simulada
        $key = array_rand($consejos);

        return [$consejos[$key]];
    }
}
