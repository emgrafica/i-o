## io-portal-web

Frontend repository for i-o Portal.

This project was bootstrapped with react-scripts.

## Getting Started

1. You need to generate an access token in order to install packages from Azure Artifacts. Select npm as your package manager and follow the "Project setup" instructions for your device. Common Issue: Your access token will expire depending on the selected time for expiration you select, follow this step again if expires.

2. Once you've generated your access token, clone the repo and run `npm install` to install all dependencies for the project.

## Local development

To run this application locally, you will need to add a `.env` file to the root of the project with the following variables:

```shell
REACT_APP_API_SUBSCRIPTION_KEY=<value>
REACT_APP_AUTH_ENDPOINT=<authorization_endpoint>
REACT_APP_CLIENT_ID=<client_id>
REACT_APP_API_SCOPE=<api_scope>
REACT_APP_API_GRAPH_ENDPOINT=http://localhost:4000/graphql
REACT_APP_ENV=<value>
# The value of this key is generated automatically by the release pipeline during deployment.
# This key can be set to any number for dev purposes.
REACT_APP_BUILD_NUMBER=<any_number>
REACT_APP_AUTH_BASE_URL=<value>
REACT_APP_AUTH_DEFAULT_SCOPE=<value>
REACT_APP_ISSUER=<value>
REACT_APP_CLIENT_SECRET=<value>
REACT_APP_GRANT_TYPE=<value>
REACT_APP_TOKEN_ENDPOINT=<value>
# This key can be set to your sso for dev purposes.
LOCAL_USER_ID=<value>
REACT_APP_BOLD_ACCOUNT_ID=<value>
REACT_APP_BOLD_CHAT_BUTTON_ID=<value>
REACT_APP_BOLD_INVITATION_ID_STAGE=<value>
REACT_APP_BOLD_WEBSITE_ID_STAGE=<value>
REACT_APP_LOUNGE_URL=<value>

#These keys are needed to run `npm run i18n` which is used to translate the UI content
I18N_TRANSLATOR_ENDPOINT=<value>
I18N_APIM_SUBSCRIPTION_KEY=<value>
I18N_AUTH_URL=<value>
I18N_APIM_CLIENT_ID=<value>
I18N_APIM_CLIENT_SECRET=<value>
I18N_APIM_GRANT_TYPE=<value>
I18N_APIM_SCOPE=<value>
```
These values can be found at the Portal Development Environment Library on Azure DevOps.

You will also need to run graphiti, our GraphQL Server, locally to serve local data. Once up and running, this server is listening for requests at http://localhost:4000/graphql.

## First Pull Request

You're getting ready to submit your first pull request (PR). Congrats! Before you do, make sure your PR follows our style guidelines.

## CI/CD

At the root of this project, there is a default `azure-pipelines.yml` file which you may customize to your needs.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:ci`

Runs all tests without watch mode and generates junit reporting.

### `npm run build:analyze`

Runs [source-map-explorer](https://github.com/danvk/source-map-explorer) to create a visual representation of the dependencies in the latest build from `npm run build`.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run i18n`
Generates the `i18n` dictionaries for all the supported languages from the english dictionaries.
> **Note**: You will need Node version 12 or later.

### `npm run apollo:generate`

Generates Typescript interfaces for all GraphQL operations. [Docs](https://github.com/apollographql/apollo-tooling)

In order to run this script, you will need to clone and run graphiti locally, add the `LOCAL_GRAPHITI_ENDPOINT` env variable to your `.env` file, and set its value to `http://localhost:4000/graphql`.

### `npm run apollo:fragments`

Generates metadata needed for Apollo to process union types. Adapted from [Apollo Documentation](https://www.apollographql.com/docs/react/v2.6/data/fragments/#fragments-on-unions-and-interfaces). This should be run whenever a new union type is added or a possible type is added to an existing union.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Other notes

There is no explicit way to logout. To logout, you need to clear local storage and clear cookies.

## Debug from Visual Studio Code
### Preparation
- Install extension [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).
- Restart Visual Studio Code.
- Go to Run section.
- Create a new launch.json, it should looks similar to this one:
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost”, // Write here configuration's Name.
            "url": "https://localhost:3000”, // Write here url where Portal-Web is running. Please be aware that Portal runs with https.
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```
- Ready to debug!
### Debugging
- Do "npm start" in the project.
- Once the project is running, go to Run section and click Play for the configuration you created before.
- It will open a new Chrome browser with the project running. At this point you can put any breakpoint inside Visual Studio Code for this project and when that piece of code is executed during the navigation, it will stop there.

### Tips
- Is more convenient to let the project running in your localhost the all time, and only stop and restart the project via Run section in Visual Studio Code, it will make the work easier.
- If env variables or general configurations are changed, is important to stop the project in Visual Studio Code and in your localhost, and then do all Debuging steps again.
- **Important!** Portal runs with https, so make sure your "url" in launch.json use https.


### Useful Extensions
Portal utilizes the [Apollo Platform](https://www.apollographql.com/) for all data interactions and state management. The Apollo team has created the [Apollo VSCode Extension](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) to improve the DX (Developer Experience) when interacting with Apollo Client. After installation, you will have query autocomplete, syntax highlighting, etc. all based on the GraphQL schema we've defined in `graphiti`. You may also open `apollo.config.js` to inspect configurable options for the extension.

####Note: You must have graphiti running locally in order for the Apollo VSCode Extension to work as expected! Follow the link and read graphiti's README to learn how to start the application.

## Adding & Changing Environment Variables
- Add the new/changed environment variable to the "/src/utils/env.js" file. Update/assign the environment variable to an exported variable or object to be used with ease throughout the project.
- Document the new environment variable name here, in the README above, under the "Local development" section.
- Update/add the environment variable in the Portal Development Environment Library on Azure DevOps for the Development environment.
- Communicate this change with a QA-team member, so the added/changed environment variable can be relayed to the additional environments as well.
- Communicate the recent addition out the Front-end team, and any other stakeholders you feel would be appropriate. Use the "Frontend engineers" Teams chat to announce the update/change, using the "Important" flag.

## Learn More
Check the [documentations](./docs/index.md) page for more information on the project.
This project is a fork of create-react-app. You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
