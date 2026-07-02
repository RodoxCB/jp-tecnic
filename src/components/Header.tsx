"use client";

import Link from "next/link";
import { Menu, Store, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/types";
import { BrandMark } from "@/components/BrandMark";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type HeaderProps = {
  siteName: string;
  links: NavLink[];
  whatsappNumber: string;
  whatsappMessage: string;
};

export function Header({ siteName, links, whatsappNumber, whatsappMessage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/95 shadow-lg backdrop-blur-md"
          : "bg-black/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <BrandMark />
          <span className="text-lg font-bold text-white sm:text-xl">{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-[#25D366]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/loja"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-300 transition hover:text-[#25D366]"
          >
            <Store size={16} />
            Loja
          </Link>
          <WhatsAppButton phone={whatsappNumber} message={whatsappMessage} size="sm" />
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-zinc-200"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/loja" className="text-base font-medium text-zinc-200" onClick={closeMenu}>
              Loja
            </Link>
            <WhatsAppButton
              className="mt-2 w-full"
              phone={whatsappNumber}
              message={whatsappMessage}
            />
          </nav>
        </div>
      )}
    </header>
  );
}
