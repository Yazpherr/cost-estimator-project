import React from "react";
import { Link } from "react-router-dom";
import {
  POLITICASPRIVACIDAD,
  POLITICASUSOSOFTWARE,
  TERMINOSCONDICIONES,
} from "../../routes/Paths";

export const Footer = ({index}) => {
  return (
    <footer className={`${index ? 'bg-[#E6ECEB]' : 'bg-[#F4F4F5]'} rounded-xl mt-20`}>
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 pb-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-8">
          <div>
            <p className="font-medium text-negro">Novedades</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="https://grupovortex.cl/blog/"
                  target="_blank"
                  className="text-negro hover:text-negro transition hover:opacity-75"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-negro">Ayuda</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="mailto:ayuda@vortexone.cl"
                  target="_blank"
                  className="text-negro hover:text-negro transition hover:opacity-75"
                >
                  Contáctanos
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/@grupovortex"
                  target="_blank"
                  className="text-negro hover:text-negro transition hover:opacity-75"
                >
                  Tutoriales
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-negro">Términos Y Políticas</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to={POLITICASPRIVACIDAD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-negro hover:text-negro transition hover:opacity-75"
                >
                  Políticas de privacidad
                </Link>
              </li>

              <li>
                <Link
                  to={TERMINOSCONDICIONES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-negro hover:text-negro transition hover:opacity-75"
                >
                  Términos y condiciones
                </Link>
              </li>

              <li>
                <Link
                  to={POLITICASUSOSOFTWARE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-negro hover:text-negro transition hover:opacity-75"
                >
                  Políticas de uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-negro">Redes Sociales</p>

            <ul className="mt-6text-sm flex gap-6 mt-6">
              <li>
                <a
                  href="https://web.facebook.com/GrupoVortexCL?_rdc=1&_rdr"
                  rel="noreferrer"
                  target="_blank"
                  className="text-negro transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6 fill-negro"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                  >
                    <g>
                      <path d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073c0-6.627,5.373-12,12-12S24,5.445,24,12.073z" />
                    </g>
                  </svg>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a
                  href="https://www.instagram.com/grupovortexchile/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-negro transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <svg
                    className="w-6 h-6 fill-negro"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                  >
                    <g>
                      <path d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942C15.668,0.014,15.259,0,12,0z" />
                      <path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z" />
                      <circle cx="18.406" cy="5.594" r="1.44" />
                    </g>
                  </svg>
                </a>
              </li>

              {/* Tiktok */}
              <li>
                <a
                  href="https://www.tiktok.com/@grupovortexchile"
                  rel="noreferrer"
                  target="_blank"
                  className="text-negro transition hover:opacity-75"
                >
                  <span className="sr-only">TikTok</span>

                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    id="icons"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-negro"
                  >
                    <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"></path>
                  </svg>
                </a>
              </li>
              {/* Linkedin */}
              <li>
                <a
                  href="https://cl.linkedin.com/company/grupovortex"
                  rel="noreferrer"
                  target="_blank"
                  className="text-negro transition hover:opacity-75"
                >
                  <span className="sr-only">Linkedin</span>

                  <svg
                    className="w-6 h-6 fill-negro"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                  >
                    <g>
                      <path
                        id="Path_2525"
                        d="M23.002,21.584h0.227l-0.435-0.658l0,0c0.266,0,0.407-0.169,0.409-0.376c0-0.008,0-0.017-0.001-0.025   c0-0.282-0.17-0.417-0.519-0.417h-0.564v1.476h0.212v-0.643h0.261L23.002,21.584z M22.577,20.774h-0.246v-0.499h0.312   c0.161,0,0.345,0.026,0.345,0.237c0,0.242-0.186,0.262-0.412,0.262"
                      />
                      <path
                        id="Path_2520"
                        d="M17.291,19.073h-3.007v-4.709c0-1.123-0.02-2.568-1.564-2.568c-1.566,0-1.806,1.223-1.806,2.487v4.79H7.908   V9.389h2.887v1.323h0.04c0.589-1.006,1.683-1.607,2.848-1.564c3.048,0,3.609,2.005,3.609,4.612L17.291,19.073z M4.515,8.065   c-0.964,0-1.745-0.781-1.745-1.745c0-0.964,0.781-1.745,1.745-1.745c0.964,0,1.745,0.781,1.745,1.745   C6.26,7.284,5.479,8.065,4.515,8.065L4.515,8.065 M6.018,19.073h-3.01V9.389h3.01V19.073z M18.79,1.783H1.497   C0.68,1.774,0.01,2.429,0,3.246V20.61c0.01,0.818,0.68,1.473,1.497,1.464H18.79c0.819,0.01,1.492-0.645,1.503-1.464V3.245   c-0.012-0.819-0.685-1.474-1.503-1.463"
                      />
                      <path
                        id="Path_2526"
                        d="M22.603,19.451c-0.764,0.007-1.378,0.633-1.37,1.397c0.007,0.764,0.633,1.378,1.397,1.37   c0.764-0.007,1.378-0.633,1.37-1.397c-0.007-0.754-0.617-1.363-1.37-1.37H22.603 M22.635,22.059   c-0.67,0.011-1.254-0.522-1.265-1.192c-0.011-0.67,0.523-1.222,1.193-1.233c0.67-0.011,1.222,0.523,1.233,1.193   c0,0.007,0,0.013,0,0.02C23.81,21.502,23.29,22.045,22.635,22.059h-0.031"
                      />
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex justify-center flex-col items-center gap-5">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-teal-600">
              <img
                className="w-[120px] sm:w-[160px]"
                src="/img/LogoVortex4.png"
                loading="lazy"
                alt="logo-vortex"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            &copy; 2024. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
