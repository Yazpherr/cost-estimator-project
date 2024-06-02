import React from "react";
import { NavBarSoloLogo } from "../../components/navegation/NavBarSoloLogo";
import { HOME } from "../../routes/Paths";

export const PoliticasPrivacidad = () => {
  return (
    <>
      <NavBarSoloLogo Url={HOME} />

      <section className="px-6 my-[120px] mx-auto max-w-[760px]">
        <div className="mb-12">
          <p className="text-primary font-semibold text-center  uppercase mb-4">
            Politicas
          </p>
          <h2 className="sora-font max-w-[800px] mx-auto text-negro text-3xl md:text-5xl font-bold text-center">
            Políticas de privacidad
          </h2>
          <p className="text-plomo text-base md:text-lg mt-5 max-w-[800px] mx-auto text-center text-balance">
            Vortex One ("nosotros", "nuestra" o "la Empresa") se compromete a
            proteger y respetar tu privacidad. Esta Política de Privacidad
            describe cómo recopilamos, utilizamos y compartimos información
            personal cuando utilizas nuestro software de ERP
            ("Servicio"). Al acceder o utilizar el Servicio, aceptas las
            prácticas descritas en esta Política de Privacidad.
          </p>
        </div>
        <div className="flex flex-col gap-y-6">
          <div>
            <h3 className="font-semibold sora-font mb-1">
              1. Información que recopilamos.
            </h3>
            <ul className="ml-6 text-plomo text-sm">
              <li className="text-justify">
                2.1. Información de Registro: Cuando te registras en nuestro
                Servicio, podemos recopilar información personal, como tu
                nombre, dirección de correo electrónico, número de teléfono,
                dirección postal y otra información de contacto.
              </li>
              <li className="text-justify">
                2.2. Información del Usuario: Podemos recopilar información
                sobre cómo interactúas con el Servicio, incluyendo información
                sobre las funciones que utilizas, las transacciones que
                realizas, los documentos que cargas y las configuraciones que
                prefieres.
              </li>
              <li className="text-justify">
                2.3. Información del Dispositivo: Podemos recopilar información
                sobre tu dispositivo, incluyendo la dirección IP, el tipo de
                dispositivo, el sistema operativo, la versión del navegador y
                otros identificadores únicos del dispositivo.
              </li>
              <li className="text-justify">
                2.4. Información de Uso: Recopilamos información sobre tu uso
                del Servicio, como la fecha y hora de acceso, la duración de la
                sesión, las páginas visitadas y las acciones realizadas dentro
                del Servicio.
              </li>
              <li className="text-justify">
                2.5. Información de Ubicación: Podemos recopilar información de
                ubicación si activas esta funcionalidad en tu dispositivo o en
                el Servicio. Esta información se utiliza para proporcionar
                servicios basados en la ubicación, como la visualización de
                información relevante para tu ubicación.
              </li>
              <li className="text-justify">
                2.6. Información de Terceros: Podemos recibir información de
                terceros, como redes sociales y proveedores de servicios de
                pago, cuando autorices la conexión de tu cuenta de terceros al
                Servicio.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              2. Uso de la información
            </h3>
            <p className="text-plomo text-sm text-justify">No debes:</p>
            <ul className="ml-6 text-plomo text-sm">
              <li className="text-justify">
                2.1. Proporcionarte el Servicio y sus funcionalidades,
                incluyendo la gestión de cuentas, la personalización y la
                asistencia técnica.
              </li>
              <li className="text-justify">
                2.2. Comunicarnos contigo, responder a tus consultas y
                proporcionarte asistencia al cliente.{" "}
              </li>
              <li className="text-justify">
                2.3. Mejorar y personalizar nuestro Servicio, incluyendo el
                desarrollo de nuevas funcionalidades y características, y
                realizar análisis para comprender mejor el uso del Servicio.
              </li>
              <li className="text-justify">
                2.4. Enviar comunicaciones relacionadas con el Servicio, como
                actualizaciones, alertas de seguridad y notificaciones
                importantes.{" "}
              </li>
              <li className="text-justify">
                2.5. Realizar investigaciones y análisis estadísticos para
                mejorar nuestros productos y servicios.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              3. Compartir información
            </h3>
            <ul className="ml-6 text-plomo text-sm">
              <li className="text-justify">
                3.1. Terceros de Confianza: Podemos compartir información
                personal con terceros de confianza, como proveedores de
                servicios que nos ayudan a ofrecer el Servicio, procesadores de
                pagos, servicios de alojamiento y servicios de análisis. Nos
                aseguramos de que estos terceros cumplan con las normativas de
                privacidad adecuadas.
              </li>
              <li className="text-justify">
                3.2. Requerimientos Legales: Podemos divulgar información
                personal si estamos legalmente obligados a hacerlo o si
                consideramos de buena fe que dicha divulgación es necesaria para
                proteger nuestros derechos legales, tu seguridad o la seguridad
                de otros, investigar fraudes o responder a una solicitud
                gubernamental.
              </li>
              <li className="text-justify">
                3.3. Transacciones Empresariales: En caso de una fusión,
                adquisición o venta de activos, podemos transferir información
                personal a la entidad adquiriente o fusionada como parte de la
                transacción.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-2">
              4. Seguridad de la información
            </h3>
            <p className="text-plomo text-sm text-justify">
              Tomamos medidas razonables para proteger la información personal
              que recopilamos. Utilizamos medidas de seguridad físicas, técnicas
              y administrativas para proteger contra el acceso no autorizado, la
              divulgación, la alteración o la destrucción de los datos.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">5. Tus derechos</h3>
            <p className="text-plomo text-sm text-justify">
              Tienes derechos en relación con tus datos personales, incluyendo:
            </p>
            <ul className="ml-6 text-plomo text-sm">
              <li className="text-justify">
                5.1. Acceso: Puedes solicitar acceso a la información personal
                que tenemos sobre ti.
              </li>
              <li className="text-justify">
                5.2. Rectificación: Puedes solicitar la corrección de cualquier
                información personal inexacta o incompleta.
              </li>
              <li className="text-justify">
                5.3. Supresión: Puedes solicitar la eliminación de tu
                información personal en ciertas circunstancias.
              </li>
              <li className="text-justify">
                5.4. Restricción del Procesamiento: Puedes solicitar la
                restricción del procesamiento de tu información personal en
                ciertas circunstancias.
              </li>
              <li className="text-justify">
                5.5. Portabilidad de Datos: Puedes solicitar la portabilidad de
                tus datos personales a otro controlador de datos en ciertas
                circunstancias.
              </li>
              <li className="text-justify">
                5.6. Oposición al Procesamiento: Puedes oponerte al
                procesamiento de tus datos personales en ciertas circunstancias.
              </li>
            </ul>
            <p className="text-plomo text-sm text-justify">
              Para ejercer estos derechos, contáctanos utilizando la información
              de contacto proporcionada al final de esta política.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              6. Retención de datos
            </h3>
            <p className="text-plomo text-sm text-justify">
              Retendremos tu información personal durante el tiempo necesario
              para cumplir con los fines descritos en esta Política de
              Privacidad, a menos que se requiera o permita un período de
              retención más largo por ley.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">
              7. Cambios en la política de privacidad
            </h3>
            <p className="text-plomo text-sm text-justify">
              Nos reservamos el derecho de modificar esta Política de Privacidad
              en cualquier momento. Publicaremos cualquier cambio en nuestra
              página web y, si es necesario, te notificaremos por otros medios.
            </p>
          </div>
          <div>
            <h3 className="font-semibold sora-font mb-1">6. Contacto</h3>
            <p className="text-plomo text-sm text-justify">
              Nos reservamos el derecho de modificar esta Política de Privacidad
              en cualquier momento. Publicaremos cualquier cambio en nuestra
              página web y, si es necesario, te notificaremos por otros medios.
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
