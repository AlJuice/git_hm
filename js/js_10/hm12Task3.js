"use strict";


async function getData(endpoint){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/' + endpoint)
        if(!response.ok) throw new Error(response.status)
        const data = await response.json()
        return data
    }    
    catch (err) {
        console.error(`Response failed with error: "${err.message}"`)
    }
}

async function logUsersInfo(){
    const [listUsers, usersAlbums, usersPhotos] = await Promise.all([
                getData('users'), 
                getData('albums'),
                getData('photos')
        ])
    
    const countUserPhotos = usersPhotos.reduce((counter, photo) => {
        if (!counter[photo.albumId]) {
            counter[photo.albumId] = 1
        } else counter[photo.albumId] += 1
        return counter
    }, {})

    const result = listUsers.reduce((acc, user) => {
        const { name, email, phone, company } = user;        
        const userAlbums = usersAlbums
        .filter(album => user.id === album.userId)
        .map(album => ({
            title: album.title,
            numberOfPhoto: countUserPhotos[album.id]
        }));        
        acc[user.id] = {
            name,
            email,
            phone,
            company: company.name,
            albums: userAlbums
        }
        return acc
    }, {})    
    return result   
}

logUsersInfo().then(finalResult => console.log(JSON.stringify(finalResult)))
