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
}
