<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    protected $fillable = [
        'user_id',
        'subcategoria_id',
        'tipo',
        'cantidad',
        'fecha',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
        'fecha' => 'date',
    ];

    public function subcategoria()
    {
        return $this->belongsTo(Subcategoria::class);
    }

    public function categoria()
    {
        return $this->hasOneThrough(
            Categoria::class,
            Subcategoria::class,
            'id',
            'id',
            'subcategoria_id',
            'categoria_id'
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
