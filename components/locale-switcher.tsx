"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n-config";
import type { Locale } from "@/i18n-config";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function LocaleSwitcher() {
  console.log("rendering locale switcher");
  const pathName = usePathname();

  // check pathName.split("/")[1] is a valid locale from i18n.locales
  const pathLocale = i18n.locales.includes(pathName.split("/")[1] as Locale)
    ? (pathName.split("/")[1] as Locale)
    : i18n.defaultLocale;
  const [locale, setLocale] = useState<Locale>(pathLocale);
  const router = useRouter();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLocaleChange = (value: Locale) => {
    setLocale(value);
    router.replace(redirectedPathName(value));
  };
  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Locales" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Locales</SelectLabel>
          {i18n.locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {locale}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}