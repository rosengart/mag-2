import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

import Appbar from "./features/Appbar";
import Navigation from "./features/Navigation";
import Tag from "./features/Tag";
import Login from "./features/Login";

import firebase from "./firebase";
const auth = firebase.auth();

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: blue
  },
  typography: {
    fontSize: 18,
    fontFamily: [
      // "Unkempt",
      "Schoolbell",
      "sans-serif"
    ].join(",")
  },
  overrides: {}
});

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: "none"
    }
  }
};

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      signedIn: false,
      navigationOpen: true
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      if (user) {
        this.setState({
          user: user,
          signedIn: true
          // navigationOpen: true,
        });
      } else {
        this.setState({
          user: {},
          signedIn: false
          // navigationOpen: false,
        });
      }
    });
  }

  render() {
    const { signedIn, navigationOpen } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <ScrollToTop />
            {signedIn && <Appbar authProvider={auth} />}
            {signedIn && <Navigation open={navigationOpen} />}

            {!signedIn && <Login authProvider={auth} />}

            <Switch>
              <Route exact path="/" />
              <Route path="/tags/:tag" render={props => <Tag {...props} />} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}
