<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        return Inertia::render('Categorias', [

            // 🔥 Categorías de gasto
            'gastos' => Categoria::where('user_id', $userId)
                ->where('tipo', 'gasto')
                ->with('subcategorias')
                ->get(),

            // 🔥 Categorías de ingreso
            'ingresos' => Categoria::where('user_id', $userId)
                ->where('tipo', 'ingreso')
                ->with('subcategorias')
                ->get(),

            // 🔥 Presupuesto
            'presupuestoActual' => auth()->user()->presupuestoActual,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tipo' => 'required|in:gasto,ingreso',
        ]);

        $validated['user_id'] = auth()->id();

        Categoria::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Categoria $categoria)
    {
        if ($categoria->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $categoria->update($validated);

        return redirect()->back();
    }

    public function destroy(Categoria $categoria)
    {
        if ($categoria->user_id !== auth()->id()) {
            abort(403);
        }

        $categoria->delete();

        return redirect()->back();
    }
}
