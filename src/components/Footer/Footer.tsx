import logo from './../../assets/rs-icon.svg';
import gitLogo from './../../assets/git.svg';

function Footer() {
  return (
    <footer className="flex justify-between items-center mb-10 pl-5 pr-5">
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        <img className="w-40" src={logo} alt="rs-logo" />
      </a>
      <span className="text-xl">2025</span>
      <a
        href="https://github.com/alexanderkalyupanov"
        target="_blank"
        className="flex gap-2 items-center"
        rel="noreferrer"
      >
        alexanderkalyupanov
        <img src={gitLogo} alt="git-logo" className="w-8 h-8" />
      </a>
    </footer>
  );
}

export default Footer;
