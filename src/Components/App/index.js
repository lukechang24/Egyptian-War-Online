import React, { Component } from 'react';
import Room from "../Room"
import { Route, Switch, withRouter } from "react-router-dom"
import { withFirebase } from "../Firebase"
import S from "./style"

class App extends Component {
    render() {
        return (
            <Switch>
                <S.Container1>
                    <Route exact path="/:id" render={() => <Room />}></Route>
                </S.Container1>
            </Switch>
        )
    }
}

export default withRouter(withFirebase(App))
