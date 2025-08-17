import { Link } from '@/i18n/navigation';
import Image from 'next/image';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="flex justify-between items-center mb-10 pl-5 pr-5"
    >
      <Link
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          className="w-40"
          src="/icons/rs-icon.svg"
          alt="rs-logo"
          width={150}
          height={50}
        />
      </Link>
      <span className="text-xl dark:text-zinc-50">2025</span>
      <Link
        href="https://github.com/alexanderkalyupanov"
        target="_blank"
        className="flex gap-2 items-center dark:text-zinc-50"
      >
        alexanderkalyupanov
        <Image
          src="/icons/git.svg"
          width={50}
          height={50}
          alt="git-logo"
          className="w-8 h-8"
        />
      </Link>
    </footer>
  );
}

export default Footer;
