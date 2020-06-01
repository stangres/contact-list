import React  from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import AppLoader from '../AppLoader';
import Notification from '../Notification';
import MainContainer from '../MainContainer';
import ContactsPage from '../ContactsPage';
import Login from '../Login';
import { useStores } from "../../hooks";
import './style.scss';

export default () => {
  return (
    <Router>
      <div className="app-container">
        <AppLoader/>
        <Notification/>
        <Routes/>
      </div>
    </Router>
  );
};

function Routes() {
  const { authStore } = useStores();

  return useObserver(() => {
    const isAuthenticated = authStore.isAuthenticated;

    if (isAuthenticated)
    {
      return (
        <MainContainer username={authStore.username}>
          <Switch>
            {/*сюда можно добавлять защищенные маршруты*/}
            <Route exact path="/" component={ContactsPage}/>
            <Route path="*"
                   render={props => {
                     let { from } = props.location.state || { from: { pathname: "/" } };
                     return <Redirect to={from}/>
                   }}
            />
          </Switch>
        </MainContainer>
      )
    }
    else {
      return (
        <Switch>
          {/*сюда можно добавлять открытые маршруты*/}
          <Route exact path="/login"
                 render={props => <LoginWrapper {...props} isAuthenticated={isAuthenticated}/>}
          />
          <Route path="*"
                 render={props => <Redirect to={{ pathname: "/login", state: { from: props.location }}}/>}
          />
        </Switch>
      );
    }
  });
}

function LoginWrapper({ isAuthenticated }) {
  let location = useLocation();

  if (isAuthenticated) {
    // Если пользователь уже аутентифицирован, тогда
    // перенаправляем по пути, указанному в адресной строке до того как он попал на страницу Login, либо в корень.
    // Можно было перенести эту функцию в компонент Login,
    // но не стал этого делать для большей "чистоты" данного компонента.
    let { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from}/>;
  }
  else {
    return <Login/>;
  }
}