# Keeper

![Gif of app](https://i.imgur.com/QkTxCej.gif)

A clone of Google Keep, but also featuring the ability to log in/out using Passport.js<br />
The ability to log in using a Google account through OAuth 2.0 was also added.<br />

The backend was implemented MongoDB Atlas and the app is currently deployed to Heroku at: <br />
https://keeper-app-1.herokuapp.com/

## Available Scripts

In the project directory, you can run:

### `npm start-dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />
Requests will be made to the server at [http://localhost:8080](http://localhost:8080)

Page will automatically referesh when changes are made to the client.

### `npm start`

Runs the server in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

This will also make use of a front end in a 'build' folder placed into the server folder.<br />
Use `npm run build` and move the 'build' folder into the server folder to use this.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
