import { Box, Button, Grid, styled, TextField, Typography } from '@mui/material';
import React from 'react';

interface IQuickQuoteNavigationButtonProps {
    title: string,
    selected: boolean,
    onClick: () => void
}

const QuickQuoteNavigationButtonWrapper = styled('div')({
    backgroundColor: '#14496F',
    width: "100%",
    cursor: "pointer",
    padding: "10px",
    textAlign: "center",
    borderRadius: "20px 20px 0 0",
    "&.active": {
        backgroundColor: '#005CB9',
        "& .MuiTypography-root": {
            opacity: 1
        }
    },
    "& .MuiTypography-root": {
        opacity: 0.8,
        color: "white",
        fontWeight: 600,
        fontSize: "1.2rem",
    }
});

const QuickQuoteNavigationButton: React.FC<IQuickQuoteNavigationButtonProps> = (props) => {
    return (
        <QuickQuoteNavigationButtonWrapper
            className={props.selected ? 'active' : 'inactive'}
            onClick={props.onClick}
        >
            <Typography>{props.title}</Typography>
        </QuickQuoteNavigationButtonWrapper>
    )
}

const QuickQuoteBlock = styled('div')({
    backgroundColor: '#005CB9',
    width: "100%",
    height: "10px",
});

const QuickQuoteFormWrapper = styled('div')({
    borderRadius: "0 0 20px 20px",
    border: "solid 1px #CBD9E0",
    padding: "30px"
});

enum View {
    Domestic,
    International,
    Multiple,
}

function QuickQuote() {

    const [view, setView] = React.useState<View>(View.Domestic);

    return (
        <Box>
            <Grid container direction={'column'}>
                <Grid item>
                    <Grid container spacing={3} wrap={'nowrap'}>
                        <Grid item flexGrow={1}>
                            <QuickQuoteNavigationButton
                                title="Send UK to UK"
                                selected={view === View.Domestic}
                                onClick={() => setView(View.Domestic)}
                            />
                        </Grid>
                        <Grid item flexGrow={1}>
                            <QuickQuoteNavigationButton
                                title="Send internationally"
                                selected={view === View.International}
                                onClick={() => setView(View.International)}
                            />
                        </Grid>
                        <Grid item flexGrow={1}>
                            <QuickQuoteNavigationButton
                                title="Multiple parcels"
                                selected={view === View.Multiple}
                                onClick={() => setView(View.Multiple)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <QuickQuoteBlock />
                </Grid>
                <Grid item>
                    <QuickQuoteFormWrapper>
                        <Grid container spacing={5} alignItems="center" wrap='nowrap'>
                            <Grid item flexGrow={1}>
                                <TextField
                                    label="Send To"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item flexGrow={1}>
                                <TextField
                                    label="Parcel weight"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item flexGrow={1}>
                                <TextField
                                    label="Parcel length"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item flexGrow={1}>
                                <Button 
                                    color='secondary' 
                                    variant='contained'
                                    fullWidth
                                    >
                                        Get a quote
                                </Button>
                            </Grid>
                        </Grid>
                    </QuickQuoteFormWrapper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default QuickQuote
