<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profession extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_prof'; // Definir la clave primaria
    protected $fillable = ['name', 'description', 'salary'];

    public function productOwners()
    {
        return $this->hasMany(ProductOwner::class, 'profession_id', 'id_prof');
    }

    public function teamMembers()
    {
        return $this->hasMany(TeamMember::class, 'profession_id', 'id_prof');
    }
}
