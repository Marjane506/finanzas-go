<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categorias';

    protected $fillable = [
        'name',
        'tipo',
        'user_id',
    ];

    public function subcategorias()
    {
        return $this->hasMany(Subcategoria::class);
    }


    public function movimientos()
    {
        return $this->hasManyThrough(
            Movimiento::class,
            Subcategoria::class,
            'categoria_id',
            'subcategoria_id',
            'id',
            'id'
        );
    }
}
