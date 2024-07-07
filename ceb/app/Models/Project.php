<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_code',
        'name',
        'description',
        'project_owner_id',
        'total_function_points',
        'complexity_adjustment_values',
        'estimated_effort',
        'estimated_time',
        'associated_costs',
    ];

    // Relación con ProjectOwner
    public function projectOwner()
    {
        return $this->belongsTo(ProjectOwner::class, 'project_owner_id');
    }

    // Relación con ProjectMembers
    public function members()
    {
        return $this->hasMany(ProjectMember::class, 'project_id');
    }

    // Relación con Requirements
    public function requirements()
    {
        return $this->hasMany(Requirement::class, 'project_id');
    }
}
