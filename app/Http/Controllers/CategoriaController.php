<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    /**
     * Mostrar todas las categorías del usuario.
     */
    public function index()
    {
        // dd(auth()->user());
        $user = auth()->user();

        return Inertia::render('Categorias', [
            'categorias' => Categoria::with('subcategorias')
                ->where('user_id', auth()->id())
                ->get(),

            'presupuesto' => $user->budget,
        ]);
    }

    /**
     * Guardar una nueva categoría.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $validated['user_id'] = auth()->id();

        Categoria::create($validated);

        return redirect()->back()->with('success', 'Categoría creada');
    }

    /**
     * Actualizar categoría.
     */
    public function update(Request $request, Categoria $categoria)
    {
        if ($categoria->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $categoria->update($validated);

        return redirect()->back()->with('success', 'Categoría actualizada');
    }

    /**
     * Eliminar una categoría.
     */
    public function destroy(Categoria $categoria)
    {

        if ($categoria->user_id !== auth()->id()) {
            abort(403);
        }

        $categoria->delete();

        return redirect()->back()->with('success', 'Categoría eliminada');
    }
}
