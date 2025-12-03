<?php

namespace App\Models;

use App\Models\HistorialPresupuesto;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function categorias()
    {
        return $this->hasMany(Categoria::class, 'user_id');
    }
    public function historialPresupuestos()
    {
        return $this->hasMany(HistorialPresupuesto::class, 'user_id');
    }

    public function presupuestoActual()
    {
        return $this->hasOne(HistorialPresupuesto::class, 'user_id')->latestOfMany();
    }
    public function movimientos()
    {
        return $this->hasMany(Movimiento::class);
    }

    public function gastosDelMes()
    {
        return $this->movimientos()
            ->where('tipo', 'gasto')
            ->whereMonth('created_at', now()->month)
            ->sum('cantidad');
    }

    public function ingresosDelMes()
    {
        return $this->movimientos()
            ->where('tipo', 'ingreso')
            ->whereMonth('created_at', now()->month)
            ->sum('cantidad');
    }
}
