import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Auth from './hoc/auth'

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
          
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
