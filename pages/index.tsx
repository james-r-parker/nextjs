import { Box, Container, Grid, Paper, Typography, Link, styled } from '@mui/material';
import type { GetStaticPropsResult } from 'next'
import { request, gql } from 'graphql-request';
import QuickQuote from '../src/quick-quote';

interface ICardProps {
  title: string,
  description: string,
  image: string,
  link: string,
  linkText: string
  backgroundColour?: string,
  colour?: string
}

const Card: React.FC<ICardProps> = (props) => {
  return (
    <Paper style={{ backgroundColor: props.backgroundColour, height: "100%" }}>
      <Box p={3}>
        <Typography variant='subtitle1' style={{ color: props.colour }} mb={2}>{props.title}</Typography>
        <Typography style={{ color: props.colour, minHeight: "50px" }}>{props.description}</Typography>
        <img src={props.image} style={{ margin: "20px auto", display: "block", height: "60px", maxWidth: "100%" }} />
        <Link href={props.link} style={{ color: props.colour }}>{props.linkText}</Link>
      </Box>
    </Paper>
  )
}

interface ITileProp {
  title: string,
  image: string,
  description: string,
  link: string
}

const Tile: React.FC<ITileProp> = (props) => {
  return (
    <Paper style={{ background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${props.image}')`, backgroundSize: "cover" }}>
      <Box p={4}>
        <Typography variant='subtitle1' style={{ color: "#fff" }} mb={2}>{props.title}</Typography>
        <Typography style={{ color: "#fff" }} component="p" mb={4}>{props.description}</Typography>
        <Link href={props.link} style={{ color: "#fff" }}>Read more</Link>
      </Box>
    </Paper>
  )
}

const CourierLogo = styled('img')(({ theme }) => ({
  height: 30,
  [theme.breakpoints.up("sm")]: {
    height: 35,
  },
  [theme.breakpoints.up("md")]: {
    height: 40,
  },
  [theme.breakpoints.up("lg")]: {
    height: 60,
  }
}));

interface HomePageProps {
  tiles: {
    title: string,
    image: string,
    description: string,
    link: string
  }[]
}

const Home: React.FC<HomePageProps> = ({ tiles }) => {
  return (
    <Box>
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Box sx={{ backgroundColor: "#fff" }} pb={8}>
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
            <Grid container direction={'column'} spacing={4}>
              <Grid item>
                <Typography sx={{ marginTop: "20px" }} variant='h2'>Comparing prices from the UK's most trusted parcel couriers</Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  {['dhl', 'dpd', 'evri', 'inpost', 'parcelforce'].map((c) => {
                    return (
                      <Grid item key={c}>
                        <Paper>
                          <Box p={3}>
                            <CourierLogo src={`/${c}.svg`} alt={c} />
                          </Box>
                        </Paper>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item md={4} xs={12}>
                    <Card
                      title="We're rated 4 out of 5 on Trustpilot"
                      description="Based on over 100,000 independant and verified reviews."
                      link='https://www.trustpilot.com/review/www.parcel2go.com'
                      linkText='Read reviews on Trustpilot'
                      backgroundColour='#000032'
                      colour='#fff'
                      image='/trustpilot.png'
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Card
                      title="We're proud to be an official Google Partner"
                      description="We've been a Google Partner for over 10 years."
                      link='https://www.google.com/partners/work-with-a-partner/'
                      linkText='What does this mean'
                      backgroundColour='#E2EEF6'
                      image='/google-partner.png'
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Card
                      title='Already have an account'
                      description='Signing in makes life a lot easier for you while using our services.'
                      link='https://www.parcel2go.com/login'
                      linkText='Sign in to your account'
                      backgroundColour='#fff'
                      image='/account.png'
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography sx={{ marginTop: "20px" }} variant='h2'>Delivering more than just parcels</Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  {tiles.map((t) => {
                    return (
                      <Grid item key={t.title} md={6} xs={12} flexGrow={1}>
                        <Tile {...t} />
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {

  const query = gql`
    query ActiveTiles {
      tiles {
        title
        description
        link
        image
      }
    }  
  `;

  const data = await request(process.env.NEXT_PUBLIC_GRAPHCMS_URL || '', query);

  return {
    props: {
      tiles: data.tiles
    }, // will be passed to the page component as props
  }
}

export default Home
