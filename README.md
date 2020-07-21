This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


```
📦src
 ┣ 📂components
 ┃ ┣ 📜bar-chart.tsx
 ┃ ┣ 📜button.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜loading-indicator.tsx
 ┃ ┗ 📜scalable-svg.tsx
 ┣ 📂pages
 ┃ ┣ 📂tree-stats
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜selectors.ts
 ┃ ┃ ┣ 📜tree-stats-page.tsx
 ┃ ┃ ┗ 📜use-trees-api.ts
 ┃ ┗ 📜index.ts
 ┣ 📂types
 ┃ ┣ 📜result.ts
 ┃ ┗ 📜tree.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜serviceWorker.ts
 ┗ 📜setupTests.ts
 ```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### TODO List

* Add tests using `react-testing-library` and jest snaphot testing.
* Remove use of React `key` to force re-mount the bar chart when the filter changes. 
* Remove tree chart specific code from bar chart to make it a re-usable component.
* There is some use of typescript `any` type which should be replaced with the correct type for stricter type checking.
* Enable filtering using a date picker - For example React Day Picker - https://react-day-picker.js.org/examples/selected-range
* Refactor presentational UI code in `DataView` into a separate file. This would give better separation of data and presentational layers.
