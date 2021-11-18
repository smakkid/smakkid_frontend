
import { Accordion, AccordionDetails, AccordionSummary, Grid, Slider, TextField, Typography, useMediaQuery } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';


function AromaAccordion(props) {
   
   const {aromaIntensity, setAromaIntensity, aromaBalance, setAromaBalance, aromaImpression, setAromaImpression, aromaDescription, setAromaDescription} = props;
   const isMobile = !useMediaQuery('(min-width:600px)');
   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <Accordion style={{backgroundColor: '#F5F5F5'}}>
        <AccordionSummary expandIcon={<MenuIcon />} aria-controls="panel1a-content">
            <Typography>Lykt</Typography>
        </AccordionSummary>
        <AccordionDetails>

            <Grid container spacing={2} justifyContent="space-evenly">
                
                <Grid item xs={isMobile?12:3}>
                    <Typography>Styrkur á lykt</Typography>                                    
                    <Slider valueLabelDisplay="off" value={aromaIntensity} label="Gegnsæi" onChange={ev=>{setAromaIntensity(ev.target.value)}}  
                        marks={[{value:0, label:'Lítill'}, {value:3, label:"Milli"}, {value:6, label:'Sterk'}]} 
                        min={0} max={6} step={1} aria-label="Default"  />
                </Grid>
                <Grid item xs={isMobile?12:3}>
                    <Typography>Jafnvægi á lykt</Typography>
                    <Slider valueLabelDisplay="off" value={aromaBalance} label="Froða" onChange={ev=>{setAromaBalance(ev.target.value)}}  
                        marks={[{value:0, label:'Sæt'}, {value:3, label:"Milli"}, {value:6, label:'Skörp'}]} 
                        min={0} max={6} step={1} aria-label="Default"  />
                </Grid> 
                <Grid item xs={isMobile?12:3}>
                    <Typography>Gæði á lykt</Typography>
                    <Slider valueLabelDisplay="off" value={aromaImpression} label="Froða" onChange={ev=>{setAromaImpression(ev.target.value)}}  
                        marks={[{value:0, label:'Vond'}, {value:3, label:"Milli"}, {value:6, label:'Góð'}]} 
                        min={0} max={6} step={1} aria-label="Default"  />
                </Grid> 
                <Grid item xs={isMobile?12:6}>
                    <Typography>Nánar um lykt</Typography>
                    <TextField fullWidth value={aromaDescription} onChange={ev=>{setAromaDescription(ev.target.value)}}></TextField>
                </Grid>
            </Grid>

        </AccordionDetails>
    </Accordion>
  );
}

export default AromaAccordion;
