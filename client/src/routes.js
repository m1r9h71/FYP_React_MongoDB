import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout';
import EventView from './components/Events';
import Login from './containers/Admin/login';
import User from './components/Admin';
import Auth from './hoc/auth'
import AddEvent from './containers/Admin/add';
import EditEvent from './containers/Admin/edit';
import userEvents from './components/Admin/userEvents';
import Register from './containers/Admin/register';
import Logout from './components/Admin/logout';
import EditUser from './containers/Admin/editUser';

const Routes = () => {
    return (
        <Layout>
        <Switch>
            <Route path="/" exact component={Auth(Home, true)}/>
            <Route path="/login" exact component={Auth(Login, false)}/>
            <Route path="/user" exact component={Auth(User, true)}/>
            <Route path="/user/logout" exact component={Auth(Logout, true)}/>
            <Route path="/user/register" exact component={Auth(Register, true)}/>
            <Route path="/user/edit-user/:id" exact component={Auth(EditUser, true)}/>
            <Route path="/user/add" exact component={Auth(AddEvent, true)}/>
            <Route path="/user/edit-event/:id" exact component={Auth(EditEvent, true)}/>
            <Route path="/events/:id" exact component={Auth(EventView, true)}/>
            <Route path="/user/user-events" exact component={Auth(userEvents, true)}/>
        </Switch>
        </Layout>
    );
};

export default Routes;

//Auth(),true
//, Auth()false
//{Auth(User)}, true
//{Auth(EventView)}, true