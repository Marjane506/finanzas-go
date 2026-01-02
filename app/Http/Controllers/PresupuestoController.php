<?php

namespace App\Http\Controllers;

use App\Models\HistorialPresupuesto;
use Illuminate\Http\Request;

class PresupuestoController extends Controller
{
    /**
     * Guardar el presupuesto inicial (desde el Overlay)
     */
    public function storeInicial(Request $request)
    {
        $request->validate([
            'monto_inicial' => 'required|numeric|min:1',
        ]);

        $user = auth()->user();

        HistorialPresupuesto::create([
            'user_id'       => $user->id,
            'monto_inicial' => $request->monto_inicial,
            'saldo_final'   => $request->monto_inicial,
            'periodo'       => now()->format('Y-m'),
            'fecha_inicio'  => now(),
            'fecha_fin'     => now()->endOfMonth(),
        ]);

        return redirect('/categorias')->with('success', 'Presupuesto inicial guardado.');
    }

    /**
     * Reiniciar presupuesto → cierra el anterior y crea uno nuevo
     */
    public function reiniciar(Request $request)
    {
        $request->validate([
            'nuevo_monto' => 'required|numeric|min:1',
        ]);

        $user = auth()->user();


        $presupuestoAnterior = $user->presupuestoActual;

        if ($presupuestoAnterior) {
            $presupuestoAnterior->update([
                'fecha_fin' => now(),
            ]);
        }

        HistorialPresupuesto::create([
            'user_id'       => $user->id,
            'monto_inicial' => $request->nuevo_monto,
            'saldo_final'   => $request->nuevo_monto,
            'periodo'       => now()->locale('es')->translatedFormat('F Y'),
            'fecha_inicio'  => now(),
            'fecha_fin'     => now()->endOfMonth(),
        ]);

        return back()->with('success', 'Presupuesto reiniciado correctamente.');
    }
}
