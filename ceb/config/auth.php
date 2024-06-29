<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Predeterminados de Autenticación
    |--------------------------------------------------------------------------
    |
    | Esta opción controla la guardia de autenticación predeterminada y las
    | opciones de restablecimiento de contraseña para su aplicación. Puede
    | cambiar estos valores predeterminados según sea necesario, pero son
    | un buen comienzo para la mayoría de las aplicaciones.
    |
    */

    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Guardias de Autenticación
    |--------------------------------------------------------------------------
    |
    | A continuación, puede definir cada guardia de autenticación para su
    | aplicación. Por supuesto, una gran configuración predeterminada ha sido
    | definida para usted aquí, que usa almacenamiento de sesión y el
    | proveedor de usuarios Eloquent.
    |
    | Todos los controladores de autenticación tienen un proveedor de usuarios.
    | Esto define cómo se recuperan los usuarios de su base de datos u otros
    | mecanismos de almacenamiento utilizados por esta aplicación para
    | persistir los datos de sus usuarios.
    |
    | Soportado: "session", "token"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'jwt',
            'provider' => 'users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Proveedores de Usuarios
    |--------------------------------------------------------------------------
    |
    | Todos los controladores de autenticación tienen un proveedor de usuarios.
    | Esto define cómo se recuperan los usuarios de su base de datos u otros
    | mecanismos de almacenamiento utilizados por esta aplicación para
    | persistir los datos de sus usuarios.
    |
    | Si tiene varias tablas o modelos de usuarios, puede configurar varias
    | fuentes que representen cada modelo/tabla. Estas fuentes pueden ser
    | asignadas a cualquier guardia de autenticación adicional que haya
    | definido.
    |
    | Soportado: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Restablecimiento de Contraseñas
    |--------------------------------------------------------------------------
    |
    | Puede especificar varias configuraciones de restablecimiento de contraseñas
    | si tiene más de una tabla o modelo de usuarios en la aplicación y desea
    | tener configuraciones de restablecimiento de contraseñas separadas
    | basadas en tipos específicos de usuarios.
    |
    | El tiempo de caducidad es el número de minutos que cada token de
    | restablecimiento será considerado válido. Esta característica de
    | seguridad mantiene los tokens de corta duración para que tengan menos
    | tiempo de ser adivinados. Puede cambiar esto según sea necesario.
    |
    | La configuración de aceleración es el número de segundos que un usuario
    | debe esperar antes de generar más tokens de restablecimiento de contraseña.
    | Esto evita que el usuario genere rápidamente una gran cantidad de tokens
    | de restablecimiento de contraseña.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Tiempo de Espera de Confirmación de Contraseña
    |--------------------------------------------------------------------------
    |
    | Aquí puede definir la cantidad de segundos antes de que una confirmación
    | de contraseña caduque y el usuario se le pida que vuelva a ingresar su
    | contraseña a través de la pantalla de confirmación. Por defecto, el
    | tiempo de espera dura tres horas.
    |
    */

    'password_timeout' => 10800,

];
