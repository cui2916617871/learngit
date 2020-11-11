import React from 'react'
import lazyRequire from './LazyRequire'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

const Test = lazyRequire(() => import('./pages/demo/test'))

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path='/demo/test' component={Test} exact />
        </Switch>
    </BrowserRouter>
)
