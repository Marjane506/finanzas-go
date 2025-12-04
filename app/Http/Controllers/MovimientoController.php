<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use App\Models\Subcategoria;
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

        $subcategoria = Subcategoria::findOrFail($request->subcategoria_id);

        if ($subcategoria->categoria->user_id !== $user->id) {
            abort(403, 'No puedes usar una subcategoría que no es tuya.');
        }

        $movimiento = Movimiento::create([
            'user_id' => $user->id,
            'subcategoria_id' => $subcategoria->id,
            'tipo' => $request->tipo,
            'cantidad' => $request->cantidad,
        ]);


        $presupuesto = $user->presupuestoActual;

        if ($request->tipo === 'gasto') {
            $presupuesto->saldo_final -= $request->cantidad;
        } else {
            $presupuesto->saldo_final += $request->cantidad;
        }

        $presupuesto->save();

        return redirect()->back(303)->with('success', 'Movimiento registrado!');
    }
    public function destroy(Movimiento $movimiento)
    {
        if ($movimiento->user_id !== auth()->id()) {
            abort(403);
        }

        $movimiento->delete();

        return back(303)->with('success', 'Movimiento eliminado');
    }
    public function update(Request $request, Movimiento $movimiento)
    {
        if ($movimiento->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'tipo' => 'required|in:gasto,ingreso',
            'cantidad' => 'required|numeric|min:0.01',
        ]);

        $movimiento->update($data);

        return back(303)->with('success', 'Movimiento actualizado');
    }
}
