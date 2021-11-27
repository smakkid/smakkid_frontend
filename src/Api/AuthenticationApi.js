import settings from './apiSettings';
export function RegisterApi(Username, Password){
    return fetch(`${settings.host}/Authentication/register`,
    {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({Username: Username, Password: Password})
    }
    ).then(async(response)=>{
        if(response.ok){
            return response.json();
        } else {
            throw await response.json();
        }
    });
}

export function Authenticate (Username, Password){
    console.log(Username, Password);
    return fetch(`${settings.host}/Authentication/authenticate`,
    {
        method: 'POST', 
        // mode: 'cors',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({Username: Username, Password: Password})
    }
    ).then(async (response)=>{
        if(response.ok){
            return await response.json()
        } else {
            throw await response.json();
        }
    
    })
}

export function GetNotifications(token) { 
    return fetch(`${settings.host}/Groups/invite`, {
        headers: {'authorization':`bearer ${token}`}
    }).then(async response=>{
        return await response.json()
    })
}

// export default AuthenticationApi;