import type { LegalTexts } from "./types";

// Traduction française de l’original anglais (en.ts). En cas de divergence, la version anglaise fait foi.

export const legalFr: LegalTexts = {
  ui: {
    effective: "En vigueur depuis le : {date}",
    toc: "Sommaire",
    translationNote:
      "Ce document est une traduction de l’original rédigé en anglais ; en cas de divergence, la version anglaise prévaut.",
    placeholderNote: "Certaines données de l’Exploitant figurant entre crochets restent à compléter.",
  },

  terms: {
    title: "Conditions générales de vente et d’utilisation",
    lead: "Les présentes conditions régissent l’utilisation du service web {brand} ({siteUrl}, le « Service ») ainsi que les abonnements à celui-ci. En créant un QR code ou en souscrivant un abonnement, vous acceptez les présentes conditions ; si vous n’êtes pas d’accord avec elles, veuillez ne pas utiliser le Service.",
    sections: [
      {
        h: "L’Exploitant",
        p: ["Le Service est fourni par l’exploitant suivant (l’« Exploitant ») :"],
        list: [
          "Nom : {operatorName}",
          "Siège social : {operatorAddress}",
          "Immatriculation : {operatorRegistry}",
          "Numéro d’identification fiscale : {operatorTax}",
          "E-mail : {operatorEmail}",
          "Hébergeur : {hosting}",
        ],
      },
      {
        h: "Le Service",
        p: [
          "{brand} crée des QR codes dynamiques. Un QR code contient un lien court situé sur le domaine de l’Exploitant, qui redirige les visiteurs vers l’adresse web que vous indiquez (la « destination »). Vous pouvez modifier la destination à tout moment sur la page de gestion du code ; les codes déjà imprimés continuent de fonctionner.",
          "Le Service comprend également la personnalisation de l’apparence du code (couleurs, motif, logo, cadre), son téléchargement aux formats PNG et SVG, ainsi que l’affichage du nombre de scans par jour.",
          "La conception et l’aperçu d’un code sont gratuits. Pour qu’un code redirige les visiteurs et puisse être téléchargé, il doit être activé par un abonnement (voir la section 4).",
        ],
      },
      {
        h: "Conclusion du contrat et lien de gestion",
        p: [
          "Le contrat est conclu par voie électronique lors de la création d’un QR code et, pour le service payant, lors de la souscription d’un abonnement. Il n’est pas archivé par l’Exploitant et ne se réfère à aucun code de conduite.",
          "Aucune inscription avec mot de passe n’est requise. Chaque code dispose d’un lien de gestion unique et privé : toute personne qui le connaît peut gérer le code (le modifier, souscrire un abonnement, résilier l’abonnement, supprimer le code). Il vous appartient de conserver le lien de gestion en lieu sûr et de le garder confidentiel. En cas de perte, l’Exploitant ne peut vous aider que si vous êtes en mesure de prouver de manière crédible que le code vous appartient, par exemple au moyen de l’adresse e-mail utilisée pour l’abonnement.",
        ],
      },
      {
        h: "Abonnement et tarifs",
        p: [
          "Chaque QR code fait l’objet d’un abonnement distinct. L’abonnement commence par une période de découverte de {days} jours, dont le prix est de {intro}. Pendant cette période, le code fonctionne pleinement.",
          "Si vous ne résiliez pas l’abonnement avant la fin de la période de découverte, il se poursuit automatiquement à compter du jour {next} au prix mensuel de {monthly} par code, et il est renouvelé chaque mois jusqu’à sa résiliation par vos soins. Le prix mensuel est prélevé au début de chaque période sur le moyen de paiement que vous avez indiqué lors de la commande.",
          "Si vous réactivez un code dont l’abonnement a pris fin, l’abonnement redémarre sans période de découverte, au prix de {monthly} par mois, prélevé immédiatement.",
          "Le montant total à payer est clairement indiqué sur la page de paiement avant que vous ne passiez commande. La commande est passée lorsque vous appuyez sur le bouton indiquant l’obligation de paiement (ou sur le bouton du moyen de paiement choisi).",
          "Nous informons les abonnés par e-mail de toute modification des tarifs au moins 30 jours avant son entrée en vigueur ; si vous ne l’acceptez pas, vous pouvez résilier votre abonnement d’ici là.",
        ],
      },
      {
        h: "Paiement",
        p: [
          "Les paiements sont traités par {payments}. Les moyens de paiement disponibles dépendent de votre appareil, de votre navigateur et de votre pays et peuvent inclure les cartes de débit et de crédit, Apple Pay, Google Pay, PayPal et Link. L’Exploitant ne voit ni ne conserve vos données de carte.",
          "Stripe vous envoie par e-mail un reçu pour chaque paiement réussi. La facture exigée par la loi est émise par l’Exploitant.",
          "Si un prélèvement mensuel échoue, Stripe effectue une nouvelle tentative dans les jours qui suivent ; en cas de nouvel échec, l’abonnement prend fin et le code est suspendu.",
        ],
      },
      {
        h: "Résiliation",
        p: [
          "Vous pouvez résilier l’abonnement d’un code à tout moment, sans avoir à motiver votre décision, en un clic sur la page de gestion du code.",
          "La résiliation prend effet à la fin de la période en cours : jusque-là, le code continue de fonctionner et aucun autre prélèvement n’est effectué. D’ici là, vous pouvez également annuler la résiliation. Si vous résiliez pendant la période de découverte, aucun prix mensuel n’est prélevé à compter du jour {next}.",
          "Le prix d’une période déjà entamée n’est pas remboursé, sauf si vous exercez votre droit de rétractation et dans les autres cas prévus par la loi.",
        ],
      },
      {
        h: "Codes suspendus et supprimés",
        p: [
          "Si un code n’a pas d’abonnement actif, il est suspendu : les visiteurs qui le scannent voient une page d’information et ne sont pas redirigés. Vous pouvez réactiver un code suspendu à tout moment ; son lien court reste le même.",
          "Les codes qui n’ont jamais été activés sont conservés pendant {pendingDays} jours, et les codes suspendus pendant {retentionMonths} mois à compter de leur suspension ; ils sont ensuite définitivement supprimés. Vous pouvez supprimer vous-même un code à tout moment sur sa page de gestion ; sa suppression met également fin immédiatement à son abonnement.",
        ],
      },
      {
        h: "Droit de rétractation",
        p: [
          "Si vous souscrivez un abonnement en tant que consommateur, vous pouvez vous rétracter du contrat dans un délai de 14 jours à compter de la commande, sans avoir à motiver votre décision. Vous pouvez informer l’Exploitant de votre décision de rétractation au moyen d’une déclaration dénuée d’ambiguïté, par exemple par e-mail à l’adresse {operatorEmail} ; vous pouvez utiliser le modèle de formulaire de rétractation figurant à l’annexe I, partie B, de la directive 2011/83/UE, mais vous n’y êtes pas obligé.",
          "Étant donné que vous demandez expressément, lors de la commande, que l’exécution du Service commence immédiatement, vous devez, en cas de rétractation, payer un montant proportionnel à la période écoulée jusqu’à la rétractation. Nous remboursons le montant restant sur le moyen de paiement utilisé pour le paiement dans un délai de 14 jours à compter du jour où vous nous informez de votre rétractation.",
          "Le droit de rétractation n’affecte pas votre faculté de résilier l’abonnement à tout moment (voir la section 6).",
        ],
      },
      {
        h: "Conditions d’utilisation",
        p: ["Vous ne pouvez utiliser le Service qu’à des fins licites et conformément aux présentes conditions. En particulier, la destination d’un code ne peut pas mener à un contenu :"],
        list: [
          "illicite, ou portant atteinte aux droits d’autrui (par exemple au droit d’auteur ou aux droits de la personnalité) ;",
          "trompeur ou frauduleux, notamment une page d’hameçonnage ;",
          "diffusant des logiciels malveillants, ou nuisible de toute autre manière à l’appareil du visiteur ;",
          "incitant à la haine ou à la violence.",
        ],
        after: [
          "Le Service ne peut pas être utilisé pour envoyer des messages non sollicités (spam), et vous ne pouvez pas tenter de contourner ses mesures de sécurité ou de paiement ni entraver son fonctionnement. Afin de prévenir les abus, {hourlyLimit} nouveaux codes au maximum peuvent être créés par heure depuis une même adresse.",
          "L’Exploitant peut suspendre ou supprimer de tels codes sans préavis et coopérer avec les autorités compétentes ; en cas de manquement grave aux présentes conditions, l’abonnement peut être résilié avec effet immédiat. Vous pouvez signaler un contenu illicite à l’adresse {operatorEmail}.",
        ],
      },
      {
        h: "Propriété intellectuelle",
        p: [
          "Le logiciel, le design, le logo et les textes du Service sont la propriété intellectuelle de l’Exploitant ; ils ne peuvent être ni copiés, ni revendus, ni proposés comme votre propre service.",
          "Vous pouvez utiliser librement les images des QR codes que vous créez, sans obligation de citer la source. Vous êtes responsable de tout logo que vous téléversez et de votre droit de l’utiliser.",
          "« QR Code » est une marque déposée de DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Responsabilité",
        p: [
          "L’Exploitant met tout en œuvre pour assurer le fonctionnement continu et correct du Service, mais ne garantit pas qu’il sera disponible sans interruption ni erreur. Une maintenance, une erreur ou la panne d’un prestataire externe (hébergement, base de données, paiement) peut le rendre temporairement indisponible.",
          "L’Exploitant n’est responsable ni du contenu ni de la disponibilité de la destination, ni d’un code imprimé qui ne peut pas être scanné en raison de sa taille, de ses couleurs ou de la qualité d’impression. Testez toujours le code avec un téléphone avant de l’imprimer.",
          "Dans toute la mesure permise par la loi, l’Exploitant n’est pas responsable des dommages indirects ni du manque à gagner résultant de l’utilisation du Service ou de l’impossibilité de l’utiliser. Cette limitation ne s’applique ni à la responsabilité pour les dommages causés intentionnellement ou par négligence grave, ni aux atteintes à la vie, à l’intégrité physique ou à la santé, et elle n’affecte pas les droits que la loi reconnaît aux consommateurs.",
        ],
      },
      {
        h: "Disponibilité et modifications",
        p: [
          "L’Exploitant est en droit de développer et de modifier le Service. En cas d’arrêt définitif du Service, nous résilierons les abonnements et rembourserons au prorata le prix de la période non utilisée.",
        ],
      },
      {
        h: "Protection des données",
        p: ["Les modalités du traitement des données personnelles sont décrites dans la Politique de confidentialité."],
      },
      {
        h: "Modification des conditions",
        p: [
          "L’Exploitant est en droit de modifier les présentes conditions. Les modifications prennent effet dès leur publication sur cette page, à la date d’entrée en vigueur indiquée en haut du document. Nous informons les abonnés par e-mail, au moins 30 jours à l’avance, de toute modification substantielle qui leur est défavorable ; s’ils ne l’acceptent pas, ils peuvent résilier leur abonnement avant l’entrée en vigueur des modifications.",
        ],
      },
      {
        h: "Droit applicable et litiges",
        p: [
          "Les présentes conditions sont régies par le droit slovaque. Si vous utilisez le Service en tant que consommateur, ce choix de loi ne vous prive pas de la protection que vous assurent les dispositions impératives de protection des consommateurs de votre pays de résidence.",
          "Nous nous efforçons de régler tout litige à l’amiable : vous pouvez envoyer votre réclamation à l’adresse {operatorEmail}, et nous y répondons dans un délai de 30 jours. Si nous rejetons votre réclamation ou n’y répondons pas dans un délai de 30 jours, vous pouvez, en tant que consommateur, engager une procédure de règlement extrajudiciaire des litiges auprès de {adr} ou d’un autre organisme de règlement des litiges figurant sur la liste du ministère slovaque de l’Économie. Vous pouvez également vous adresser à l’autorité de protection des consommateurs et aux tribunaux de votre lieu de résidence.",
          "Les présentes conditions sont disponibles en plusieurs langues ; en cas de divergence, la version anglaise prévaut.",
        ],
      },
      {
        h: "Contact",
        p: ["Vous pouvez contacter l’Exploitant pour toute question, remarque ou réclamation à l’adresse e-mail suivante : {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    lead: "Conformément au règlement (UE) 2016/679 (règlement général sur la protection des données, RGPD), la présente politique explique quelles données personnelles nous traitons lorsque vous utilisez {brand} ({siteUrl}), à quelles fins, sur quelle base légale et pendant combien de temps, ainsi que les droits dont vous disposez.",
    sections: [
      {
        h: "Le responsable du traitement",
        list: [
          "Nom : {operatorName}",
          "Siège social : {operatorAddress}",
          "Immatriculation : {operatorRegistry}",
          "E-mail : {operatorEmail}",
        ],
        after: ["Pour toute question relative à la protection des données, vous pouvez nous joindre à l’adresse {operatorEmail}."],
      },
      {
        h: "En bref",
        list: [
          "Pas d’inscription ni de mot de passe : chaque code est géré au moyen de son lien de gestion privé.",
          "Nous ne stockons aucune donnée personnelle sur les personnes qui scannent vos codes – uniquement le nombre de scans par jour.",
          "Les paiements sont traités par Stripe ; nous ne voyons ni ne conservons vos données de carte.",
          "Nous n’utilisons aucun cookie analytique, publicitaire ou de suivi.",
        ],
      },
      {
        h: "Création et fonctionnement d’un QR code",
        p: [
          "<b>Données traitées :</b> la destination que vous indiquez (URL), le nom du code, ses paramètres d’apparence (couleurs, motif, légende, logo téléversé), l’identifiant court du code et son jeton de gestion privé, sa date de création et la date jusqu’à laquelle il est actif, ainsi que le nombre de scans par jour. La destination et le nom ne contiennent des données personnelles que si vous en saisissez (par exemple le lien d’un profil personnel).",
          "<b>Finalité :</b> la fourniture du Service – la redirection des visiteurs, la page de gestion et les statistiques. <b>Base légale :</b> l’exécution d’un contrat (article 6, paragraphe 1, point b), du RGPD).",
          "<b>Durée de conservation :</b> jusqu’à ce que vous supprimiez le code ; pour les codes jamais activés, {pendingDays} jours ; pour les codes suspendus, {retentionMonths} mois à compter de leur suspension.",
        ],
      },
      {
        h: "Prévention des abus",
        p: [
          "<b>Données traitées :</b> l’adresse IP de l’appareil qui crée un code, stockée exclusivement sous la forme d’une empreinte (hash) salée et irréversible, avec la date de création.",
          "<b>Finalité :</b> limiter la création massive et automatisée de codes ({hourlyLimit} par heure au maximum). <b>Base légale :</b> notre intérêt légitime à assurer un fonctionnement sûr et stable du Service (article 6, paragraphe 1, point f), du RGPD). <b>Durée de conservation :</b> identique à celle du code.",
        ],
      },
      {
        h: "Abonnement et paiement",
        p: [
          "Si vous souscrivez un abonnement, les données que vous saisissez dans le formulaire de paiement sont traitées par Stripe ; nous recevons les données nécessaires à la tenue du registre de vos abonnements.",
        ],
        list: [
          "Données traitées : adresse e-mail, identifiants de client et d’abonnement attribués par Stripe, statut et périodes de chaque abonnement ainsi que le code auquel il se rapporte, montant et date des paiements, type de moyen de paiement (par exemple carte, avec ses 4 derniers chiffres) et – si le formulaire de paiement les demande – pays et code postal de facturation.",
          "Finalité : la conclusion et l’exécution des abonnements, l’encaissement des paiements, la facturation et le service client.",
          "Base légale : l’exécution d’un contrat (article 6, paragraphe 1, point b), du RGPD) ; pour la tenue des documents comptables, une obligation légale (article 6, paragraphe 1, point c), du RGPD).",
          "Durée de conservation : pendant toute la durée de l’abonnement ; après sa fin, nous conservons les documents comptables pendant 10 ans en application de l’article 35 de la loi slovaque sur la comptabilité (loi n° 431/2002 Rec.). Nous supprimons les autres données à votre demande après la fin de l’abonnement.",
        ],
        after: [
          "Les paiements sont traités par {payments}, qui agit en qualité de responsable du traitement indépendant pour ce qui concerne les données de paiement et la prévention de la fraude. Vous trouverez des informations sur son traitement des données à l’adresse {paymentsPrivacy}.",
        ],
      },
      {
        h: "Prise de contact",
        p: [
          "Si vous nous écrivez, nous utilisons votre nom, votre adresse e-mail et le contenu de votre message pour vous répondre. <b>Base légale :</b> notre intérêt légitime à traiter les demandes (article 6, paragraphe 1, point f), du RGPD). <b>Durée de conservation :</b> 1 an après la clôture de la demande.",
        ],
      },
      {
        h: "Journaux techniques",
        p: [
          "Lors de la fourniture du site – comme pour tout site web –, les serveurs de l’hébergeur enregistrent des données techniques : adresse IP, date et heure de la requête, adresse demandée et type de navigateur. Cela se produit également lors du scan d’un QR code. <b>Finalité :</b> le fonctionnement sûr et ininterrompu du Service ainsi que la détection des erreurs et des abus. <b>Base légale :</b> notre intérêt légitime (article 6, paragraphe 1, point f), du RGPD). <b>Durée de conservation :</b> une courte durée, conformément aux règles de conservation des données de l’hébergeur.",
        ],
      },
      {
        h: "Cookies et stockage local",
        list: [
          "Cookie NEXT_LOCALE : mémorise la langue que vous avez choisie dans le sélecteur de langue (1 an).",
          "Stockage local (localStorage) : les liens de gestion des codes créés ou ouverts sur cet appareil, afin que vous les retrouviez sur la page « Mes codes ». La page « Mes codes » les utilise pour consulter l’état de vos codes ; pour le reste, ils demeurent dans votre navigateur, et vous pouvez les supprimer à tout moment dans les paramètres de celui-ci.",
          "Le formulaire de paiement est fourni par Stripe, qui utilise ses propres cookies pour traiter le paiement de manière sécurisée et prévenir la fraude.",
        ],
        after: ["Ces éléments sont nécessaires au fonctionnement du Service ; ils ne requièrent donc pas de consentement. Nous n’utilisons aucun cookie analytique ou publicitaire."],
      },
      {
        h: "Sous-traitants et transferts de données",
        list: [
          "Hébergement et serveur d’application : {hosting}",
          "Base de données : {database} – les données des codes sont stockées sur un serveur situé dans l’Union européenne (Irlande).",
          "Paiement : {payments} – en qualité de responsable du traitement indépendant.",
        ],
        after: [
          "Certains de ces prestataires ont leur siège aux États-Unis d’Amérique ; des données peuvent donc également être transférées hors de l’Espace économique européen. Ces transferts s’effectuent moyennant des garanties appropriées (le cadre de protection des données UE–États-Unis [Data Privacy Framework] et/ou les clauses contractuelles types adoptées par la Commission européenne).",
          "Nous ne communiquons vos données à aucun autre tiers, nous ne les vendons pas et nous ne les utilisons pas à des fins de marketing, de profilage ou de prise de décision automatisée. Nous ne communiquons des données aux autorités que lorsque la loi l’exige.",
        ],
      },
      {
        h: "Sécurité des données",
        p: [
          "Toutes les connexions sont chiffrées (HTTPS). Le jeton de gestion est une valeur aléatoire de 192 bits, les adresses IP ne sont stockées que sous forme d’empreintes salées, et seul l’Exploitant a accès à la base de données.",
        ],
      },
      {
        h: "Vos droits",
        list: [
          "droit à l’information et droit d’accès (article 15 du RGPD) ;",
          "droit de rectification (article 16) ;",
          "droit à l’effacement (article 17) – vous pouvez également supprimer vous-même un code à tout moment sur sa page de gestion ;",
          "droit à la limitation du traitement (article 18) ;",
          "droit à la portabilité des données (article 20) ;",
          "droit d’opposition au traitement fondé sur l’intérêt légitime (article 21).",
        ],
        after: [
          "Vous pouvez envoyer votre demande à l’adresse {operatorEmail}. Pour identifier un code, indiquez son lien court. Nous répondons dans un délai d’un mois au plus.",
        ],
      },
      {
        h: "Voies de recours",
        p: [
          "Si vous estimez que le traitement de vos données personnelles enfreint la loi, vous pouvez introduire une réclamation auprès de l’autorité de contrôle du siège du responsable du traitement, l’Office de protection des données personnelles de la République slovaque ({authority}), ou auprès de l’autorité de protection des données de votre lieu de résidence ou de travail – en Hongrie, par exemple, l’Autorité nationale hongroise de protection des données et de liberté de l’information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH ; 1055 Budapest, Falk Miksa utca 9–11. ; https://naih.hu).",
          "En cas de violation de vos droits, vous pouvez également saisir la justice ; vous pouvez intenter l’action devant les juridictions de l’État membre de votre lieu de résidence.",
        ],
      },
      {
        h: "Enfants",
        p: ["Le Service n’est pas destiné aux enfants de moins de 16 ans, et nous ne traitons pas sciemment leurs données. Seuls les adultes peuvent souscrire un abonnement."],
      },
      {
        h: "Modification de la présente politique",
        p: ["Nous mettons à jour la présente politique à chaque évolution du Service ; la date d’entrée en vigueur est indiquée en haut du document."],
      },
    ],
  },
};
