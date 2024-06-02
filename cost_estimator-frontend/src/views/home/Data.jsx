import React from 'react';

const Data = () => {
  return (
    <div className="bg-white text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center sm:text-left">Just focus on your business startegy</h2>
        <p className="mb-4 text-center sm:text-left">
          Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
        </p>
        <p className="mb-4 text-center sm:text-left">
          Vitae error, quaerat officia delectus voluptatibus explicabo quo pariatur impedit, at reprehenderit aliquam a ipsum quas voluptatem. Quo pariatur asperiores eum amet.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
          <div className="w-full sm:w-1/2">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-600 rounded-full">
                <span className="text-xl text-white">📍</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Real Time Location</h3>
                <p>Asperiores nemo possimus nesciunt quam mollitia.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-full">
                <span className="text-xl text-white">💬</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Chat Anytime</h3>
                <p>Asperiores nemo possimus nesciunt quam mollitia.</p>
              </div>
            </div>
          </div>
          
          <div className="w-full sm:w-1/2 mt-8 sm:mt-0">
            <div className="mb-4">
              <div className="p-2 bg-gray-200 rounded-lg flex items-center">
                <span className="text-2xl">⚡</span>
                <h3 className="ml-4 text-xl font-bold">The faster on the market</h3>
              </div>
            </div>
            <div>
              <div className="p-2 bg-gray-200 rounded-lg flex items-center">
                <span className="text-2xl">🔒</span>
                <h3 className="ml-4 text-xl font-bold">Safe and private</h3>
              </div>
              <img src="path-to-image" alt="Safe and private" className="mt-4 rounded-lg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
