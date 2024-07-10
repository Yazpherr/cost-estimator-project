<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_req',
        'name',
        'component_type',
        'complexity_level',
        'function_points',
        'project_id',
        'team_member_id',
        'project_owner_id',  // Agregado
    ];

    // Relación con Project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Relación con TeamMember
    public function teamMember()
    {
        return $this->belongsTo(TeamMember::class, 'team_member_id');
    }

    // Relación con ProjectOwner
    public function projectOwner()
    {
        return $this->belongsTo(ProjectOwner::class, 'project_owner_id');
    }

    // Evento para generar el código único
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $lastRequirement = Requirement::orderBy('created_at', 'desc')->first();
            $lastId = $lastRequirement ? intval(substr($lastRequirement->id_req, 4)) : 0;
            $model->id_req = 'REQ-' . str_pad($lastId + 1, 3, '0', STR_PAD_LEFT);
        });
    }
}
