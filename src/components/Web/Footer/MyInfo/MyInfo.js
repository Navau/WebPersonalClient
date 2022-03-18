import React from "react";

import Logo from "../../../../assets/img/png/logo-white.png";

import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={Logo} alt="Jose Manuel Gutierrez" />
      <h4>
        Entra en el mundo del desarrollo de software, disfruta creando proyectos
        de todo tipo, deja que tu imaginación fluya y crea verdaderas
        maravillas!!!
      </h4>
      <SocialLinks />
    </div>
  );
}
