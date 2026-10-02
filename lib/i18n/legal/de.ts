import type { LegalTexts } from "./types";

// Deutsche Übersetzung. Maßgeblich ist die englische Fassung (en.ts).

export const legalDe: LegalTexts = {
  ui: {
    effective: "Gültig ab: {date}",
    toc: "Inhalt",
    translationNote:
      "Dies ist eine Übersetzung des englischen Originals; bei Abweichungen ist die englische Fassung maßgeblich.",
    placeholderNote: "Einige in eckigen Klammern angezeigte Angaben zum Betreiber müssen noch ergänzt werden.",
  },

  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    lead: "Diese Bedingungen regeln die Nutzung des Webdienstes {brand} ({siteUrl}, der „Dienst“) sowie die Abonnements dafür. Mit dem Erstellen eines QR-Codes oder der Bestellung eines Abonnements akzeptieren Sie diese Bedingungen; wenn Sie damit nicht einverstanden sind, nutzen Sie den Dienst bitte nicht.",
    sections: [
      {
        h: "Der Betreiber",
        p: ["Der Dienst wird von folgendem Betreiber (der „Betreiber“) bereitgestellt:"],
        list: [
          "Name: {operatorName}",
          "Sitz: {operatorAddress}",
          "Registereintrag: {operatorRegistry}",
          "Steuernummer: {operatorTax}",
          "E-Mail: {operatorEmail}",
          "Hosting-Anbieter: {hosting}",
        ],
      },
      {
        h: "Der Dienst",
        p: [
          "{brand} erstellt dynamische QR-Codes. Ein QR-Code enthält einen Kurzlink auf der Domain des Betreibers, der Besucher an die von Ihnen angegebene Webadresse (das „Ziel“) weiterleitet. Sie können das Ziel jederzeit auf der Verwaltungsseite des Codes ändern; bereits gedruckte Codes funktionieren weiterhin.",
          "Zum Dienst gehören außerdem die Anpassung des Erscheinungsbilds des Codes (Farben, Muster, Logo, Rahmen), der Download in den Formaten PNG und SVG sowie die Anzeige der Anzahl der Scans pro Tag.",
          "Das Gestalten eines Codes und seine Vorschau sind kostenlos. Damit ein Code Besucher weiterleitet und heruntergeladen werden kann, muss er mit einem Abonnement aktiviert werden (siehe Abschnitt 4).",
        ],
      },
      {
        h: "Vertragsschluss und Verwaltungslink",
        p: [
          "Der Vertrag kommt auf elektronischem Weg zustande, wenn Sie einen QR-Code erstellen, und für den kostenpflichtigen Dienst, wenn Sie ein Abonnement bestellen. Er wird vom Betreiber nicht archiviert und nimmt auf keinen Verhaltenskodex Bezug.",
          "Eine Registrierung mit Passwort gibt es nicht. Zu jedem Code gehört ein eindeutiger, privater Verwaltungslink: Wer ihn kennt, kann den Code verwalten (ändern, ein Abonnement abschließen, das Abonnement kündigen, den Code löschen). Sie sind dafür verantwortlich, den Verwaltungslink sicher und vertraulich aufzubewahren. Abonnenten können sich auf der Seite „Meine Codes“ außerdem mit einem Einmalcode anmelden, der an die für das Abonnement verwendete E-Mail-Adresse gesendet wird; sie sehen dann auf jedem Gerät alle mit dieser Adresse bezahlten Codes. Für die Sicherheit Ihres E-Mail-Kontos sind Sie selbst verantwortlich. Wenn Sie den Verwaltungslink verlieren und sich auch nicht anmelden können, kann der Betreiber nur helfen, wenn Sie glaubhaft nachweisen können, dass der Code Ihnen gehört.",
        ],
      },
      {
        h: "Abonnement und Gebühren",
        p: [
          "Jeder QR-Code hat sein eigenes Abonnement. Das Abonnement beginnt mit einem Einführungszeitraum von {days} Tagen, für den eine Gebühr von {intro} anfällt. Während dieses Zeitraums funktioniert der Code uneingeschränkt.",
          "Wenn Sie das Abonnement nicht bis zum Ende des Einführungszeitraums kündigen, wird es ab Tag {next} automatisch mit einer monatlichen Gebühr von {monthly} pro Code fortgesetzt und verlängert sich jeden Monat, bis Sie es kündigen. Die monatliche Gebühr wird zu Beginn jedes Zeitraums über die bei der Bestellung angegebene Zahlungsmethode belastet.",
          "Wenn Sie einen Code reaktivieren, dessen Abonnement beendet ist, beginnt das Abonnement ohne Einführungszeitraum neu, zu {monthly} pro Monat, die sofort belastet werden.",
          "Der zu zahlende Gesamtbetrag wird vor Abgabe Ihrer Bestellung deutlich auf der Zahlungsseite angezeigt. Die Bestellung wird abgegeben, wenn Sie die Schaltfläche drücken, die auf die Zahlungspflicht hinweist (bzw. die Schaltfläche der gewählten Zahlungsmethode).",
          "Über jede Änderung der Gebühren informieren wir die Abonnenten mindestens 30 Tage vor deren Inkrafttreten per E-Mail; wenn Sie die Änderung nicht akzeptieren, können Sie Ihr Abonnement vorher kündigen.",
        ],
      },
      {
        h: "Zahlung",
        p: [
          "Zahlungen werden von {payments} abgewickelt. Die verfügbaren Zahlungsmethoden hängen von Ihrem Gerät, Ihrem Browser und Ihrem Land ab und können Debit- und Kreditkarten, Apple Pay, Google Pay, PayPal und Link umfassen. Der Betreiber sieht und speichert Ihre Kartendaten nicht.",
          "Stripe sendet Ihnen für jede erfolgreiche Zahlung einen Beleg per E-Mail. Die gesetzlich vorgeschriebene Rechnung stellt der Betreiber aus.",
          "Schlägt eine monatliche Belastung fehl, versucht Stripe es innerhalb weniger Tage erneut; schlägt sie weiterhin fehl, endet das Abonnement, und der Code wird pausiert.",
        ],
      },
      {
        h: "Kündigung",
        p: [
          "Sie können das Abonnement eines Codes jederzeit und ohne Angabe von Gründen auf der Verwaltungsseite des Codes mit einem Klick kündigen.",
          "Die Kündigung wird zum Ende des laufenden Zeitraums wirksam: Bis dahin funktioniert der Code weiter, und es erfolgen keine weiteren Belastungen. Bis dahin können Sie die Kündigung auch zurücknehmen. Wenn Sie während des Einführungszeitraums kündigen, wird ab Tag {next} keine monatliche Gebühr berechnet.",
          "Die Gebühr für einen bereits begonnenen Zeitraum wird nicht erstattet, außer wenn Sie Ihr Widerrufsrecht ausüben, sowie in anderen gesetzlich vorgeschriebenen Fällen.",
        ],
      },
      {
        h: "Pausierte und gelöschte Codes",
        p: [
          "Hat ein Code kein aktives Abonnement, wird er pausiert: Besucher, die ihn scannen, sehen eine Informationsseite und werden nicht weitergeleitet. Sie können einen pausierten Code jederzeit reaktivieren; sein Kurzlink bleibt derselbe.",
          "Codes, die nie aktiviert wurden, werden {pendingDays} Tage lang aufbewahrt, pausierte Codes {retentionMonths} Monate ab Beginn der Pause; danach werden sie endgültig gelöscht. Sie können einen Code jederzeit selbst auf seiner Verwaltungsseite löschen; mit dem Löschen endet auch sein Abonnement sofort.",
        ],
      },
      {
        h: "Widerrufsrecht",
        p: [
          "Wenn Sie ein Abonnement als Verbraucher bestellen, können Sie den Vertrag binnen 14 Tagen ab der Bestellung ohne Angabe von Gründen widerrufen. Über Ihren Entschluss, den Vertrag zu widerrufen, können Sie den Betreiber mittels einer eindeutigen Erklärung informieren, zum Beispiel per E-Mail an {operatorEmail}; Sie können dafür das Muster-Widerrufsformular in Anhang I Teil B der Richtlinie 2011/83/EU verwenden, sind dazu jedoch nicht verpflichtet.",
          "Da Sie bei der Bestellung ausdrücklich verlangen, dass mit der Erbringung des Dienstes sofort begonnen wird, müssen Sie im Fall eines Widerrufs eine anteilige Gebühr für den bis zum Widerruf genutzten Zeitraum zahlen. Den verbleibenden Betrag erstatten wir binnen 14 Tagen ab dem Tag, an dem Sie uns über Ihren Widerruf informieren, über das für die Zahlung verwendete Zahlungsmittel.",
          "Das Widerrufsrecht berührt nicht Ihre Möglichkeit, das Abonnement jederzeit zu kündigen (siehe Abschnitt 6).",
        ],
      },
      {
        h: "Nutzungsbedingungen",
        p: ["Sie dürfen den Dienst nur zu rechtmäßigen Zwecken und im Einklang mit diesen Bedingungen nutzen. Insbesondere darf das Ziel eines Codes nicht zu Inhalten führen, die:"],
        list: [
          "rechtswidrig sind oder die Rechte anderer verletzen (zum Beispiel Urheber- oder Persönlichkeitsrechte);",
          "irreführend oder betrügerisch sind, insbesondere Phishing-Seiten;",
          "Schadsoftware verbreiten oder auf andere Weise dem Gerät des Besuchers schaden;",
          "zu Hass oder Gewalt aufstacheln.",
        ],
        after: [
          "Der Dienst darf nicht zum Versand unerwünschter Nachrichten (Spam) genutzt werden, und Sie dürfen nicht versuchen, seine Sicherheits- oder Zahlungsmaßnahmen zu umgehen oder seinen Betrieb zu behindern. Um Missbrauch zu verhindern, können von einer Adresse aus höchstens {hourlyLimit} neue Codes pro Stunde erstellt werden.",
          "Der Betreiber kann solche Codes ohne Vorankündigung sperren oder löschen und mit den zuständigen Behörden zusammenarbeiten; bei einem schwerwiegenden Verstoß gegen diese Bedingungen kann das Abonnement mit sofortiger Wirkung beendet werden. Rechtswidrige Inhalte können Sie unter {operatorEmail} melden.",
        ],
      },
      {
        h: "Geistiges Eigentum",
        p: [
          "Die Software, das Design, das Logo und die Texte des Dienstes sind geistiges Eigentum des Betreibers; sie dürfen nicht kopiert, weiterverkauft oder als eigener Dienst angeboten werden.",
          "Die Bilder der von Ihnen erstellten QR-Codes dürfen Sie frei und ohne Quellenangabe verwenden. Für ein von Ihnen hochgeladenes Logo und Ihr Recht zu dessen Nutzung sind Sie verantwortlich.",
          "„QR Code“ ist eine eingetragene Marke der DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Haftung",
        p: [
          "Der Betreiber bemüht sich nach Kräften um einen kontinuierlichen und fehlerfreien Betrieb des Dienstes, garantiert jedoch nicht, dass er ohne Unterbrechungen oder Fehler verfügbar ist. Wartungsarbeiten, Fehler oder der Ausfall eines externen Anbieters (Hosting, Datenbank, Zahlungen) können dazu führen, dass er vorübergehend nicht verfügbar ist.",
          "Der Betreiber ist weder für den Inhalt oder die Erreichbarkeit des Ziels verantwortlich noch für einen gedruckten Code, der wegen seiner Größe, seiner Farben oder der Druckqualität nicht gescannt werden kann. Testen Sie den Code vor dem Druck immer mit einem Smartphone.",
          "Soweit gesetzlich zulässig, haftet der Betreiber nicht für mittelbare Schäden oder entgangenen Gewinn, die aus der Nutzung des Dienstes oder der Unmöglichkeit seiner Nutzung entstehen. Diese Beschränkung gilt nicht für die Haftung für vorsätzlich oder grob fahrlässig verursachte Schäden oder für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, und sie berührt nicht die Rechte, die Verbrauchern gesetzlich zustehen.",
        ],
      },
      {
        h: "Verfügbarkeit und Änderungen",
        p: [
          "Der Betreiber ist berechtigt, den Dienst weiterzuentwickeln und zu ändern. Wird der Dienst dauerhaft eingestellt, beenden wir die Abonnements und erstatten die Gebühr für den nicht genutzten Zeitraum anteilig.",
        ],
      },
      {
        h: "Datenschutz",
        p: ["Einzelheiten zur Verarbeitung personenbezogener Daten finden Sie in der Datenschutzerklärung."],
      },
      {
        h: "Änderung der Bedingungen",
        p: [
          "Der Betreiber ist berechtigt, diese Bedingungen zu ändern. Änderungen werden mit ihrer Veröffentlichung auf dieser Seite zu dem oben im Dokument angegebenen Gültigkeitsdatum wirksam. Über wesentliche Änderungen zu ihrem Nachteil informieren wir die Abonnenten mindestens 30 Tage im Voraus per E-Mail; wenn sie die Änderungen nicht akzeptieren, können sie ihr Abonnement vor deren Inkrafttreten kündigen.",
        ],
      },
      {
        h: "Anwendbares Recht und Streitigkeiten",
        p: [
          "Für diese Bedingungen gilt slowakisches Recht. Wenn Sie den Dienst als Verbraucher nutzen, wird Ihnen durch diese Rechtswahl nicht der Schutz entzogen, den Ihnen die zwingenden Verbraucherschutzvorschriften Ihres Wohnsitzstaates gewähren.",
          "Wir bemühen uns, Streitigkeiten gütlich beizulegen: Sie können Ihre Beschwerde an {operatorEmail} senden, und wir antworten innerhalb von 30 Tagen. Wenn wir Ihre Beschwerde zurückweisen oder nicht innerhalb von 30 Tagen antworten, können Sie als Verbraucher ein Verfahren zur alternativen Streitbeilegung bei {adr} oder bei einer anderen Streitbeilegungsstelle aus der Liste des slowakischen Wirtschaftsministeriums einleiten. Sie können sich auch an die Verbraucherschutzbehörde und die Gerichte Ihres Wohnorts wenden.",
          "Diese Bedingungen sind in mehreren Sprachen verfügbar; bei Abweichungen ist die englische Fassung maßgeblich.",
        ],
      },
      {
        h: "Kontakt",
        p: ["Bei Fragen, Anmerkungen oder Beschwerden erreichen Sie den Betreiber unter folgender E-Mail-Adresse: {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    lead: "Gemäß der Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung, DSGVO) erläutert diese Erklärung, welche personenbezogenen Daten wir bei Ihrer Nutzung von {brand} ({siteUrl}) verarbeiten, zu welchem Zweck, auf welcher Rechtsgrundlage und wie lange, sowie welche Rechte Sie haben.",
    sections: [
      {
        h: "Der Verantwortliche",
        list: [
          "Name: {operatorName}",
          "Sitz: {operatorAddress}",
          "Registereintrag: {operatorRegistry}",
          "E-Mail: {operatorEmail}",
        ],
        after: ["In Datenschutzangelegenheiten erreichen Sie uns unter {operatorEmail}."],
      },
      {
        h: "Kurz gesagt",
        list: [
          "Es gibt keine Registrierung und kein Passwort; jeder Code wird über seinen privaten Verwaltungslink verwaltet, und Abonnenten können sich zusätzlich mit einem per E-Mail gesendeten Einmalcode anmelden.",
          "Über die Personen, die Ihre Codes scannen, speichern wir keine personenbezogenen Daten – nur die Anzahl der Scans pro Tag.",
          "Zahlungen werden von Stripe abgewickelt; Ihre Kartendaten sehen und speichern wir nicht.",
          "Wir verwenden keine Analyse-, Werbe- oder Tracking-Cookies.",
        ],
      },
      {
        h: "Erstellung und Betrieb eines QR-Codes",
        p: [
          "<b>Verarbeitete Daten:</b> das von Ihnen eingegebene Ziel (URL), der Name des Codes, seine Gestaltungseinstellungen (Farben, Muster, Beschriftung, hochgeladenes Logo), die Kurzkennung und das private Verwaltungs-Token des Codes, der Zeitpunkt seiner Erstellung und der Zeitpunkt, bis zu dem er aktiv ist, sowie die Anzahl der Scans pro Tag. Ziel und Name enthalten nur dann personenbezogene Daten, wenn Sie solche eingeben (zum Beispiel einen Link zu einem persönlichen Profil).",
          "<b>Zweck:</b> die Erbringung des Dienstes – die Weiterleitung der Besucher, die Verwaltungsseite und die Statistik. <b>Rechtsgrundlage:</b> Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).",
          "<b>Speicherdauer:</b> bis Sie den Code löschen; bei nie aktivierten Codes {pendingDays} Tage; bei pausierten Codes {retentionMonths} Monate ab Beginn der Pause.",
        ],
      },
      {
        h: "Verhinderung von Missbrauch",
        p: [
          "<b>Verarbeitete Daten:</b> die IP-Adresse des Geräts, mit dem ein Code erstellt wird, ausschließlich als gesalzener, nicht umkehrbarer Hashwert gespeichert, zusammen mit dem Zeitpunkt der Erstellung.",
          "<b>Zweck:</b> die Begrenzung der massenhaften, automatisierten Erstellung von Codes (höchstens {hourlyLimit} pro Stunde). <b>Rechtsgrundlage:</b> unser berechtigtes Interesse an einem sicheren und stabilen Betrieb des Dienstes (Art. 6 Abs. 1 lit. f DSGVO). <b>Speicherdauer:</b> zusammen mit dem Code.",
        ],
      },
      {
        h: "Abonnement und Zahlung",
        p: [
          "Wenn Sie ein Abonnement abschließen, werden die Daten, die Sie im Zahlungsformular eingeben, von Stripe verarbeitet; wir erhalten die Daten, die zur Führung eines Nachweises über Ihre Abonnements erforderlich sind.",
        ],
        list: [
          "Verarbeitete Daten: E-Mail-Adresse, die von Stripe vergebenen Kunden- und Abonnementkennungen, Status und Laufzeiträume jedes Abonnements sowie der zugehörige Code, Betrag und Datum der Zahlungen, die Art der Zahlungsmethode (zum Beispiel Karte und deren letzte 4 Ziffern) sowie – sofern das Zahlungsformular danach fragt – Rechnungsland und Postleitzahl.",
          "Zweck: Abschluss und Erfüllung der Abonnements, Einzug der Gebühren, Rechnungsstellung und Kundenservice.",
          "Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO); für die Führung der Buchhaltungsunterlagen eine rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO).",
          "Speicherdauer: solange das Abonnement besteht; nach dessen Ende bewahren wir die Buchhaltungsunterlagen gemäß § 35 des slowakischen Rechnungslegungsgesetzes (Gesetz Nr. 431/2002 Slg.) 10 Jahre lang auf. Die übrigen Daten löschen wir nach Ende des Abonnements auf Ihren Antrag.",
        ],
        after: [
          "Zahlungen werden von {payments} abgewickelt, das hinsichtlich der Zahlungsdaten und der Betrugsprävention ein eigenständiger Verantwortlicher ist. Informationen zu dessen Datenverarbeitung finden Sie unter {paymentsPrivacy}.",
        ],
      },
      {
        h: "Anmeldung mit einem E-Mail-Code",
        p: [
          "Wenn Sie ein Abonnement abgeschlossen haben, können Sie sich auf der Seite „Meine Codes“ mit einem Einmalcode anmelden, den wir Ihnen per E-Mail senden, und die mit Ihrer E-Mail-Adresse bezahlten Codes auf jedem Gerät sehen.",
          "<b>Verarbeitete Daten:</b> die von Ihnen eingegebene E-Mail-Adresse, der Anmeldecode (nur als schlüsselbasierter Hashwert gespeichert), seine Ablaufzeit und die Anzahl der Fehlversuche; nach der Anmeldung ein signiertes Sitzungs-Cookie, das Ihre E-Mail-Adresse enthält. Um Ihre Codes zu finden, suchen wir bei Stripe die Kunden mit dieser E-Mail-Adresse.",
          "<b>Zweck:</b> Abonnenten den Zugriff auf ihre Codes zu ermöglichen. <b>Rechtsgrundlage:</b> Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). <b>Speicherdauer:</b> der Anmeldecode {loginMinutes} Minuten (er wird gelöscht, sobald er verwendet wurde); das Sitzungs-Cookie {sessionDays} Tage oder bis Sie sich abmelden.",
          "Wir senden nur dann einen Code, wenn die Adresse zu einem Abonnenten gehört; die Seite zeigt in beiden Fällen dieselbe Meldung. Die Anmelde-E-Mails versendet {emailSender} als Auftragsverarbeiter.",
        ],
      },
      {
        h: "Kontaktaufnahme",
        p: [
          "Wenn Sie uns schreiben, verwenden wir Ihren Namen, Ihre E-Mail-Adresse und den Inhalt Ihrer Nachricht, um Ihnen zu antworten. <b>Rechtsgrundlage:</b> unser berechtigtes Interesse an der Bearbeitung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). <b>Speicherdauer:</b> 1 Jahr nach Abschluss des Vorgangs.",
        ],
      },
      {
        h: "Technische Protokolle",
        p: [
          "Beim Ausliefern der Website zeichnen – wie bei jeder Website – die Server des Hosting-Anbieters technische Daten auf: IP-Adresse, Zeitpunkt der Anfrage, die aufgerufene Adresse und den Browsertyp. Das geschieht auch, wenn ein QR-Code gescannt wird. <b>Zweck:</b> der sichere und unterbrechungsfreie Betrieb des Dienstes sowie die Erkennung von Fehlern und Missbrauch. <b>Rechtsgrundlage:</b> unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO). <b>Speicherdauer:</b> für kurze Zeit, gemäß den Aufbewahrungsregeln des Hosting-Anbieters.",
          "Bei Anmelde- und Zahlungsanfragen wird die IP-Adresse außerdem bis zu 15 Minuten im Arbeitsspeicher des Servers vorgehalten, damit eine übermäßige Nutzung begrenzt werden kann.",
        ],
      },
      {
        h: "Cookies und lokale Speicherung",
        list: [
          "NEXT_LOCALE-Cookie: speichert die Sprache, die Sie in der Sprachauswahl gewählt haben (1 Jahr).",
          "{sessionCookie}-Cookie: hält Sie nach der Anmeldung mit einem E-Mail-Code auf der Seite „Meine Codes“ angemeldet; es ist signiert und für Skripte nicht lesbar ({sessionDays} Tage oder bis Sie sich abmelden).",
          "{loginCookie}-Cookie: die laufende Anmeldung zwischen der Anforderung und der Eingabe des Codes ({loginMinutes} Minuten).",
          "Lokaler Speicher (localStorage): die Verwaltungslinks der auf diesem Gerät erstellten oder geöffneten Codes, damit Sie sie auf der Seite „Meine Codes“ wiederfinden. Die Seite „Meine Codes“ fragt damit den Status Ihrer Codes ab; ansonsten verbleiben sie in Ihrem Browser, und Sie können sie jederzeit in den Browsereinstellungen löschen.",
          "Das Zahlungsformular wird von Stripe bereitgestellt, das eigene Cookies verwendet, um die Zahlung sicher abzuwickeln und Betrug zu verhindern.",
        ],
        after: ["Diese sind für das Funktionieren des Dienstes erforderlich und bedürfen daher keiner Einwilligung. Analyse- oder Werbe-Cookies verwenden wir nicht."],
      },
      {
        h: "Auftragsverarbeiter und Datenübermittlungen",
        list: [
          "Hosting und Anwendungsserver: {hosting}",
          "Datenbank: {database} – die Daten der Codes werden auf einem Server in der Europäischen Union (Irland) gespeichert.",
          "Zahlungen: {payments} – als eigenständiger Verantwortlicher.",
          "Versand der Anmelde-E-Mails: {emailSender}",
        ],
        after: [
          "Einige dieser Anbieter haben ihren Sitz in den Vereinigten Staaten von Amerika, sodass Daten auch außerhalb des Europäischen Wirtschaftsraums übermittelt werden können. Solche Übermittlungen erfolgen mit geeigneten Garantien (dem EU-US-Datenschutzrahmen und/oder den von der Europäischen Kommission erlassenen Standardvertragsklauseln).",
          "Wir geben Ihre Daten an keine weiteren Dritten weiter, verkaufen sie nicht und verwenden sie nicht für Marketing, Profiling oder automatisierte Entscheidungsfindung. An Behörden geben wir Daten nur weiter, wenn das Gesetz dies vorschreibt.",
        ],
      },
      {
        h: "Datensicherheit",
        p: [
          "Alle Verbindungen sind verschlüsselt (HTTPS). Das Verwaltungs-Token ist ein 192-Bit-Zufallswert, IP-Adressen werden nur als gesalzene Hashwerte und Anmeldecodes nur als schlüsselbasierte Hashwerte gespeichert (sie laufen nach {loginMinutes} Minuten ab und werden nach {loginAttempts} Fehlversuchen ungültig). Anmelde-Cookies sind signiert und für Skripte nicht lesbar, und nur der Betreiber hat Zugriff auf die Datenbank.",
        ],
      },
      {
        h: "Ihre Rechte",
        list: [
          "Recht auf Information und Auskunft (Art. 15 DSGVO);",
          "Recht auf Berichtigung (Art. 16);",
          "Recht auf Löschung (Art. 17) – einen Code können Sie auch jederzeit selbst auf seiner Verwaltungsseite löschen;",
          "Recht auf Einschränkung der Verarbeitung (Art. 18);",
          "Recht auf Datenübertragbarkeit (Art. 20);",
          "Recht auf Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung (Art. 21).",
        ],
        after: [
          "Ihren Antrag können Sie an {operatorEmail} senden. Geben Sie zur Identifizierung eines Codes dessen Kurzlink an. Wir antworten spätestens innerhalb eines Monats.",
        ],
      },
      {
        h: "Rechtsbehelfe",
        p: [
          "Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen das Gesetz verstößt, können Sie Beschwerde bei der für den Sitz des Verantwortlichen zuständigen Aufsichtsbehörde, dem Amt für den Schutz personenbezogener Daten der Slowakischen Republik ({authority}), oder bei der Datenschutzbehörde Ihres Wohn- oder Arbeitsorts einlegen – in Ungarn zum Beispiel bei der ungarischen Nationalen Behörde für Datenschutz und Informationsfreiheit (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "Werden Ihre Rechte verletzt, können Sie auch ein Gericht anrufen; Sie können die Klage vor den Gerichten des Mitgliedstaats Ihres Wohnorts erheben.",
        ],
      },
      {
        h: "Kinder",
        p: ["Der Dienst richtet sich nicht an Kinder unter 16 Jahren, und wir verarbeiten wissentlich keine Daten von ihnen. Ein Abonnement können nur Volljährige bestellen."],
      },
      {
        h: "Änderungen dieser Erklärung",
        p: ["Wir aktualisieren diese Erklärung, wann immer sich der Dienst ändert; das Gültigkeitsdatum ist oben im Dokument angegeben."],
      },
    ],
  },
};
