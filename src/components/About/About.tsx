import Footer from '../Footer/Footer';
import myPhoto from './../../assets/my-photo.png';

function About() {
  return (
    <div className="flex flex-col">
      <div
        data-testid="about-container"
        className="about flex flex-col md:flex-row justify-center m-auto items-center gap-5 border-solid border-4 border-purple-500 rounded-3xl p-4 md:pl-2 w-full md:w-[700px] mb-10 md:mb-[63px] mt-6 md:mt-[25px]"
      >
        <div className="developer-info flex flex-col justify-center md:text-left order-2 md:order-1">
          <h1 className="text-xl font-bold">Alexander Kalyupanov</h1>
          <p className="text-lg md:text-xl">Frontend Developer</p>
          <span className="text-xl">
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
        <img
          src={myPhoto}
          alt="developer image"
          className="w-90 rounded-3xl md:w-[360px]  order-1 md:order-2"
        />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
