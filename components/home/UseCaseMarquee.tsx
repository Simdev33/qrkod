const ITEMS = [
  "Étlap az asztalon",
  "Szórólap",
  "Névjegykártya",
  "Plakát",
  "Termékcímke",
  "Kirakat",
  "Online foglalás",
  "Google-értékelés",
  "Instagram-profil",
  "Rendezvényjegy",
  "Használati útmutató",
  "Ingatlanhirdetés",
];

export function UseCaseMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative mt-16 overflow-hidden py-6 sm:mt-20" aria-label="Felhasználási ötletek">
      <div className="-mx-10 -rotate-[1.2deg] bg-ink py-4 text-paper">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8" aria-hidden={i >= ITEMS.length}>
              <span className="display text-[22px] leading-none sm:text-[26px]">{t}</span>
              <span className={`block size-3.5 rounded-[4px] ${["bg-lime", "bg-coral", "bg-sky", "bg-sun"][i % 4]}`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
