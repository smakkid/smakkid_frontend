
import { Accordion, AccordionDetails, AccordionSummary, Grid, Slider, TextField, Typography, useMediaQuery } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

function FlavorAccordion(props) {
    const {flavorIntensity, setFlavorIntensity, flavorBalance, setFlavorBalance, flavorImpression, setFlavorImpression, flavorDescription, setFlavorDescription} = props;

    return (
        <Accordion style={{backgroundColor: '#F5F5F5'}}>
            <AccordionSummary expandIcon={<MenuIcon />} aria-controls="panel1a-content">
                <Typography>Bragð</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <Grid container spacing={2} justifyContent="space-evenly">
                    
                    <Grid item xs={12} sm={3}>
                        <Typography>Styrkur á bragði</Typography>                                    
                        <Slider valueLabelDisplay="off" value={flavorIntensity} label="Gegnsæi" onChange={ev=>{setFlavorIntensity(ev.target.value)}}  
                            marks={[{value:0, label:'Lítill'}, {value:3, label:"Milli"}, {value:6, label:'Sterkt'}]} 
                            min={0} max={6} step={1} aria-label="Default"  />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography>Jafnvægi á bragði</Typography>
                        <Slider valueLabelDisplay="off" value={flavorBalance} label="Froða" onChange={ev=>{setFlavorBalance(ev.target.value)}}  
                            marks={[{value:0, label:'Sætt'}, {value:3, label:"Milli"}, {value:6, label:'Biturt'}]} 
                            min={0} max={6} step={1} aria-label="Default"  />
                    </Grid> 
                    <Grid item xs={12} sm={3}>
                        <Typography>Gæði á bragði</Typography>
                        <Slider valueLabelDisplay="off" value={flavorImpression} label="Froða" onChange={ev=>{setFlavorImpression(ev.target.value)}}  
                            marks={[{value:0, label:'Vont'}, {value:3, label:"Milli"}, {value:6, label:'Gott'}]} 
                            min={0} max={6} step={1} aria-label="Default"  />
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <Typography>Nánar um bragð</Typography>
                        <TextField fullWidth value={flavorDescription} onChange={ev=>{setFlavorDescription(ev.target.value)}}></TextField>
                    </Grid>
                </Grid>

            </AccordionDetails>
        </Accordion>
    );
}

export default FlavorAccordion;
