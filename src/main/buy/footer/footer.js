import "./footer.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png"
import mail from "../../../assets/gmail.svg"
import youtube from "../../../assets/youtube.svg"
import { animateScroll as scroll } from 'react-scroll'

function Footer() {
  return (
    <div className="buy-footer">
      <section className="links">
        <p onClick={() => { scroll.scrollToTop(); }}>Back to Top</p>
        <Link to="/ss/welcome" className="contact-us">About Us</Link>
      </section>

      <section>
        <Link to="/"><img src={logo} alt="Our logo"></img></Link>
      </section>

      <section className="icons">
        <img src={mail} alt="Mail" onClick={() => { window.location.href = "mailto:contact.firstmarketplace@gmail.com" }}></img>
        <img src={youtube} alt="Youtube" onClick={() => { window.location.href = "https://www.youtube.com/channel/UCOZn-UwJJXcu-0xLugFftEQ"}}></img>
      </section>
    </div>
  );
}

export default Footer;