<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use Illuminate\Http\Request;

class MovimientoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'subcategoria_id' => 'required|exists:subcategorias,id',
            'tipo' => 'required|in:gasto,ingreso',
            'cantidad' => 'required|numeric|min:0.01',
        ]);

        $user = auth()->user();

        Movimiento::create([
            'user_id' => $user->id,
            'subcategoria_id' => $request->subcategoria_id,
            'tipo' => 'gasto',
            'cantidad' => $request->cantidad,
        ]);

        $presupuesto = $user->presupuestoActual;

        if ($request->tipo === 'gasto') {
            $presupuesto->saldo_final -= $request->cantidad;
        } else {
            $presupuesto->saldo_final += $request->cantidad;
        }

        $presupuesto->save();

        return back()->with('success', 'Movimiento registrado!');
    }
}
