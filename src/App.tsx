import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import MenuForm from "./components/menu/Menu";
import LoginPage from "./pages/LoginPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import MovieListPage from "./pages/MovieListPage";
import RegisterPage from "./pages/RegisterPage";
import { Container } from "semantic-ui-react";

const routes = [
  {
    path: "/",
    exact: true,
    header: () => <></>,
    main: () => <LoginPage />,
  },
  {
    path: "/auth/sign-up",
    exact: true,
    header: () => <></>,
    main: () => <RegisterPage />,
  },
  {
    path: "/movies",
    exact: true,
    header: () => <MenuForm />,
    main: () => <MovieListPage  />,
  },
  {
    path: "/movie/:id",
    exact: true,
    header: () => <MenuForm />,
    main: (props:any) => <MovieDetailPage {...props}/>,
  },

];

function App() {
  return (
<Container fluid>
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.header />}
          />
        ))}
      </Switch>
      <Container>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
      </Container>
    </BrowserRouter>
    </Container>
  );
}

export default App;
