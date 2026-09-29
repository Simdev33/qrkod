import type { LegalTexts } from "./types";

// Traduction française. En cas de divergence, la version hongroise (hu.ts) fait foi.

export const legalFr: LegalTexts = {
  ui: {
    effective: "En vigueur depuis le : {date}",
    toc: "Sommaire",
    translationNote:
      "Ce document est une traduction de l’original rédigé en hongrois. En cas de divergence, la version hongroise prévaut.",
    placeholderNote:
      "Les données du Prestataire figurant entre crochets restent à compléter. Sans elles, le document n’est pas complet.",
  },

  terms: {
    title: "Conditions générales de vente et d’utilisation",
    lead: "Le présent document définit les conditions d’utilisation du service de QR codes dynamiques {brand} ({siteUrl}). En utilisant le service – en créant un QR code ou en souscrivant un abonnement –, vous acceptez les présentes conditions.",
    sections: [
      {
        h: "Informations sur le Prestataire",
        list: [
          "Nom : {operatorName}",
          "Siège social : {operatorAddress}",
          "Numéro d’immatriculation : {operatorRegistry}",
          "Numéro fiscal : {operatorTax}",
          "E-mail : {operatorEmail}",
          "Hébergeur : {hosting}",
        ],
      },
      {
        h: "Le service",
        p: [
          "{brand} crée des QR codes dynamiques. Le QR code contient un lien court situé sur le domaine du Prestataire, qui redirige vers l’adresse web indiquée par l’Utilisateur. L’adresse de destination peut être modifiée à tout moment sur la page de gestion du code ; un code déjà imprimé reste utilisable sans aucun changement.",
          "Le service comprend la personnalisation de l’apparence du code (couleurs, motif, logo, cadre), le téléchargement du code aux formats PNG et SVG, ainsi que l’affichage du nombre quotidien de scans.",
        ],
      },
      {
        h: "Conclusion du contrat et lien de gestion",
        p: [
          "Le contrat est conclu par voie électronique, lors de la création du QR code. Il ne constitue pas un contrat écrit, le Prestataire ne l’archive pas et, en dehors des présentes CGVU, il ne se réfère à aucun code de conduite.",
          "Aucune inscription n’est requise. Chaque code est associé à un lien de gestion unique et secret : toute personne qui le connaît peut gérer le code (le modifier, y souscrire un abonnement, résilier l’abonnement, le supprimer). La conservation et la confidentialité du lien de gestion relèvent de la responsabilité de l’Utilisateur. En cas de perte, le Prestataire ne peut vous aider que si le droit d’accès peut être justifié de manière probante par un autre moyen (par exemple, par l’adresse e-mail utilisée pour l’abonnement).",
        ],
      },
      {
        h: "Période gratuite",
        p: [
          "Chaque nouveau code fonctionne gratuitement pendant {trialDays} jours à compter de sa création. Aucune carte bancaire n’est nécessaire, et l’expiration de la période gratuite n’entraîne, en elle-même, aucune obligation de paiement.",
        ],
      },
      {
        h: "Abonnement et tarifs",
        p: [
          "À l’issue de la période gratuite, le code continue de fonctionner grâce à un abonnement. Le prix de l’abonnement est de {price} par mois et par code. {vatNote}",
          "Le paiement s’effectue par carte bancaire, sur l’interface de paiement sécurisée de Stripe ; les données de carte ne parviennent pas au Prestataire. Stripe prélève le montant chaque mois, à l’avance. Le prix indiqué en dollars peut être converti par la banque émettrice de la carte à son propre taux de change.",
          "Si vous vous abonnez pendant la période gratuite, le premier prélèvement a lieu à la fin de la période gratuite, à condition qu’il en reste au moins deux jours ; dans le cas contraire, l’abonnement et le prélèvement démarrent immédiatement. L’abonnement est ensuite renouvelé automatiquement chaque mois jusqu’à sa résiliation par vos soins.",
          "Nous envoyons un justificatif électronique de chaque paiement à l’adresse e-mail indiquée lors de l’abonnement.",
          "Le Prestataire peut modifier le prix pour l’avenir. Il vous informe de toute modification au moins 30 jours à l’avance, à l’adresse e-mail indiquée lors de l’abonnement ; la modification prend effet à partir de la période de facturation suivante. Si vous ne l’acceptez pas, vous pouvez résilier l’abonnement d’ici là.",
        ],
      },
      {
        h: "Résiliation",
        p: [
          "L’abonnement peut être résilié à tout moment, en un clic, sur la page de gestion du code. La résiliation prend effet à la fin de la période déjà payée ; jusque-là, le code continue de fonctionner et la résiliation peut être annulée. Il n’y a aucune durée d’engagement.",
          "Le montant de la période de facturation entamée n’est pas remboursé, sauf disposition légale contraire – notamment en matière de droit de rétractation.",
        ],
      },
      {
        h: "Suspension et suppression du code",
        p: [
          "Si le code ne bénéficie ni d’une période gratuite en cours ni d’un abonnement payé, il est suspendu : les personnes qui le scannent voient une page d’information et la redirection ne fonctionne pas. Le code peut être réactivé à tout moment par un abonnement, avec le même lien court.",
          "Nous conservons le code suspendu et ses paramètres pendant {retentionMonths} mois à compter du début de la suspension, puis nous le supprimons définitivement. Vous pouvez supprimer le code immédiatement, à tout moment, sur la page de gestion ; la suppression met également fin immédiatement à l’éventuel abonnement.",
        ],
      },
      {
        h: "Droit de rétractation",
        p: [
          "Si vous êtes un consommateur, vous pouvez, en vertu du décret gouvernemental hongrois n° 45/2014 (II. 26.) relatif aux contrats entre consommateurs et professionnels, vous rétracter du contrat sans avoir à motiver votre décision, dans un délai de 14 jours à compter de la souscription de l’abonnement. Vous pouvez envoyer votre déclaration de rétractation à l’adresse {operatorEmail} ; vous pouvez utiliser à cet effet le modèle ci-dessous, mais ce n’est pas obligatoire.",
          "Lors de la souscription, vous pouvez demander expressément que le Prestataire commence à fournir le service payant avant l’expiration du délai de rétractation. Dans ce cas, si vous vous rétractez malgré tout dans ce délai, vous devez payer un montant proportionnel au service déjà fourni ; et si le service a été entièrement exécuté avant la fin du délai, vous perdez votre droit de rétractation.",
          "En cas de rétractation, nous remboursons le montant payé – déduction faite de l’éventuel montant proportionnel – au plus tard dans les 14 jours suivant la réception de la déclaration de rétractation, par le moyen de paiement initial.",
        ],
        list: [
          "Modèle de formulaire de rétractation – Destinataire : {operatorName}, {operatorEmail}",
          "Par la présente, je vous notifie ma rétractation du contrat portant sur la prestation du service suivant : abonnement {brand}, lien court du QR code : …",
          "Date de conclusion du contrat : … · Nom et adresse du consommateur : … · Date : …",
        ],
      },
      {
        h: "Obligations de l’Utilisateur, utilisation interdite",
        p: [
          "L’Utilisateur est responsable du contenu de l’adresse de destination indiquée. Il est interdit de diriger le code vers un contenu illicite, trompeur (en particulier d’hameçonnage), diffusant des logiciels malveillants, incitant à la haine ou portant atteinte aux droits de tiers, ainsi que d’utiliser le service pour diffuser des messages non sollicités.",
          "Le Prestataire est en droit de suspendre ou de supprimer un tel code sans préavis et de coopérer avec les autorités compétentes. Vous pouvez signaler un contenu illicite à l’adresse {operatorEmail}.",
          "L’utilisation massive et automatisée du service peut être limitée ; actuellement, {hourlyLimit} nouveaux codes au maximum peuvent être créés par heure depuis une même adresse.",
        ],
      },
      {
        h: "Disponibilité et responsabilité",
        p: [
          "Le Prestataire s’efforce d’assurer un fonctionnement continu, mais ne garantit pas une disponibilité ininterrompue et exempte d’erreurs. En raison d’une maintenance, d’une panne ou de la défaillance d’un prestataire externe (hébergement, base de données, paiement), le service peut être temporairement indisponible.",
          "Le Prestataire n’est pas responsable du contenu ni de l’accessibilité de l’adresse de destination, ni du fait qu’un code imprimé ne puisse pas être scanné en raison d’une taille, d’une couleur ou d’une qualité d’impression inadaptées. Testez toujours le code avant de l’imprimer.",
          "Dans la mesure permise par la loi, la responsabilité du Prestataire pour un code donné est limitée au montant payé pour ce code au cours des 12 mois précédant la survenance du dommage. Cette limitation ne s’applique ni aux dommages causés intentionnellement ou par négligence grave, ni aux dommages résultant d’une atteinte à la vie, à l’intégrité physique ou à la santé, et elle n’affecte pas les droits que la loi reconnaît aux consommateurs.",
        ],
      },
      {
        h: "Propriété intellectuelle",
        p: [
          "Le site web, le logiciel et l’identité visuelle de {brand} sont la propriété intellectuelle du Prestataire. Vous pouvez utiliser l’image du QR code que vous avez créé sans restriction et gratuitement. Vous êtes responsable du logo que vous téléversez et de vos droits d’utilisation sur celui-ci.",
          "« QR Code » est une marque déposée de DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Traitement des réclamations et voies de recours",
        p: [
          "Vous pouvez envoyer votre réclamation à l’adresse {operatorEmail} ; nous y répondons sur le fond dans un délai de 30 jours au plus.",
          "Si la réclamation ne peut être réglée, vous pouvez, en tant que consommateur, vous adresser à la commission de conciliation compétente pour votre lieu de domicile ou de résidence ou à l’autorité de protection des consommateurs, ou encore saisir les tribunaux. Si vous êtes un consommateur résidant dans un autre État membre de l’Union européenne, vous pouvez également demander l’aide du réseau des Centres européens des consommateurs (ECC-Net).",
        ],
      },
      {
        h: "Modification des CGVU, langue et droit applicable",
        p: [
          "Le Prestataire peut modifier les CGVU. Il publie toute modification sur cette page au moins 15 jours avant son entrée en vigueur et en informe également les abonnés par e-mail. La modification n’affecte pas la période déjà payée.",
          "Les CGVU sont régies par le droit hongrois. S’agissant d’un consommateur, ce choix ne le prive pas de la protection que lui assurent les dispositions impératives de protection des consommateurs de l’État de sa résidence habituelle.",
          "Les CGVU ont été rédigées en hongrois ; les versions dans d’autres langues sont des traductions. En cas de divergence, la version hongroise prévaut.",
        ],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    lead: "La présente politique décrit les données personnelles que nous traitons lors de l’utilisation de {brand} ({siteUrl}), à quelles fins et pendant combien de temps, ainsi que les droits dont vous disposez. Le traitement des données est effectué conformément au règlement général sur la protection des données de l’Union européenne (RGPD) et à la loi hongroise n° CXII de 2011 relative au droit à l’autodétermination informationnelle et à la liberté de l’information.",
    sections: [
      {
        h: "Le responsable du traitement",
        list: ["Nom : {operatorName}", "Siège social : {operatorAddress}", "E-mail : {operatorEmail}"],
        after: ["Nous ne sommes pas tenus de désigner un délégué à la protection des données."],
      },
      {
        h: "En bref",
        list: [
          "Pas d’inscription ni de mot de passe, et nous n’utilisons aucun cookie publicitaire, analytique ou de suivi.",
          "Nous ne stockons aucune donnée personnelle sur les personnes qui scannent les QR codes, uniquement le nombre quotidien de scans.",
          "Vos données de carte bancaire restent chez Stripe ; nous n’y avons pas accès.",
        ],
      },
      {
        h: "Création et fonctionnement du QR code",
        p: [
          "<b>Données traitées :</b> l’adresse de destination indiquée (URL), le nom du code, les paramètres d’apparence (couleurs, motif, légende, logo téléversé), l’identifiant court du code et son jeton de gestion secret, les dates de création et d’expiration, ainsi que le nombre quotidien de scans. L’adresse de destination et le nom ne contiennent des données personnelles que si vous en indiquez (par exemple le lien d’un profil personnel).",
          "<b>Finalité :</b> la fourniture du service – le fonctionnement de la redirection, de la page de gestion et des statistiques. <b>Base légale :</b> l’exécution du contrat (article 6, paragraphe 1, point b) du RGPD).",
          "<b>Durée de conservation :</b> jusqu’à ce que vous supprimiez le code ; pour un code suspendu, au plus {retentionMonths} mois à compter du début de la suspension.",
        ],
      },
      {
        h: "Prévention des abus",
        p: [
          "<b>Données traitées :</b> l’adresse IP de l’appareil qui crée le code, exclusivement sous la forme d’une empreinte (hash) salée et irréversible, avec la date de création.",
          "<b>Finalité :</b> limiter la création massive et automatisée de codes ({hourlyLimit} codes par heure au maximum). <b>Base légale :</b> notre intérêt légitime à assurer un fonctionnement sûr et stable du service (article 6, paragraphe 1, point f) du RGPD). <b>Durée de conservation :</b> identique à celle du code.",
        ],
      },
      {
        h: "Abonnement et paiement",
        p: [
          "Lors de la souscription, les données de paiement (nom, adresse e-mail, données de carte bancaire, pays de facturation) sont collectées et traitées par Stripe, en qualité de responsable du traitement distinct pour ce qui concerne l’exécution du paiement et la prévention de la fraude, conformément à sa propre politique de confidentialité.",
          "<b>Données qui nous sont transmises :</b> les identifiants Stripe du client et de l’abonnement, le statut et les périodes de l’abonnement ; sur l’interface de Stripe, nous avons accès au nom, à l’adresse e-mail et au pays de facturation du client ainsi qu’aux paiements. Nous ne voyons pas le numéro de carte bancaire.",
          "<b>Finalité :</b> la gestion de l’abonnement et l’encaissement du prix, les notifications relatives à l’abonnement. <b>Base légale :</b> l’exécution du contrat (article 6, paragraphe 1, point b) du RGPD) ; la conservation des pièces comptables constitue une obligation légale (article 6, paragraphe 1, point c) du RGPD, article 169 de la loi hongroise n° C de 2000 sur la comptabilité).",
          "<b>Durée de conservation :</b> jusqu’à la fin de l’abonnement ; les pièces comptables pendant 8 ans.",
        ],
      },
      {
        h: "Prise de contact",
        p: [
          "Si vous nous écrivez par e-mail, nous utilisons votre nom, votre adresse e-mail et le contenu de votre message pour répondre à votre demande. <b>Base légale :</b> notre intérêt légitime à traiter les demandes (article 6, paragraphe 1, point f) du RGPD). <b>Durée de conservation :</b> 1 an après la clôture de la demande.",
        ],
      },
      {
        h: "Journaux techniques",
        p: [
          "Aux fins du fonctionnement et de la sécurité du site web, l’hébergeur enregistre automatiquement les requêtes (adresse IP, date et heure, adresse demandée, type de navigateur) – y compris lors du scan des QR codes. L’hébergeur conserve ces journaux pendant une courte durée, selon ses propres règles, et nous ne les utilisons que pour le débogage. <b>Base légale :</b> notre intérêt légitime à assurer un fonctionnement sûr (article 6, paragraphe 1, point f) du RGPD).",
        ],
      },
      {
        h: "Cookies et stockage local",
        list: [
          "Cookie NEXT_LOCALE : mémorise la langue choisie, pendant 1 an.",
          "Stockage du navigateur (localStorage) : les liens de gestion des codes créés ou ouverts sur cet appareil, afin que vous les retrouviez sur la page « Mes codes ». La page « Mes codes » les utilise pour interroger l’état des codes ; pour le reste, ils demeurent dans votre navigateur, et vous pouvez les supprimer à tout moment dans les paramètres de celui-ci.",
          "La page de paiement de Stripe utilise ses propres cookies, conformément aux règles de Stripe.",
        ],
        after: [
          "Ces éléments sont nécessaires au fonctionnement du service ; c’est pourquoi nous ne demandons pas de consentement spécifique pour leur utilisation.",
        ],
      },
      {
        h: "Sous-traitants et destinataires",
        list: [
          "Hébergement et fonctions serveur : {hosting}",
          "Base de données : {database} – stocke les données des codes sur un serveur situé dans l’Union européenne (Irlande).",
          "Paiement : {payments} – en qualité de responsable du traitement distinct.",
        ],
        after: [
          "Nous ne vendons pas vos données et ne les transmettons à personne à des fins de marketing. Nous ne transmettons des données aux autorités que dans les cas prévus par la loi.",
        ],
      },
      {
        h: "Transferts de données hors de l’Union européenne",
        p: [
          "Certains de nos sous-traitants ont leur siège aux États-Unis. Si des données sont transférées hors de l’UE dans le cadre du traitement, ce transfert s’effectue sur la base du cadre de protection des données UE–États-Unis (Data Privacy Framework) ou des clauses contractuelles types (CCT) adoptées par la Commission européenne.",
        ],
      },
      {
        h: "Sécurité des données",
        p: [
          "La connexion est chiffrée (HTTPS). Le jeton de gestion est une valeur aléatoire de 192 bits, les adresses IP ne sont stockées que sous forme de hash salé, et seul le Prestataire a accès à la base de données.",
        ],
      },
      {
        h: "Vos droits",
        list: [
          "Accès : vous pouvez demander des informations sur les données vous concernant que nous traitons (article 15 du RGPD).",
          "Rectification : vous pouvez demander la correction des données inexactes (article 16).",
          "Effacement : vous pouvez demander l’effacement de vos données (article 17) ; vous pouvez également supprimer vous-même le code immédiatement sur la page de gestion.",
          "Limitation : vous pouvez demander la limitation du traitement (article 18).",
          "Portabilité : vous pouvez demander à recevoir, dans un format lisible par machine, les données que vous avez fournies (article 20).",
          "Opposition : vous pouvez vous opposer au traitement fondé sur l’intérêt légitime (article 21).",
        ],
        after: [
          "Vous pouvez envoyer votre demande à l’adresse {operatorEmail}. Pour identifier le code, indiquez son lien court. Nous répondons dans un délai d’un mois au plus.",
        ],
      },
      {
        h: "Voies de recours",
        p: [
          "Si vous estimez que nous avons porté atteinte à vos droits en matière de protection des données, nous vous prions de nous écrire d’abord. Vous pouvez introduire une réclamation auprès de l’Autorité nationale hongroise de protection des données et de liberté de l’information (NAIH ; 1055 Budapest, Falk Miksa utca 9–11. ; adresse postale : 1363 Budapest, Pf. 9. ; www.naih.hu) ou auprès de l’autorité de contrôle de la protection des données de votre lieu de résidence, ou encore saisir les tribunaux.",
        ],
      },
      {
        h: "Mineurs",
        p: [
          "Les personnes de moins de 16 ans ne peuvent utiliser le service qu’avec le consentement de leurs parents. Seule une personne majeure ou le représentant légal du mineur peut souscrire un abonnement.",
        ],
      },
      {
        h: "Modification de la présente politique",
        p: [
          "Nous pouvons mettre à jour la présente politique. La version en vigueur est toujours disponible sur cette page, avec sa date d’entrée en vigueur.",
        ],
      },
    ],
  },
};
