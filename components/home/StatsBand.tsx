import { Counter } from "@/components/ui/Counter";
import { site } from "@/lib/site";

/** Rebuilt on the zip `.ftco-counter` band (index.html:159) with `.block-18`. */
export function StatsBand() {
  return (
    <section className="bg-primary py-16" aria-label="Nazareth Hub in numbers">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {site.stats.map((s) => (
          <div key={s.label} className="block-18 text-center">
            <div className="text">
              <Counter value={s.value} suffix={s.suffix} />
              <span className="mt-1 block">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
