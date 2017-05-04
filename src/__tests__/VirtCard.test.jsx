import React from 'react';
import ReactDOM from 'react-dom';
import VirtCard from 'VirtCard';
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
	running: true
}

const editCard = (card) => {
	console.log(card);
}

const toggleDeploy = (card) => {
	console.log(card);
}


describe('VirtCard', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        	<MuiThemeProvider muiTheme={getMuiTheme()} >
	        	<VirtCard
	        		card={card} 
	            editCard={editCard}
	            toggleDeploy={toggleDeploy}
	        	/>
	        </MuiThemeProvider>, div);
    });
});