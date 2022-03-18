import React from "react";

import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="Cursos" />
      <p>
        En Academy vas a encontrar los mejores cursos online de desarrollo web
        en Español. Unete a nosotros y empieza tu camino como Desarrollador Web
        o Desarrollador de CMS. Sinceramente, estos cursos son el tipo de
        contenido que a mi me hubiera gustado encontrar cuando empecé el mundo
        del desarrollo web profesional.
      </p>
      <p>¡¡¡Echalé un vistazo y aprovecha las ofertas!!!</p>
    </div>
  );
}
