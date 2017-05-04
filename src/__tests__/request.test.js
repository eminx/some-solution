import request from 'request-json';
const client = request.createClient('http://localhost:8090/');

describe('GET', () => {
  it('gets all virtualizations', () => {
  	client.get('sv/v1/virtualizations/', (err, res, body) =>{
  		expect(body.virtualizationList.length).toEqual(3);
  	})
  })
})

describe('PUT', () => {
  it('updates virtualization', () => {
  	client.put('sv/v1/virtualizations/2' , {name: 'Crazy Bear', port: '0001'}, (err, res, body) =>{
  		expect(res.statusCode).toEqual(200);
  	})
  })
})

describe('PUT', () => {
  it('toggles virtualization deployment', () => {
  	client.put('sv/v1/virtualizations/1' , {running: true}, (err, res, body) =>{
  		expect(res.statusCode).toEqual(200);
  	})
  })
})
