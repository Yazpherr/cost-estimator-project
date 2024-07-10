<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_pro';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_pro',
        'name',
        'description',
        'project_owner_id',
        'total_function_points',
        'complexity_adjustment_values',
        'estimated_effort',
        'estimated_time',
        'associated_costs',
    ];

    public function projectOwner()
    {
        return $this->belongsTo(ProjectOwner::class, 'project_owner_id');
    }

    public function members()
    {
        return $this->hasMany(ProjectMember::class, 'project_id');
    }

    public function requirements()
    {
        return $this->hasMany(Requirement::class, 'project_id');
    }

    // Evento para generar el código único
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $lastProject = Project::orderBy('created_at', 'desc')->first();
            $lastId = $lastProject ? intval(substr($lastProject->id_pro, 4)) : 0;
            $model->id_pro = 'PRO-' . str_pad($lastId + 1, 3, '0', STR_PAD_LEFT);
        });
    }
}
