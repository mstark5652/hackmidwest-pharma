import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import useAppData from '../hooks/useAppData/useAppData'
import useEventBus from '../hooks/useEventBus/useEventBus'

const Home = () => {
  const { data, setPayload } = useAppData()
  const bus = useEventBus()

  function pushNotification (content) {
    bus.emit('show-notification', { content })
  }

  function handlePickup () {
    pushNotification('Your meds are coming!')
    setPayload({ activeRx: [] })
  }

  return (
    <Box m={{ sx: 2, sm: 3 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <br />
      <Typography variant='h5' component='h1'>Hi {data.data.firstName}!</Typography>

      {data.data.activeRx && data.data.activeRx.length > 0 && <br />}

      {data.data.activeRx && data.data.activeRx.length > 0 && (
        <Button variant='contained' onClick={() => handlePickup()}>
          Pick up Prescription
        </Button>
      )}

      <br />

      <Button variant='contained' onClick={() => pushNotification('Boerger PharmD: Hello ' + data.data.firstName + '. How can I help?')}>
        Talk to a Pharmacist
      </Button>

      <br />

      <Typography variant='h6' component='h1'>Connected with your </Typography>
      <a href='https://pouch.forhaley.com/'><img src='https://static.forhaley.com/images/Pouch.png' height='50px' /></a>
    </Box>
  )
}

export default Home
