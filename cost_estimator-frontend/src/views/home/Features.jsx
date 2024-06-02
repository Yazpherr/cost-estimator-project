import React from 'react';
import { FaStar, FaShieldAlt, FaCreditCard, FaBolt, FaSearch } from 'react-icons/fa';

const features = [
  {
    title: 'User centred',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaStar className="text-4xl text-yellow-500 mb-4" />,
  },
  {
    title: 'Security first',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaShieldAlt className="text-4xl text-blue-500 mb-4" />,
  },
  {
    title: 'Simple Payment',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaCreditCard className="text-4xl text-green-500 mb-4" />,
  },
  {
    title: 'Fast speed',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaBolt className="text-4xl text-red-500 mb-4" />,
  },
  {
    title: 'Search engine',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaSearch className="text-4xl text-purple-500 mb-4" />,
  },
  {
    title: 'Search engine',
    description: 'Dolorem aliquid officiis quae ipsum nobis libero alias iure nobis dicta.',
    icon: <FaSearch className="text-4xl text-purple-500 mb-4" />,
  },
];

const Features = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Shaped to meet your needs</h2>
        <p className="text-lg text-gray-600">
          Sapiente optio repellendus atque illum odio! Fugit sit expedita deserunt dolorum molestias.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
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

export default Features;
