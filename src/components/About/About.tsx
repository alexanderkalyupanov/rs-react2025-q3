import Footer from '../Footer/Footer';
import myPhoto from './../../assets/my-photo.png';

function About() {
  return (
    <div className="flex flex-col">
      <div className="about flex justify-center m-auto items-center gap-5 border-solid  border-4 border-purple-500 rounded-3xl pl-2 w-155 mb-63 mt-25">
        <div className="developer-info flex flex-col justify-center">
          <h1>Alexander Kalyupanov</h1>
          <p>Frontend Developer</p>
          <span>
            Github:{' '}
            <a
              href="https://github.com/alexanderkalyupanov"
              target="_blank"
              rel="noreferrer"
            >
              alexanderkalyupanov
            </a>
          </span>
        </div>
        <img src={myPhoto} alt="developer image" className="w-90 rounded-3xl" />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
