import React from 'react';
import CalendarIcon from '../../components/icons/CalendarIcon';  // Asegúrate de que la ruta sea correcta
import BargraphIcon from '../../components/icons/BargraphIcon';  // Asegúrate de que la ruta sea correcta
import FastTimerIcon from '../../components/icons/FastTimerIcon';  // Asegúrate de que la ruta sea correcta
import MoneyIcon from '../../components/icons/MoneyIcon';  // Asegúrate de que la ruta sea correcta
import FollowUpIcon from '../../components/icons/FollowUpIcon';  // Asegúrate de que la ruta sea correcta
import TaskIcon from '../../components/icons/TaskIcon';  // Asegúrate de que la ruta sea correcta

const features = [
  {
    title: 'Planificación Eficiente',
    description: 'Organiza y prioriza tus tareas de manera eficiente para asegurar la entrega puntual de tus proyectos.',
    icon: <CalendarIcon width={40} height={40} color="#000000" className="mb-4 group-hover:text-primaryBlue" />,
  },
  {
    title: 'Estimación de Esfuerzo',
    description: 'Calcula el esfuerzo necesario para cada tarea y proyecto, mejorando la precisión y la planificación.',
    icon: <BargraphIcon width={40} height={40} color="#000000" className="mb-4 group-hover:text-primaryBlue" />,
  },
  {
    title: 'Gestión de Tiempos',
    description: 'Monitorea y administra el tiempo dedicado a cada tarea para optimizar la productividad.',
    icon: <FastTimerIcon width={40} height={40} color="#000000" className="mb-4 group-hover:text-primaryBlue" />,
  },
  {
    title: 'Cálculo de Sueldos',
    description: 'Automatiza el cálculo de sueldos en función del tiempo y esfuerzo dedicados, asegurando pagos justos y precisos.',
    icon: <MoneyIcon width={40} height={40} color="#000000" className="mb-4 group-hover:text-primaryBlue" />,
  },
  {
    title: 'Seguimiento de Proyectos',
    description: 'Realiza un seguimiento detallado del avance de tus proyectos para mantenerte al tanto de cada etapa.',
    icon: <FollowUpIcon width={40} height={40} color="#000000" className="mb-4 group-hover:text-primaryBlue" />,
  },
  {
    title: 'Gestión de Tareas',
    description: 'Administra tus tareas de manera efectiva, asignando responsables y estableciendo fechas límite claras.',
    icon: <TaskIcon width={40} height={40} color="#000000" className="mb-4 group-hover:text-primaryBlue" />,
  },
];

const Features = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Potencia la Gestión de Tus Proyectos</h2>
        <p className="text-lg text-gray-600">
          Optimiza la planificación, seguimiento, y administración de tareas, tiempos y sueldos, mejorando la eficiencia y precisión en cada proyecto.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center group hover:bg-gray-200 transition-colors duration-300">
            <div className="mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
