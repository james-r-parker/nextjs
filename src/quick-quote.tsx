import { Box, Button, Checkbox, Drawer, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, styled, TextField, Typography } from '@mui/material';
import React from 'react';

interface IWeightOptionProps {
    title: string,
    description: string,
    value: number,
    onSelect: (weight: number) => void
}

const WeightOption: React.FC<IWeightOptionProps> = (props) => {
    return (
        <Paper>
            <Box p={2}>
                <Typography variant='h5' mb={1}>{props.title}</Typography>
                <Typography mb={1}>{props.description}</Typography>
                <Button variant='text' onClick={() => props.onSelect(props.value)}>Select</Button>
            </Box>
        </Paper>
    )
}

interface IWeightDrawFormProps {
    open: boolean,
    onClose: () => void,
    onChange: (weight: number) => void,
    weight: number
}

const WeightDrawForm: React.FC<IWeightDrawFormProps> = (props) => {

    const { open, onClose, onChange, weight } = props;
    const [parcelWeight, setParcelWeight] = React.useState<ParcelLength>(weight);

    const onSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onChange(parcelWeight);
        props.onClose();
    }, [onChange, parcelWeight, onClose]);

    const onSelect = React.useCallback((weight: number) => {
        setParcelWeight(weight);
        props.onChange(weight);
        props.onClose();
    }, [onChange, onClose]);

    return (
        <Drawer open={open} onClose={onClose} anchor="right">
            <form onSubmit={onSubmit}>
                <Box p={4} style={{ maxWidth: "600px" }}>
                    <Grid container direction={'column'} spacing={2}>
                        <Grid item alignSelf={'flex-end'}>
                            <Button variant='text' onClick={onClose}>X</Button>
                        </Grid>
                        <Grid item>
                            <Typography variant='h3'>Enter a parcel weight ?</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                    <TextField
                                        label="Weight"
                                        required
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                            inputProps: { min: "1", step: "0.1" }
                                        }}
                                        value={parcelWeight}
                                        type="number"
                                        onChange={(e) => setParcelWeight(parseInt(e.currentTarget.value))}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant='outlined' fullWidth type="submit">Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant='h4'>or choose from the weight categories below</Typography>
                        </Grid>
                        <Grid item>
                            <WeightOption
                                title="Up to 1kg"
                                description="e.g. Video games, books, t-shirts or hoodies"
                                value={1}
                                onSelect={onSelect}
                            />
                        </Grid>
                        <Grid item>
                            <WeightOption
                                title="1-2kg"
                                description="e.g. Shoes, boots, childrens toys or a steam iron"
                                value={2}
                                onSelect={onSelect}
                            />
                        </Grid>
                        <Grid item>
                            <WeightOption
                                title="2-5kg"
                                description="e.g. Laptops, games consoles, or small power tools."
                                value={5}
                                onSelect={onSelect}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant='h4'>More than 5kg?</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>If you're unsure, try using bathroom scales to weigh your parcel.</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Drawer>
    )
}

interface ILengthDrawFormProps {
    open: boolean,
    onClose: () => void,
    onChange: (type: ParcelLength, parcel: QuoteRequestParcel) => void,
    quote: QuoteRequestParcel,
    length: ParcelLength
}

