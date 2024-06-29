import React from 'react';

const ProductHighlight = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Dashboard</h3>
            <p className="text-gray-600 mb-4">Home &gt; Dashboards &gt; Multipurpose</p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold mb-2">$69,700</div>
              <div className="text-green-500 mb-4">+2.2%</div>
              <div className="w-64 h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Aquí puedes agregar la representación SVG de tu gráfico */}
                  <circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="10" fill="none" />
                </svg>
              </div>
              <div className="text-left">
                <p>Shoes: $7,660</p>
                <p>Gaming: $2,820</p>
                <p>Others: $45,257</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Go beyond with our top products</h2>
          <p className="mb-4">
            Nobis minus voluptatibus pariatur dignissimos libero quaerat? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
          </p>
          <p className="mb-8">
            Vitae error, quaerat officia delectus voluptatibus explicabo quo pariatur impedit, at reprehenderit aliquam a ipsum quas voluptatem. Quo pariatur asperiores eum amet.
          </p>
          <a href="#get-started" className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300">
            Get started
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlight;
