<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'team_member_id',
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
}
