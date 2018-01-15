


import assert from 'power-assert';

import {
  generateDummyDict,
  generateF,
} from '../src';

describe("Dummy", () => {
  it('Generate', () => {
    const dd = generateDummyDict("n10,n50,sstart,sdummy,p01,d2017-08-01 22:20");
    assert(dd.constructor.name === 'DummyDict');
    assert(dd.n50 === 50);
    assert(dd.sstart === 'start');
    assert(dd.p01 === null);
    assert(dd["d2017-08-01 22:20"].constructor.name === 'Date');
  });

  it('generateF', async function(){
    const code = `function f(data){
      return data['n10'] + data['n50'] + 30
    }`;
    const f = generateF(code);
    assert(f instanceof Function);

    const dd = generateDummyDict("n10,n50");
    const result = await f(dd);
    assert(result === 90);
  });
});