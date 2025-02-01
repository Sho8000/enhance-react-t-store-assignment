import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";

function Footer(props) {
  const iconSize = 28;
  return (
    <section className="footerSection">
      <div className="footerContainer">
        <div>
          <a href="mailto:email@example.com?subject=Mail from our Website"><p>Contact xx@mail.com</p></a>
        </div>
        <div className="socialmediaIcons">
          <a
            className="footerHyperlink"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/huh_ca/"
          >
            <AiOutlineInstagram size={iconSize} />
          </a>
          <a
            className="footerHyperlink"
            target="_blank"
            rel="noopener noreferrer"
            href="https://howuniversehowls.myportfolio.com/"
          >
            <IoPerson size={iconSize/1.2} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
