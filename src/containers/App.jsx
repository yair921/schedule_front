import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Layout from '../componets/layouts/Layout.jsx';
import LayoutLogin from '../componets/layouts/LayoutLogin.jsx';
import Login from '../componets/pages/Login.jsx';
import Schedule from '../componets/pages/Schedule.jsx';
import Welcome from '../componets/pages/Welcome.jsx';
import Period from '../componets/pages/Period.jsx';
import NotFound from '../componets/pages/NotFound.jsx';
import Config from '../../config.js';
import Storage from '../common//Storage.js';
import '../assets/styles/App.scss';
import '../assets/styles/Common.scss';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <AppPrivate exact path="/" layout={LayoutLogin} component={Login} />
                    <AppPublic exact path="/login" layout={LayoutLogin} component={Login} />
                    <AppPrivate exact path="/schedule" layout={Layout} component={Schedule} />
                    <AppPrivate exact path="/welcome" layout={Layout} component={Welcome} />
                    <AppPrivate exact path="/period" layout={Layout} component={Period} />
                    {/*<AppPrivate exact path="/activities" layout={Layout} component={Activities} />
                    <AppPrivate exact path="/notifications" layout={Layout} component={Notifications} />
                    <AppPrivate exact path="/administrators" layout={Layout} component={Admins} /> */}
                    <AppPublic layout={LayoutLogin} component={NotFound} />
                </Switch>
            </HashRouter>
        );
    }
}

const AppPrivate = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        Storage.isAuthenticated === true ?
            <Layout><Component {...props} /></Layout> :
            <Redirect to='/login' />
    )} />
);

const AppPublic = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
);

export default App;
