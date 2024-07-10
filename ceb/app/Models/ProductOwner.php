<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOwner extends Model
{
    use HasFactory;

    // Especifica que la clave primaria no es autoincremental
    public $incrementing = false;

    // El nombre de la clave primaria
    protected $primaryKey = 'id_po';

    // Los atributos que se pueden asignar masivamente
    protected $fillable = ['id_po', 'user_id', 'profession_id'];

    /**
     * Relación con el modelo User
     * Un ProductOwner pertenece a un User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relación con el modelo Profession
     * Un ProductOwner pertenece a una Profession
     */
    public function profession()
    {
        return $this->belongsTo(Profession::class, 'profession_id');
    }

    /**
     * Relación con el modelo Project
     * Un ProductOwner tiene muchos Projects
     */
    public function projects()
    {
        return $this->hasMany(Project::class, 'project_owner_id');
    }
}
