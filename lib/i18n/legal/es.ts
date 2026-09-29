import type { LegalTexts } from "./types";

// Traducción al español (España) del documento húngaro original (hu.ts). En caso de discrepancia prevalece la versión húngara.

export const legalEs: LegalTexts = {
  ui: {
    effective: "Vigente desde: {date}",
    toc: "Índice",
    translationNote:
      "Este documento es una traducción del original en húngaro. En caso de discrepancia, prevalecerá la versión húngara.",
    placeholderNote:
      "Los datos del Proveedor que figuran entre corchetes aún están pendientes de completar. Sin ellos, el documento no está completo.",
  },

  terms: {
    title: "Términos y condiciones",
    lead: "Este documento recoge las condiciones de uso del servicio de códigos QR dinámicos {brand} ({siteUrl}). Al utilizar el servicio —al crear un código QR o al suscribirse—, usted acepta estas condiciones.",
    sections: [
      {
        h: "Datos del Proveedor",
        list: [
          "Nombre: {operatorName}",
          "Domicilio social: {operatorAddress}",
          "Número de registro: {operatorRegistry}",
          "Número de identificación fiscal: {operatorTax}",
          "Correo electrónico: {operatorEmail}",
          "Proveedor de alojamiento: {hosting}",
        ],
      },
      {
        h: "El servicio",
        p: [
          "{brand} crea códigos QR dinámicos. El código QR contiene un enlace corto alojado en el dominio del Proveedor, que redirige a la dirección web indicada por el Usuario. La dirección de destino puede modificarse en cualquier momento en la página de gestión del código; el código ya impreso sigue pudiendo utilizarse sin cambios.",
          "El servicio incluye la personalización del aspecto del código (colores, patrón, logotipo, marco), la descarga del código en formato PNG y SVG, así como la visualización del número diario de escaneos.",
        ],
      },
      {
        h: "Celebración del contrato y enlace de gestión",
        p: [
          "El contrato se celebra por vía electrónica al crear el código QR. No constituye un contrato formalizado por escrito, el Proveedor no lo archiva y, aparte de estos Términos y condiciones, no remite a ningún código de conducta.",
          "No es necesario registrarse. Cada código tiene asociado un enlace de gestión único y secreto: quien lo conozca puede gestionar el código (modificarlo, suscribirse a él, cancelar la suscripción o eliminarlo). La conservación y la confidencialidad del enlace de gestión son responsabilidad del Usuario. En caso de pérdida, el Proveedor solo podrá ayudar si la titularidad puede acreditarse de forma fehaciente por otros medios (por ejemplo, mediante la dirección de correo electrónico utilizada para la suscripción).",
        ],
      },
      {
        h: "Periodo gratuito",
        p: [
          "Todo código nuevo funciona de forma gratuita durante {trialDays} días a partir de su creación. Para ello no se necesita tarjeta bancaria, y la finalización del periodo gratuito no genera por sí sola ninguna obligación de pago.",
        ],
      },
      {
        h: "Suscripción y tarifas",
        p: [
          "Una vez finalizado el periodo gratuito, el código sigue funcionando mediante una suscripción. El precio de la suscripción es de {price} al mes por código. {vatNote}",
          "El pago se realiza con tarjeta bancaria a través de la plataforma de pago segura de Stripe; los datos de la tarjeta no llegan al Proveedor. Stripe cobra la tarifa mensualmente y por adelantado. El banco emisor de la tarjeta puede convertir la tarifa expresada en dólares aplicando su propio tipo de cambio.",
          "Si se suscribe durante el periodo gratuito, el primer cargo se efectuará al final de dicho periodo, siempre que queden al menos dos días del mismo; en caso contrario, la suscripción y el cargo comienzan de inmediato. A partir de entonces, la suscripción se renueva automáticamente cada mes hasta que usted la cancele.",
          "Enviamos un justificante electrónico de cada pago a la dirección de correo electrónico indicada al suscribirse.",
          "El Proveedor puede modificar la tarifa con efectos para el futuro. Informará del cambio con al menos 30 días de antelación a la dirección de correo electrónico indicada al suscribirse; la modificación entrará en vigor a partir del siguiente periodo de facturación. Si no la acepta, puede cancelar la suscripción antes de esa fecha.",
        ],
      },
      {
        h: "Cancelación",
        p: [
          "La suscripción puede cancelarse en cualquier momento, con un solo clic, en la página de gestión del código. La cancelación surte efecto al final del periodo ya pagado; hasta entonces, el código sigue funcionando y la cancelación puede revocarse. No existe periodo de permanencia.",
          "No se reembolsa la tarifa del periodo de facturación ya iniciado, salvo que la normativa —en particular, la relativa al derecho de desistimiento— disponga otra cosa.",
        ],
      },
      {
        h: "Suspensión y eliminación del código",
        p: [
          "Si el código no dispone de un periodo gratuito vigente ni de una suscripción pagada, queda suspendido: quienes lo escaneen verán una página informativa y la redirección no funcionará. Mediante una suscripción, el código puede reactivarse en cualquier momento, con el mismo enlace corto.",
          "Conservamos el código suspendido y su configuración durante {retentionMonths} meses desde el inicio de la suspensión; transcurrido ese plazo, lo eliminamos definitivamente. Puede eliminar el código de inmediato en cualquier momento desde la página de gestión; al eliminarlo, cualquier suscripción asociada finaliza también de inmediato.",
        ],
      },
      {
        h: "Derecho de desistimiento",
        p: [
          "Si usted es consumidor, conforme al Decreto del Gobierno húngaro 45/2014 (II. 26.) sobre los contratos entre consumidores y empresas, puede desistir del contrato sin necesidad de justificación en un plazo de 14 días desde la contratación de la suscripción. Puede enviar su declaración de desistimiento a {operatorEmail}; para ello puede utilizar el modelo que figura a continuación, aunque no es obligatorio.",
          "Al suscribirse, puede solicitar expresamente que el Proveedor comience a prestar el servicio de pago antes de que venza el plazo de desistimiento. En tal caso, si aun así desiste dentro del plazo, deberá abonar el importe proporcional al servicio ya prestado; y si el servicio se ha prestado íntegramente dentro del plazo, perderá su derecho de desistimiento.",
          "En caso de desistimiento, le reembolsaremos el importe pagado —descontando, en su caso, el importe proporcional— a más tardar en un plazo de 14 días desde la recepción de la declaración de desistimiento, utilizando el mismo medio de pago empleado originalmente.",
        ],
        list: [
          "Modelo de formulario de desistimiento – Destinatario: {operatorName}, {operatorEmail}",
          "Por la presente le comunico que desisto de mi contrato de prestación del siguiente servicio: suscripción a {brand}, enlace corto del código QR: …",
          "Fecha de celebración del contrato: … · Nombre y domicilio del consumidor: … · Fecha: …",
        ],
      },
      {
        h: "Obligaciones del Usuario y usos prohibidos",
        p: [
          "El Usuario es responsable del contenido de la dirección de destino indicada. Queda prohibido dirigir el código a contenidos ilícitos, engañosos (en particular, de phishing), que distribuyan software malicioso, que inciten al odio o que vulneren los derechos de terceros, así como utilizar el servicio para difundir mensajes no solicitados.",
          "El Proveedor está facultado para suspender o eliminar dichos códigos sin previo aviso y para colaborar con las autoridades competentes. Puede denunciar contenidos ilícitos en {operatorEmail}.",
          "El uso masivo y automatizado del servicio puede limitarse; actualmente, desde una misma dirección pueden crearse como máximo {hourlyLimit} códigos nuevos por hora.",
        ],
      },
      {
        h: "Disponibilidad y responsabilidad",
        p: [
          "El Proveedor procura garantizar un funcionamiento continuo, pero no garantiza una disponibilidad ininterrumpida y libre de errores. Debido a tareas de mantenimiento, a errores o a la caída de un proveedor externo (alojamiento, base de datos, pagos), el servicio puede no estar disponible temporalmente.",
          "El Proveedor no se hace responsable del contenido ni de la disponibilidad de la dirección de destino, ni de que el código impreso no pueda escanearse debido a un tamaño, un color o una calidad de impresión inadecuados. Pruebe siempre el código antes de imprimirlo.",
          "En la medida permitida por la ley, la responsabilidad del Proveedor en relación con un código determinado se limita al importe de las tarifas pagadas por dicho código en los 12 meses anteriores a la producción del daño. Esta limitación no se aplica a los daños causados de forma intencionada o por negligencia grave, ni a los que afecten a la vida, la integridad física o la salud, y no afecta a los derechos que la ley reconoce a los consumidores.",
        ],
      },
      {
        h: "Propiedad intelectual",
        p: [
          "El sitio web, el software y la identidad visual de {brand} son propiedad intelectual del Proveedor. Puede utilizar la imagen del código QR que haya creado sin restricciones y de forma gratuita. Usted es responsable del logotipo que suba y de los derechos de uso sobre el mismo.",
          "«QR Code» es una marca registrada de DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Reclamaciones y vías de recurso",
        p: [
          "Puede enviar su reclamación a {operatorEmail}; le responderemos sobre el fondo en un plazo máximo de 30 días.",
          "Si no se logra resolver la reclamación, como consumidor puede dirigirse a la junta de conciliación en materia de consumo o a la autoridad de protección de los consumidores competentes según su lugar de residencia o de estancia, o bien acudir a los tribunales. Si es usted un consumidor residente en otro Estado miembro de la UE, también puede solicitar ayuda a la Red de Centros Europeos del Consumidor (ECC-Net).",
        ],
      },
      {
        h: "Modificación de los Términos y condiciones, idioma y legislación aplicable",
        p: [
          "El Proveedor puede modificar los Términos y condiciones. Publicará la modificación en esta página al menos 15 días antes de su entrada en vigor y la notificará también por correo electrónico a los suscriptores. La modificación no afecta al periodo ya pagado.",
          "Los Términos y condiciones se rigen por la legislación húngara. En el caso de los consumidores, ello no les priva de la protección que les otorgan las disposiciones imperativas en materia de protección de los consumidores del Estado de su residencia habitual.",
          "Los Términos y condiciones se han redactado en húngaro; las versiones en otros idiomas son traducciones. En caso de discrepancia, prevalecerá la versión húngara.",
        ],
      },
    ],
  },

  privacy: {
    title: "Política de privacidad",
    lead: "En esta política describimos qué datos personales tratamos durante el uso de {brand} ({siteUrl}), con qué finalidad y durante cuánto tiempo, así como los derechos que le asisten. El tratamiento de los datos se realiza conforme al Reglamento General de Protección de Datos de la Unión Europea (RGPD) y a la Ley húngara CXII de 2011 sobre el derecho a la autodeterminación informativa y la libertad de información.",
    sections: [
      {
        h: "Responsable del tratamiento",
        list: ["Nombre: {operatorName}", "Domicilio social: {operatorAddress}", "Correo electrónico: {operatorEmail}"],
        after: ["No estamos obligados a designar un delegado de protección de datos."],
      },
      {
        h: "En resumen",
        list: [
          "No hay registro ni contraseña, y no utilizamos cookies publicitarias, analíticas ni de seguimiento.",
          "No almacenamos datos personales de las personas que escanean los códigos QR, solo el número diario de escaneos.",
          "Los datos de su tarjeta bancaria permanecen en Stripe; no tenemos acceso a ellos.",
        ],
      },
      {
        h: "Creación y funcionamiento de códigos QR",
        p: [
          "<b>Datos tratados:</b> la dirección de destino (URL) indicada, el nombre del código, la configuración de aspecto (colores, patrón, texto, logotipo subido), el identificador corto del código y su token de gestión secreto, las fechas de creación y de vencimiento, así como el número diario de escaneos. La dirección de destino y el nombre contienen datos personales si usted los introduce (por ejemplo, el enlace a un perfil personal).",
          "<b>Finalidad:</b> la prestación del servicio, es decir, el funcionamiento de la redirección, de la página de gestión y de las estadísticas. <b>Base jurídica:</b> ejecución de un contrato (artículo 6, apartado 1, letra b) del RGPD).",
          "<b>Conservación:</b> hasta que usted elimine el código; en el caso de un código suspendido, como máximo {retentionMonths} meses desde el inicio de la suspensión.",
        ],
      },
      {
        h: "Prevención de abusos",
        p: [
          "<b>Datos tratados:</b> la dirección IP del dispositivo que crea el código, exclusivamente en forma de hash con sal irreversible, junto con la fecha de creación.",
          "<b>Finalidad:</b> limitar la generación masiva y automatizada de códigos (como máximo {hourlyLimit} códigos por hora). <b>Base jurídica:</b> nuestro interés legítimo en el funcionamiento seguro y estable del servicio (artículo 6, apartado 1, letra f) del RGPD). <b>Conservación:</b> mientras exista el código.",
        ],
      },
      {
        h: "Suscripción y pago",
        p: [
          "Al suscribirse, los datos de pago (nombre, dirección de correo electrónico, datos de la tarjeta bancaria, país de facturación) son recogidos y tratados por Stripe, en calidad de responsable independiente del tratamiento en lo que respecta a la tramitación del pago y la prevención del fraude, conforme a su propia política de privacidad.",
          "<b>Datos que recibimos:</b> los identificadores de cliente y de suscripción de Stripe, el estado de la suscripción y sus periodos; en la plataforma de Stripe tenemos acceso al nombre, la dirección de correo electrónico y el país de facturación del cliente, así como a los pagos. No vemos el número de la tarjeta bancaria.",
          "<b>Finalidad:</b> la gestión de la suscripción y el cobro de la tarifa, así como las notificaciones relacionadas con la suscripción. <b>Base jurídica:</b> ejecución de un contrato (artículo 6, apartado 1, letra b) del RGPD); la conservación de los justificantes contables constituye una obligación legal (artículo 6, apartado 1, letra c) del RGPD; artículo 169 de la Ley húngara C de 2000 de Contabilidad).",
          "<b>Conservación:</b> hasta la finalización de la suscripción; los justificantes contables, durante 8 años.",
        ],
      },
      {
        h: "Contacto",
        p: [
          "Si nos escribe un correo electrónico, utilizamos su nombre, su dirección de correo electrónico y el contenido del mensaje para responder a su consulta. <b>Base jurídica:</b> nuestro interés legítimo en la gestión de las consultas (artículo 6, apartado 1, letra f) del RGPD). <b>Conservación:</b> durante 1 año desde el cierre del asunto.",
        ],
      },
      {
        h: "Registros técnicos",
        p: [
          "Para el funcionamiento y la seguridad del sitio web, el proveedor de alojamiento registra automáticamente las solicitudes (dirección IP, fecha y hora, dirección solicitada, tipo de navegador); esto también ocurre al escanear los códigos QR. El proveedor de alojamiento conserva los registros durante un breve periodo, conforme a sus propias normas, y nosotros solo los utilizamos para la depuración de errores. <b>Base jurídica:</b> nuestro interés legítimo en un funcionamiento seguro (artículo 6, apartado 1, letra f) del RGPD).",
        ],
      },
      {
        h: "Cookies y almacenamiento local",
        list: [
          "Cookie NEXT_LOCALE: recuerda el idioma elegido durante 1 año.",
          "Almacenamiento del navegador (localStorage): los enlaces de gestión de los códigos creados o abiertos en este dispositivo, para que pueda encontrarlos en la página «Mis códigos». La página «Mis códigos» los utiliza para consultar el estado de los códigos; por lo demás, permanecen en su navegador y puede eliminarlos en cualquier momento desde la configuración del navegador.",
          "La página de pago de Stripe utiliza sus propias cookies, conforme a las normas de Stripe.",
        ],
        after: ["Son necesarias para el funcionamiento del servicio, por lo que no solicitamos un consentimiento específico para ellas."],
      },
      {
        h: "Encargados del tratamiento y destinatarios",
        list: [
          "Alojamiento y funciones de servidor: {hosting}",
          "Base de datos: {database} – almacena los datos de los códigos en un servidor situado en la Unión Europea (Irlanda).",
          "Pagos: {payments} – en calidad de responsable independiente del tratamiento.",
        ],
        after: [
          "No vendemos sus datos ni los cedemos a nadie con fines de marketing. Solo comunicamos datos a las autoridades en los casos previstos por la ley.",
        ],
      },
      {
        h: "Transferencias de datos fuera de la Unión Europea",
        p: [
          "Algunos de nuestros encargados del tratamiento tienen su sede en los Estados Unidos. Cuando, en el marco del tratamiento, se transfieran datos fuera de la UE, la transferencia se realizará sobre la base del Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework) o de las cláusulas contractuales tipo (CCT) adoptadas por la Comisión Europea.",
        ],
      },
      {
        h: "Seguridad de los datos",
        p: [
          "La conexión está cifrada (HTTPS). El token de gestión es un valor aleatorio de 192 bits, las direcciones IP solo se almacenan como hash con sal y únicamente el Proveedor tiene acceso a la base de datos.",
        ],
      },
      {
        h: "Sus derechos",
        list: [
          "Acceso: puede solicitar información sobre los datos que tratamos sobre usted (artículo 15 del RGPD).",
          "Rectificación: puede solicitar la corrección de los datos inexactos (artículo 16).",
          "Supresión: puede solicitar la supresión de sus datos (artículo 17); también puede eliminar usted mismo el código de inmediato en la página de gestión.",
          "Limitación: puede solicitar la limitación del tratamiento (artículo 18).",
          "Portabilidad: puede solicitar que se le entreguen en un formato legible por máquina los datos que nos haya facilitado (artículo 20).",
          "Oposición: puede oponerse al tratamiento basado en el interés legítimo (artículo 21).",
        ],
        after: [
          "Puede enviar su solicitud a {operatorEmail}. Para identificar el código, indique su enlace corto. Le responderemos en el plazo máximo de un mes.",
        ],
      },
      {
        h: "Vías de recurso",
        p: [
          "Si considera que hemos vulnerado sus derechos en materia de protección de datos, le rogamos que se ponga primero en contacto con nosotros. Puede presentar una reclamación ante la Autoridad Nacional Húngara de Protección de Datos y Libertad de Información (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; dirección postal: 1363 Budapest, Pf. 9.; www.naih.hu) o ante la autoridad de control de protección de datos de su lugar de residencia, o bien acudir a los tribunales.",
        ],
      },
      {
        h: "Menores de edad",
        p: [
          "Los menores de 16 años solo pueden utilizar el servicio con el consentimiento de sus padres. Solo pueden suscribirse las personas mayores de edad o el representante legal del menor.",
        ],
      },
      {
        h: "Modificación de esta política",
        p: ["Podemos actualizar esta política. La versión vigente en cada momento está disponible en esta página, junto con su fecha de entrada en vigor."],
      },
    ],
  },
};
