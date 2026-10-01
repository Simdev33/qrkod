import type { LegalTexts } from "./types";

// Traducción al español (España) del original en inglés (en.ts). En caso de discrepancia prevalece la versión inglesa.

export const legalEs: LegalTexts = {
  ui: {
    effective: "Vigente desde: {date}",
    toc: "Índice",
    translationNote:
      "Este documento es una traducción del original en inglés; en caso de discrepancia, prevalecerá la versión inglesa.",
    placeholderNote: "Algunos datos del Operador que figuran entre corchetes aún están pendientes de completar.",
  },

  terms: {
    title: "Términos y condiciones",
    lead: "Estos términos regulan el uso del servicio web {brand} ({siteUrl}, el «Servicio») y las suscripciones al mismo. Al crear un código QR o contratar una suscripción, usted acepta estos términos; si no está de acuerdo con ellos, le rogamos que no utilice el Servicio.",
    sections: [
      {
        h: "El Operador",
        p: ["El Servicio lo presta el siguiente operador (el «Operador»):"],
        list: [
          "Nombre: {operatorName}",
          "Domicilio social: {operatorAddress}",
          "Registro: {operatorRegistry}",
          "Número de identificación fiscal: {operatorTax}",
          "Correo electrónico: {operatorEmail}",
          "Proveedor de alojamiento: {hosting}",
        ],
      },
      {
        h: "El Servicio",
        p: [
          "{brand} crea códigos QR dinámicos. Un código QR contiene un enlace corto alojado en el dominio del Operador que redirige a los visitantes a la dirección web que usted indique (el «destino»). Puede cambiar el destino en cualquier momento en la página de gestión del código; los códigos ya impresos siguen funcionando.",
          "El Servicio incluye también la personalización del aspecto del código (colores, patrón, logotipo, marco), su descarga en formato PNG y SVG y la visualización del número diario de escaneos.",
          "El diseño y la vista previa de un código son gratuitos. Para que un código redirija a los visitantes y pueda descargarse, debe activarse mediante una suscripción (véase el apartado 4).",
        ],
      },
      {
        h: "Celebración del contrato y enlace de gestión",
        p: [
          "El contrato se celebra por vía electrónica al crear un código QR y, en el caso del servicio de pago, al contratar una suscripción. El Operador no lo archiva y no remite a ningún código de conducta.",
          "No existe registro con contraseña. Cada código tiene un enlace de gestión único y privado: cualquier persona que lo conozca puede gestionar el código (modificarlo, suscribirse, cancelar la suscripción o eliminar el código). Usted es responsable de conservar el enlace de gestión de forma segura y confidencial. Si lo pierde, el Operador solo podrá ayudarle si usted puede acreditar de forma verosímil que el código le pertenece, por ejemplo, mediante la dirección de correo electrónico utilizada para la suscripción.",
        ],
      },
      {
        h: "Suscripción y tarifas",
        p: [
          "Cada código QR tiene su propia suscripción. La suscripción comienza con un periodo introductorio de {days} días, cuya tarifa es de {intro}. Durante este periodo, el código funciona plenamente.",
          "Si no cancela la suscripción antes de que finalice el periodo introductorio, a partir del día {next} esta continúa automáticamente con una tarifa mensual de {monthly} por código y se renueva cada mes hasta que usted la cancele. La tarifa mensual se cobra al inicio de cada periodo mediante el método de pago que usted haya indicado al contratar.",
          "Si reactiva un código cuya suscripción haya finalizado, la suscripción se reanuda sin periodo introductorio, por {monthly} al mes, con cargo inmediato.",
          "El importe total que debe pagarse se muestra claramente en la página de pago antes de que realice su pedido. El pedido se realiza al pulsar el botón que indica la obligación de pago (o el botón del método de pago seleccionado).",
          "Notificaremos a los suscriptores por correo electrónico cualquier cambio en las tarifas con al menos 30 días de antelación a su entrada en vigor; si no lo acepta, puede cancelar su suscripción antes de esa fecha.",
        ],
      },
      {
        h: "Pago",
        p: [
          "Los pagos son procesados por {payments}. Los métodos de pago disponibles dependen de su dispositivo, navegador y país, y pueden incluir tarjetas de débito y de crédito, Apple Pay, Google Pay, PayPal y Link. El Operador no ve ni almacena los datos de su tarjeta.",
          "Stripe le envía por correo electrónico un justificante de cada pago realizado correctamente. La factura exigida por la ley la emite el Operador.",
          "Si falla un cargo mensual, Stripe volverá a intentarlo en un plazo de pocos días; si sigue sin poder efectuarse, la suscripción finaliza y el código queda en pausa.",
        ],
      },
      {
        h: "Cancelación",
        p: [
          "Puede cancelar la suscripción de un código en cualquier momento, sin necesidad de indicar el motivo, en la página de gestión del código, con un solo clic.",
          "La cancelación surte efecto al final del periodo en curso: hasta entonces, el código sigue funcionando y no se realizan más cargos. Hasta ese momento, también puede revocar la cancelación. Si cancela durante el periodo introductorio, no se cobrará ninguna tarifa mensual a partir del día {next}.",
          "No se reembolsa la tarifa de un periodo ya iniciado, salvo en caso de que ejerza su derecho de desistimiento y en los demás casos exigidos por la ley.",
        ],
      },
      {
        h: "Códigos en pausa y eliminados",
        p: [
          "Si un código no tiene ninguna suscripción activa, queda en pausa: los visitantes que lo escaneen verán una página informativa y no serán redirigidos. Puede reactivar un código en pausa en cualquier momento; su enlace corto sigue siendo el mismo.",
          "Los códigos que nunca se han activado se conservan durante {pendingDays} días, y los códigos en pausa, durante {retentionMonths} meses desde que quedaron en pausa; transcurrido ese plazo, se eliminan definitivamente. Puede eliminar usted mismo un código en cualquier momento en su página de gestión; al eliminarlo, su suscripción también finaliza de inmediato.",
        ],
      },
      {
        h: "Derecho de desistimiento",
        p: [
          "Si contrata una suscripción como consumidor, puede desistir del contrato en un plazo de 14 días desde la contratación sin necesidad de indicar el motivo. Puede comunicar al Operador su decisión de desistir mediante una declaración inequívoca, por ejemplo, por correo electrónico a {operatorEmail}; puede utilizar el modelo de formulario de desistimiento del anexo I, parte B, de la Directiva 2011/83/UE, aunque no está obligado a hacerlo.",
          "Dado que, al contratar, usted solicita expresamente que la prestación del Servicio comience de inmediato, si desiste deberá abonar un importe proporcional al periodo utilizado hasta el desistimiento. Le reembolsaremos el importe restante, mediante el mismo método de pago utilizado para el pago, en un plazo de 14 días desde el día en que nos comunique su desistimiento.",
          "El derecho de desistimiento no afecta a la posibilidad de cancelar la suscripción en cualquier momento (véase el apartado 6).",
        ],
      },
      {
        h: "Condiciones de uso",
        p: ["Solo puede utilizar el Servicio con fines lícitos y de conformidad con estos términos. En particular, el destino de un código no puede conducir a contenidos:"],
        list: [
          "ilícitos o que vulneren los derechos de terceros (por ejemplo, derechos de autor o derechos de la personalidad);",
          "engañosos o fraudulentos, en particular páginas de phishing;",
          "que distribuyan software malicioso o que resulten de otro modo perjudiciales para el dispositivo del visitante;",
          "que inciten al odio o a la violencia.",
        ],
        after: [
          "El Servicio no puede utilizarse para enviar mensajes no solicitados (spam), y no debe intentar eludir sus medidas de seguridad o de pago ni obstaculizar su funcionamiento. Para evitar abusos, desde una misma dirección pueden crearse como máximo {hourlyLimit} códigos nuevos por hora.",
          "El Operador puede suspender o eliminar dichos códigos sin previo aviso y colaborar con las autoridades competentes; en caso de incumplimiento grave de estos términos, la suscripción puede resolverse con efecto inmediato. Puede denunciar contenidos ilícitos en {operatorEmail}.",
        ],
      },
      {
        h: "Propiedad intelectual",
        p: [
          "El software, el diseño, el logotipo y los textos del Servicio son propiedad intelectual del Operador; no pueden copiarse, revenderse ni ofrecerse como servicio propio.",
          "Puede utilizar libremente las imágenes de los códigos QR que cree, sin necesidad de atribución. Usted es responsable de cualquier logotipo que suba y de su derecho a utilizarlo.",
          "«QR Code» es una marca registrada de DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Responsabilidad",
        p: [
          "El Operador hace todo lo posible por garantizar el funcionamiento continuo y correcto del Servicio, pero no garantiza que esté disponible sin interrupciones ni errores. Las tareas de mantenimiento, los errores o la caída de un proveedor externo (alojamiento, base de datos, pagos) pueden hacer que no esté disponible temporalmente.",
          "El Operador no se hace responsable del contenido ni de la disponibilidad del destino, ni de que un código impreso no pueda escanearse debido a su tamaño, sus colores o la calidad de impresión. Pruebe siempre el código con un teléfono antes de imprimirlo.",
          "En la máxima medida permitida por la ley, el Operador no responde de los daños indirectos ni del lucro cesante derivados del uso o de la imposibilidad de uso del Servicio. Esta limitación no se aplica a la responsabilidad por daños causados de forma intencionada o por negligencia grave, ni por daños a la vida, la integridad física o la salud, y no afecta a los derechos que la ley reconoce a los consumidores.",
        ],
      },
      {
        h: "Disponibilidad y modificaciones",
        p: [
          "El Operador está facultado para desarrollar y modificar el Servicio. Si el Servicio se interrumpe de forma definitiva, resolveremos las suscripciones y reembolsaremos la tarifa del periodo no utilizado de forma proporcional.",
        ],
      },
      {
        h: "Protección de datos",
        p: ["Los detalles del tratamiento de los datos personales se recogen en la Política de privacidad."],
      },
      {
        h: "Modificación de los términos",
        p: [
          "El Operador está facultado para modificar estos términos. Las modificaciones surten efecto con su publicación en esta página, en la fecha de entrada en vigor indicada al principio del documento. Notificaremos a los suscriptores por correo electrónico, con al menos 30 días de antelación, cualquier modificación sustancial que les resulte desfavorable; si no la aceptan, pueden cancelar su suscripción antes de que entre en vigor.",
        ],
      },
      {
        h: "Legislación aplicable y resolución de litigios",
        p: [
          "Estos términos se rigen por la legislación eslovaca. Si utiliza el Servicio como consumidor, esta elección de ley no le priva de la protección que le otorgan las disposiciones imperativas en materia de protección de los consumidores de su país de residencia.",
          "Procuramos resolver cualquier litigio de forma amistosa: puede enviar su reclamación a {operatorEmail} y le responderemos en un plazo de 30 días. Si rechazamos su reclamación o no respondemos en un plazo de 30 días, como consumidor puede iniciar un procedimiento de resolución alternativa de litigios ante {adr} o ante otra entidad de resolución de litigios incluida en la lista del Ministerio de Economía eslovaco. También puede dirigirse a la autoridad de protección de los consumidores y a los tribunales de su lugar de residencia.",
          "Estos términos están disponibles en varios idiomas; en caso de discrepancia, prevalecerá la versión inglesa.",
        ],
      },
      {
        h: "Contacto",
        p: ["Puede ponerse en contacto con el Operador para cualquier pregunta, comentario o reclamación en la siguiente dirección de correo electrónico: {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Política de privacidad",
    lead: "De conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos, RGPD), esta política explica qué datos personales tratamos cuando usted utiliza {brand} ({siteUrl}), con qué finalidad, sobre qué base jurídica y durante cuánto tiempo, así como los derechos que le asisten.",
    sections: [
      {
        h: "Responsable del tratamiento",
        list: [
          "Nombre: {operatorName}",
          "Domicilio social: {operatorAddress}",
          "Registro: {operatorRegistry}",
          "Correo electrónico: {operatorEmail}",
        ],
        after: ["Para cuestiones relacionadas con la protección de datos, puede ponerse en contacto con nosotros en {operatorEmail}."],
      },
      {
        h: "En resumen",
        list: [
          "No hay registro ni contraseña; cada código se gestiona con su enlace de gestión privado.",
          "No almacenamos ningún dato personal de las personas que escanean sus códigos, solo el número diario de escaneos.",
          "Los pagos son procesados por Stripe; no vemos ni almacenamos los datos de su tarjeta.",
          "No utilizamos cookies analíticas, publicitarias ni de seguimiento.",
        ],
      },
      {
        h: "Creación y funcionamiento de un código QR",
        p: [
          "<b>Datos tratados:</b> el destino que introduzca (URL), el nombre del código, su configuración de diseño (colores, patrón, etiqueta, logotipo subido), el identificador corto del código y su token de gestión privado, la fecha de creación y la fecha hasta la que está activo, así como el número diario de escaneos. El destino y el nombre solo contienen datos personales si usted introduce tales datos (por ejemplo, un enlace a un perfil personal).",
          "<b>Finalidad:</b> la prestación del Servicio, es decir, la redirección de los visitantes, la página de gestión y las estadísticas. <b>Base jurídica:</b> ejecución de un contrato (artículo 6, apartado 1, letra b), del RGPD).",
          "<b>Conservación:</b> hasta que usted elimine el código; los códigos que nunca se han activado, durante {pendingDays} días; los códigos en pausa, durante {retentionMonths} meses desde que quedaron en pausa.",
        ],
      },
      {
        h: "Prevención de abusos",
        p: [
          "<b>Datos tratados:</b> la dirección IP del dispositivo que crea un código, almacenada únicamente como hash con sal irreversible, junto con la fecha de creación.",
          "<b>Finalidad:</b> limitar la creación masiva y automatizada de códigos (como máximo {hourlyLimit} por hora). <b>Base jurídica:</b> nuestro interés legítimo en el funcionamiento seguro y estable del Servicio (artículo 6, apartado 1, letra f), del RGPD). <b>Conservación:</b> junto con el código.",
        ],
      },
      {
        h: "Suscripción y pago",
        p: [
          "Si se suscribe, los datos que introduzca en el formulario de pago son tratados por Stripe; nosotros recibimos los datos necesarios para llevar el registro de sus suscripciones.",
        ],
        list: [
          "Datos tratados: dirección de correo electrónico, los identificadores de cliente y de suscripción asignados por Stripe, el estado y los periodos de cada suscripción y el código al que corresponde, el importe y la fecha de los pagos, el tipo de método de pago (por ejemplo, tarjeta, y sus 4 últimas cifras) y, si el formulario de pago los solicita, el país y el código postal de facturación.",
          "Finalidad: la contratación y ejecución de las suscripciones, el cobro de las tarifas, la facturación y la atención al cliente.",
          "Base jurídica: ejecución de un contrato (artículo 6, apartado 1, letra b), del RGPD); para la llevanza de los registros contables, el cumplimiento de una obligación legal (artículo 6, apartado 1, letra c), del RGPD).",
          "Conservación: mientras exista la suscripción; una vez finalizada, conservamos los registros contables durante 10 años conforme al artículo 35 de la Ley de Contabilidad eslovaca (Ley n.º 431/2002 Rec.). Los demás datos los suprimimos a petición suya una vez finalizada la suscripción.",
        ],
        after: [
          "Los pagos son procesados por {payments}, que actúa como responsable independiente del tratamiento en lo que respecta a los datos de pago y a la prevención del fraude. Puede consultar información sobre su tratamiento de datos en {paymentsPrivacy}.",
        ],
      },
      {
        h: "Contacto con nosotros",
        p: [
          "Si nos escribe, utilizamos su nombre, su dirección de correo electrónico y el contenido de su mensaje para responderle. <b>Base jurídica:</b> nuestro interés legítimo en la gestión de las consultas (artículo 6, apartado 1, letra f), del RGPD). <b>Conservación:</b> durante 1 año desde el cierre del asunto.",
        ],
      },
      {
        h: "Registros técnicos",
        p: [
          "Al servir el sitio, como ocurre con cualquier sitio web, los servidores del proveedor de alojamiento registran datos técnicos: dirección IP, hora de la solicitud, dirección solicitada y tipo de navegador. Esto también ocurre cuando se escanea un código QR. <b>Finalidad:</b> el funcionamiento seguro e ininterrumpido del Servicio y la detección de errores y abusos. <b>Base jurídica:</b> nuestro interés legítimo (artículo 6, apartado 1, letra f), del RGPD). <b>Conservación:</b> durante un breve periodo, conforme a las normas de conservación de datos del proveedor de alojamiento.",
        ],
      },
      {
        h: "Cookies y almacenamiento local",
        list: [
          "Cookie NEXT_LOCALE: recuerda el idioma que haya elegido en el selector de idioma (1 año).",
          "Almacenamiento local (localStorage): los enlaces de gestión de los códigos creados o abiertos en este dispositivo, para que pueda encontrarlos en la página «Mis códigos». La página «Mis códigos» los utiliza para consultar el estado de sus códigos; por lo demás, permanecen en su navegador y puede eliminarlos en cualquier momento desde la configuración del navegador.",
          "El formulario de pago lo proporciona Stripe, que utiliza sus propias cookies para procesar el pago de forma segura y prevenir el fraude.",
        ],
        after: ["Son necesarias para el funcionamiento del Servicio, por lo que no requieren consentimiento. No utilizamos cookies analíticas ni publicitarias."],
      },
      {
        h: "Encargados del tratamiento y transferencias de datos",
        list: [
          "Alojamiento y servidor de aplicaciones: {hosting}",
          "Base de datos: {database} – los datos de los códigos se almacenan en un servidor situado en la Unión Europea (Irlanda).",
          "Pagos: {payments} – en calidad de responsable independiente del tratamiento.",
        ],
        after: [
          "Algunos de estos proveedores tienen su sede en los Estados Unidos de América, por lo que los datos también pueden transferirse fuera del Espacio Económico Europeo. Dichas transferencias se realizan con las garantías adecuadas (el Marco de Privacidad de Datos UE-EE. UU. y/o las cláusulas contractuales tipo adoptadas por la Comisión Europea).",
          "No compartimos sus datos con ningún otro tercero, no los vendemos y no los utilizamos con fines de marketing, elaboración de perfiles ni decisiones automatizadas. Solo comunicamos datos a las autoridades cuando la ley lo exige.",
        ],
      },
      {
        h: "Seguridad de los datos",
        p: [
          "Todas las conexiones están cifradas (HTTPS). El token de gestión es un valor aleatorio de 192 bits, las direcciones IP solo se almacenan como hash con sal y únicamente el Operador tiene acceso a la base de datos.",
        ],
      },
      {
        h: "Sus derechos",
        list: [
          "derecho de información y de acceso (artículo 15 del RGPD);",
          "derecho de rectificación (artículo 16);",
          "derecho de supresión (artículo 17) – también puede eliminar usted mismo un código en cualquier momento en su página de gestión;",
          "derecho a la limitación del tratamiento (artículo 18);",
          "derecho a la portabilidad de los datos (artículo 20);",
          "derecho de oposición al tratamiento basado en el interés legítimo (artículo 21).",
        ],
        after: [
          "Puede enviar su solicitud a {operatorEmail}. Para identificar un código, indique su enlace corto. Le responderemos en el plazo máximo de un mes.",
        ],
      },
      {
        h: "Vías de recurso",
        p: [
          "Si considera que el tratamiento de sus datos personales infringe la ley, puede presentar una reclamación ante la autoridad de control del domicilio social del responsable, la Oficina de Protección de Datos Personales de la República Eslovaca ({authority}), o ante la autoridad de protección de datos de su lugar de residencia o de trabajo; en Hungría, por ejemplo, la Autoridad Nacional Húngara de Protección de Datos y Libertad de Información (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "Si se vulneran sus derechos, también puede acudir a los tribunales; puede interponer la acción ante los tribunales del Estado miembro de su lugar de residencia.",
        ],
      },
      {
        h: "Menores de edad",
        p: ["El Servicio no está dirigido a menores de 16 años y no tratamos sus datos a sabiendas. Solo las personas mayores de edad pueden contratar una suscripción."],
      },
      {
        h: "Modificación de esta política",
        p: ["Actualizamos esta política cada vez que el Servicio cambia; la fecha de entrada en vigor figura al principio del documento."],
      },
    ],
  },
};
