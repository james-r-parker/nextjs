import { AppBar, Box, Chip, Container, Grid, Link, Toolbar } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src="/logo.svg" alt="Parcel2Go.com" height={60} width={240}  />
                    <Box style={{ flexGrow: 1 }} />
                    <Box>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item>
                                <Link>Get a quote</Link>
                            </Grid>
                            <Grid item>
                                <Link>Services</Link>
                            </Grid>
                            <Grid item>
                                <Link>Track a parcel</Link>
                            </Grid>
                            <Grid item>
                                <Link>Smart Send</Link>
                            </Grid>
                            <Grid item>
                                <Link>eBay Delivery</Link>
                            </Grid>
                            <Grid item>
                                <Link>Help</Link>
                            </Grid>
                            <Grid item>
                                <Link>Basket</Link>
                            </Grid>
                            <Grid item>
                                <Chip icon={<FaceIcon />} label="Sign In" />
                            </Grid>
                        </Grid>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
