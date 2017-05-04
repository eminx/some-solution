import React from 'react';
import ReactDOM from 'react-dom';
import EditVirtDialog from 'EditVirtDialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const card = {
	virtualizationID: "1",
	apiType: "REST",
	name: "petstore",
	protocol: "HTTP",
	port: 8082,
	running: false
}

const handleSubmit = (virt) => {
	console.log(virt);
}

const handleClose = () => {
	console.log('handled closing');
}

const transferChanges = (type, value) => {
	console.log(type, value);
}

describe('EditVirtDialog', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        	<MuiThemeProvider muiTheme={getMuiTheme()} >
	        	<EditVirtDialog
	        		virt={card}
	            handleSubmit={handleSubmit}
	            handleClose={handleClose}
	            transferChanges={transferChanges}
	        	/>
       		</MuiThemeProvider>, div)
    });
});