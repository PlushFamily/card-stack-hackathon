import React from 'react'

import Index from '@/pages/WelcomePage'

import { Route, Switch } from '@/components/Router'

function App() {
  return (
    <Switch>
      <Route path='/' component={Index} />
    </Switch>
  )
}

export default App
