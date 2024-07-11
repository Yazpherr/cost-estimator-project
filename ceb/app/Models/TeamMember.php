<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_tm';

    protected $fillable = [
        'user_id',
        'profession_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function profession()
    {
        return $this->belongsTo(Profession::class, 'profession_id');
    }

    public function projectMembers()
    {
        return $this->hasMany(ProjectMember::class, 'team_member_id', 'id_tm');
    }

    public function requirements()
    {
        return $this->hasMany(Requirement::class, 'team_member_id', 'id_tm');
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_members', 'team_member_id', 'project_id');
    }
}
