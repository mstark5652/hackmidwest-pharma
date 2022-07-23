
import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import useAppData from '../hooks/useAppData/useAppData'

const Home = () => {
  const { data, keyPair } = useAppData()

  return (
    <Box m={{ sx: 2, sm: 3 }} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <br />
      <Typography variant='h5' component='h1'>Hi {data.data.firstName}!</Typography>

      <br />

      <Button variant="contained">
          Pick up RX
      </Button>

    </Box>
  )
}

export default Home
