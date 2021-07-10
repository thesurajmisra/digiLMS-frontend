import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { UserProvider } from "./providers/userContext";

import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, purple } from '@material-ui/core/colors';
import Admin from './components/admin';
import ManageUser from './components/admin/manageuser';
import UserDashboard from './components/user';
import Main from './components/authentication';
import { CourseProvider } from './providers/courseContext';
import ListCourses from './components/listCourses';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Home from './components/home';


function App() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: '#f5bc00',
      },
      // type: 'dark'
    },
    transitions: {
      duration: {
        shortest: 100,
      }
    },
  });

  const stripe = loadStripe(
    "pk_test_Vmvhpm2TASsGcgF4RcyQfkF000KwucQJR1"
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserProvider>

          <CourseProvider>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Elements stripe={stripe}>
              <Route path="/user">
                <UserDashboard />
              </Route>
            </Elements>

            <Route path="/admin/manageuser">
              <ManageUser />
            </Route>

            <Route path="/admin">
              <Admin />
            </Route>

            <Route path="/main">
              <Main />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route path="/list">
              <ListCourses />
            </Route>
          </CourseProvider>

        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;