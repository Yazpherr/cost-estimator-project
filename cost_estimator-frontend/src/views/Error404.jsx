import { NavBarSoloLogo } from "../components/navegation/NavBarSoloLogo";
import { Link } from "react-router-dom";
import { HOME } from "../routes/Paths";

export const Error404 = () => {
  return (
    <>
      <NavBarSoloLogo Url={HOME} />

      <section className="bg-white mt-16">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">

            <img src="./404.png" className="mx-auto mb-4" alt="404 icon" />
    {/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-300">
      404
    </h1> */}
    <p className="sora-font mb-4 text-3xl tracking-tight font-bold text-negro md:text-4xl">
      Página no encontrada
    </p>
            <Link
              to={HOME}
              // className="text-white bg-primary 
              //     font-medium rounded-lg text-sm px-5 py-3 text-center "
              className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Ir a la página  principal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
