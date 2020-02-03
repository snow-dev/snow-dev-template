This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Available Scripts

In the project directory, you can run:

### `yarn start:testing`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`yarn start:production`

Runs the app in the production mode 
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

### `yarn start:testing`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build:production`

Builds the app for production to the `public` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

There are other scripts, but we should not execute this ones instead we have an special reason for that, for example,
we can call `watch-css` or `build-css` if we need, but this scripts are chained from start:* and buidl:*, so this is not especially necessary.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project scaffold

For current project we use `create-react-app` command line tool, it generate a base project scaffold, but this initial
structure was not enough for our necessities,   derived from that we made some changes and create an structure according to our internal appeal code conventions, in the following paragraphs we describe it is content and what is inside.

![](/home/titor/Documents/Appeal/Shelfish/resources/scaffolding.png)

As we can see in this above image, there a lot of folders, we gonna start from top to bot, in that order we gonna describe each one.

### Node_modules

This stores all node the node dependecies installed on this project, you should not upload this to CSV, cause this is generated each time we run `yarn install` or `npm install`, `package.json` contains all data for install the packages.

### Public

This folder is the output folder for `build:production` script, it contains the react bundle JavaScript, index.html, favicon, and a manifest json file, please be sure to do **not delete** this folder its content or part of it, and be careful if you decide to modify index.html, this file contains the entire configuration for tools like google tag manager, google analytics, HubSpot, Hotjar, Facebook and Conekta  configuration and initialization scripts.

### src

This folder contains all the source code, it is composed by several folders, but in it root contain configuration files and the entry point for the application, we gonna describe each one right now.

We gonna start with configuration files and root content.

- **setupTests.js**: this file contains Jest and enzyme adapter configurations, help us to successfully run our test.
- **serviceWorked**: currently unused file.
- **index.js**: this is the application entry point, this is the initial script loaded by application, there we wrap `'/'` __root__ with the *redux* store and render `App` component.
-  **App.js**: is the application initial component, here we initialize translations and inject modal global container.

Rest of content are folders that store component source code, styles, resources helpers, middlewares, mock data, redux store and common components.
For components there are to kinds of them, dumb components and smart components, the difference between each one are in summary:

1. **Dumb components**: are components that only render information, have not direct connection with store and receive all props from its parent container, it should always return an react element, that can be tested and is predictable.
2. **Smart components**: we call this **_containers_**, this kind have direct connection to redux global store through, and contain all the data bindings, helpers, callbacks and connection to actions dispatchers, if there is a container, there must be a component, for code maintainability and project extension we encourage to keep this structure and attach to current structure.

#### common

This folder stores all reusable components, as we comment above, we have containers and components, for those components that only return static content,  we don not create a folder, but for those that depend from global store data, we create folders that store a container, component and for the latests created, there are a ***'tests'*** folder within there are defined jest/enzyme unitary tests for component and container. Not all components have tests, cause this was implemented late in project development.

#### components 

This folder contain all page-components, we call page-components to all those elements that change and the entire ***Workspace*** area content, for example *StoreHome* folders have two files and one folder:

1. **StoreHomeComponent**:  is the file where we define al html tags and from we always gonna receive a well defined, tested and predictable component, returned by the render method.
2. **StoreHomeContainer**: this file have all page logic implementations, have store connections and  dispatchers through connect hoc, is here where we define the functions that gonna help us to manipulate state, component life cycle, action dispatchers, props validations, is important to notice that we **don not** insert any **HTML** tag on container, Appeal internal code conventions is clear about this, the only **tags** that are allowed inside a container are those that inject another container or component, but not html tags.
3. **tests**: this folders stores unit tests for component and container, for component wrote at the begging there are not tests, but for newest implementations or refactor's, we start adding tests, 
   1. *component.test*:  here we tests all the elements, and validate the behavior for different props combination, and state or life cycle changes, please refer to the Jest/Enzyme library documentation for specific information about  testing.
   2. *component.test*: test file where we check that our container returns a component based on the props and internal validations.

