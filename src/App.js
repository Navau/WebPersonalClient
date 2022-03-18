import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";

import { map } from "lodash";

import "./App.scss";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {map(routes, (item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                element={<item.element routes={item.routes} />}
              />
            );
          })}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// function RouteWithSubRoutes(route) {
//   console.log(route);
//   return <Route path="/admin" exact={true} element={<Admin />} />;
// }
