import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Tasks from "./components/Tasks/Tasks";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
    return (
        <div className="container">
            <h1>Task Manager</h1>
            <Navbar></Navbar>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/users/me" component={Profile} />
                <Route path="/tasks" component={Tasks} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