This is a general overview for each folder within, for all of then, there will always be two files, a container and its components, and for some ones, there are tests for this, you can expect the same structure for all.
There are only one folder which content is a bit different, Workspace.

#### Workspace 

Workspace is an special component, is the only one that not have a container or component nomenclature, this is cause it is the root tree file definition, is inside this file where we control which component must be rendered for each route.
We define here the omnipresent application elements like Header,  Workspace and Footer.
Internally it have a Switch element that nest all application paths and it respective component, if you have been working with Redux it should not be a big problem to understand.

#### **helpers**

At the same time that application begging to grow in number of files and functionalities, there was emerging some functionalities that was repeating on different files, so we decide separate this on helpers functions that we can use for any place.
Each function is well documented so is not necessary to explain each one.

#### hoc

There are functionalities that we must repeat each time the application load, in current project it was session and checkout, for maintain code readability we separate this  recurrent actions on hoc's, there are two of them, requireSession have all session validations and requireCheckout vaidate that all data for purchase order is available, again we don not describe in details here how it works internally, for that please read technical methods documentation.

#### middlewares

There is only one at this pooint, and its function is to catch all location changes and send en event to google analytics.

#### mocks

For some tests we need define mock files that represent a a valid or invalid API response, this folder contains all them.

#### resources

As its name indicate, we use this folder to store all application static resources like images, icons, translations and styles, there are not much what to say, except for a couple of recommendations, don not delete any of this and please read or follow the translations convention. 

##### styles

For current project we use SASS as styles definition, we use `node-sass-chokidar` for transpile it to standard css, there is a script defined for that task, styles scaffolding is easy to understand, the structure is the same that components and common, and for each component, there is a respective `scss` file for its styles, for common we don not create a folder and all of them are together, no one of them are transpiled directly, they are summarized on `_commoModule.scss` then we only import this module on `App.scss`.
For components we create a folder for each one of them, it was cause some components have different sections or its internal components changes depending of provided props, on other cases there are children components that are only used in one single place, or cause its contents begging to be really bigger, no  matter if there are only one or more files, all them are related to the component and are named with the main component  class preceded by and underscore `_`, for example, `_workspace.scss` located in `src/resources/styles/components/workspace`, 

##### CSS nomenclature.

This project use BEM CSS style, please refer to the official documentation for specific and details about how it works and its conventions.
There are some media query's configuration but in general there is not over complicated configurations and currently is not necessary modify this, we cover all different standard resolutions.

#### store

As we mention this application use Redux for manage state, *store* folder contain all actions and reducers for each action that require and API request, if you are and must be familiar with redux or similar libraries there not be a huge problem understanding this implementation, we gonna give a brief introduction about how store is implemented, bit redux, immutable and rest of libraries behavior scape from this document, so for actions there are a section for type definition section, then for  newest implementations or refactors we define a generic actions creator that receive a type and optionally a payload that dispatch the action then the reducer validate type and if match with any case, update the store, on reducers we use immutable for define initial state, this help us to have more security about data manipulation, and we ensure that store is our only source of true and is not mutated manually without dispatch an action.
For more details about how works **immutable** , please refer to its documentation.

### Team notes

And thats is in summary all project scaffold content, as we describe we omit detailed code implementation for the simple reason that internal classes, methods and functions have its own technical documentation, so please ensure read and understand each component for get a global application comprehension flow before implement any kind of modifications. 

If we have to define a architecture pattern, it is **composition paradigm**, we define and design each component for work isolated from system and integrated, except for  one or two components there are not props passed from one container to other, so if for some reason there is the need  of remove something, is simple as delete or comment its container tag, but again be absolute sure about the consequences, cause even if each component can work for separate, system not.

If you are using WebStorm you can use diagram generation tool for visualize how actions are related each other, but again, you must understand and have a global idea about how everything is connected, that will make things more easy.



