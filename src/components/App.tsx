import React from 'react'

import WelcomePage from "../pages/WelcomePage";
import Settings from "../pages/Settings";
import {Switch} from "react-router-dom";
import {Route} from "./Router";

function App() {
  return (
    <Switch>
      <Route path='/settings' component={Settings} />
        <Route path='/' component={WelcomePage} />
    </Switch>
  )
}

export default App
