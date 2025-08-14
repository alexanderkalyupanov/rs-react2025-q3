import { useParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";


export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useParams();

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`))
  }

  return (
    <select onChange={changeLanguage} value={locale}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  )

}

