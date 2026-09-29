import type { LegalTexts } from "./types";

// Az irányadó (eredeti) változat. Tartalmi módosítás esetén a többi nyelvet is frissíteni kell.

export const legalHu: LegalTexts = {
  ui: {
    effective: "Hatályos: {date}",
    toc: "Tartalom",
    translationNote: "",
    placeholderNote:
      "A szögletes zárójelben álló szolgáltatói adatok még kitöltésre várnak. A dokumentum ezek nélkül nem teljes.",
  },

  terms: {
    title: "Általános Szerződési Feltételek",
    lead: "Ez a dokumentum a(z) {brand} dinamikus QR-kód szolgáltatás ({siteUrl}) igénybevételének feltételeit tartalmazza. A szolgáltatás használatával – QR-kód létrehozásával vagy előfizetéssel – elfogadod ezeket a feltételeket.",
    sections: [
      {
        h: "A Szolgáltató adatai",
        list: [
          "Név: {operatorName}",
          "Székhely: {operatorAddress}",
          "Nyilvántartási szám: {operatorRegistry}",
          "Adószám: {operatorTax}",
          "E-mail: {operatorEmail}",
          "Tárhelyszolgáltató: {hosting}",
        ],
      },
      {
        h: "A szolgáltatás",
        p: [
          "A(z) {brand} dinamikus QR-kódokat készít. A QR-kód egy, a Szolgáltató domainjén található rövid linket tartalmaz, amely a Felhasználó által megadott webcímre irányít tovább. A célcím a kód kezelőoldalán bármikor módosítható; a már kinyomtatott kód változatlanul használható marad.",
          "A szolgáltatás része a kód megjelenésének testreszabása (színek, minta, logó, keret), a kód letöltése PNG és SVG formátumban, valamint a beolvasások napi számának megjelenítése.",
        ],
      },
      {
        h: "A szerződés létrejötte és a kezelőlink",
        p: [
          "A szerződés a QR-kód létrehozásával, elektronikus úton jön létre. Nem minősül írásba foglalt szerződésnek, a Szolgáltató nem iktatja, és az ÁSZF-en kívül magatartási kódexre nem utal.",
          "Regisztráció nincs. Minden kódhoz egy egyedi, titkos kezelőlink tartozik: aki ismeri, az kezelheti a kódot (módosíthatja, előfizethet rá, lemondhatja az előfizetést, törölheti). A kezelőlink megőrzése és titokban tartása a Felhasználó felelőssége. Elvesztése esetén a Szolgáltató csak akkor tud segíteni, ha a jogosultság más módon (például az előfizetéshez használt e-mail-címmel) hitelt érdemlően igazolható.",
        ],
      },
      {
        h: "Ingyenes időszak",
        p: [
          "Minden új kód a létrehozásától számított {trialDays} napig ingyenesen működik. Ehhez nem kell bankkártya, és az ingyenes időszak lejárta önmagában semmilyen fizetési kötelezettséget nem keletkeztet.",
        ],
      },
      {
        h: "Előfizetés és díjak",
        p: [
          "Az ingyenes időszak után a kód előfizetéssel működik tovább. Az előfizetés díja kódonként havi {price}. {vatNote}",
          "A fizetés bankkártyával, a Stripe biztonságos fizetési felületén történik; a kártyaadatok a Szolgáltatóhoz nem jutnak el. A díjat a Stripe havonta, előre terheli. A dollárban megadott díjat a kártyát kibocsátó bank a saját árfolyamán válthatja át.",
          "Ha az ingyenes időszak alatt fizetsz elő, az első díjat az ingyenes időszak végén terheljük, feltéve, hogy abból legalább két nap még hátravan; ellenkező esetben az előfizetés és a terhelés azonnal indul. Az előfizetés ezután havonta automatikusan megújul, amíg le nem mondod.",
          "A kifizetésekről elektronikus bizonylatot küldünk az előfizetéskor megadott e-mail-címre.",
          "A Szolgáltató a díjat a jövőre nézve módosíthatja. A változásról legalább 30 nappal korábban, az előfizetéskor megadott e-mail-címen tájékoztat; a módosítás a következő számlázási időszaktól lép hatályba. Ha nem fogadod el, az előfizetést addig lemondhatod.",
        ],
      },
      {
        h: "Lemondás",
        p: [
          "Az előfizetés a kód kezelőoldalán bármikor, egy kattintással lemondható. A lemondás a már kifizetett időszak végén lép hatályba, addig a kód működik, és a lemondás addig vissza is vonható. Hűségidő nincs.",
          "A megkezdett számlázási időszak díját nem térítjük vissza, kivéve, ha jogszabály – különösen az elállási jog – másként rendelkezik.",
        ],
      },
      {
        h: "A kód szünetelése és törlése",
        p: [
          "Ha a kódnak nincs érvényes ingyenes időszaka vagy kifizetett előfizetése, a kód szünetel: a beolvasók egy tájékoztató oldalt látnak, a továbbítás nem működik. Előfizetéssel a kód bármikor újraéleszthető, ugyanazzal a rövid linkkel.",
          "A szünetelő kódot és beállításait a szünetelés kezdetétől számított {retentionMonths} hónapig megőrizzük, utána véglegesen töröljük. A kódot a kezelőoldalon bármikor azonnal törölheted; törléskor az esetleges előfizetés is azonnal megszűnik.",
        ],
      },
      {
        h: "Elállási jog",
        p: [
          "Ha fogyasztó vagy, a fogyasztó és a vállalkozás közötti szerződések részletes szabályairól szóló 45/2014. (II. 26.) Korm. rendelet alapján az előfizetés megkötésétől számított 14 napon belül indokolás nélkül elállhatsz a szerződéstől. Az elállási nyilatkozatot a {operatorEmail} címre küldheted; ehhez használhatod az alábbi mintát, de nem kötelező.",
          "Előfizetéskor kifejezetten kérheted, hogy a Szolgáltató a fizetős szolgáltatás nyújtását az elállási határidő lejárta előtt megkezdje. Ebben az esetben, ha a határidőn belül mégis elállsz, a már teljesített szolgáltatás arányos díját kell megfizetned; ha pedig a szolgáltatást a határidőn belül teljes egészében teljesítettük, az elállási jogodat elveszíted.",
          "Elállás esetén a kifizetett összeget – az esetleges arányos díj levonásával – legkésőbb az elállási nyilatkozat kézhezvételétől számított 14 napon belül, az eredeti fizetési móddal térítjük vissza.",
        ],
        list: [
          "Minta-elállási nyilatkozat – Címzett: {operatorName}, {operatorEmail}",
          "Alulírott kijelentem, hogy gyakorlom elállási jogomat a következő szolgáltatás nyújtására irányuló szerződés tekintetében: {brand} előfizetés, a QR-kód rövid linkje: …",
          "A szerződéskötés időpontja: … · A fogyasztó neve és címe: … · Kelt: …",
        ],
      },
      {
        h: "A Felhasználó kötelezettségei, tiltott felhasználás",
        p: [
          "A megadott célcím tartalmáért a Felhasználó felel. Tilos a kódot jogsértő, megtévesztő (különösen adathalász), kártékony szoftvert terjesztő, gyűlöletkeltő vagy harmadik személy jogait sértő tartalomra irányítani, illetve a szolgáltatást kéretlen üzenetek terjesztésére használni.",
          "A Szolgáltató jogosult az ilyen kódot értesítés nélkül felfüggeszteni vagy törölni, és az illetékes hatóságokkal együttműködni. Jogellenes tartalmat a {operatorEmail} címen jelenthetsz be.",
          "A szolgáltatás tömeges, automatizált igénybevétele korlátozható; jelenleg egy címről óránként legfeljebb {hourlyLimit} új kód hozható létre.",
        ],
      },
      {
        h: "Rendelkezésre állás és felelősség",
        p: [
          "A Szolgáltató a folyamatos működésre törekszik, de nem garantálja a megszakítás- és hibamentes rendelkezésre állást. Karbantartás, hiba vagy külső szolgáltató (tárhely, adatbázis, fizetés) kiesése miatt a szolgáltatás átmenetileg elérhetetlen lehet.",
          "A Szolgáltató nem felel a célcím tartalmáért és elérhetőségéért, valamint azért, ha a kinyomtatott kód a nem megfelelő méret, szín vagy nyomtatási minőség miatt nem olvasható be. Nyomtatás előtt mindig próbáld ki a kódot.",
          "A Szolgáltató felelőssége a jogszabályok által megengedett mértékben az adott kódért a kár bekövetkezését megelőző 12 hónapban megfizetett díj összegére korlátozódik. Ez a korlátozás nem vonatkozik a szándékosan vagy súlyos gondatlansággal okozott, illetve az életet, testi épséget vagy egészséget megsértő károkra, és nem érinti a fogyasztók jogszabályban biztosított jogait.",
        ],
      },
      {
        h: "Szellemi tulajdon",
        p: [
          "A weboldal, a szoftver és a(z) {brand} arculata a Szolgáltató szellemi tulajdona. Az általad létrehozott QR-kód képét korlátozás nélkül, díjmentesen felhasználhatod. A feltöltött logóért és annak felhasználási jogáért te felelsz.",
          "A „QR Code” a DENSO WAVE INCORPORATED bejegyzett védjegye.",
        ],
      },
      {
        h: "Panaszkezelés és jogorvoslat",
        p: [
          "Panaszodat a {operatorEmail} címre küldheted; legkésőbb 30 napon belül érdemben válaszolunk.",
          "Ha a panasz rendezése nem sikerül, fogyasztóként a lakóhelyed vagy tartózkodási helyed szerint illetékes békéltető testülethez vagy a fogyasztóvédelmi hatósághoz fordulhatsz, illetve bírósághoz fordulhatsz. Más uniós tagállamban élő fogyasztóként az Európai Fogyasztói Központok Hálózatától (ECC-Net) is kérhetsz segítséget.",
        ],
      },
      {
        h: "Az ÁSZF módosítása, nyelv és irányadó jog",
        p: [
          "A Szolgáltató az ÁSZF-et módosíthatja. A módosítást hatálybalépése előtt legalább 15 nappal közzéteszi ezen az oldalon, az előfizetőket e-mailben is értesíti. A módosítás a már kifizetett időszakot nem érinti.",
          "Az ÁSZF-re a magyar jog irányadó. Fogyasztó esetén ez nem fosztja meg a fogyasztót a szokásos tartózkodási helye szerinti állam kötelező fogyasztóvédelmi szabályainak védelmétől.",
          "Az ÁSZF magyar nyelven készült, a más nyelvű változatok fordítások. Eltérés esetén a magyar változat az irányadó.",
        ],
      },
    ],
  },

  privacy: {
    title: "Adatkezelési tájékoztató",
    lead: "Ebben a tájékoztatóban leírjuk, milyen személyes adatokat kezelünk a(z) {brand} ({siteUrl}) használata során, milyen célból és meddig, valamint hogy milyen jogaid vannak. Az adatkezelés az Európai Unió általános adatvédelmi rendelete (GDPR) és az információs önrendelkezési jogról szóló 2011. évi CXII. törvény szerint történik.",
    sections: [
      {
        h: "Az adatkezelő",
        list: ["Név: {operatorName}", "Székhely: {operatorAddress}", "E-mail: {operatorEmail}"],
        after: ["Adatvédelmi tisztviselő kijelölésére nem vagyunk kötelesek."],
      },
      {
        h: "Röviden",
        list: [
          "Nincs regisztráció és jelszó, és nem használunk hirdetési, analitikai vagy követő sütiket.",
          "A QR-kódok beolvasóiról nem tárolunk személyes adatot, csak a beolvasások napi darabszámát.",
          "A bankkártyaadataid a Stripe-nál maradnak, azokhoz nem férünk hozzá.",
        ],
      },
      {
        h: "QR-kód létrehozása és működtetése",
        p: [
          "<b>Kezelt adatok:</b> a megadott célcím (URL), a kód megnevezése, a megjelenési beállítások (színek, minta, felirat, feltöltött logó), a kód rövid azonosítója és titkos kezelő-tokenje, a létrehozás és a lejárat időpontja, valamint a beolvasások napi száma. A célcím és a megnevezés akkor tartalmaz személyes adatot, ha te ilyet adsz meg (például egy személyes profil linkjét).",
          "<b>Cél:</b> a szolgáltatás nyújtása – a továbbítás, a kezelőoldal és a statisztika működtetése. <b>Jogalap:</b> szerződés teljesítése (GDPR 6. cikk (1) b) pont).",
          "<b>Megőrzés:</b> amíg a kódot nem törlöd; szünetelő kód esetén legfeljebb a szünetelés kezdetétől számított {retentionMonths} hónapig.",
        ],
      },
      {
        h: "Visszaélések megelőzése",
        p: [
          "<b>Kezelt adatok:</b> a kódot létrehozó eszköz IP-címe, kizárólag sózott, visszafejthetetlen hash-lenyomat formájában, a létrehozás időpontjával.",
          "<b>Cél:</b> a tömeges, automatizált kódgyártás korlátozása (legfeljebb {hourlyLimit} kód óránként). <b>Jogalap:</b> jogos érdekünk a szolgáltatás biztonságos és stabil működésében (GDPR 6. cikk (1) f) pont). <b>Megőrzés:</b> a kóddal együtt.",
        ],
      },
      {
        h: "Előfizetés és fizetés",
        p: [
          "Előfizetéskor a fizetési adatokat (név, e-mail-cím, bankkártyaadatok, számlázási ország) a Stripe gyűjti és kezeli, a fizetés lebonyolítása és a csalások megelőzése tekintetében önálló adatkezelőként, a saját adatvédelmi tájékoztatója szerint.",
          "<b>Hozzánk kerülő adatok:</b> a Stripe-ügyfél és -előfizetés azonosítója, az előfizetés állapota és időszakai; a Stripe felületén hozzáférünk az ügyfél nevéhez, e-mail-címéhez, számlázási országához és a kifizetésekhez. Bankkártyaszámot nem látunk.",
          "<b>Cél:</b> az előfizetés kezelése és a díj beszedése, az előfizetéssel kapcsolatos értesítések. <b>Jogalap:</b> szerződés teljesítése (GDPR 6. cikk (1) b) pont); a számviteli bizonylatok megőrzése jogi kötelezettség (GDPR 6. cikk (1) c) pont, a számvitelről szóló 2000. évi C. törvény 169. §).",
          "<b>Megőrzés:</b> az előfizetés megszűnéséig; a számviteli bizonylatokat 8 évig.",
        ],
      },
      {
        h: "Kapcsolattartás",
        p: [
          "Ha e-mailt írsz nekünk, a nevedet, e-mail-címedet és az üzenet tartalmát a megkeresés megválaszolására használjuk. <b>Jogalap:</b> jogos érdekünk a megkeresések kezelésében (GDPR 6. cikk (1) f) pont). <b>Megőrzés:</b> az ügy lezárását követő 1 évig.",
        ],
      },
      {
        h: "Technikai naplók",
        p: [
          "A tárhelyszolgáltató a weboldal működtetése és biztonsága érdekében automatikusan naplózza a kéréseket (IP-cím, időpont, lekért cím, böngésző típusa) – ez a QR-kódok beolvasásakor is így van. A naplókat a tárhelyszolgáltató rövid ideig, a saját szabályai szerint őrzi, és mi csak hibakereséshez használjuk. <b>Jogalap:</b> jogos érdekünk a biztonságos működésben (GDPR 6. cikk (1) f) pont).",
        ],
      },
      {
        h: "Sütik és helyi tárolás",
        list: [
          "NEXT_LOCALE süti: a választott nyelvet jegyzi meg, 1 évig.",
          "Böngészőtár (localStorage): az ezen az eszközön készített vagy megnyitott kódok kezelőlinkjei, hogy a „Kódjaim” oldalon megtaláld őket. A Kódjaim oldal ezekkel kérdezi le a kódok állapotát; egyébként a böngésződben maradnak, és bármikor törölheted őket a böngésző beállításaiban.",
          "A Stripe fizetőoldala a saját sütijeit használja, a Stripe szabályai szerint.",
        ],
        after: ["Ezek a szolgáltatás működéséhez szükségesek, ezért nem kérünk hozzájuk külön hozzájárulást."],
      },
      {
        h: "Adatfeldolgozók és címzettek",
        list: [
          "Tárhely és szerverfunkciók: {hosting}",
          "Adatbázis: {database} – a kódok adatait az Európai Unióban (Írország) lévő szerveren tárolja.",
          "Fizetés: {payments} – önálló adatkezelőként.",
        ],
        after: [
          "Adataidat nem adjuk el, és marketingcélra nem adjuk át senkinek. Hatóság részére csak jogszabályban előírt esetben továbbítunk adatot.",
        ],
      },
      {
        h: "Adattovábbítás az Európai Unión kívülre",
        p: [
          "Egyes adatfeldolgozóink az Egyesült Államokban székelnek. Ha az adatkezelés során adat kerül az EU-n kívülre, az az EU–USA adatvédelmi keretrendszer (Data Privacy Framework) vagy az Európai Bizottság által elfogadott általános szerződési feltételek (SCC) alapján történik.",
        ],
      },
      {
        h: "Adatbiztonság",
        p: [
          "A kapcsolat titkosított (HTTPS). A kezelő-token 192 bites véletlen érték, az IP-címeket csak sózott hash-ként tároljuk, az adatbázishoz csak a Szolgáltató fér hozzá.",
        ],
      },
      {
        h: "Jogaid",
        list: [
          "Hozzáférés: tájékoztatást kérhetsz a rólad kezelt adatokról (GDPR 15. cikk).",
          "Helyesbítés: kérheted a pontatlan adatok javítását (16. cikk).",
          "Törlés: kérheted az adataid törlését (17. cikk); a kódot a kezelőoldalon magad is azonnal törölheted.",
          "Korlátozás: kérheted az adatkezelés korlátozását (18. cikk).",
          "Adathordozhatóság: kérheted az általad megadott adatok géppel olvasható kiadását (20. cikk).",
          "Tiltakozás: tiltakozhatsz a jogos érdeken alapuló adatkezelés ellen (21. cikk).",
        ],
        after: [
          "Kérelmedet a {operatorEmail} címre küldheted. A kód azonosításához add meg a rövid linkjét. Legkésőbb egy hónapon belül válaszolunk.",
        ],
      },
      {
        h: "Jogorvoslat",
        p: [
          "Ha úgy érzed, hogy megsértettük az adatvédelmi jogaidat, kérjük, először írj nekünk. Panaszt tehetsz a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; postacím: 1363 Budapest, Pf. 9.; www.naih.hu), a lakóhelyed szerinti adatvédelmi felügyeleti hatóságnál, vagy bírósághoz is fordulhatsz.",
        ],
      },
      {
        h: "Kiskorúak",
        p: [
          "16 éven aluliak a szolgáltatást csak szülői hozzájárulással vehetik igénybe. Előfizetni csak nagykorú személy vagy a kiskorú törvényes képviselője tud.",
        ],
      },
      {
        h: "A tájékoztató módosítása",
        p: ["A tájékoztatót frissíthetjük. A mindenkor hatályos változat ezen az oldalon érhető el, a hatálybalépés dátumával."],
      },
    ],
  },
};
