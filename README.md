# Product Finder Application

A Product finder application for fund management use. The app is a data table with a few select widgets and a search input. Selecting an option or
multiple options from the widget and hitting the 'apply filter' button filters the table data accordingly. This project was generated with a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Running Json server

Run `json-server --watch db.json --port 3004` to start json-server to load our product data. Navigate to `http://localhost:3004/` to view the data source.

## Running Application

Run `npm run dev` to run the application

## Running end-to-end tests

Run `npm run cypress:open` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).
 

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
