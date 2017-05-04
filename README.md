# Solution

## Installation and Running

First make sure to start the dummy api server:

1. `cd dummy-server`
2. `npm i`
3. `npm start`

Then the client:

1. `cd smart-solution`
2. `npm i`
3. `npm start`

Then go to: `localhost:3000` in your favourite browser.


## Testing

Test scripts for ensuring that the api server and the home-made components are working are implemented. Simply run them by:

`npm test` command, while you're within the `smart-solution` directory.

## Linting

The code is lintable by running the command: `npm lint`.


### Notes

The dummy server have been altered a little to make it work efficiently. The two changes are:

1. `virts.js` file, lines `48 & 49`. 
2. `server.js` file to return `json` in response to `PUT` to request, as it is documented.