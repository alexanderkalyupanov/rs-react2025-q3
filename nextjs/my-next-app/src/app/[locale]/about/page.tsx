'use client'

import Footer from '@/components/Footer/Footer';
import Header from '@/components/header/header';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image'
function About() {
  const translate = useTranslations('About');

  return (
    <>

      <div className="flex bg-violet-600  min-h-screen flex-col">
        <Header isLoading={false} searchQuery='' onSearch={() => { }} currentPage={1} />
        <div
          data-testid="about-container"
          className="about flex flex-col md:flex-row justify-center m-auto items-center gap-5 border-solid border-4 border-purple-500 rounded-3xl p-4 md:pl-2 w-full md:w-[700px] mb-10 md:mb-[63px] mt-6 md:mt-[25px]"
        >
          <div className="developer-info flex flex-col justify-center md:text-left order-2 md:order-1">
            <h1 className="text-xl font-bold dark:text-zinc-50">
              {translate('name')}
            </h1>
            <p className="text-lg md:text-xl dark:text-zinc-50">
              {translate('position')}
            </p>
            <span className="text-xl dark:text-zinc-50">
              {translate('github')}{' '}
              <Link
                href="https://github.com/alexanderkalyupanov"
              >
                alexanderkalyupanov
              </Link>
            </span>
          </div>
          <Image
            src='/images/my-photo.png'
            alt="developer image"
            width={360}
            height={360}
            className="w-90 rounded-3xl md:w-[360px]  order-1 md:order-2"
            priority
          />
        </div>
        <Footer></Footer>
      </div>
    </>

  );
}

export default About;
