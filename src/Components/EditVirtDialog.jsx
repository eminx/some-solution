import React, { Component } from 'react';
import { observer } from 'mobx-react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

@observer
class EditVirtDialog extends Component {

	handleSubmit = () => {
		this.props.handleSubmit();
		// this.props.handleClose();
	}

	_onNameChange = (event) => {
		const name = event.target.value;
		this.props.transferChanges('name', name);
	}

	_onPortChange = (event) => {
		const port = event.target.value;
		this.props.transferChanges('port', port);
	}
	
	_onProtocolChange = (event, index, value) => {
		this.props.transferChanges('protocol', value);
	}

	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    const virt = this.props.virt;

    return (

    	<Dialog
        title={`Edit the Virtualization ${virt.virtualizationID}`}
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.props.handleClose}
      >
				<div>
					<TextField
						defaultValue={virt.name}
			      floatingLabelText="Change Name"
			      onChange={this._onNameChange}
			    />
		    </div>

		    <div>
			    <TextField
			    	defaultValue={virt.port}
			      floatingLabelText="Change Port"
			      onChange={this._onPortChange}
			    />
			  </div>

			  <div>
			  	<SelectField
	          floatingLabelText="Change Protocol"
	          value={virt.protocol}
	          onChange={this._onProtocolChange}
	        >
	          <MenuItem value={'HTTP'} primaryText="HTTP" />
	          <MenuItem value={'HTTPS'} primaryText="HTTPS" />
	        </SelectField>
	      </div>

      </Dialog>
  	)
	}

}

export default EditVirtDialog;