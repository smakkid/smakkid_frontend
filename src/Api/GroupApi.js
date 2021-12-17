import settings from './apiSettings';

export function GetGroupInfo(token, groupId){
    return fetch(`${settings.host}/Groups/${groupId}`, {
        headers: {'authorization':`bearer ${token}`}
    }).then(async response=>{
        return await response.json()
    });
}

export function GetGroupMembers(token, groupId){
    return fetch(`${settings.host}/Groups/${groupId}/members`, {
        headers: {'authorization':`bearer ${token}`}
    }).then(async response=>{
        return await response.json()
    });
}

export function GetGroupFeed(token, groupId){
    return fetch(`${settings.host}/Groups/${groupId}/feed`, {
        headers: {'authorization':`bearer ${token}`}
    }).then(async response=>{
        return await response.json()
    });
}

export function InviteToGroup(token, groupId, inviteeName){
    console.log(token, groupId, inviteeName);
    return fetch(`${settings.host}/Groups/invite`,
    {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json', 
            'authorization':`bearer ${token}` 
        }, 
        body: JSON.stringify({groupId: groupId, inviteeName: inviteeName})
    }
    ).then(async(response)=>{
        if(response.ok){
            return;
        } else {
            throw await response.json();
        }
    });
}

export function RespondToInvitation(token, groupId, accept){
    return fetch(`${settings.host}/Groups/invite`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', 
            'authorization':`bearer ${token}` 
        },
        body: JSON.stringify({groupId, accept})
    }).then(async response => {
        if(response.ok){
            return await response.json();
        } else { 
            throw await response.json();
        }
    });
}

export function LeaveGroup(token, groupId){
    return fetch(`${settings.host}/Groups/${groupId}/leave`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'authorization':`bearer ${token}` 
        }
    }).then(async response => {
        if(response.ok){
            return await response.json();
        } else { 
            throw await response.json();
        }
    });
}

export function KickUserFromGroup(token, groupId, userId){
    return fetch(`${settings.host}/Groups/${groupId}/kick/${userId}`,
    {
        method: 'DELETE',
        headers: { 
            'authorization':`bearer ${token}` 
        }
    }).then(async response => {
        if(response.ok){
            return await response.json();
        } else { 
            throw await response.json();
        }
    });
}
