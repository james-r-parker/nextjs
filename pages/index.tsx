import { Box, Container, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next'
import QuickQuote from '../src/quick-quote';

const Home: NextPage = () => {
  return (
    <Box>
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Box sx={{ backgroundColor: "#fff" }}>
            <Container maxWidth={'xl'}>
              <Grid container direction={'column'} spacing={5}>
                <Grid item>
                  <Typography variant='h1'>Compare the cheapest parcel delivery prices in the UK</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1'>We&rsquo;ve helped people find the cheapest prices for over 83 million parcels since 2001. Send parcels from as little as £1.95 plus VAT.</Typography>
                </Grid>
                <Grid item>
                  <QuickQuote />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
        <Grid item>
          <Container maxWidth={'xl'}>
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
