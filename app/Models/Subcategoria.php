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

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function movimientos()
    {
        return $this->hasMany(Movimiento::class);
    }

    public function totalGastado()
    {
        return $this->movimientos()
            ->where('tipo', 'gasto')
            ->sum('cantidad');
    }

    public function totalIngresos()
    {
        return $this->movimientos()
            ->where('tipo', 'ingreso')
            ->sum('cantidad');
    }
}
