#!/usr/bin/env node

const user = process.argv.slice(2)
const username = user[0]

const url = `https://api.github.com/users/${username}/events`
async function test(url) {
        const res = await fetch(url)
        if (!res.ok) {
            console.log('User ivalid type again!')
        }
        const dataa = await res.json()
        return dataa
}


(async () =>{
    const userinfo = await test(url)
    const repos = new Set()
    /* for (let i = 0; i < userinfo.length; i++) {
            repos.add(userinfo[i].repo.url)
    } */
    
    
    for (let i = 0; i < userinfo.length; i++) {
        if (userinfo[i].type == "CreateEvent") {
            console.log(`Create ${userinfo[i].payload.ref_type} to ${userinfo[i].repo.name} at ${userinfo[i].created_at} `)
        }
        else if (userinfo[i].type == "PushEvent") {
            console.log(`Push to ${userinfo[i].repo.name} at ${userinfo[i].created_at}`)
        }
        else if (userinfo[i].type == "PublicEvent") {
            console.log(`Public ${userinfo[i].repo.name} at ${userinfo[i].created_at}`)
        }
        else if (userinfo[i].type == "ForkEvent") {
            console.log(`Fork ${userinfo[i].repo.name} at ${userinfo[i].created_at}`)
        }
    }
})

()

