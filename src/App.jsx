import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';

import VirtCard from './Components/VirtCard';
import EditVirtDialog from './Components/EditVirtDialog';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.getVirts();
  }

  getVirts = () => {
    this.props.appState.getVirts();
  }

  handleSubmit = (virt) => {
    this.props.appState.submitForm();
  }

  handleClose = () => {
    this.props.appState.reset();
  }

  transferChanges = (type, value) => {
    this.props.appState.transferChanges(type, value);
  }

  render() {

    const appState = this.props.appState;

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="Actions"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={'#aaa'} />
      </IconButton>
    );

    return (
      <div style={{maxWidth: 720, margin: '0 auto'}}>

        <AppBar title="Virtualizations" />

        <List>
          {this.props.appState.virts.virtualizationList.map((virt => {
            return (
              <ListItem 
                key={virt.virtualizationID} 
                style={{listStyle: 'none'}}
              >  
                <VirtCard 
                  card={virt} 
                  editCard={() => appState.editVirt(virt)}
                  toggleDeploy={() => appState.toggleDeploy(virt)} />
                <Divider />
              </ListItem>
            )
          }))}
        </List>
        
        { appState.editableVirt ?
          <EditVirtDialog 
            virt={appState.editableVirt}
            handleSubmit={this.handleSubmit}
            handleClose={this.handleClose}
            transferChanges={this.transferChanges}
          />
        : null
        }

        <Snackbar
          open={appState.snack.isOpen}
          message={appState.snack.message}
          autoHideDuration={4000}
        />

        <DevTools />
      </div>
    );
  }

};

export default App;
