<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear primer administrador con contraseña personalizada
        User::create([
            'name' => 'Admin One',
            'email' => 'admin1@example.com',
            'password' => Hash::make('1234567890'), // Contraseña personalizada
            'role' => 'admin',
        ]);

        // Crear segundo administrador con contraseña personalizada
        User::create([
            'name' => 'Admin Two',
            'email' => 'admin2@example.com',
            'password' => Hash::make('0987654321'), // Contraseña personalizada
            'role' => 'admin',
        ]);
    }
}
