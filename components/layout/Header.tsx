"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Armchair, Menu, UserRound, X } from "lucide-react";
import { site } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/spaces", label: "Spaces" },
  { href: "/membership", label: "Membership" },
  { href: "/events", label: "Events" },
  { href: "/community", label: "Community" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-[900] bg-darken transition-shadow ${
        scrolled ? "shadow-[0_10px_30px_rgba(9,15,53,0.35)]" : ""
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="navbar-brand !text-white">
          {site.brandFirst}
          <span className="!text-secondary">{site.brandSecond}</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  isActive(item.href)
                    ? "text-secondary"
                    : "text-white/85 hover:text-secondary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 transition-colors hover:text-secondary"
            >
              <UserRound size={16} aria-hidden="true" />
              Account
            </Link>
          </li>
          <li>
            <Link href="/booking" className="btn btn-secondary-solid px-5 py-2 text-sm">
              <span className="inline-flex items-center gap-2">
                <Armchair size={16} aria-hidden="true" />
                Book a Desk
              </span>
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-2 text-sm font-semibold text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          Menu
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-darken lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm font-semibold ${
                      isActive(item.href)
                        ? "bg-white/10 text-secondary"
                        : "text-white/85 hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/account"
                  className="block rounded-md px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/5"
                >
                  Account
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/booking" className="btn btn-secondary-solid w-full px-5 py-3 text-sm">
                  Book a Desk
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
