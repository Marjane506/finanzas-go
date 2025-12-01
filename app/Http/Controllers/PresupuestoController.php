<?php

namespace App\Http\Controllers;

use App\Models\HistorialPresupuesto;
use Illuminate\Http\Request;

class PresupuestoController extends Controller
{
    public function reiniciar(Request $request)
    {
        $request->validate([
            'nuevo_monto' => 'required|numeric|min:0',
        ]);

        $user = auth()->user();

        /**
         * 1. Cerrar presupuesto anterior (si existe)
         */
        $presupuestoAnterior = $user->presupuestoActual;

        if ($presupuestoAnterior) {

            // Evitar que quede dos veces abierto
            if (!$presupuestoAnterior->fecha_fin || $presupuestoAnterior->fecha_fin >= now()) {
                $presupuestoAnterior->update([
                    'fecha_fin' => now(),
                ]);
            }
        }

        /**
         * 2. Crear un nuevo presupuesto como actual
         */
        HistorialPresupuesto::create([
            'user_id'       => $user->id,
            'monto_inicial' => $request->nuevo_monto,
            'saldo_final'   => $request->nuevo_monto, // al iniciar es igual
            'periodo'       => 'mensual',
            'fecha_inicio'  => now(),
            'fecha_fin'     => now()->endOfMonth(),
        ]);

        return back()->with('success', 'Presupuesto reiniciado correctamente.');
    }
}
