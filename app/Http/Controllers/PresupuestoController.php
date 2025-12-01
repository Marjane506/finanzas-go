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
            'monto_inicial' => 'required|numeric|min:0',
        ]);

        $user = auth()->user();

        // Crear presupuesto inicial
        HistorialPresupuesto::create([
            'user_id'       => $user->id,
            'monto_inicial' => $request->monto_inicial,
            'saldo_final'   => $request->monto_inicial,
            'periodo'       => 'mensual',
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
            'nuevo_monto' => 'required|numeric|min:0',
        ]);

        $user = auth()->user();


        $presupuestoAnterior = $user->presupuestoActual;

        if ($presupuestoAnterior) {

            if (!$presupuestoAnterior->fecha_fin || $presupuestoAnterior->fecha_fin >= now()) {
                $presupuestoAnterior->update([
                    'fecha_fin' => now(),
                ]);
            }
        }

        // 2. Crear nuevo presupuesto
        HistorialPresupuesto::create([
            'user_id'       => $user->id,
            'monto_inicial' => $request->nuevo_monto,
            'saldo_final'   => $request->nuevo_monto,
            'periodo'       => 'mensual',
            'fecha_inicio'  => now(),
            'fecha_fin'     => now()->endOfMonth(),
        ]);

        return back()->with('success', 'Presupuesto reiniciado correctamente.');
    }
}
