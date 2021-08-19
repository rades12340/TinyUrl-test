import { Route, NavLink, Switch } from "react-router-dom";
import "./App.scss";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UrlShortenerPage from "./components/UrlShortenerPage/UrlShortenerPage";
import { useEffect, useState } from "react";
import axios from "axios";
import UrlList from "./components/UrlList/UrlList";

export interface UserInterface {
  email: string;
  password: string;
}

function App() {
  const [user, setUser] = useState<UserInterface>();

  const logOut = async () => {
    await axios
      .post("/logout", {
        email: user?.email,
        password: user?.password,
      })
      .then(() => setUser(undefined));
  };

  useEffect(() => {
    axios
      .get<UserInterface>("/auth/me")
      .then((user) =>
        setUser({
          email: user.data.email,
          password: user.data.password,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <ul className="navbar-links">
        {!user ? (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <li onClick={logOut}>Logout</li>
        )}
      </ul>
      <Switch>
        <Route exact path="/">
          <UrlShortenerPage />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route exact path="/url-list">
          <UrlList user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
