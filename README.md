# Welcome to the Cookie Clicker Project!

Get ready for an adventure filled with cookie-clicking excitement! 🍪🖱️

<div style="text-align: center;">
  <img src="public/perfectCookie.png" width="128">
</div>


## What's the Cookie Clicker Game?

Cookie Clicker is no ordinary game; it's an addictive, delightful journey into the world of sweet, sugary treats. Your mission? Simple - click on a giant, delectable cookie to earn points. With each click, you're rewarded with more cookies, and the more cookies you have, the faster you can click. It's a cycle of endless cookie-clicking fun! 🎉

## Why It's Going to Be a Blast! 🚀

In this project, you and your team will have the chance to create your very own Cookie Clicker from scratch. You'll build a simple yet functional user interface in the Front-End, allowing players to indulge in some serious cookie-clicking action. On the Back-End, you'll handle the game's logic, track points, and make everything come to life.

But here's the best part: once you've mastered the basics, the sky's the limit! Add fun sound effects to every click, hide exciting Easter eggs, incorporate eye-catching visuals, and customize your Cookie Clicker to make it truly one-of-a-kind.

It's not just about code; it's about the sheer joy of creation and the thrill of watching your Cookie Clicker come to life. Get ready for a sweet, exciting, and, most importantly, fun journey! 🍪✨

So, are you ready to embark on this delightful adventure into the world of cookies and clicks? Let the cookie-clicking begin!


## Technical details
### Running the app
The app is based on Next.js, which itself uses Node.js. To test the app locally, you need to have [node](https://nodejs.org/en/download/package-manager) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed.
Then cd into the directory.
Run `yarn install dependencies` to install the Node.js packages necessary to run the project.
Run `yarn run dev` to run in development mode.
Run `yarn run build` and `yarn start` to run in production mode (The project has to be built first).

### Project organisation
`/pages`: The web pages which are served, for example `/pages/cookie.js` can be visited at `example.com/cookie`.\
`/pages/api`: This is where APIs are run on every visit.\
`/components`: This is where components for pages are stored.\
`/styles`: This is where CSS (for styling pages and components) are stored.\

### Naming conventions
Each file created must have a comment explaining the author and what the file does, as follows: \
```
/*
example.js - created by Felix
This file explains naming conventions in this project
*/
```

### Contributing code

Before committing code, you *must* make sure that it runs and builds properly, using `yarn run build`, to avoid submitting buggy code to the repository.

## Playing the Game
The cookie clicker game can be played online or offline. Playing online allows to upload your game so that you can retrieve it later on another device.
If you choose to play offline, game state will be saved locally to your device. This means that you will still be able to retrieve the game on the same device.

### Upgrades
Once you have enough cookies, you may purchase upgrades from the store if you wish. These will help you earn cookies faster and without clicking!

### Golden cookies
Every now and then, a golden cookie will appear onscreen. You can click it to get extra upgrades for a limited time!
