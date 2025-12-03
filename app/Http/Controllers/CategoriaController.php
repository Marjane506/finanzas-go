<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Subcategoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();

        $subId = $request->query('sub');
        $subSeleccionada = null;

        if ($subId) {
            $subSeleccionada = Subcategoria::with('movimientos')
                ->withSum(['movimientos as total_gastado' => function ($q) {
                    $q->where('tipo', 'gasto');
                }], 'cantidad')
                ->withSum(['movimientos as total_ingresos' => function ($q) {
                    $q->where('tipo', 'ingreso');
                }], 'cantidad')
                ->find($subId);
        }

        return Inertia::render('Categorias', [
            'gastos' => Categoria::where('user_id', $userId)
                ->where('tipo', 'gasto')
                ->with('subcategorias')
                ->get(),

            'ingresos' => Categoria::where('user_id', $userId)
                ->where('tipo', 'ingreso')
                ->with('subcategorias')
                ->get(),

            'presupuestoActual' => auth()->user()->presupuestoActual,

            'sub' => $subSeleccionada,
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
