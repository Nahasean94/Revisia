import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./App"
import HomePage from "./components/HomePage"

import RevisionQuestions from "./components/questions/RevisionQuestions"
export default () => {
    return (<BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/course/:id" component={RevisionQuestions}/>
            </Switch>
        </App>
        </BrowserRouter>
    )
}