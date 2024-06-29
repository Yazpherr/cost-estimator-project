<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role',
    ];

    /**
     * Los atributos que deben estar ocultos para los arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Los atributos que deben ser convertidos a tipos nativos.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Obtener el identificador que se almacenará en el claim de sujeto del JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Devolver una clave de valor, que contiene cualquier claim personalizado que se añadirá al JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Verificar si el usuario tiene el rol de admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Verificar si el usuario tiene el rol de product owner.
     *
     * @return bool
     */
    public function isProductOwner()
    {
        return $this->role === 'project-owner';
    }

    /**
     * Verificar si el usuario tiene el rol de team member.
     *
     * @return bool
     */
    public function isTeamMember()
    {
        return $this->role === 'team-member';
    }
}
