import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>        
        <Switch>
          {/*
          component 주는방법이랑 기존방법 두가지임
          component 줄때 exact 붙여야 함
                    <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
