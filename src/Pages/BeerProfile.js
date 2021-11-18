// import logo from './logo.svg';
// import './App.css';
import {useState, useEffect} from 'react'
import { CircularProgress, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import {GetBeer, GetReviewsForBeer} from '../Api/BeerApi';
import BeerInfo from '../Components/InfoComponents/BeerInfo'
import ReviewForm from '../Components/ReviewForm';
import ReviewListItem from '../Components/ReviewListItem';
import { useRecoilValue } from 'recoil';
import UserState from '../Atoms/UserAtom';

const useFetch = (id, setBeer, setReviews)=>{useEffect(() => {
  GetBeer(id).then(result=>{
    console.log(result);
    setBeer(result);
  }).catch(error=>{

  });
  GetReviewsForBeer(id).then(result => {
    setReviews(result);
  }).catch(error=>{

  });
}, [id, setBeer, setReviews])}



function BeerProfile(params) {
  const {id} = useParams();
  
  const [beer, setBeer] = useState(null);
  const [reviews, setReviews] = useState(null);


  const user = useRecoilValue(UserState);

  useFetch(id, setBeer, setReviews);

  return (
  <Grid container justifyContent="center" spacing={2}>

      {beer &&  <BeerInfo beer={beer}/> }
      {!beer && <Paper> <CircularProgress  size={50} /> </Paper>}
      {beer && user && <ReviewForm beerId={id} token={user.token} beerName={beer.name} />} 

      {reviews && reviews.map(review=><ReviewListItem key={`id: ${review.id}`} review={review}/>)}

  </Grid>
  );
}

export default BeerProfile;
