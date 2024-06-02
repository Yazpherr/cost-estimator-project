import React from "react";
import { NavBarSoloLogo } from "../../components/navegation/NavBarSoloLogo";
import { HOME } from "../../routes/Paths";

export const PoliticasUsoSoftware = () => {
  return (
    <>
      <NavBarSoloLogo Url={HOME} />

      <section className="px-6 my-[120px] mx-auto max-w-[760px]">
        <div className="mb-12">
          <p className="text-primary font-semibold text-center  uppercase mb-4">
            Politicas de uso
          </p>
          <h2 className="sora-font max-w-[800px] mx-auto text-negro text-3xl md:text-5xl font-bold text-center">
            Políticas de Uso del Software
          </h2>
          <p className="text-plomo text-base md:text-lg mt-5 max-w-[800px] mx-auto text-center text-balance">
            Estas políticas de uso del software de Grupo Vortex (en adelante,
            "el Software") rigen tu uso del Software. Al utilizar el Software,
            aceptas cumplir con estas políticas. Si no estás de acuerdo con
            estas políticas, te recomendamos no utilizar el Software.
          </p>
        </div>
        <div className="flex flex-col gap-y-6">
          <div>
            <h3 className="font-semibold sora-font mb-1">1. Licencia de Uso</h3>
            <p className="text-plomo text-sm text-justify">
              Grupo Vortex te otorga una licencia limitada, no exclusiva y no
              transferible para utilizar el Software de acuerdo con estos
              términos. Esta licencia no te otorga ningún derecho de propiedad
              sobre el Software.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              2. Restricciones de Uso
            </h3>
            <p className="text-plomo text-sm text-justify">No debes:</p>
            <ul className="list-decimal ml-6 text-plomo text-sm">
              <li className="text-justify">
                Copiar, modificar o distribuir el Software de manera no
                autorizada.
              </li>
              <li className="text-justify">
                Utilizar el Software para fines ilegales o inmorales.
              </li>
              <li className="text-justify">
                Intentar descompilar, realizar ingeniería inversa o acceder al
                código fuente del Software.
              </li>
              <li className="text-justify">
                Compartir tus credenciales de acceso al Software con terceros.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              3. Actualizaciones del Software
            </h3>
            <p className="text-plomo text-sm text-justify">
              Grupo Vortex puede proporcionar actualizaciones periódicas del
              Software. Aceptas instalar y utilizar estas actualizaciones para
              seguir utilizando el Software de manera efectiva.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-2">
              4. Privacidad de Datos
            </h3>
            <p className="text-plomo text-sm text-justify">
              Grupo Vortex recopila y procesa información de acuerdo con su
              Política de Privacidad. Al utilizar el Software, aceptas el
              procesamiento de tus datos de acuerdo con esta política.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">5. Soporte Técnico</h3>
            <p className="text-plomo text-sm text-justify">
              Grupo Vortex puede ofrecer soporte técnico para el Software. Te
              recomendamos utilizar los canales de soporte proporcionados para
              obtener asistencia.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              6. Limitación de Responsabilidad
            </h3>
            <p className="text-plomo text-sm text-justify">
              El Software se proporciona "tal cual" y Grupo Vortex no garantiza
              que sea libre de errores o que cumpla con tus necesidades
              específicas. No nos hacemos responsables de cualquier pérdida o
              daño causado por el uso del Software.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">7. Terminación</h3>
            <p className="text-plomo text-sm text-justify">
              Grupo Vortex se reserva el derecho de terminar tu acceso al
              Software si incumples estas políticas. En caso de terminación,
              debes dejar de utilizar el Software.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              8. Modificaciones de las Políticas
            </h3>
            <p className="text-plomo text-sm text-justify">
              Grupo Vortex se reserva el derecho de modificar estas políticas en
              cualquier momento. Cualquier cambio será efectivo desde el momento
              en que se publique en el Software. Es tu responsabilidad revisar
              periódicamente estas políticas para estar al tanto de las
              actualizaciones. Si tienes alguna pregunta o duda sobre estas
              políticas, no dudes en contactarnos.
            </p>
          </div>
          
          <div className="mt-12">
            <h3 className="font-semibold sora-font mb-1">
              Fecha de última actualización: 13-09-2023
            </h3>
            <p className="text-plomo text-sm text-justify">
              Grupo Vortex - Vortex One
            </p>
            <p className="text-plomo text-sm text-justify">
              Osman Pérez Freire 555, Rancagua
            </p>
            <p className="text-plomo text-sm text-justify">
              ayuda@vortexone.cl
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
