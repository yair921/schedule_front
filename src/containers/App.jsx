import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Layout from '../componets/layouts/Layout.jsx';
import LayoutLogin from '../componets/layouts/LayoutLogin.jsx';
import Login from '../componets/Login.jsx';
import NotFound from '../componets/NotFound.jsx';
import '../assets/styles/App.scss';
import 'materialize-css/dist/css/materialize.min.css';


class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <AppPrivate exact path="/" layout={LayoutLogin} component={Login} />
                    <AppPublic exact path="/login" layout={LayoutLogin} component={Login} />
                    {/* <AppPrivate exact path="/cases" layout={Layout} component={Cases} />
                    <AppPrivate exact path="/users" layout={Layout} component={Users} />
                    <AppPrivate exact path="/risks" layout={Layout} component={Risks} />
                    <AppPrivate exact path="/activities" layout={Layout} component={Activities} />
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
        // Auth.isAuthenticated === true ?
        false === true ?
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

// const App = () => (<h1>This is the application!</h1>);
// export default App;