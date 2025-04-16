import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t('DashboardTitle')}</h1>
      <Link href="/en">{'🇬🇧 English'}</Link> | <Link href="/ar">{'🇸🇦 العربية'}</Link>
    </div>
  );
}
