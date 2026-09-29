import type { LegalTexts } from "./types";

// English translation. The Hungarian version (hu.ts) is the governing text; update this file whenever it changes.

export const legalEn: LegalTexts = {
  ui: {
    effective: "Effective: {date}",
    toc: "Contents",
    translationNote:
      "This is a translation of the original Hungarian document. In the event of any discrepancy, the Hungarian version prevails.",
    placeholderNote:
      "The provider details shown in square brackets have yet to be filled in. The document is not complete without them.",
  },

  terms: {
    title: "Terms of Service",
    lead: "This document sets out the terms for using the {brand} dynamic QR code service ({siteUrl}). By using the service – by creating a QR code or subscribing – you accept these terms.",
    sections: [
      {
        h: "Provider details",
        list: [
          "Name: {operatorName}",
          "Registered office: {operatorAddress}",
          "Registration number: {operatorRegistry}",
          "Tax number: {operatorTax}",
          "Email: {operatorEmail}",
          "Hosting provider: {hosting}",
        ],
      },
      {
        h: "The service",
        p: [
          "{brand} creates dynamic QR codes. The QR code contains a short link on the Provider’s domain that redirects to the web address specified by the User. The destination address can be changed at any time on the code’s management page; a code that has already been printed remains usable without any change.",
          "The service includes customizing the appearance of the code (colors, pattern, logo, frame), downloading the code in PNG and SVG formats, and displaying the daily number of scans.",
        ],
      },
      {
        h: "Conclusion of the contract and the management link",
        p: [
          "The contract is concluded electronically when the QR code is created. It does not qualify as a written contract, the Provider does not file it, and apart from these Terms it does not refer to any code of conduct.",
          "There is no registration. Each code has a unique, secret management link: anyone who knows it can manage the code (edit it, subscribe to it, cancel the subscription, delete it). Keeping the management link safe and secret is the User’s responsibility. If it is lost, the Provider can only help if the right to manage the code can be credibly proven in another way (for example, with the email address used for the subscription).",
        ],
      },
      {
        h: "Free period",
        p: [
          "Every new code works free of charge for {trialDays} days from its creation. No bank card is required for this, and the end of the free period does not in itself create any payment obligation.",
        ],
      },
      {
        h: "Subscription and fees",
        p: [
          "After the free period, the code continues to work with a subscription. The subscription fee is {price} per month per code. {vatNote}",
          "Payment is made by bank card on Stripe’s secure payment page; your card details never reach the Provider. Stripe charges the fee monthly, in advance. Your card-issuing bank may convert the fee, which is stated in dollars, at its own exchange rate.",
          "If you subscribe during the free period, the first fee is charged at the end of the free period, provided that at least two days of it remain; otherwise the subscription and the charge start immediately. After that, the subscription renews automatically every month until you cancel it.",
          "We send an electronic receipt for each payment to the email address provided when subscribing.",
          "The Provider may change the fee for the future. It will notify you of the change at least 30 days in advance at the email address provided when subscribing; the change takes effect from the next billing period. If you do not accept it, you can cancel your subscription before then.",
        ],
      },
      {
        h: "Cancellation",
        p: [
          "You can cancel the subscription at any time with a single click on the code’s management page. Cancellation takes effect at the end of the period already paid for; until then the code keeps working, and you can also withdraw the cancellation until then. There is no minimum commitment period.",
          "Fees for a billing period that has already started are not refunded, unless the law – in particular the right of withdrawal – provides otherwise.",
        ],
      },
      {
        h: "Pausing and deletion of codes",
        p: [
          "If a code has no valid free period or paid subscription, the code is paused: people who scan it see an information page, and the redirect does not work. With a subscription, the code can be reactivated at any time, with the same short link.",
          "We keep a paused code and its settings for {retentionMonths} months from the start of the pause, after which we delete them permanently. You can delete the code immediately at any time on the management page; on deletion, any subscription also ends immediately.",
        ],
      },
      {
        h: "Right of withdrawal",
        p: [
          "If you are a consumer, under Hungarian Government Decree 45/2014 (II. 26.) on the detailed rules of contracts between consumers and businesses, you may withdraw from the contract without giving any reason within 14 days of taking out the subscription. You can send your withdrawal statement to {operatorEmail}; you may use the model form below for this, but you are not required to.",
          "When subscribing, you can expressly request that the Provider start providing the paid service before the withdrawal period expires. In this case, if you nevertheless withdraw within the period, you must pay a proportionate fee for the service already provided; and if the service has been provided in full within the period, you lose your right of withdrawal.",
          "In the event of withdrawal, we will refund the amount paid – less any proportionate fee – no later than 14 days after receiving your withdrawal statement, using the original payment method.",
        ],
        list: [
          "Model withdrawal form – To: {operatorName}, {operatorEmail}",
          "I hereby give notice that I withdraw from my contract for the provision of the following service: {brand} subscription, short link of the QR code: …",
          "Date the contract was concluded: … · Name and address of the consumer: … · Date: …",
        ],
      },
      {
        h: "User obligations and prohibited use",
        p: [
          "The User is responsible for the content at the destination address. It is prohibited to point the code to content that is unlawful, deceptive (in particular phishing), distributes malicious software, incites hatred or infringes the rights of third parties, or to use the service to distribute unsolicited messages.",
          "The Provider is entitled to suspend or delete such a code without notice and to cooperate with the competent authorities. You can report unlawful content to {operatorEmail}.",
          "Mass, automated use of the service may be restricted; currently, no more than {hourlyLimit} new codes can be created per hour from a single address.",
        ],
      },
      {
        h: "Availability and liability",
        p: [
          "The Provider strives for continuous operation but does not guarantee uninterrupted and error-free availability. The service may be temporarily unavailable due to maintenance, errors or an outage of an external provider (hosting, database, payments).",
          "The Provider is not responsible for the content or availability of the destination address, nor for a printed code that cannot be scanned because of unsuitable size, color or print quality. Always test the code before printing.",
          "To the extent permitted by law, the Provider’s liability for a given code is limited to the amount of fees paid for that code in the 12 months preceding the occurrence of the damage. This limitation does not apply to damage caused intentionally or through gross negligence, or to damage resulting in injury to life, physical integrity or health, and it does not affect the statutory rights of consumers.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "The website, the software and the {brand} brand identity are the intellectual property of the Provider. You may use the image of the QR code you create without restriction and free of charge. You are responsible for any logo you upload and for your right to use it.",
          "“QR Code” is a registered trademark of DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Complaints and legal remedies",
        p: [
          "You can send your complaint to {operatorEmail}; we will respond on the merits within 30 days at the latest.",
          "If the complaint cannot be resolved, as a consumer you can turn to the conciliation board competent for your place of residence or stay, or to the consumer protection authority, or you can go to court. As a consumer living in another EU member state, you can also seek help from the European Consumer Centres Network (ECC-Net).",
        ],
      },
      {
        h: "Changes to the Terms, language and governing law",
        p: [
          "The Provider may amend these Terms. It will publish any amendment on this page at least 15 days before it takes effect and will also notify subscribers by email. An amendment does not affect a period already paid for.",
          "These Terms are governed by Hungarian law. For consumers, this does not deprive them of the protection afforded by the mandatory consumer protection rules of the country of their habitual residence.",
          "These Terms were drawn up in Hungarian; versions in other languages are translations. In the event of any discrepancy, the Hungarian version prevails.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    lead: "This policy describes what personal data we process when you use {brand} ({siteUrl}), for what purpose and for how long, and what rights you have. We process data in accordance with the European Union’s General Data Protection Regulation (GDPR) and Hungarian Act CXII of 2011 on the Right of Informational Self-Determination and on Freedom of Information.",
    sections: [
      {
        h: "The data controller",
        list: ["Name: {operatorName}", "Registered office: {operatorAddress}", "Email: {operatorEmail}"],
        after: ["We are not required to appoint a data protection officer."],
      },
      {
        h: "In brief",
        list: [
          "There is no registration or password, and we do not use advertising, analytics or tracking cookies.",
          "We do not store any personal data about the people who scan QR codes, only the daily number of scans.",
          "Your bank card details stay with Stripe; we have no access to them.",
        ],
      },
      {
        h: "Creating and operating a QR code",
        p: [
          "<b>Data processed:</b> the destination address (URL) you provide, the name of the code, the appearance settings (colors, pattern, caption, uploaded logo), the code’s short identifier and secret management token, the time of creation and expiry, and the daily number of scans. The destination address and the name contain personal data only if you enter such data (for example, a link to a personal profile).",
          "<b>Purpose:</b> providing the service – operating the redirect, the management page and the statistics. <b>Legal basis:</b> performance of a contract (GDPR Article 6(1)(b)).",
          "<b>Retention:</b> until you delete the code; for a paused code, no longer than {retentionMonths} months from the start of the pause.",
        ],
      },
      {
        h: "Preventing abuse",
        p: [
          "<b>Data processed:</b> the IP address of the device that creates the code, stored only as a salted, irreversible hash, together with the time of creation.",
          "<b>Purpose:</b> limiting mass, automated code creation (no more than {hourlyLimit} codes per hour). <b>Legal basis:</b> our legitimate interest in the secure and stable operation of the service (GDPR Article 6(1)(f)). <b>Retention:</b> for as long as the code exists.",
        ],
      },
      {
        h: "Subscription and payment",
        p: [
          "When you subscribe, your payment details (name, email address, bank card details, billing country) are collected and processed by Stripe, which acts as an independent data controller for processing the payment and preventing fraud, in accordance with its own privacy policy.",
          "<b>Data we receive:</b> the Stripe customer and subscription identifiers, and the status and periods of the subscription; in Stripe’s interface we have access to the customer’s name, email address, billing country and payments. We cannot see your bank card number.",
          "<b>Purpose:</b> managing the subscription, collecting the fee and sending notifications related to the subscription. <b>Legal basis:</b> performance of a contract (GDPR Article 6(1)(b)); retaining accounting records is a legal obligation (GDPR Article 6(1)(c), Section 169 of Hungarian Act C of 2000 on Accounting).",
          "<b>Retention:</b> until the subscription ends; accounting records for 8 years.",
        ],
      },
      {
        h: "Contact",
        p: [
          "If you email us, we use your name, email address and the content of your message to respond to your inquiry. <b>Legal basis:</b> our legitimate interest in handling inquiries (GDPR Article 6(1)(f)). <b>Retention:</b> for 1 year after the matter is closed.",
        ],
      },
      {
        h: "Technical logs",
        p: [
          "To operate and secure the website, the hosting provider automatically logs requests (IP address, time, requested address, browser type) – this also applies when QR codes are scanned. The hosting provider keeps these logs for a short time under its own rules, and we use them only for troubleshooting. <b>Legal basis:</b> our legitimate interest in secure operation (GDPR Article 6(1)(f)).",
        ],
      },
      {
        h: "Cookies and local storage",
        list: [
          "NEXT_LOCALE cookie: remembers your chosen language for 1 year.",
          "Browser storage (localStorage): the management links of codes created or opened on this device, so that you can find them on the “My codes” page. The “My codes” page uses them to check the status of the codes; otherwise they stay in your browser, and you can delete them at any time in your browser settings.",
          "Stripe’s payment page uses its own cookies, in accordance with Stripe’s rules.",
        ],
        after: ["These are necessary for the service to work, so we do not ask for separate consent for them."],
      },
      {
        h: "Data processors and recipients",
        list: [
          "Hosting and server functions: {hosting}",
          "Database: {database} – stores the code data on a server in the European Union (Ireland).",
          "Payments: {payments} – as an independent data controller.",
        ],
        after: [
          "We do not sell your data and do not share it with anyone for marketing purposes. We only disclose data to authorities where required by law.",
        ],
      },
      {
        h: "Data transfers outside the European Union",
        p: [
          "Some of our data processors are based in the United States. If data is transferred outside the EU in the course of processing, this is done on the basis of the EU–U.S. Data Privacy Framework or the standard contractual clauses (SCCs) adopted by the European Commission.",
        ],
      },
      {
        h: "Data security",
        p: [
          "The connection is encrypted (HTTPS). The management token is a 192-bit random value, IP addresses are stored only as salted hashes, and only the Provider has access to the database.",
        ],
      },
      {
        h: "Your rights",
        list: [
          "Access: you can request information about the data we process about you (GDPR Article 15).",
          "Rectification: you can request the correction of inaccurate data (Article 16).",
          "Erasure: you can request the deletion of your data (Article 17); you can also delete the code yourself immediately on the management page.",
          "Restriction: you can request the restriction of processing (Article 18).",
          "Data portability: you can request the data you provided in a machine-readable format (Article 20).",
          "Objection: you can object to processing based on legitimate interest (Article 21).",
        ],
        after: [
          "You can send your request to {operatorEmail}. To identify the code, please include its short link. We will respond within one month at the latest.",
        ],
      },
      {
        h: "Legal remedies",
        p: [
          "If you feel that we have violated your data protection rights, please write to us first. You can lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; postal address: 1363 Budapest, Pf. 9.; www.naih.hu) or with the data protection supervisory authority of your place of residence, and you can also go to court.",
        ],
      },
      {
        h: "Minors",
        p: [
          "Persons under 16 may only use the service with parental consent. Only adults or a minor’s legal representative can subscribe.",
        ],
      },
      {
        h: "Changes to this policy",
        p: ["We may update this policy. The version currently in force is always available on this page, together with its effective date."],
      },
    ],
  },
};
