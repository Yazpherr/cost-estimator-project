<?php
// database/seeders/RoleSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Crear roles
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'project-manager']);
        Role::create(['name' => 'team-member']);

        // Crear permisos (ejemplo)
        Permission::create(['name' => 'manage projects']);

        // Asignar permisos a roles (ejemplo)
        $role = Role::findByName('admin');
        $role->givePermissionTo('manage projects');
    }
}
