<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subcategorias', function (Blueprint $table) {

            // Añadir columna name si no existe
            if (!Schema::hasColumn('subcategorias', 'name')) {
                $table->string('name');
            }

            // Añadir foreign key categoria_id si no existe
            if (!Schema::hasColumn('subcategorias', 'categoria_id')) {
                $table->foreignId('categoria_id')
                    ->constrained('categorias')
                    ->onDelete('cascade');
            }
        });
    }

    public function down(): void
    {
        Schema::table('subcategorias', function (Blueprint $table) {

            if (Schema::hasColumn('subcategorias', 'categoria_id')) {
                $table->dropForeign(['categoria_id']);
                $table->dropColumn('categoria_id');
            }

            if (Schema::hasColumn('subcategorias', 'name')) {
                $table->dropColumn('name');
            }
        });
    }
};
