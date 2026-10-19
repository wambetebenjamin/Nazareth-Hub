import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Inner page hero, rebuilt on the zip `.hero-wrap.hero-wrap-2` pattern. */
export function PageHero({
  title,
  intro,
  crumb,
  image = "/images/space-openplan-2.jpg",
}: {
  title: string;
  intro?: string;
  crumb: string;
  image?: string;
}) {
  return (
    <div
      className="hero-wrap"
      style={{ backgroundImage: `url('${image}')` }}
      role="img"
      aria-label={title}
    >
      <div className="overlay !bg-primary !opacity-70" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[340px] max-w-7xl items-center px-4 py-20 lg:px-8">
        <div className="slider-text w-full max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm">
            <ol className="flex items-center gap-1.5 text-white/80">
              <li>
                <Link href="/" className="text-white hover:text-secondary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="font-semibold text-white" aria-current="page">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1 className="!text-[40px] md:!text-[50px]">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl">{intro}</p>}
        </div>
      </div>
    </div>
  );
}
