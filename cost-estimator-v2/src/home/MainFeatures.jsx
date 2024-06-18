import SecureIcon from '../components/icons/SecureIcon';  // Asegúrate de que la ruta sea correcta
import SupportIcon from '../components/icons/SupportIcon';  // Asegúrate de que la ruta sea correcta

const mainFeatures = [
  {
    title: 'Seguridad de Datos',
    description: 'Protege tus datos y la privacidad de tus proyectos con nuestras avanzadas medidas de seguridad.',
    icon: <SecureIcon width={40} height={40} className="mb-4 group-hover:text-primaryBlue" />,
  },
  {
    title: 'Soporte Técnico',
    description: 'Accede a soporte técnico prioritario para resolver cualquier problema rápidamente.',
    icon: <SupportIcon width={40} height={40} className="mb-4 group-hover:text-primaryBlue" />,
  },
];

const MainFeatures = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Te Garantizamos Seguridad y Soporte Técnico</h2>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {mainFeatures.map((feature, index) => (
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

export default MainFeatures;
