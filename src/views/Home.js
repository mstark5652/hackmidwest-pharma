
import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useAppData from '../hooks/useAppData/useAppData'

const Home = () => {
  const { data, keyPair } = useAppData()

  return (
    <Box m={{ sx: 2, sm: 3 }}>
      <br />
      <Typography variant='h3' component='h1'>Pharmacy</Typography>
      <pre style={{ margin: 8, padding: 8, backgroundColor: 'grey' }}>
        {JSON.stringify({ data, keyPair }, null, 2)}
      </pre>
    </Box>
  )
}

export default Home
