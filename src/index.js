import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter, Route, Switch,HashRouter } from 'react-router-dom'
import Home from './Home.js'



render(<BrowserRouter><HashRouter>
<Switch>
<Route exact path="/" component={Home} />
</Switch></HashRouter>
</BrowserRouter>,document.getElementById("app"));