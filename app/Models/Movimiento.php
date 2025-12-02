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
    ];

    public function subcategoria()
    {
        return $this->belongsTo(Subcategoria::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
