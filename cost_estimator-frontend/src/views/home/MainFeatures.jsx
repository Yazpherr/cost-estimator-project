import React from 'react';
import { FaShieldAlt, FaCreditCard, FaStar } from 'react-icons/fa';

const mainFeatures = [
  {
    title: 'Safelus',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaShieldAlt className="text-4xl text-green-500 mb-4" />,
  },
  {
    title: 'Paylus',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaCreditCard className="text-4xl text-blue-500 mb-4" />,
  },
  {
    title: 'TL Certification',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaStar className="text-4xl text-yellow-500 mb-4" />,
  },
];

const MainFeatures = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Customize your customer experience, Go beyond with our top products</h2>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mainFeatures.map((feature, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-6">
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