const LengthDrawForm: React.FC<ILengthDrawFormProps> = (props) => {

    const { open, onClose, onChange, quote, length } = props;
    const [parcelLength, setParcelLength] = React.useState<ParcelLength>(length);
    const [parcel, setParcel] = React.useState<QuoteRequestParcel>(quote);

    const onSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onChange(parcelLength, parcelLength === ParcelLength.MoreThan1M ? parcel : { weight: 1, quantity: 1 });
        props.onClose();
    }, [onChange, parcel, parcelLength, onClose]);

    return (
        <Drawer open={open} onClose={onClose} anchor="right">
            <form onSubmit={onSubmit}>
                <Box p={4} style={{ maxWidth: "600px" }}>
                    <Grid container direction={'column'} spacing={2}>
                        <Grid item alignSelf={'flex-end'}>
                            <Button variant='text' onClick={onClose}>X</Button>
                        </Grid>
                        <Grid item>
                            <Typography variant='h3'>Is your parcel longer than 1 metre in length ?</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction={'column'} spacing={2}>
                                <Grid item>
                                    <Paper>
                                        <Box pl={2}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={parcelLength === ParcelLength.LessThan1M}
                                                        onChange={(e) => { setParcelLength(ParcelLength.LessThan1M) }}
                                                    />
                                                }
                                                label="Less than 1 metre"
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper>
                                        <Box pl={2}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={parcelLength === ParcelLength.MoreThan1M}
                                                        onChange={(e) => { setParcelLength(ParcelLength.MoreThan1M) }}
                                                    />
                                                }
                                                label="More than 1 metre"
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                                {parcelLength === ParcelLength.MoreThan1M &&
                                    <Grid item>
                                        <Grid container spacing={1}>
                                            <Grid item sm={4} xs={12}>
                                                <TextField
                                                    label="Length"
                                                    required
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                                        inputProps: { min: "1", step: "1" }
                                                    }}
                                                    value={parcel.length}
                                                    type="number"
                                                    onChange={(e) => setParcel({ ...parcel, length: parseInt(e.currentTarget.value) })}
                                                />
                                            </Grid>
                                            <Grid item sm={4} xs={12}>
                                                <TextField
                                                    label="Width"
                                                    required
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                                        inputProps: { min: "1", step: "1" }
                                                    }}
                                                    value={parcel.width}
                                                    type="number"
                                                    onChange={(e) => setParcel({ ...parcel, width: parseInt(e.currentTarget.value) })}
                                                />
                                            </Grid>
                                            <Grid item sm={4} xs={12}>
                                                <TextField
                                                    label="Height"
                                                    required
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                                        inputProps: { min: "1", step: "1" }
                                                    }}
                                                    value={parcel.height}
                                                    type="number"
                                                    onChange={(e) => setParcel({ ...parcel, height: parseInt(e.currentTarget.value) })}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                }
                                <Grid item>
                                    <Button variant='outlined' fullWidth type="submit">Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant='h4'>I don't have a tape measure...</Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" wrap='nowrap' alignItems="center" spacing={4}>
                                        <Grid item>
                                            <Grid container direction="column" spacing={2}>
                                                <Grid item>
                                                    A kitchen countertop is roughly 1 metre high from the floor.
                                                </Grid>
                                                <Grid item>
                                                    Does your parcels longest length exceed this height?
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <img src="/sink.png" alt="Kitchen Countertop" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Drawer>
    )
}

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
    const [openLength, setOpenLength] = React.useState<boolean>(false);
    const [openWeight, setOpenWeight] = React.useState<boolean>(false);
    const [parcel, setParcel] = React.useState<QuoteRequestParcel>({ weight: 1, quantity: 1 });

    const onFormSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ destination: destination, origin: 219, parcels: [parcel] });
    }, [onSubmit, parcel, destination]);

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
                        onClick={() => setOpenLength(true)}
                        disabled
                        value={length === ParcelLength.LessThan1M ? "Less than 1 metre" : ParcelLength.MoreThan1M ? "More than 1 metre" : ""}
                    />
                    <LengthDrawForm
                        open={openLength}
                        onClose={() => setOpenLength(false)}
                        onChange={(length, parcel) => { setLength(length); setParcel(parcel); }}
                        quote={parcel}
                        length={length}
                    />
                </Grid>
                <Grid item flexGrow={1} xs={12} md={3}>
                    <TextField
                        label="Parcel weight"
                        fullWidth
                        value={parcel.weight}
                        onClick={() => setOpenWeight(true)}
                        disabled
                        InputProps={{
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        }}
                    />
                    <WeightDrawForm
                        open={openWeight}
                        onClose={() => setOpenWeight(false)}
                        onChange={(weight) => { setParcel({ ...parcel, weight: weight }) }}
                        weight={parcel.weight}
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
    const { onSubmit } = props;

    const [destination, setDestination] = React.useState<number>(217);
    const [origin, setOrigin] = React.useState<number>(219);
    const [parcel, setParcel] = React.useState<QuoteRequestParcel>({ weight: 1, quantity: 1 });

    const onFormSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ destination: destination, origin: origin, parcels: [parcel] });
    }, [onSubmit, parcel, destination]);

    return (
        <form onSubmit={onFormSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item flexGrow={1} xs={6} lg>
                    <FormControl fullWidth>
                        <InputLabel id="origin-country">Send from</InputLabel>
                        <Select
                            labelId="origin-country-label"
                            id="origin-country-select"
                            label="Send from"
                            value={origin}
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
                <Grid item flexGrow={1} xs={6} lg>
                    <FormControl fullWidth>
                        <InputLabel id="destination-country">Send to</InputLabel>
                        <Select
                            labelId="destination-country-label"
                            id="destination-country-select"
                            label="Send to"
                            value={destination}
                            onChange={(e) => setOrigin(e.target.value as number)}
                        >
                            <MenuItem value={217}>USA</MenuItem>
                            <MenuItem value={22}>France</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item flexGrow={1} xs={4} lg>
                    <TextField
                        label="Length"
                        required
                        fullWidth
                        value={parcel.length}
                        onChange={(e) => setParcel({ ...parcel, length: parseInt(e.currentTarget.value) })}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item flexGrow={1} xs={4} lg>
                    <TextField
                        label="Width"
                        required
                        fullWidth
                        value={parcel.width}
                        onChange={(e) => setParcel({ ...parcel, width: parseInt(e.currentTarget.value) })}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item flexGrow={1} xs={4} lg>
                    <TextField
                        label="Height"
                        required
                        fullWidth
                        value={parcel.height}
                        onChange={(e) => setParcel({ ...parcel, height: parseInt(e.currentTarget.value) })}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item flexGrow={1} xs={6} lg>
                    <TextField
                        label="Weight"
                        required
                        fullWidth
                        value={parcel.weight}
                        onChange={(e) => setParcel({ ...parcel, weight: parseInt(e.currentTarget.value) })}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={6} md>
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

const QuickQuoteNavigationButtonWrapper = styled('div')(({ theme }) => ({
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
        fontSize: "1rem",

        [theme.breakpoints.up("md")]: {
            fontSize: "1.2rem",
        }
    }
}));

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
        window.location.href = `https://www.parcel2go.com/quotes?col=${quote.origin}&dest=${quote.destination}&p=${quote.parcels[0].quantity}~${quote.parcels[0].weight}|${quote.parcels[0].length || ''}|${quote.parcels[0].width || ''}|${quote.parcels[0].height || ''}`
    }, []);

    return (
        <Box>
            <Grid container direction={'column'}>
                <Grid item>
                    <Grid container spacing={2} wrap={'nowrap'}>
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
