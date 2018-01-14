/*eslint no-console:0 */


import assert from 'power-assert';
import request from 'supertest';

import {app, server} from '../src/server';

describe("Server", () => {
  const agent = request.agent(app);
  after(()=>{
    server.close();
  })
  it('Echo', async function(){
    const res = await agent
      .get('/echo')
      .query({test:"double"});
    
    assert(res.status === 200);
    assert(res.type === 'application/json');
    assert(res.body.test === 'double');
  });

  it('route f', async function(){
    const code = `function f(data){
      return data[['n10']] + data['n50'] + 30
    }`;
    const body = "n10,n50";
    const res = await agent
      .get('/f')
      .query({code, body});
    
    assert(res.status === 200);
    assert(res.type === 'application/json');
    assert(res.body.result === 90);
  });

  it('route f', async function(){
    const code = `function f(data){
      return data[['n10']] + data['n50'] + 30 +de
    }`;
    const body = "n10,n50";
    const res = await agent
      .get('/f')
      .query({code, body});
    
    assert(res.status === 400);
    assert(res.type === 'text/plain');
    assert(/ReferenceError/.test(res.text));
  });
});