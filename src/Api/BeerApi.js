import settings from './apiSettings';
export function GetBeers(){
    return fetch(`${settings.host}/Beer`).then(data => data.json());
}
export function GetBeer(id){
    return fetch(`${settings.host}/Beer/${id}`).then(data => data.json());
}
export function GetReviewsForBeer(id){
    return fetch(`${settings.host}/Beer/${id}/reviews`).then(data => data.json());
}

export function GetBeersForUser(token){
    return fetch(`${settings.host}/Beer`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    }).then(data => data.json());
}

export function PostReviewForBeer(token, BeerId, score, BeerNumber, color, clarity, headQuality, appearanceDescription, aromaIntensity, aromaBalance, aromaImpression, aromaDescription, flavorIntensity, flavorBalance, flavorImpression, flavorDescription ){
    return fetch(`${settings.host}/Beer/reviews`,
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${token}`
        },
        body: JSON.stringify({score, BeerId, BeerNumber, color, clarity, headQuality, appearanceDescription, aromaIntensity, aromaBalance, aromaImpression, aromaDescription, flavorIntensity, flavorBalance, flavorImpression, flavorDescription })
    }).then(async response=>{
        if(response.ok){
            return
        } else {
            throw await response.json();
        }
    });
}

export function GetMyHistogram(token){
    return fetch(`${settings.host}/Beer/myhistogram`, {
        headers: {
            'authorization': `bearer ${token}`
        }
    }).then(async response=>{
        if(response.ok){
            return await response.json();
        } else {
            throw await response.json();
        }
    })
}

export function DeleteReview(reviewId, token){
    return fetch(`${settings.host}/Beer/reviews/${reviewId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers:{
            'authorization': `bearer ${token}`
        }
    })
}

export function GetBreweryList(){
    return fetch(`${settings.host}/Beer/breweries`).then(async response=>{
        return await response.json()
    })
}
export function GetTypeList(){
    return fetch(`${settings.host}/Beer/types`).then(async response=>{
        return await response.json()
    })
}

export function GetBreweryBeerList(breweryId){
    return fetch(`${settings.host}/Beer/brewery/${breweryId}/beers`).then(async response=>{
        return await response.json()
    })
}
export function GetBreweryBeerListForUser(breweryId, token){
    return fetch(`${settings.host}/Beer/brewery/${breweryId}/beers`, {
        headers: {'authorization':`bearer ${token}`}
    }).then(async response=>{
        return await response.json()
    })
}

export function GetTypeBeerList(typeId){
    return fetch(`${settings.host}/Beer/type/${typeId}`).then(async response=>{
        return await response.json()
    })
}
export function GetTypeBeerListForUser(typeId, token){
    return fetch(`${settings.host}/Beer/type/${typeId}/beers`, {
        headers: {'authorization':`bearer ${token}`}
    }).then(async response=>{
        return await response.json()
    })
}

export function GetBreweryInfo(breweryId){
    return fetch(`${settings.host}/Beer/brewery/${breweryId}`).then(async response=>{
        return await response.json();
    })
}
export function GetBreweryReviewList(breweryId){
    return fetch(`${settings.host}/Beer/brewery/${breweryId}/reviews`).then(async response=>{
        return await response.json();
    })
}

export function GetTypeInfo(breweryId){
    return fetch(`${settings.host}/Beer/type/${breweryId}`).then(async response=>{
        return await response.json();
    })
}
export function GetTypeReviewList(breweryId){
    return fetch(`${settings.host}/Beer/type/${breweryId}/reviews`).then(async response=>{
        return await response.json();
    })
}