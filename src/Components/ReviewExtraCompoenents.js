
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Slider, Grid, Paper, Divider} from "@mui/material";

function ReviewExtraComponents(props){
    const {review} = props;


    return (
    <Accordion>
        <AccordionSummary expandIcon={<MenuIcon />} aria-controls="panel1a-content">
            <Typography>Nánari upplýsingar</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={2} justifyContent="center">



            {(review.color!==null || review.clarity!==null || review.headQuality!==null || review.appearanceDescription!==null) && <>
            
                <Grid item xs={12}>
                    <Typography variant="h6">Útlit</Typography>
                </Grid>
                <Grid item xs={8} container spacing={2}>

                    {(review.color!==null) &&<>
                        <Grid item xs={5}>
                            <Typography variant="button">Litur:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{review.color}</Typography>
                        </Grid>             
                    </>}

                    {(review.clarity!==null) && <>
                        <Grid item xs={5}>
                            <Typography variant="button">Gegnsæi</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Slider valueLabelDisplay="off" value={review.clarity} disabled marks={[{value:0, label:'Glær'}, {value:3, label:"Milli"}, {value:6, label:'Skýjaður'}]} min={0} max={6} step={1}  /> 
                        </Grid>
                    </>}

                    {(review.headQuality!==null) && <> 
                        <Grid item xs={5}>
                            <Typography variant="button">Haus</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Slider valueLabelDisplay="off" value={review.headQuality} label="Haus" disabled marks={[{value:0, label:'litill'}, {value:3, label:"Milli"}, {value:6, label:'Stór'}]} min={0} max={6} step={1} />
                        </Grid>
                        
                    </>}
                </Grid>

                {review.appearanceDescription && <Grid item xs={5}>
                    <Typography>Nánar um útlit</Typography>
                    <Paper><Typography>"{review.appearanceDescription}"</Typography></Paper>    
                </Grid>}
            </>}
            <Divider />
            {/* AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA AROMA  */}
            
            {(review.aromaIntensity!==null || review.aromaBalance!==null || review.aromaImpression!==null || review.aromaDescription!==null) && <>
                
                <Grid item xs={12}>
                    <Typography variant="h6">Lykt</Typography>
                </Grid>

                <Grid item xs={8} container spacing={2} justifyContent="center">
                    { (review.aromaIntensity!==null) && <>
                        <Grid item xs={5}>
                            <Typography variant="button">Styrkleiki</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Slider valueLabelDisplay="off" value={review.aromaIntensity} label="Styrkur" disabled marks={[{value:0, label:'litil'}, {value:3, label:"Milli"}, {value:6, label:'Sterk'}]} min={0} max={6} step={1} aria-label="Default"  /> 
                        </Grid>
                    </>}

                    {(review.aromaBalance!==null) && <>
                        <Grid item xs={5}>
                            <Typography variant="button">Jafnvægi</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Slider valueLabelDisplay="off" value={review.aromaBalance}  disabled marks={[{value:0, label:'litil'}, {value:3, label:"Milli"}, {value:6, label:'Sterk'}]} min={0} max={6} step={1} aria-label="Default"  />
                        </Grid>
                    </>}
                        
                    {(review.aromaImpression!==null) && <>
                        <Grid item xs={5}>
                            <Typography variant="button">Gæði á lykt</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Slider valueLabelDisplay="off" value={review.aromaImpression} disabled marks={[{value:0, label:'litil'}, {value:3, label:"Milli"}, {value:6, label:'Sterk'}]} min={0} max={6} step={1} aria-label="Default"  /> 
                        </Grid>

                    </>}
                    
                </Grid>
                {review.aromaDescription && <Grid item xs={5}>
                        
                    <Typography variant="caption">Nánar um lykt</Typography>
                    <Paper><Typography>"{review.aromaDescription}"</Typography></Paper>    
                </Grid>}
            </>}
            
            
            {/* FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR FLAVOR  */}
            
            
            {(review.flavorBalance || review.flavorDescription || review.flavorImpression || review.flavorIntensity) && <>
                
                <Grid item xs={12}>
                    <Typography variant="h6">Bragð</Typography>
                </Grid>
                <Grid item xs={8} container spacing={2}>
                    {review.flavorIntensity && <>
                        <Grid item xs={5}>
                            <Typography variant="button">Styrkur á bragði</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Slider valueLabelDisplay="off" value={review.flavorIntensity} disabled marks={[{value:0, label:'Lítið'}, {value:3, label:"Milli"}, {value:6, label:'Sterkt'}]} min={0} max={6} step={1}   /> 
                        </Grid>
                    </>}
                    {review.flavorBalance && <>
                        <Grid item xs={5}>
                            <Typography variant="button">Jafnvægi á bragði</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Slider valueLabelDisplay="off" value={review.flavorBalance} disabled marks={[{value:0, label:'Sætt'}, {value:3, label:"Milli"}, {value:6, label:'Biturt'}]} min={0} max={6} step={1}  /> 
                        </Grid>
                    </>}
                    {review.flavorImpression && <>
                        <Grid item xs={5}>
                            <Typography variant="button">Gæði á bragði</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Slider valueLabelDisplay="off" value={review.flavorImpression} disabled marks={[{value:0, label:'vont'}, {value:3, label:"Milli"}, {value:6, label:'Gott'}]} min={0} max={6} step={1}   />
                        </Grid>
                    </>}
                
                </Grid>
                {review.flavorDescription && <Grid item xs={5}>
                        
                    <Typography variant="caption">Nánar um bragð</Typography>
                    <Paper><Typography>"{review.flavorDescription}"</Typography></Paper>    
                </Grid>}
            </>}
            

            </Grid>

            
        </AccordionDetails>
    </Accordion>
    );

}

export default ReviewExtraComponents;