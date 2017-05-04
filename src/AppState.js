import { observable } from 'mobx';
import request from 'request-json';
const client = request.createClient('http://localhost:8090/');

const defaultSnack = {
  isOpen: false,
  message: 'Everything is fine!'
}

class AppState {
  @observable virts = {
  	virtualizationList: []
  }

  @observable editableVirt = null;

  @observable snack = defaultSnack;

  editVirt(virt) {
		this.editableVirt = virt;
  }

  transferChanges(type, value) {
  	if (type === 'name') {
  		this.editableVirt.name = value;
  	} else if (type === 'port') {
  		this.editableVirt.port = value;
  	} else if (type === 'protocol') {
  		this.editableVirt.protocol = value;
  	}
  }

  reset() {
    this.getVirts();
  	this.editVirt(null);
  }

  getVirts() {
  	const self = this;
  	client.get('sv/v1/virtualizations/', (err, res, body) => {
  		if (err) {
  			this.snack.isOpen = true;
  			this.snack.message = 'The operation couldn\'t be handled';
  		} else {
  			self.virts = body;
  			// this.snack.isOpen = true;
  			// this.snack.message = 'Virtualizations are successfully received';
  		}
		});
  }

  toggleDeploy(virt) {
  	const isRunning = virt.running;
  	const sendable = {
  		running: !isRunning
  	}
    const snack = this.snack;
  	client.put('sv/v1/virtualizations/' + virt.virtualizationID, sendable, (err, res, body) => {
  		if (err) {
        console.log(err);
        if (res.statusCode === 400) {
          snack.isOpen = true;
          snack.message = `The operation couldn\'t be handled because: ${err.toString()}. Please validate your inputs and try again`;
        } else if (res.statusCode === 500) {
          snack.isOpen = true;
          snack.message = `The operation couldn\'t be handled because: ${err.toString()}. There seems to be a problem with the server. Please try again`;
        }
  		} else {
  			snack.isOpen = true;
  			snack.message = `The virtualization is successfully ${isRunning ? 'undeployed' : 'deployed'}`;
  			this.reset();
  		}
		});
  }
  
  submitForm() {
  	const virt = this.editableVirt;
  	let sendable = {};
  	let vId;
  	for (let v of this.virts.virtualizationList) {
  		if (v.virtualizationID === virt.virtualizationID) {
  			vId = virt.virtualizationID;
				sendable.name = virt.name;
				sendable.port = virt.port;
				sendable.protocol = virt.protocol;
  		}
  	}

    const snack = this.snack;
  	client.put('sv/v1/virtualizations/' + vId, sendable, (err, res, body) => {
  		if (err) {
  			console.log(err);
        if (res.statusCode === 400) {
          snack.isOpen = true;
          snack.message = `The operation couldn\'t be handled because: ${err.toString()}. Please validate your inputs and try again`;
        } else if (res.statusCode === 500) {
          snack.isOpen = true;
          snack.message = `The operation couldn\'t be handled because: ${err.toString()}. There seems to be a problem with the server. Please make sure the server is running or try again later.`;
        }
  		} else {
  			snack.isOpen = true;
  			snack.message = 'The virtualization is successfully updated';
        this.reset();
  		}
		});

  }
}

export default AppState;
