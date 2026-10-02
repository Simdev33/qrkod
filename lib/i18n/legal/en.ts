import type { LegalTexts } from "./types";

// The English original – the governing version and the source of the other languages. When the content
// changes, update the translations too and move LEGAL_EFFECTIVE_DATE in lib/legal.ts.

export const legalEn: LegalTexts = {
  ui: {
    effective: "Effective: {date}",
    toc: "Contents",
    translationNote: "",
    placeholderNote: "Some operator details shown in square brackets are still to be completed.",
  },

  terms: {
    title: "Terms of Service",
    lead: "These terms govern the use of the {brand} web service ({siteUrl}, the “Service”) and the subscriptions to it. By creating a QR code or ordering a subscription, you accept these terms; if you do not agree with them, please do not use the Service.",
    sections: [
      {
        h: "The operator",
        p: ["The Service is provided by the following operator (the “Operator”):"],
        list: [
          "Name: {operatorName}",
          "Registered office: {operatorAddress}",
          "Registration: {operatorRegistry}",
          "Tax number: {operatorTax}",
          "Email: {operatorEmail}",
          "Hosting provider: {hosting}",
        ],
      },
      {
        h: "The Service",
        p: [
          "{brand} creates dynamic QR codes. A QR code contains a short link on the Operator’s domain that forwards visitors to the web address you specify (the “destination”). You can change the destination at any time on the code’s management page; codes that have already been printed keep working.",
          "The Service also includes customising the look of the code (colours, pattern, logo, frame), downloading it in PNG and SVG formats, and showing the number of scans per day.",
          "Designing and previewing a code are free of charge. For a code to forward visitors and to be downloadable, it must be activated with a subscription (see section 4).",
        ],
      },
      {
        h: "Conclusion of the contract and the management link",
        p: [
          "The contract is concluded electronically when you create a QR code, and for the paid service when you order a subscription. It is not filed by the Operator and does not refer to any code of conduct.",
          "There is no registration with a password. Every code has a unique, private management link: anyone who knows it can manage the code (change it, subscribe, cancel the subscription, delete the code). You are responsible for keeping the management link safe and private. Subscribers can also sign in on the “My codes” page with a single-use code sent to the email address used for the subscription; they then see all the codes paid for with that address, on any device. You are responsible for the security of your email account. If you lose the management link and cannot sign in, the Operator can only help if you can credibly prove that the code is yours.",
        ],
      },
      {
        h: "Subscription and fees",
        p: [
          "Every QR code has its own subscription. The subscription starts with an introductory period of {days} days, the fee for which is {intro}. During this period the code works in full.",
          "If you do not cancel the subscription by the end of the introductory period, from day {next} it automatically continues with a monthly fee of {monthly} per code, and it renews every month until you cancel it. The monthly fee is charged at the start of each period to the payment method you provided when ordering.",
          "If you reactivate a code whose subscription has ended, the subscription restarts without an introductory period, at {monthly} a month, charged immediately.",
          "The total amount payable is clearly shown on the payment page before you place your order. The order is placed when you press the button indicating the obligation to pay (or the button of the selected payment method).",
          "We notify subscribers by email of any change in fees at least 30 days before the change takes effect; if you do not accept it, you can cancel your subscription before then.",
        ],
      },
      {
        h: "Payment",
        p: [
          "Payments are processed by {payments}. Available payment methods depend on your device, browser and country and may include debit and credit cards, Apple Pay, Google Pay, PayPal and Link. The Operator does not see or store your card details.",
          "Stripe sends you a receipt by email for each successful payment. The invoice required by law is issued by the Operator.",
          "If a monthly charge fails, Stripe will try again within a few days; if it still fails, the subscription ends and the code pauses.",
        ],
      },
      {
        h: "Cancellation",
        p: [
          "You can cancel the subscription of a code at any time, without giving a reason, on the code’s management page, in one click.",
          "Cancellation takes effect at the end of the current period: until then the code keeps working, and no further charges are made. Until then, you can also withdraw the cancellation. If you cancel during the introductory period, no monthly fee is charged from day {next}.",
          "The fee for a period that has already started is not refunded, except where you exercise your right of withdrawal and in other cases required by law.",
        ],
      },
      {
        h: "Paused and deleted codes",
        p: [
          "If a code has no active subscription, it pauses: visitors who scan it see an information page and are not forwarded. You can reactivate a paused code at any time; its short link stays the same.",
          "Codes that were never activated are kept for {pendingDays} days, and paused codes for {retentionMonths} months after they paused; after that, they are deleted permanently. You can delete a code yourself at any time on its management page; deleting it also ends its subscription immediately.",
        ],
      },
      {
        h: "Right of withdrawal",
        p: [
          "If you order a subscription as a consumer, you may withdraw from the contract within 14 days of the order without giving any reason. You can inform the Operator of your decision to withdraw by an unequivocal statement, for example by email to {operatorEmail}; you may use the model withdrawal form in Annex I(B) of Directive 2011/83/EU, but you are not obliged to.",
          "Since you expressly request the immediate start of the Service when ordering, if you withdraw you must pay a proportionate fee for the period used up to the withdrawal. We refund the remaining amount to the payment method used for the payment within 14 days of the day you inform us of your withdrawal.",
          "The right of withdrawal does not affect your option to cancel the subscription at any time (see section 6).",
        ],
      },
      {
        h: "Conditions of use",
        p: ["You may use the Service only for lawful purposes and in accordance with these terms. In particular, the destination of a code may not lead to content that is:"],
        list: [
          "unlawful, or that infringes the rights of others (for example copyright or personality rights);",
          "misleading or fraudulent, in particular phishing pages;",
          "distributing malware, or otherwise harmful to the visitor’s device;",
          "inciting hatred or violence.",
        ],
        after: [
          "The Service may not be used to send unsolicited messages (spam), and you may not attempt to circumvent its security or payment measures or obstruct its operation. To prevent abuse, at most {hourlyLimit} new codes can be created per hour from one address.",
          "The Operator may suspend or delete such codes without notice and cooperate with the competent authorities; in the event of a serious breach of these terms, the subscription may be terminated with immediate effect. You can report unlawful content at {operatorEmail}.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "The software, design, logo and texts of the Service are the intellectual property of the Operator; they may not be copied, resold or offered as a service of your own.",
          "You may use the images of the QR codes you create freely, without attribution. You are responsible for any logo you upload and for your right to use it.",
          "“QR Code” is a registered trademark of DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Liability",
        p: [
          "The Operator does its best to ensure the continuous and correct operation of the Service, but does not guarantee that it will be available without interruption or errors. Maintenance, errors or the outage of an external provider (hosting, database, payments) may make it temporarily unavailable.",
          "The Operator is not responsible for the content or availability of the destination, nor for a printed code that cannot be scanned because of its size, colours or print quality. Always test the code with a phone before printing it.",
          "To the maximum extent permitted by law, the Operator is not liable for any indirect damage or loss of profit arising from the use of, or inability to use, the Service. This limitation does not apply to liability for damage caused intentionally or by gross negligence, or for harm to life, physical integrity or health, and it does not affect the rights to which consumers are entitled by law.",
        ],
      },
      {
        h: "Availability and changes",
        p: [
          "The Operator is entitled to develop and modify the Service. If the Service is permanently discontinued, we will terminate the subscriptions and refund the fee for the unused period on a pro rata basis.",
        ],
      },
      {
        h: "Data protection",
        p: ["Details of the processing of personal data are set out in the Privacy Policy."],
      },
      {
        h: "Amendment of the terms",
        p: [
          "The Operator is entitled to amend these terms. Amendments take effect upon publication on this page, on the effective date shown at the top of the document. We notify subscribers by email at least 30 days in advance of any material changes that are disadvantageous to them; if they do not accept the changes, they can cancel their subscription before the changes take effect.",
        ],
      },
      {
        h: "Governing law and disputes",
        p: [
          "Slovak law applies to these terms. If you use the Service as a consumer, this choice of law does not deprive you of the protection afforded to you by the mandatory consumer protection rules of your country of residence.",
          "We aim to settle any disputes amicably: you can send your complaint to {operatorEmail}, and we respond within 30 days. If we reject your complaint or do not respond within 30 days, as a consumer you can initiate alternative dispute resolution with {adr} or with another dispute resolution body on the list of the Slovak Ministry of Economy. You can also turn to the consumer protection authority and the courts of your place of residence.",
          "These terms are available in several languages; in case of any discrepancy, the English version prevails.",
        ],
      },
      {
        h: "Contact",
        p: ["You can contact the Operator with questions, comments or complaints at the following email address: {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    lead: "In accordance with Regulation (EU) 2016/679 (General Data Protection Regulation, GDPR), this notice explains what personal data we process when you use {brand} ({siteUrl}), for what purpose, on what legal basis and for how long, as well as what rights you have.",
    sections: [
      {
        h: "The data controller",
        list: [
          "Name: {operatorName}",
          "Registered office: {operatorAddress}",
          "Registration: {operatorRegistry}",
          "Email: {operatorEmail}",
        ],
        after: ["For data protection matters, you can reach us at {operatorEmail}."],
      },
      {
        h: "In brief",
        list: [
          "There is no registration and no password; each code is managed with its private management link, and subscribers can also sign in with a single-use code sent by email.",
          "We store no personal data about the people who scan your codes – only the number of scans per day.",
          "Payments are processed by Stripe; we do not see or store your card details.",
          "We do not use analytics, advertising or tracking cookies.",
        ],
      },
      {
        h: "Creating and running a QR code",
        p: [
          "<b>Data processed:</b> the destination you enter (URL), the name of the code, its design settings (colours, pattern, label, uploaded logo), the code’s short identifier and private management token, the time it was created and the times it is active until, and the number of scans per day. The destination and the name only contain personal data if you enter such data (for example a link to a personal profile).",
          "<b>Purpose:</b> providing the Service – forwarding visitors, the management page and the statistics. <b>Legal basis:</b> performance of a contract (Article 6(1)(b) GDPR).",
          "<b>Retention:</b> until you delete the code; codes that were never activated for {pendingDays} days; paused codes for {retentionMonths} months after they paused.",
        ],
      },
      {
        h: "Preventing abuse",
        p: [
          "<b>Data processed:</b> the IP address of the device that creates a code, stored only as a salted, irreversible hash, together with the time of creation.",
          "<b>Purpose:</b> limiting the mass, automated creation of codes (at most {hourlyLimit} per hour). <b>Legal basis:</b> our legitimate interest in the secure and stable operation of the Service (Article 6(1)(f) GDPR). <b>Retention:</b> together with the code.",
        ],
      },
      {
        h: "Subscription and payment",
        p: [
          "If you subscribe, the data you enter on the payment form is processed by Stripe; what we receive is the data needed to keep a record of your subscriptions.",
        ],
        list: [
          "Data processed: email address, the customer and subscription identifiers assigned by Stripe, the status and periods of each subscription and the code it belongs to, the amount and date of payments, the type of payment method (for example card, and its last 4 digits) and – if the payment form asks for them – the billing country and postal code.",
          "Purpose: creating and fulfilling subscriptions, collecting fees, invoicing and customer service.",
          "Legal basis: performance of a contract (Article 6(1)(b) GDPR); for keeping accounting records, a legal obligation (Article 6(1)(c) GDPR).",
          "Retention: for as long as the subscription exists; after it ends, we keep the accounting records for 10 years under section 35 of the Slovak Accounting Act (Act No. 431/2002 Coll.). We delete the other data at your request after the subscription ends.",
        ],
        after: [
          "Payments are processed by {payments}, which is an independent controller with regard to payment data and fraud prevention. You can find information about its data processing at {paymentsPrivacy}.",
        ],
      },
      {
        h: "Signing in with an email code",
        p: [
          "If you have subscribed, you can sign in on the “My codes” page with a single-use code sent to you by email, and see the codes paid for with your email address on any device.",
          "<b>Data processed:</b> the email address you enter, the sign-in code (stored only as a keyed hash), its expiry time and the number of failed attempts; after signing in, a signed session cookie that contains your email address. To find your codes, we look up the Stripe customers with this email address.",
          "<b>Purpose:</b> giving subscribers access to their codes. <b>Legal basis:</b> performance of a contract (Article 6(1)(b) GDPR). <b>Retention:</b> the sign-in code for {loginMinutes} minutes (it is deleted as soon as it is used); the session cookie for {sessionDays} days, or until you sign out.",
          "We send a code only if the address belongs to a subscriber; the page shows the same message either way. Sign-in emails are sent by {emailSender} as a data processor.",
        ],
      },
      {
        h: "Contacting us",
        p: [
          "If you write to us, we use your name, email address and the content of your message to answer you. <b>Legal basis:</b> our legitimate interest in handling enquiries (Article 6(1)(f) GDPR). <b>Retention:</b> for 1 year after the matter is closed.",
        ],
      },
      {
        h: "Technical logs",
        p: [
          "When the site is served – as with any website – the hosting provider’s servers record technical data: IP address, time of the request, the requested address and the browser type. This also happens when a QR code is scanned. <b>Purpose:</b> the secure and uninterrupted operation of the Service, and the detection of errors and abuse. <b>Legal basis:</b> our legitimate interest (Article 6(1)(f) GDPR). <b>Retention:</b> for a short time, in accordance with the hosting provider’s data retention rules.",
          "For sign-in and payment requests, the IP address is also kept in the server’s memory for up to 15 minutes, so that excessive use can be limited.",
        ],
      },
      {
        h: "Cookies and local storage",
        list: [
          "NEXT_LOCALE cookie: remembers the language you picked in the language switcher (1 year).",
          "{sessionCookie} cookie: keeps you signed in on the “My codes” page after you sign in with an email code; it is signed and cannot be read by scripts ({sessionDays} days, or until you sign out).",
          "{loginCookie} cookie: the sign-in in progress, between requesting and entering the code ({loginMinutes} minutes).",
          "Local storage (localStorage): the management links of the codes created or opened on this device, so that you find them on the “My codes” page. The “My codes” page uses them to look up the status of your codes; otherwise they stay in your browser, and you can delete them at any time in your browser settings.",
          "The payment form is provided by Stripe, which uses its own cookies to process the payment securely and to prevent fraud.",
        ],
        after: ["These are necessary for the Service to work, so they do not require consent. We do not use analytics or advertising cookies."],
      },
      {
        h: "Data processors and data transfers",
        list: [
          "Hosting and application server: {hosting}",
          "Database: {database} – the data of the codes is stored on a server in the European Union (Ireland).",
          "Payments: {payments} – as an independent controller.",
          "Sending sign-in emails: {emailSender}",
        ],
        after: [
          "Some of these providers are headquartered in the United States of America, so data may also be transferred outside the European Economic Area. Such transfers take place with appropriate safeguards (the EU–US Data Privacy Framework and/or the standard contractual clauses adopted by the European Commission).",
          "We do not share your data with any other third party, we do not sell it, and we do not use it for marketing, profiling or automated decision-making. We disclose data to authorities only where the law requires it.",
        ],
      },
      {
        h: "Data security",
        p: [
          "All connections are encrypted (HTTPS). The management token is a 192-bit random value, IP addresses are stored only as salted hashes, and sign-in codes only as keyed hashes (they expire after {loginMinutes} minutes and stop working after {loginAttempts} wrong attempts). Sign-in cookies are signed and cannot be read by scripts, and only the Operator has access to the database.",
        ],
      },
      {
        h: "Your rights",
        list: [
          "right to information and access (Article 15 GDPR);",
          "right to rectification (Article 16);",
          "right to erasure (Article 17) – you can also delete a code yourself at any time on its management page;",
          "right to restriction of processing (Article 18);",
          "right to data portability (Article 20);",
          "right to object to processing based on legitimate interest (Article 21).",
        ],
        after: [
          "You can send your request to {operatorEmail}. To identify a code, include its short link. We respond within one month at the latest.",
        ],
      },
      {
        h: "Remedies",
        p: [
          "If you feel that the processing of your personal data violates the law, you can lodge a complaint with the supervisory authority of the controller’s registered office, the Office for Personal Data Protection of the Slovak Republic ({authority}), or with the data protection authority of your place of residence or place of work – in Hungary, for example, the Hungarian National Authority for Data Protection and Freedom of Information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "If your rights are violated, you can also go to court; you may bring the action before the courts of the member state of your place of residence.",
        ],
      },
      {
        h: "Children",
        p: ["The Service is not intended for children under 16, and we do not knowingly process their data. Only adults can order a subscription."],
      },
      {
        h: "Changes to this notice",
        p: ["We update this notice whenever the Service changes; the effective date is shown at the top of the document."],
      },
    ],
  },
};
