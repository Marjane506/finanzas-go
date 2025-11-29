<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategoria extends Model
{
    use HasFactory;

    protected $table = 'subcategorias';

    protected $fillable = [
        'name',
        'icon',
        'categoria_id',

    ];

    /**
     * Relación: la subcategoría pertenece a una categoría
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * Relación: la subcategoría pertenece a un usuario
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
