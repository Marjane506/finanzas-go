<?php

namespace App\Http\Controllers;

use App\Models\Subcategoria;
use App\Models\Categoria;
use Illuminate\Http\Request;

class SubcategoriaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'name'         => 'required|string|max:255',
            'icon'         => 'nullable|string',
        ]);

        // Verificar que la categoría pertenece al usuario
        $categoria = Categoria::findOrFail($validated['categoria_id']);

        if ($categoria->user_id !== auth()->id()) {
            abort(403);
        }

        $validated['user_id'] = auth()->id();

        Subcategoria::create($validated);

        return redirect()->back()->with('success', 'Subcategoría creada.');
    }

    public function update(Request $request, Subcategoria $subcategoria)
    {
        if ($subcategoria->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
        ]);

        $subcategoria->update($validated);

        return redirect()->back()->with('success', 'Subcategoría actualizada.');
    }

    public function destroy(Subcategoria $subcategoria)
    {
        if ($subcategoria->user_id !== auth()->id()) {
            abort(403);
        }

        $subcategoria->delete();

        return redirect()->back()->with('success', 'Subcategoría eliminada.');
    }
}
