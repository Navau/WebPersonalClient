import React from "react";

import useAuth from "../../hooks/useAuth";

export default function Admin() {
  const { user } = useAuth();
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "60px" }}>
        {user.role === "admin" ? "PAGINA DE ADMINSTRADOR" : "PAGINA DE REVISOR"}
      </h1>
    </div>
  );
}
