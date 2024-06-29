import React from 'react';

const Data = () => {
  return (
    <div className="bg-white text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center sm:text-left">Maximiza tu Eficiencia con Nuestra Herramienta</h2>
        <p className="mb-4 text-center sm:text-left">
          Nuestra plataforma está diseñada para ayudarte a gestionar proyectos de manera eficiente, mejorando la productividad y optimizando recursos.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
          <div className="w-full sm:w-1/2">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-600 rounded-full">
                <span className="text-xl text-white">🚀</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Incrementa la Productividad</h3>
                <p>Reduce el tiempo dedicado a tareas administrativas y aumenta el tiempo disponible para trabajo estratégico.</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-600 rounded-full">
                <span className="text-xl text-white">🤝</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Mejora la Colaboración</h3>
                <p>Facilita la comunicación y el seguimiento de tareas entre los miembros del equipo.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-full">
                <span className="text-xl text-white">📊</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Decisiones Basadas en Datos</h3>
                <p>Accede a análisis y estadísticas en tiempo real para tomar decisiones informadas.</p>
              </div>
            </div>
          </div>
          
          <div className="w-full sm:w-1/2 mt-8 sm:mt-0">
            <div className="mb-4">
              <div className="p-2 bg-gray-200 rounded-lg flex items-center">
                <span className="text-2xl">👍</span>
                <h3 className="ml-4 text-xl font-bold">Empieza Ahora</h3>
              </div>
              <p className="ml-8 mt-2">Regístrate hoy y lleva la gestión de tus proyectos al siguiente nivel.</p>
            </div>
            <div>
              <div className="p-2 bg-gray-200 rounded-lg flex items-center">
                <span className="text-2xl">🔍</span>
                <h3 className="ml-4 text-xl font-bold">Prueba Gratuita</h3>
              </div>
              <p className="ml-8 mt-2">Prueba nuestra herramienta gratis por 30 días y descubre todas sus ventajas.</p>
              <img src="path-to-image" alt="Prueba gratuita" className="mt-4 rounded-lg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
