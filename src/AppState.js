import { observable } from 'mobx';
import request from 'request-json';
const client = request.createClient('http://localhost:8090/');

class AppState {
  @observable virts = {
  	virtualizationList: []
  }

  @observable editableVirt = null;

  @observable snack = {
  	isOpen: false,
  	message: 'Everything is fine!'
  }

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
  	this.editableVirt = null;
  	this.getVirts();
  }

  getVirts() {
  	const self = this;
  	client.get('sv/v1/virtualizations/', (err, res, body) => {
  		if (err) {
  			this.snack.isOpen = true;
  			this.snack.message = "The operation couldn't be handled";
  			console.log('error!', err);
  		} else {
  			self.virts = body;
  			this.snack.isOpen = true;
  			this.snack.message = 'Virtualizations are successfully received';
  			console.log(res.statusCode);
  		}
		});
  }

  toggleDeploy(virt) {
  	const isRunning = virt.running;
  	const sendable = {
  		running: !isRunning
  	}
  	client.put('sv/v1/virtualizations/' + virt.virtualizationID, sendable, (err, res, body) => {
  		if (err) {
  			this.snack.isOpen = true;
  			this.snack.message = "The operation couldn't be handled";
  			console.log('error!', err);
  			// this is a hack for now, since I couldn't find out why the JSON parser problem happens
  			this.getVirts();
  		} else {
  			this.snack.isOpen = true;
  			this.snack.message = `The virtualization is successfully ${isRunning ? 'undeployed' : 'undeployed'}`;
  			this.getVirts();
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

  	client.put('sv/v1/virtualizations/' + vId, sendable, (err, res, body) => {
  		if (err) {
  			this.snack.isOpen = true;
  			this.snack.message = "The operation couldn't be handled";
  			console.log('error!', err);
  		} else {
  			this.snack.isOpen = true;
  			this.snack.message = 'The virtualization is successfully updated';
  			console.log(res.statusCode);
  		}
		});

  }
}

export default AppState;
