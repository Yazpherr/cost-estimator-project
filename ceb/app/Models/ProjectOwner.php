<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectOwner extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_po';
    protected $fillable = ['user_id', 'profession_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function profession()
    {
        return $this->belongsTo(Profession::class, 'profession_id');
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'project_owner_id');
    }
}
