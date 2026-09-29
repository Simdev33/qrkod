import type { LegalTexts } from "./types";

// Deutsche Übersetzung. Maßgeblich ist die ungarische Fassung (hu.ts).

export const legalDe: LegalTexts = {
  ui: {
    effective: "Gültig ab: {date}",
    toc: "Inhalt",
    translationNote:
      "Dies ist eine Übersetzung des ungarischen Originaldokuments. Bei Abweichungen ist die ungarische Fassung maßgeblich.",
    placeholderNote:
      "Die in eckigen Klammern stehenden Angaben zum Anbieter müssen noch ergänzt werden. Ohne sie ist das Dokument nicht vollständig.",
  },

  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    lead: "Dieses Dokument enthält die Bedingungen für die Nutzung des dynamischen QR-Code-Dienstes {brand} ({siteUrl}). Mit der Nutzung des Dienstes – durch das Erstellen eines QR-Codes oder den Abschluss eines Abonnements – akzeptieren Sie diese Bedingungen.",
    sections: [
      {
        h: "Angaben zum Anbieter",
        list: [
          "Name: {operatorName}",
          "Sitz: {operatorAddress}",
          "Registernummer: {operatorRegistry}",
          "Steuernummer: {operatorTax}",
          "E-Mail: {operatorEmail}",
          "Hosting-Anbieter: {hosting}",
        ],
      },
      {
        h: "Der Dienst",
        p: [
          "{brand} erstellt dynamische QR-Codes. Der QR-Code enthält einen Kurzlink auf der Domain des Anbieters, der auf die vom Nutzer angegebene Webadresse weiterleitet. Die Zieladresse kann auf der Verwaltungsseite des Codes jederzeit geändert werden; ein bereits gedruckter Code bleibt unverändert nutzbar.",
          "Zum Dienst gehören die Anpassung des Erscheinungsbilds des Codes (Farben, Muster, Logo, Rahmen), der Download des Codes in den Formaten PNG und SVG sowie die Anzeige der täglichen Anzahl der Scans.",
        ],
      },
      {
        h: "Vertragsschluss und Verwaltungslink",
        p: [
          "Der Vertrag kommt mit der Erstellung des QR-Codes auf elektronischem Weg zustande. Er gilt nicht als schriftlich abgefasster Vertrag, wird vom Anbieter nicht archiviert, und außer auf diese AGB wird auf keinen Verhaltenskodex Bezug genommen.",
          "Eine Registrierung gibt es nicht. Zu jedem Code gehört ein eindeutiger, geheimer Verwaltungslink: Wer ihn kennt, kann den Code verwalten (ändern, ein Abonnement dafür abschließen, das Abonnement kündigen, den Code löschen). Für die Aufbewahrung und Geheimhaltung des Verwaltungslinks ist der Nutzer verantwortlich. Geht er verloren, kann der Anbieter nur helfen, wenn die Berechtigung auf andere Weise (zum Beispiel über die für das Abonnement verwendete E-Mail-Adresse) glaubhaft nachgewiesen werden kann.",
        ],
      },
      {
        h: "Kostenloser Zeitraum",
        p: [
          "Jeder neue Code funktioniert ab seiner Erstellung {trialDays} Tage lang kostenlos. Dafür ist keine Zahlungskarte erforderlich, und der Ablauf des kostenlosen Zeitraums begründet für sich genommen keinerlei Zahlungspflicht.",
        ],
      },
      {
        h: "Abonnement und Gebühren",
        p: [
          "Nach dem kostenlosen Zeitraum funktioniert der Code mit einem Abonnement weiter. Die Abonnementgebühr beträgt monatlich {price} pro Code. {vatNote}",
          "Die Zahlung erfolgt per Zahlungskarte über die sichere Zahlungsoberfläche von Stripe; die Kartendaten gelangen nicht zum Anbieter. Stripe belastet die Gebühr monatlich im Voraus. Die in US-Dollar angegebene Gebühr kann von der kartenausgebenden Bank zu ihrem eigenen Wechselkurs umgerechnet werden.",
          "Wenn Sie während des kostenlosen Zeitraums ein Abonnement abschließen, wird die erste Gebühr am Ende des kostenlosen Zeitraums belastet, sofern davon noch mindestens zwei Tage übrig sind; andernfalls beginnen Abonnement und Belastung sofort. Das Abonnement verlängert sich danach automatisch jeden Monat, bis Sie es kündigen.",
          "Über die Zahlungen senden wir einen elektronischen Beleg an die beim Abschluss des Abonnements angegebene E-Mail-Adresse.",
          "Der Anbieter kann die Gebühr mit Wirkung für die Zukunft ändern. Über die Änderung informiert er mindestens 30 Tage im Voraus an die beim Abschluss des Abonnements angegebene E-Mail-Adresse; die Änderung wird ab dem nächsten Abrechnungszeitraum wirksam. Wenn Sie sie nicht akzeptieren, können Sie das Abonnement bis dahin kündigen.",
        ],
      },
      {
        h: "Kündigung",
        p: [
          "Das Abonnement kann auf der Verwaltungsseite des Codes jederzeit mit einem Klick gekündigt werden. Die Kündigung wird zum Ende des bereits bezahlten Zeitraums wirksam; bis dahin funktioniert der Code, und die Kündigung kann bis dahin auch rückgängig gemacht werden. Eine Mindestlaufzeit gibt es nicht.",
          "Die Gebühr für einen begonnenen Abrechnungszeitraum wird nicht erstattet, es sei denn, gesetzliche Vorschriften – insbesondere das Widerrufsrecht – sehen etwas anderes vor.",
        ],
      },
      {
        h: "Pausieren und Löschen des Codes",
        p: [
          "Hat der Code weder einen gültigen kostenlosen Zeitraum noch ein bezahltes Abonnement, wird er pausiert: Wer ihn scannt, sieht eine Informationsseite, die Weiterleitung funktioniert nicht. Mit einem Abonnement kann der Code jederzeit wieder aktiviert werden, mit demselben Kurzlink.",
          "Einen pausierten Code und seine Einstellungen bewahren wir ab Beginn der Pause {retentionMonths} Monate lang auf und löschen sie danach endgültig. Sie können den Code auf der Verwaltungsseite jederzeit sofort löschen; beim Löschen endet auch ein etwaiges Abonnement sofort.",
        ],
      },
      {
        h: "Widerrufsrecht",
        p: [
          "Wenn Sie Verbraucher sind, können Sie gemäß der ungarischen Regierungsverordnung Nr. 45/2014 (II. 26.) über die Verträge zwischen Verbrauchern und Unternehmern binnen 14 Tagen ab Abschluss des Abonnements ohne Angabe von Gründen den Vertrag widerrufen. Die Widerrufserklärung können Sie an {operatorEmail} senden; dazu können Sie das untenstehende Muster verwenden, dies ist jedoch nicht vorgeschrieben.",
          "Beim Abschluss des Abonnements können Sie ausdrücklich verlangen, dass der Anbieter mit der Erbringung des kostenpflichtigen Dienstes vor Ablauf der Widerrufsfrist beginnt. Widerrufen Sie in diesem Fall innerhalb der Frist dennoch, müssen Sie die anteilige Gebühr für die bereits erbrachte Leistung zahlen; wurde der Dienst innerhalb der Frist vollständig erbracht, verlieren Sie Ihr Widerrufsrecht.",
          "Im Fall eines Widerrufs erstatten wir den gezahlten Betrag – gegebenenfalls abzüglich der anteiligen Gebühr – spätestens binnen 14 Tagen nach Eingang der Widerrufserklärung über das ursprüngliche Zahlungsmittel.",
        ],
        list: [
          "Muster-Widerrufsformular – An: {operatorName}, {operatorEmail}",
          "Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung: {brand}-Abonnement, Kurzlink des QR-Codes: …",
          "Datum des Vertragsschlusses: … · Name und Anschrift des Verbrauchers: … · Datum: …",
        ],
      },
      {
        h: "Pflichten des Nutzers, verbotene Nutzung",
        p: [
          "Für den Inhalt der angegebenen Zieladresse ist der Nutzer verantwortlich. Es ist verboten, den Code auf Inhalte weiterzuleiten, die rechtswidrig oder irreführend sind (insbesondere Phishing), Schadsoftware verbreiten, zu Hass aufstacheln oder die Rechte Dritter verletzen, sowie den Dienst zur Verbreitung unerwünschter Nachrichten zu nutzen.",
          "Der Anbieter ist berechtigt, einen solchen Code ohne Benachrichtigung zu sperren oder zu löschen und mit den zuständigen Behörden zusammenzuarbeiten. Rechtswidrige Inhalte können Sie unter {operatorEmail} melden.",
          "Die massenhafte, automatisierte Nutzung des Dienstes kann eingeschränkt werden; derzeit können von einer Adresse aus höchstens {hourlyLimit} neue Codes pro Stunde erstellt werden.",
        ],
      },
      {
        h: "Verfügbarkeit und Haftung",
        p: [
          "Der Anbieter bemüht sich um einen kontinuierlichen Betrieb, garantiert jedoch keine unterbrechungs- und fehlerfreie Verfügbarkeit. Aufgrund von Wartungsarbeiten, Fehlern oder dem Ausfall externer Dienstleister (Hosting, Datenbank, Zahlung) kann der Dienst vorübergehend nicht erreichbar sein.",
          "Der Anbieter haftet nicht für den Inhalt und die Erreichbarkeit der Zieladresse und auch nicht dafür, wenn ein gedruckter Code wegen ungeeigneter Größe, Farbe oder Druckqualität nicht gescannt werden kann. Testen Sie den Code vor dem Druck immer.",
          "Die Haftung des Anbieters ist, soweit gesetzlich zulässig, für den jeweiligen Code auf die Summe der in den 12 Monaten vor Eintritt des Schadens gezahlten Gebühren beschränkt. Diese Beschränkung gilt nicht für vorsätzlich oder grob fahrlässig verursachte Schäden sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit und berührt nicht die gesetzlichen Rechte von Verbrauchern.",
        ],
      },
      {
        h: "Geistiges Eigentum",
        p: [
          "Die Website, die Software und das Erscheinungsbild von {brand} sind geistiges Eigentum des Anbieters. Das Bild des von Ihnen erstellten QR-Codes dürfen Sie uneingeschränkt und kostenlos verwenden. Für das hochgeladene Logo und das Recht zu dessen Nutzung sind Sie verantwortlich.",
          "„QR Code“ ist eine eingetragene Marke der DENSO WAVE INCORPORATED.",
        ],
      },
      {
        h: "Beschwerden und Rechtsbehelfe",
        p: [
          "Ihre Beschwerde können Sie an {operatorEmail} senden; wir antworten spätestens innerhalb von 30 Tagen in der Sache.",
          "Kann die Beschwerde nicht beigelegt werden, können Sie sich als Verbraucher an die für Ihren Wohn- oder Aufenthaltsort zuständige Schlichtungsstelle oder an die Verbraucherschutzbehörde wenden oder ein Gericht anrufen. Als Verbraucher mit Wohnsitz in einem anderen EU-Mitgliedstaat können Sie auch beim Europäischen Verbraucherzentren-Netz (ECC-Net) Unterstützung anfordern.",
        ],
      },
      {
        h: "Änderung der AGB, Sprache und anwendbares Recht",
        p: [
          "Der Anbieter kann die AGB ändern. Er veröffentlicht die Änderung mindestens 15 Tage vor ihrem Inkrafttreten auf dieser Seite und benachrichtigt die Abonnenten zusätzlich per E-Mail. Die Änderung berührt den bereits bezahlten Zeitraum nicht.",
          "Für die AGB gilt ungarisches Recht. Bei Verbrauchern wird diesen dadurch nicht der Schutz der zwingenden Verbraucherschutzvorschriften des Staates ihres gewöhnlichen Aufenthalts entzogen.",
          "Die AGB wurden in ungarischer Sprache erstellt, die Fassungen in anderen Sprachen sind Übersetzungen. Bei Abweichungen ist die ungarische Fassung maßgeblich.",
        ],
      },
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    lead: "In dieser Erklärung beschreiben wir, welche personenbezogenen Daten wir bei der Nutzung von {brand} ({siteUrl}) verarbeiten, zu welchem Zweck und wie lange, und welche Rechte Sie haben. Die Datenverarbeitung erfolgt gemäß der Datenschutz-Grundverordnung der Europäischen Union (DSGVO) und dem ungarischen Gesetz Nr. CXII von 2011 über das informationelle Selbstbestimmungsrecht und die Informationsfreiheit.",
    sections: [
      {
        h: "Der Verantwortliche",
        list: ["Name: {operatorName}", "Sitz: {operatorAddress}", "E-Mail: {operatorEmail}"],
        after: ["Wir sind nicht verpflichtet, einen Datenschutzbeauftragten zu benennen."],
      },
      {
        h: "Kurz gesagt",
        list: [
          "Es gibt keine Registrierung und kein Passwort, und wir verwenden keine Werbe-, Analyse- oder Tracking-Cookies.",
          "Über die Personen, die die QR-Codes scannen, speichern wir keine personenbezogenen Daten, sondern nur die tägliche Anzahl der Scans.",
          "Ihre Kartendaten bleiben bei Stripe; wir haben keinen Zugriff darauf.",
        ],
      },
      {
        h: "Erstellung und Betrieb von QR-Codes",
        p: [
          "<b>Verarbeitete Daten:</b> die angegebene Zieladresse (URL), die Bezeichnung des Codes, die Gestaltungseinstellungen (Farben, Muster, Beschriftung, hochgeladenes Logo), die Kurzkennung und das geheime Verwaltungs-Token des Codes, der Zeitpunkt der Erstellung und des Ablaufs sowie die tägliche Anzahl der Scans. Zieladresse und Bezeichnung enthalten nur dann personenbezogene Daten, wenn Sie solche angeben (zum Beispiel den Link zu einem persönlichen Profil).",
          "<b>Zweck:</b> die Erbringung des Dienstes – der Betrieb der Weiterleitung, der Verwaltungsseite und der Statistik. <b>Rechtsgrundlage:</b> Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).",
          "<b>Speicherdauer:</b> bis Sie den Code löschen; bei einem pausierten Code höchstens {retentionMonths} Monate ab Beginn der Pause.",
        ],
      },
      {
        h: "Verhinderung von Missbrauch",
        p: [
          "<b>Verarbeitete Daten:</b> die IP-Adresse des Geräts, mit dem der Code erstellt wurde, ausschließlich in Form eines gesalzenen, nicht umkehrbaren Hashwerts, zusammen mit dem Zeitpunkt der Erstellung.",
          "<b>Zweck:</b> die Begrenzung der massenhaften, automatisierten Erstellung von Codes (höchstens {hourlyLimit} Codes pro Stunde). <b>Rechtsgrundlage:</b> unser berechtigtes Interesse an einem sicheren und stabilen Betrieb des Dienstes (Art. 6 Abs. 1 lit. f DSGVO). <b>Speicherdauer:</b> zusammen mit dem Code.",
        ],
      },
      {
        h: "Abonnement und Zahlung",
        p: [
          "Beim Abschluss eines Abonnements werden die Zahlungsdaten (Name, E-Mail-Adresse, Kartendaten, Rechnungsland) von Stripe erhoben und verarbeitet – hinsichtlich der Zahlungsabwicklung und der Betrugsprävention als eigenständiger Verantwortlicher, gemäß der eigenen Datenschutzerklärung von Stripe.",
          "<b>Daten, die wir erhalten:</b> die Kennungen des Stripe-Kunden und des Stripe-Abonnements sowie Status und Laufzeiten des Abonnements; über die Oberfläche von Stripe haben wir Zugriff auf Namen, E-Mail-Adresse und Rechnungsland des Kunden sowie auf die Zahlungen. Kartennummern sehen wir nicht.",
          "<b>Zweck:</b> die Verwaltung des Abonnements und der Einzug der Gebühr sowie Benachrichtigungen zum Abonnement. <b>Rechtsgrundlage:</b> Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO); die Aufbewahrung der Buchungsbelege ist eine rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO, § 169 des ungarischen Rechnungslegungsgesetzes (Gesetz Nr. C von 2000)).",
          "<b>Speicherdauer:</b> bis zum Ende des Abonnements; Buchungsbelege 8 Jahre lang.",
        ],
      },
      {
        h: "Kontaktaufnahme",
        p: [
          "Wenn Sie uns eine E-Mail schreiben, verwenden wir Ihren Namen, Ihre E-Mail-Adresse und den Inhalt der Nachricht zur Beantwortung Ihrer Anfrage. <b>Rechtsgrundlage:</b> unser berechtigtes Interesse an der Bearbeitung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). <b>Speicherdauer:</b> 1 Jahr nach Abschluss des Vorgangs.",
        ],
      },
      {
        h: "Technische Protokolle",
        p: [
          "Der Hosting-Anbieter protokolliert für den Betrieb und die Sicherheit der Website automatisch die Anfragen (IP-Adresse, Zeitpunkt, aufgerufene Adresse, Browsertyp) – das gilt auch beim Scannen der QR-Codes. Die Protokolle werden vom Hosting-Anbieter für kurze Zeit nach seinen eigenen Regeln aufbewahrt, und wir verwenden sie nur zur Fehlersuche. <b>Rechtsgrundlage:</b> unser berechtigtes Interesse an einem sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO).",
        ],
      },
      {
        h: "Cookies und lokale Speicherung",
        list: [
          "NEXT_LOCALE-Cookie: speichert die gewählte Sprache für 1 Jahr.",
          "Browserspeicher (localStorage): die Verwaltungslinks der auf diesem Gerät erstellten oder geöffneten Codes, damit Sie sie auf der Seite „Meine Codes“ wiederfinden. Die Seite „Meine Codes“ fragt damit den Status der Codes ab; ansonsten verbleiben sie in Ihrem Browser, und Sie können sie jederzeit in den Browsereinstellungen löschen.",
          "Die Zahlungsseite von Stripe verwendet eigene Cookies gemäß den Regeln von Stripe.",
        ],
        after: ["Diese sind für den Betrieb des Dienstes erforderlich, daher holen wir dafür keine gesonderte Einwilligung ein."],
      },
      {
        h: "Auftragsverarbeiter und Empfänger",
        list: [
          "Hosting und Serverfunktionen: {hosting}",
          "Datenbank: {database} – speichert die Daten der Codes auf einem Server in der Europäischen Union (Irland).",
          "Zahlung: {payments} – als eigenständiger Verantwortlicher.",
        ],
        after: [
          "Wir verkaufen Ihre Daten nicht und geben sie nicht zu Marketingzwecken an Dritte weiter. An Behörden übermitteln wir Daten nur, wenn dies gesetzlich vorgeschrieben ist.",
        ],
      },
      {
        h: "Datenübermittlung außerhalb der Europäischen Union",
        p: [
          "Einige unserer Auftragsverarbeiter haben ihren Sitz in den Vereinigten Staaten. Werden im Rahmen der Verarbeitung Daten außerhalb der EU übermittelt, geschieht dies auf Grundlage des EU-US-Datenschutzrahmens (Data Privacy Framework) oder der von der Europäischen Kommission erlassenen Standardvertragsklauseln (SCC).",
        ],
      },
      {
        h: "Datensicherheit",
        p: [
          "Die Verbindung ist verschlüsselt (HTTPS). Das Verwaltungs-Token ist ein 192-Bit-Zufallswert, IP-Adressen speichern wir nur als gesalzenen Hash, und nur der Anbieter hat Zugriff auf die Datenbank.",
        ],
      },
      {
        h: "Ihre Rechte",
        list: [
          "Auskunft: Sie können Auskunft über die zu Ihrer Person verarbeiteten Daten verlangen (Art. 15 DSGVO).",
          "Berichtigung: Sie können die Berichtigung unrichtiger Daten verlangen (Art. 16).",
          "Löschung: Sie können die Löschung Ihrer Daten verlangen (Art. 17); den Code können Sie auf der Verwaltungsseite auch selbst sofort löschen.",
          "Einschränkung: Sie können die Einschränkung der Verarbeitung verlangen (Art. 18).",
          "Datenübertragbarkeit: Sie können verlangen, die von Ihnen bereitgestellten Daten in einem maschinenlesbaren Format zu erhalten (Art. 20).",
          "Widerspruch: Sie können einer auf berechtigtem Interesse beruhenden Verarbeitung widersprechen (Art. 21).",
        ],
        after: [
          "Ihren Antrag können Sie an {operatorEmail} senden. Geben Sie zur Identifizierung des Codes dessen Kurzlink an. Wir antworten spätestens innerhalb eines Monats.",
        ],
      },
      {
        h: "Rechtsbehelfe",
        p: [
          "Wenn Sie der Meinung sind, dass wir Ihre Datenschutzrechte verletzt haben, schreiben Sie uns bitte zuerst. Sie können Beschwerde bei der ungarischen Nationalen Behörde für Datenschutz und Informationsfreiheit (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; Postanschrift: 1363 Budapest, Pf. 9.; www.naih.hu) oder bei der Datenschutz-Aufsichtsbehörde Ihres Wohnorts einlegen oder sich auch an ein Gericht wenden.",
        ],
      },
      {
        h: "Minderjährige",
        p: [
          "Personen unter 16 Jahren dürfen den Dienst nur mit Zustimmung der Eltern nutzen. Ein Abonnement können nur volljährige Personen oder der gesetzliche Vertreter des Minderjährigen abschließen.",
        ],
      },
      {
        h: "Änderung dieser Erklärung",
        p: ["Wir können diese Erklärung aktualisieren. Die jeweils gültige Fassung ist auf dieser Seite mit dem Datum des Inkrafttretens abrufbar."],
      },
    ],
  },
};
