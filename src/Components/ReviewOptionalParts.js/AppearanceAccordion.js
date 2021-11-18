
import { Accordion, AccordionDetails, AccordionSummary, Grid, Slider, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const colorOptions = [
    {value: "straw",      color : '#ffe186'},
    {value: "gold",       color : '#fecb30'},
    {value: "amber",      color : '#e2a30f'},
    {value: "copper",     color : '#986e0a'},
    {value: "darkbrown",  color : '#5e4406'},
    {value: "black",      color : '#1b1403'},
    {value: "red",        color : "#8c1212"}
]

function AppearanceAccordion(props) {
    const {color, setColor, clarity, setClarity, headQuality, setHeadQuality, appearanceDescription, setAppearanceDescription} = props;
    const isMobile = !useMediaQuery('(min-width:600px)');

    return (
    <Accordion style={{backgroundColor: '#F5F5F5'}}>
        <AccordionSummary expandIcon={<MenuIcon />} aria-controls="panel1a-content">
            <Typography>Útlit</Typography>
        </AccordionSummary>
        <AccordionDetails>

            <Grid container spacing={2} justifyContent="space-evenly">
                <Grid item xs={isMobile?12:5}>
                    <Typography>Litur</Typography>
                    <ToggleButtonGroup exclusive onChange={(ev)=>{setColor(ev.target.value)}} value={color} fullWidth>
                        {colorOptions.map(o=><ToggleButton key={o.value} value={o.value} style={{backgroundColor: o.color, color:"white", height:'35px'}}>{color===o.value&&"🗸"}</ToggleButton>)}
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={isMobile?12:6} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Gegnsæi</Typography>                                    
                        <Slider valueLabelDisplay="off" value={clarity} label="Gegnsæi" onChange={ev=>{setClarity(ev.target.value)}}  
                            marks={[{value:0, label:'Glær'}, {value:3, label:"Milli"}, {value:6, label:'Skýjaður'}]} 
                            min={0} max={6} step={1} aria-label="Default"  />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Froða</Typography>
                        <Slider valueLabelDisplay="off" value={headQuality} label="Froða" onChange={ev=>{setHeadQuality(ev.target.value)}}  
                            marks={[{value:0, label:'Lítil'}, {value:3, label:"Milli"}, {value:6, label:'Þykk'}]} 
                            min={0} max={6} step={1} aria-label="Default"  />
                    </Grid>
                </Grid>

                <Grid item xs={isMobile?12:6}>
                    <Typography>Nánar um útlit</Typography>
                    <TextField fullWidth value={appearanceDescription} onChange={ev=>{setAppearanceDescription(ev.target.value)}}></TextField>
                </Grid> 
            </Grid>

        </AccordionDetails>
    </Accordion>
  );
}

export default AppearanceAccordion;
