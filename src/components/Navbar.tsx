"use client";
import React from "react";
import WordMark from "@/components/WordMark";
import { Content } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";

interface NavbarProps {
  settings: Content.SettingsDocument;
}

export default function Navbar({ settings }: NavbarProps) {
  return (
    <nav className="p-4 md:p-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <Link href={"/"}>
          <WordMark />
          <span className="sr-only">Glisen ai homepage</span>
        </Link>
        <ul className="flex gap-6">
          {settings.data.navigation.map((item, index) => {
            if (item.cta_button)
              return (
                <ButtonLink key={index} field={item.link}>
                  {item.label}
                </ButtonLink>
              );
            return (
              <li key={index}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
