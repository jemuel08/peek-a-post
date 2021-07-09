import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";
import { auth } from "./utils/firebase";

function App() {
  const [values, setValues] = useState({
    isAuth: false,
    isLoading: true,
  });

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setValues({ isAuth: true, isLoading: false });
      } else {
        // No user is signed in.
        setValues({ isAuth: false });
      }
    });
  }, []);

  if (values.isLoading) {
    return <Loading />
  } else {
    return (
      <div>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/login" />
              </Route>
              <PublicRoute
                path="/login"
                exact
                component={Login}
                isAuth={values.isAuth}
                restricted={true}
              />
              <PublicRoute
                path="/signup"
                exact
                component={Signup}
                isAuth={values.isAuth}
                restricted={true}
              />
              <PrivateRoute
                path="/home"
                exact
                component={Home}
                isAuth={values.isAuth}
              />
              
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
