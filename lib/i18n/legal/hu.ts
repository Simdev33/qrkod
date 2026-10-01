import type { LegalTexts } from "./types";

// Magyar fordítás. Az irányadó változat az angol eredeti (en.ts); annak módosításakor ezt is frissíteni kell.

export const legalHu: LegalTexts = {
  ui: {
    effective: "Hatályos: {date}",
    toc: "Tartalom",
    translationNote: "Ez a dokumentum az angol nyelvű eredeti fordítása; bármilyen eltérés esetén az angol változat az irányadó.",
    placeholderNote: "A szögletes zárójelben álló üzemeltetői adatok egy része még kitöltésre vár.",
  },

  terms: {
    title: "Általános Szerződési Feltételek",
    lead: "Ezek a feltételek a(z) {brand} webes szolgáltatás ({siteUrl}, a „Szolgáltatás”) használatára és az arra szóló előfizetésekre vonatkoznak. QR-kód létrehozásával vagy előfizetés megrendelésével elfogadod ezeket a feltételeket; ha nem értesz velük egyet, kérjük, ne használd a Szolgáltatást.",
    sections: [
      {
        h: "Az Üzemeltető",
        p: ["A Szolgáltatást a következő üzemeltető (az „Üzemeltető”) nyújtja:"],
        list: [
          "Név: {operatorName}",
          "Székhely: {operatorAddress}",
          "Nyilvántartás: {operatorRegistry}",
          "Adószám: {operatorTax}",
          "E-mail: {operatorEmail}",
          "Tárhelyszolgáltató: {hosting}",
        ],
      },
      {
        h: "A Szolgáltatás",
        p: [
          "A(z) {brand} dinamikus QR-kódokat készít. A QR-kód egy, az Üzemeltető domainjén található rövid linket tartalmaz, amely a látogatókat az általad megadott webcímre (a „célcímre”) irányítja tovább. A célcímet a kód kezelőoldalán bármikor módosíthatod; a már kinyomtatott kódok továbbra is működnek.",
          "A Szolgáltatás része a kód megjelenésének testreszabása (színek, minta, logó, keret), a kód letöltése PNG és SVG formátumban, valamint a beolvasások napi számának megjelenítése.",
          "A kód megtervezése és előnézete ingyenes. Ahhoz, hogy a kód továbbirányítsa a látogatókat és letölthető legyen, előfizetéssel aktiválni kell (lásd a 4. pontot).",
        ],
      },
      {
        h: "A szerződés létrejötte és a kezelőlink",
        p: [
          "A szerződés elektronikus úton jön létre a QR-kód létrehozásával, a fizetős szolgáltatás esetében pedig az előfizetés megrendelésével. Az Üzemeltető a szerződést nem iktatja, és az magatartási kódexre nem utal.",
          "Jelszavas regisztráció nincs. Minden kódhoz egy egyedi, titkos kezelőlink tartozik: aki ismeri, kezelheti a kódot (módosíthatja, előfizethet rá, lemondhatja az előfizetést, törölheti a kódot). A kezelőlink biztonságos megőrzése és titokban tartása a te felelősséged. Ha elveszíted, az Üzemeltető csak akkor tud segíteni, ha hitelt érdemlően igazolni tudod, hogy a kód a tiéd, például az előfizetéshez használt e-mail-címmel.",
        ],
      },
      {
        h: "Előfizetés és díjak",
        p: [
          "Minden QR-kódhoz saját előfizetés tartozik. Az előfizetés egy {days} napos bevezető időszakkal indul, amelynek díja {intro}. Ez alatt az időszak alatt a kód teljes körűen működik.",
          "Ha a bevezető időszak végéig nem mondod le az előfizetést, a {next}. naptól automatikusan kódonként havi {monthly} díjjal folytatódik, és havonta megújul, amíg le nem mondod. A havi díjat minden időszak elején terheljük a megrendeléskor megadott fizetési módra.",
          "Ha olyan kódot aktiválsz újra, amelynek előfizetése megszűnt, az előfizetés bevezető időszak nélkül, havi {monthly} díjjal indul újra, azonnali terheléssel.",
          "A fizetendő teljes összeg a megrendelés leadása előtt egyértelműen megjelenik a fizetési oldalon. A megrendelés a fizetési kötelezettséget jelző gomb (vagy a választott fizetési mód gombja) megnyomásával jön létre.",
          "A díjak változásáról az előfizetőket legalább 30 nappal a változás hatálybalépése előtt e-mailben értesítjük; ha nem fogadod el, addig lemondhatod az előfizetésedet.",
        ],
      },
      {
        h: "Fizetés",
        p: [
          "A fizetéseket a következő szolgáltató dolgozza fel: {payments}. Az elérhető fizetési módok az eszközödtől, a böngésződtől és az országodtól függenek, és lehetnek köztük betéti és hitelkártyák, az Apple Pay, a Google Pay, a PayPal és a Link. Az Üzemeltető nem látja és nem tárolja a kártyaadataidat.",
          "Minden sikeres fizetésről a Stripe e-mailben nyugtát küld. A jogszabály által előírt számlát az Üzemeltető állítja ki.",
          "Ha egy havi terhelés sikertelen, a Stripe néhány napon belül újra megpróbálja; ha ez sem sikerül, az előfizetés megszűnik, és a kód szünetel.",
        ],
      },
      {
        h: "Lemondás",
        p: [
          "Egy kód előfizetését bármikor, indokolás nélkül, egy kattintással lemondhatod a kód kezelőoldalán.",
          "A lemondás az aktuális időszak végén lép hatályba: addig a kód tovább működik, további terhelés pedig nem történik. Addig a lemondást vissza is vonhatod. Ha a bevezető időszak alatt mondasz le, a {next}. naptól havi díjat nem terhelünk.",
          "A már megkezdett időszak díját nem térítjük vissza, kivéve, ha az elállási jogodat gyakorlod, illetve más, jogszabályban előírt esetekben.",
        ],
      },
      {
        h: "Szünetelő és törölt kódok",
        p: [
          "Ha egy kódnak nincs aktív előfizetése, a kód szünetel: aki beolvassa, egy tájékoztató oldalt lát, és nem irányítjuk tovább. A szünetelő kódot bármikor újra aktiválhatod; a rövid linkje ugyanaz marad.",
          "A soha nem aktivált kódokat {pendingDays} napig, a szünetelő kódokat a szünetelés kezdetétől számított {retentionMonths} hónapig őrizzük meg; ezt követően véglegesen töröljük őket. A kódot a kezelőoldalán bármikor magad is törölheted; a törléssel az előfizetése is azonnal megszűnik.",
        ],
      },
      {
        h: "Elállási jog",
        p: [
          "Ha fogyasztóként rendelsz előfizetést, a megrendeléstől számított 14 napon belül indokolás nélkül elállhatsz a szerződéstől. Elállási döntésedről egyértelmű nyilatkozattal tájékoztathatod az Üzemeltetőt, például a {operatorEmail} címre küldött e-mailben; ehhez használhatod a 2011/83/EU irányelv I. melléklet B. részében található minta-elállási nyilatkozatot, de ez nem kötelező.",
          "Mivel a megrendeléskor kifejezetten kéred a Szolgáltatás azonnali megkezdését, elállás esetén az elállásig igénybe vett időszakra arányos díjat kell fizetned. A fennmaradó összeget az elállásod közlésétől számított 14 napon belül visszatérítjük a fizetéshez használt fizetési módra.",
          "Az elállási jog nem érinti azt a lehetőségedet, hogy az előfizetést bármikor lemondd (lásd a 6. pontot).",
        ],
      },
      {
        h: "Felhasználási feltételek",
        p: ["A Szolgáltatást csak jogszerű célokra és e feltételeknek megfelelően használhatod. Egy kód célcíme különösen nem vezethet olyan tartalomra, amely:"],
        list: [
          "jogellenes, vagy mások jogait (például szerzői vagy személyiségi jogait) sérti;",
          "megtévesztő vagy csalárd, különösen adathalász oldal;",
          "kártékony szoftvert terjeszt, vagy más módon kárt okoz a látogató eszközében;",
          "gyűlöletre vagy erőszakra uszít.",
        ],
        after: [
          "A Szolgáltatás nem használható kéretlen üzenetek (spam) küldésére, és nem kísérelheted meg biztonsági vagy fizetési intézkedéseinek megkerülését, illetve működésének akadályozását. A visszaélések megelőzése érdekében egy címről óránként legfeljebb {hourlyLimit} új kód hozható létre.",
          "Az Üzemeltető az ilyen kódokat értesítés nélkül felfüggesztheti vagy törölheti, és együttműködhet az illetékes hatóságokkal; e feltételek súlyos megsértése esetén az előfizetés azonnali hatállyal megszüntethető. Jogellenes tartalmat a {operatorEmail} címen jelenthetsz be.",
        ],
      },
      {
        h: "Szellemi tulajdon",
        p: [
          "A Szolgáltatás szoftvere, dizájnja, logója és szövegei az Üzemeltető szellemi tulajdonát képezik; nem másolhatók, nem értékesíthetők tovább, és nem kínálhatók saját szolgáltatásként.",
          "Az általad létrehozott QR-kódok képeit szabadon, forrásmegjelölés nélkül felhasználhatod. Az általad feltöltött logóért és annak felhasználási jogáért te felelsz.",
          "A „QR Code” a DENSO WAVE INCORPORATED bejegyzett védjegye.",
        ],
      },
      {
        h: "Felelősség",
        p: [
          "Az Üzemeltető mindent megtesz a Szolgáltatás folyamatos és hibátlan működéséért, de nem garantálja, hogy az megszakítás és hibák nélkül elérhető lesz. Karbantartás, hiba vagy egy külső szolgáltató (tárhely, adatbázis, fizetés) kiesése miatt a Szolgáltatás átmenetileg elérhetetlen lehet.",
          "Az Üzemeltető nem felel a célcím tartalmáért és elérhetőségéért, sem azért, ha egy kinyomtatott kód a mérete, a színei vagy a nyomtatás minősége miatt nem olvasható be. Nyomtatás előtt mindig próbáld ki a kódot egy telefonnal.",
          "A jogszabályok által megengedett legteljesebb mértékben az Üzemeltető nem felel a Szolgáltatás használatából vagy használhatatlanságából eredő közvetett károkért vagy elmaradt haszonért. Ez a korlátozás nem vonatkozik a szándékosan vagy súlyos gondatlansággal okozott, illetve az életet, testi épséget vagy egészséget megsértő károkért való felelősségre, és nem érinti a fogyasztókat jogszabály alapján megillető jogokat.",
        ],
      },
      {
        h: "Elérhetőség és változások",
        p: [
          "Az Üzemeltető jogosult a Szolgáltatást fejleszteni és módosítani. Ha a Szolgáltatás véglegesen megszűnik, az előfizetéseket megszüntetjük, és a fel nem használt időszak díját időarányosan visszatérítjük.",
        ],
      },
      {
        h: "Adatvédelem",
        p: ["A személyes adatok kezelésének részleteit az Adatkezelési tájékoztató tartalmazza."],
      },
      {
        h: "A feltételek módosítása",
        p: [
          "Az Üzemeltető jogosult e feltételeket módosítani. A módosítások az ezen az oldalon történő közzététellel, a dokumentum tetején feltüntetett hatálybalépési napon lépnek hatályba. Az előfizetőket a számukra hátrányos lényeges változásokról legalább 30 nappal előre e-mailben értesítjük; ha nem fogadják el a változásokat, a hatálybalépés előtt lemondhatják az előfizetésüket.",
        ],
      },
      {
        h: "Irányadó jog és jogviták",
        p: [
          "E feltételekre a szlovák jog irányadó. Ha fogyasztóként használod a Szolgáltatást, ez a jogválasztás nem foszt meg attól a védelemtől, amelyet a lakóhelyed szerinti ország kötelező fogyasztóvédelmi szabályai biztosítanak számodra.",
          "A jogvitákat igyekszünk békés úton rendezni: panaszodat a {operatorEmail} címre küldheted, és 30 napon belül válaszolunk. Ha a panaszodat elutasítjuk, vagy 30 napon belül nem válaszolunk, fogyasztóként alternatív vitarendezési eljárást kezdeményezhetsz a következő szervnél: {adr}, vagy a szlovák Gazdasági Minisztérium listáján szereplő más vitarendezési testületnél. A lakóhelyed szerinti fogyasztóvédelmi hatósághoz és bírósághoz is fordulhatsz.",
          "E feltételek több nyelven is elérhetők; bármilyen eltérés esetén az angol változat az irányadó.",
        ],
      },
      {
        h: "Kapcsolat",
        p: ["Kérdéseiddel, észrevételeiddel vagy panaszaiddal a következő e-mail-címen fordulhatsz az Üzemeltetőhöz: {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Adatkezelési tájékoztató",
    lead: "Az (EU) 2016/679 rendelet (általános adatvédelmi rendelet, GDPR) alapján ez a tájékoztató bemutatja, milyen személyes adatokat kezelünk a(z) {brand} ({siteUrl}) használata során, milyen célból, milyen jogalapon és meddig, valamint hogy milyen jogaid vannak.",
    sections: [
      {
        h: "Az adatkezelő",
        list: [
          "Név: {operatorName}",
          "Székhely: {operatorAddress}",
          "Nyilvántartás: {operatorRegistry}",
          "E-mail: {operatorEmail}",
        ],
        after: ["Adatvédelmi ügyekben a {operatorEmail} címen érsz el minket."],
      },
      {
        h: "Röviden",
        list: [
          "Nincs regisztráció és jelszó; minden kódot a saját titkos kezelőlinkjével kezelhetsz.",
          "A kódjaidat beolvasó személyekről nem tárolunk személyes adatot – csak a beolvasások napi számát.",
          "A fizetéseket a Stripe dolgozza fel; a kártyaadataidat nem látjuk és nem tároljuk.",
          "Nem használunk analitikai, hirdetési vagy követő sütiket.",
        ],
      },
      {
        h: "QR-kód létrehozása és működtetése",
        p: [
          "<b>Kezelt adatok:</b> a megadott célcím (URL), a kód neve, a megjelenési beállításai (színek, minta, felirat, feltöltött logó), a kód rövid azonosítója és titkos kezelő-tokenje, a létrehozás időpontja és az aktív időszak vége, valamint a beolvasások napi száma. A célcím és a név csak akkor tartalmaz személyes adatot, ha te ilyet adsz meg (például egy személyes profil linkjét).",
          "<b>Cél:</b> a Szolgáltatás nyújtása – a látogatók továbbirányítása, a kezelőoldal és a statisztika. <b>Jogalap:</b> szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont).",
          "<b>Megőrzés:</b> amíg a kódot nem törlöd; a soha nem aktivált kódok esetén {pendingDays} napig; a szünetelő kódok esetén a szünetelés kezdetétől számított {retentionMonths} hónapig.",
        ],
      },
      {
        h: "Visszaélések megelőzése",
        p: [
          "<b>Kezelt adatok:</b> a kódot létrehozó eszköz IP-címe, kizárólag sózott, visszafejthetetlen hash-lenyomatként tárolva, a létrehozás időpontjával együtt.",
          "<b>Cél:</b> a kódok tömeges, automatizált létrehozásának korlátozása (óránként legfeljebb {hourlyLimit}). <b>Jogalap:</b> a Szolgáltatás biztonságos és stabil működéséhez fűződő jogos érdekünk (GDPR 6. cikk (1) bekezdés f) pont). <b>Megőrzés:</b> a kóddal együtt.",
        ],
      },
      {
        h: "Előfizetés és fizetés",
        p: [
          "Ha előfizetsz, a fizetési űrlapon megadott adatokat a Stripe kezeli; hozzánk az előfizetéseid nyilvántartásához szükséges adatok kerülnek.",
        ],
        list: [
          "Kezelt adatok: e-mail-cím, a Stripe által kiosztott ügyfél- és előfizetés-azonosítók, az egyes előfizetések állapota és időszakai, valamint az a kód, amelyhez tartoznak, a kifizetések összege és dátuma, a fizetési mód típusa (például kártya és annak utolsó 4 számjegye), továbbá – ha a fizetési űrlap bekéri – a számlázási ország és az irányítószám.",
          "Cél: az előfizetések létrehozása és teljesítése, a díjak beszedése, a számlázás és az ügyfélszolgálat.",
          "Jogalap: szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont); a számviteli nyilvántartások vezetése esetén jogi kötelezettség teljesítése (GDPR 6. cikk (1) bekezdés c) pont).",
          "Megőrzés: amíg az előfizetés fennáll; megszűnése után a számviteli nyilvántartásokat a szlovák számviteli törvény (431/2002 Tt.) 35. §-a alapján 10 évig őrizzük. A többi adatot az előfizetés megszűnése után kérésedre töröljük.",
        ],
        after: [
          "A fizetéseket a következő szolgáltató dolgozza fel: {payments}; ez a fizetési adatok és a csalásmegelőzés tekintetében önálló adatkezelő. Adatkezeléséről itt tájékozódhatsz: {paymentsPrivacy}.",
        ],
      },
      {
        h: "Kapcsolatfelvétel",
        p: [
          "Ha írsz nekünk, a nevedet, az e-mail-címedet és az üzeneted tartalmát a válaszadáshoz használjuk. <b>Jogalap:</b> a megkeresések kezeléséhez fűződő jogos érdekünk (GDPR 6. cikk (1) bekezdés f) pont). <b>Megőrzés:</b> az ügy lezárását követő 1 évig.",
        ],
      },
      {
        h: "Technikai naplók",
        p: [
          "Az oldal kiszolgálásakor – mint bármely weboldal esetében – a tárhelyszolgáltató szerverei technikai adatokat rögzítenek: IP-cím, a kérés időpontja, a lekért cím és a böngésző típusa. Ez egy QR-kód beolvasásakor is így történik. <b>Cél:</b> a Szolgáltatás biztonságos és zavartalan működése, valamint a hibák és visszaélések felderítése. <b>Jogalap:</b> jogos érdekünk (GDPR 6. cikk (1) bekezdés f) pont). <b>Megőrzés:</b> rövid ideig, a tárhelyszolgáltató adatmegőrzési szabályai szerint.",
        ],
      },
      {
        h: "Sütik és helyi tárolás",
        list: [
          "NEXT_LOCALE süti: megjegyzi a nyelvválasztóban kiválasztott nyelvet (1 évig).",
          "Helyi tárolás (localStorage): az ezen az eszközön létrehozott vagy megnyitott kódok kezelőlinkjei, hogy megtaláld őket a „Kódjaim” oldalon. A „Kódjaim” oldal ezekkel kérdezi le a kódjaid állapotát; egyébként a böngésződben maradnak, és a böngésző beállításaiban bármikor törölheted őket.",
          "A fizetési űrlapot a Stripe biztosítja, amely saját sütiket használ a fizetés biztonságos lebonyolításához és a csalások megelőzéséhez.",
        ],
        after: ["Ezek a Szolgáltatás működéséhez szükségesek, ezért nem igényelnek hozzájárulást. Analitikai vagy hirdetési sütiket nem használunk."],
      },
      {
        h: "Adatfeldolgozók és adattovábbítás",
        list: [
          "Tárhely és alkalmazásszerver: {hosting}",
          "Adatbázis: {database} – a kódok adatait az Európai Unióban (Írországban) lévő szerveren tárolja.",
          "Fizetés: {payments} – önálló adatkezelőként.",
        ],
        after: [
          "E szolgáltatók némelyikének székhelye az Amerikai Egyesült Államokban van, így adatok az Európai Gazdasági Térségen kívülre is kerülhetnek. Az ilyen adattovábbítás megfelelő garanciák mellett történik (az EU–USA adatvédelmi keretrendszer és/vagy az Európai Bizottság által elfogadott általános szerződési feltételek alapján).",
          "Adataidat más harmadik féllel nem osztjuk meg, nem adjuk el, és nem használjuk marketingre, profilalkotásra vagy automatizált döntéshozatalra. Hatóságoknak csak akkor adunk ki adatot, ha azt jogszabály előírja.",
        ],
      },
      {
        h: "Adatbiztonság",
        p: [
          "Minden kapcsolat titkosított (HTTPS). A kezelő-token 192 bites véletlen érték, az IP-címeket csak sózott hash-ként tároljuk, és az adatbázishoz csak az Üzemeltető fér hozzá.",
        ],
      },
      {
        h: "Jogaid",
        list: [
          "tájékoztatáshoz és hozzáféréshez való jog (GDPR 15. cikk);",
          "helyesbítéshez való jog (16. cikk);",
          "törléshez való jog (17. cikk) – a kódot a kezelőoldalán bármikor magad is törölheted;",
          "az adatkezelés korlátozásához való jog (18. cikk);",
          "adathordozhatósághoz való jog (20. cikk);",
          "a jogos érdeken alapuló adatkezelés elleni tiltakozás joga (21. cikk).",
        ],
        after: [
          "Kérelmedet a {operatorEmail} címre küldheted. A kód azonosításához add meg a rövid linkjét. Legkésőbb egy hónapon belül válaszolunk.",
        ],
      },
      {
        h: "Jogorvoslat",
        p: [
          "Ha úgy érzed, hogy személyes adataid kezelése jogszabályt sért, panaszt tehetsz az adatkezelő székhelye szerinti felügyeleti hatóságnál, a Szlovák Köztársaság Személyesadat-védelmi Hivatalánál ({authority}), vagy a lakóhelyed, illetve munkavégzési helyed szerinti adatvédelmi hatóságnál – Magyarországon például a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "Jogaid megsértése esetén bírósághoz is fordulhatsz; a pert a lakóhelyed szerinti tagállam bírósága előtt is megindíthatod.",
        ],
      },
      {
        h: "Gyermekek",
        p: ["A Szolgáltatás nem 16 éven aluli gyermekeknek szól, és tudatosan nem kezeljük az adataikat. Előfizetést csak nagykorú személy rendelhet."],
      },
      {
        h: "A tájékoztató módosítása",
        p: ["Ezt a tájékoztatót a Szolgáltatás minden változásakor frissítjük; a hatálybalépés dátuma a dokumentum tetején látható."],
      },
    ],
  },
};
