import { useGSAP } from "@gsap/react";
import { navLinks } from "../../constants";
import gsap from 'gsap';

const Navbar = () => {

    useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });
        navTween.fromTo('nav',{backgroundColor: 'transparent'}, {backgroundColor: '#00000050', backgroundFilter: 'blur(10px)', duration: 1, ease: 'power1.inOut'})
    })

  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-2">
             <img src="/src/assets/images/logo.png" alt="logo" />
             <p>Mojito</p>
        </a>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <p>{link.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
