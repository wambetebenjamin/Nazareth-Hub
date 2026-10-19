import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/site";

export function LegalShell({
  crumb,
  title,
  updated,
  children,
}: {
  crumb: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero crumb={crumb} title={title} image="/images/space-plants.jpg" />
      <section className="ftco-section bg-light">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="rounded-xl border border-black/5 bg-white p-8 shadow-[0_5px_24px_rgba(0,0,0,0.06)] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-body">
              Last updated {updated}
            </p>
            <div className="legal-prose mt-4 text-[15px] leading-relaxed">{children}</div>
            <p className="mt-8 border-t border-black/5 pt-6 text-sm text-body">
              Questions about this document? Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary underline">
                {site.email}
              </a>{" "}
              or WhatsApp {site.whatsapp.display}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
