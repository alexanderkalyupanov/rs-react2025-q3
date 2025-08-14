import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import { ReduxProvider } from '@/components/reduxProvider/reduxProvider';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function LocaleLayout({
  children,
  params,
  character
}: {
  children: React.ReactNode;
  params: { locale: string };
  character: React.ReactNode
}) {
  const { locale } = params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ReduxProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            {character}
          </NextIntlClientProvider>
        </ReduxProvider>

      </body>
    </html>
  );
}