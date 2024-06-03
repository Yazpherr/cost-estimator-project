const Hero = () => {
  return (
    <section className="bg-white text-gray-800 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Lleva Tus Proyectos al Siguiente Nivel
          </h1>
          <p className="text-lg mb-8">
            Simplifica la planificación, el seguimiento y la colaboración en tus
            proyectos.
          </p>
          <div className="flex space-x-4">
            <a
              href="#get-started"
              className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Comenzar Ahora
            </a>
            <a
              href="#learn-more"
              className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Leer más
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative">
            <img
              src="/laptop-hero-3.jpg"
              alt="Business management illustration"
              className="w-3/4 md:w-full max-w-lg rounded-lg"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
