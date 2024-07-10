<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_code',
        'team_member_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_code', 'project_code');
    }

    public function teamMember()
    {
        return $this->belongsTo(TeamMember::class, 'team_member_id', 'id_tm');
    }
}
