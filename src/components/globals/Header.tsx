"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link, routing, usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const searchParams = useSearchParams();
  const langRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (l: string) => {
    const paramsString = searchParams.toString();
    const url = paramsString ? `${pathname}?${paramsString}` : pathname;

    router.replace(url, { locale: l });
  };

    useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const t = useTranslations();

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        <span className="text-blue-500">My</span>Site
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link
          href="/protected_route"
          className="hover:text-blue-500"
        >
          Protecged route
        </Link>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center hover:border hover:border-white/70 rounded-[clamp(10px,0.833vw,20px)] font-['Libre_Baskerville'] text-[clamp(14px,1.042vw,20px)] font-[400] py-[clamp(3px,0.417vw,5px)] px-[clamp(5px,1.562vw,10px)] justify-center gap-2 text-white cursor-pointer transition focus:outline-none"
          >
            <Image
              src={`/images/${locale}.svg`}
              alt="Arrow Down"
              width={30}
              height={20}
            />
            <span className="uppercase font-medium font-['Libre_Baskerville'] text-[18px]">
              {locale}
            </span>
            <ChevronDown className="w-4 h-4 text-[18px] text-gray-300" />
          </button>
          <div className="" ref={langRef}>
            <div
              className={`absolute  mt-2 w-[clamp(50px,6.5vw,144px)] border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl transform origin-top-left transition-all duration-150 ${
                langOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <ul className="divide-y divide-gray-100">
                {routing.locales.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => changeLanguage(l)}
                      className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors rounded-xl"
                    >
                      <Image
                        src={`/images/${l}.svg`}
                        alt="Arrow Down"
                        width={30}
                        height={20}
                      />
                      <span className="capitalize font-[400] font-['Libre_Baskerville'] text-[clamp(12px,0.938vw,20px)] flex-1">
                        {l}
                      </span>
                      {l === locale && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
