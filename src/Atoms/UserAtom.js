import { atom } from 'recoil';



// async function processSnapshot(snapshot) {
//     // const persistedConnections = await snapshot.getPromise(connections)
//     const persistedUser = await snapshot.getPromise(UserState)
//     console.log("Setting user", persistedUser);
//     localStorage.setItem(
//         "user",
//         JSON.stringify(persistedUser)
//     )
// }


const UserState = atom({
    key: 'userState',
    default: null,
});

export default UserState;