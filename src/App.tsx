import React from 'react'
import { Grid } from '@material-ui/core'
import { Header } from 'ui'
import './App.css'


const App: React.FC = () =>
  (
    <div className="App">
      <Grid>
        <Header />
        Hello
      </Grid>
    </div>
  )


export default App
