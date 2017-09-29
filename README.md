# League of Friends

**WARNING:** The Riot Games API KEY need to be manually updated by me on the proxy server each day. The expiration date is due to Riot policy for non-approved projects. I'm currently in the process to apply for a permanent API KEY. Until than the website will mostly be nonfunctional. You can get an idea on how it work by looking at the screenshots below.

## What is this?

What is League of Friends? League of Friends is a small personal project to keep track when friends finish a game on League.
The most common user-case is to remind you a friend is available to play with you :)

## Technology

The service is offered by a (work in progress) static website hosted on github pages. A .js script takes care of the client side part. 
The requests pass throught a proxy to avoid leaking the API Key. the proxy is a custom built python flask application hosted on Heroku that work as a middle-proxy rest API.

## Screenshot

**UI is work in progress**

![Tracking](https://i.imgur.com/DyVYhJp.png)

Check up to 4 people at a time. GameTime is off-set by some minutes due to spectator data. 

![Notification](https://i.imgur.com/0yx6hsK.png)

You get a Browser notification (and a pleasant sound) when someone finish a game

## RiotGames notice

League of Friends isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
