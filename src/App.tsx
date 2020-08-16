import React from 'react'
import { Grid } from '@material-ui/core'
import { Header, WaveForm, TranscriptBody } from 'ui'
import TranscriptProvider from 'state'
import './App.css'

const App: React.FC = () => (
  <div className="App">
    <TranscriptProvider>
      <Grid container direction="column">
        <Header />
        <WaveForm />
        <TranscriptBody />
      </Grid>
    </TranscriptProvider>
  </div>
)

export default App
