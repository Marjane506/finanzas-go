<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialPresupuesto extends Model
{
    use HasFactory;

    protected $table = 'historial_presupuestos';

    protected $fillable = [
        'user_id',
        'monto_inicial',
        'saldo_final',
        'periodo',
        'fecha_inicio',
        'fecha_fin',
    ];

    protected $casts = [
        'monto_inicial' => 'decimal:2',
        'saldo_final' => 'decimal:2',
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Ejemplos de scopes útiles
    public function scopeDelAno($query)
    {
        return $query->whereYear('fecha_inicio', now()->year);
    }

    public function scopeActual($query)
    {
        return $query->latest('fecha_inicio');
    }
}
