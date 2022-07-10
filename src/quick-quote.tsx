import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, styled, TextField, Typography } from '@mui/material';
import React from 'react';

enum ParcelLength {
    LessThan1M = 1,
    MoreThan1M = 2,
}

type QuoteRequest = {
    origin: number,
    destination: number,
    parcels: QuoteRequestParcel[]
}

type QuoteRequestParcel = {
    length?: number,
    height?: number,
    width?: number,
    weight: number,
    quantity: number,
}

interface IFormProps {
    onSubmit: (quote: QuoteRequest) => void
}

const DomesticForm: React.FC<IFormProps> = (props) => {

    const { onSubmit } = props;

    const [destination, setDestination] = React.useState<number>(219);
    const [length, setLength] = React.useState<ParcelLength>(ParcelLength.LessThan1M);
    const [weight, setWeight] = React.useState<number>(1);

    const onFormSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, [onSubmit])

    return (
        <form onSubmit={onFormSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item flexGrow={1} xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="destination-country">Send to</InputLabel>
                        <Select
                            labelId="destination-country-label"
                            id="destination-country-select"
                            label="Send to"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value as number)}
                        >
                            <MenuItem value={219}>UK Mainland</MenuItem>
                            <MenuItem value={249}>Northern Ireland</MenuItem>
                            <MenuItem value={254}>Scottish Highlands and Islands</MenuItem>
                            <MenuItem value={71}>Channel Islands</MenuItem>
                            <MenuItem value={24}>Guernsey</MenuItem>
                            <MenuItem value={268}>Isle of Man</MenuItem>
                            <MenuItem value={28}>Jersey</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item flexGrow={1} xs={12} md={3}>
                    <TextField
                        label="Parcel length"
                        fullWidth
                        value={length === ParcelLength.LessThan1M ? "Less than 1 metre" : ParcelLength.MoreThan1M ? "More than 1 metre" : ""}
                    />
                </Grid>
                <Grid item flexGrow={1} xs={12} md={3}>
                    <TextField
                        label="Parcel weight"
                        fullWidth
                        value={weight.toString()}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button
                        color='secondary'
                        variant='contained'
                        fullWidth
                        type='submit'
                    >
                        Get a quote
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

const InternationalForm: React.FC<IFormProps> = (props) => {
    return (
        <div></div>
    )
}

const MultipleForm: React.FC<IFormProps> = (props) => {
    return (
        <div></div>
    )
}

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

    const onQuote = React.useCallback((quote: QuoteRequest) => {

    }, []);

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
                        {view === View.Domestic && <DomesticForm onSubmit={onQuote} />}
                        {view === View.International && <InternationalForm onSubmit={onQuote} />}
                        {view === View.Multiple && <MultipleForm onSubmit={onQuote} />}
                    </QuickQuoteFormWrapper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default QuickQuote
