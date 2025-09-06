import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

import Navbar from './components/navbar';
import Hero from './components/hero';
import Cocktails from './components/cocktails';
import About from './components/about';
import Art from './components/art';
import Menu from './components/menu';
import Contact from './components/contact';

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  );
}

export default App;
