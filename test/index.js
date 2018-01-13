


import assert from 'power-assert'

import {
  generateDummyDict
} from '../src'

describe("Dummy",()=>{
  it('Generate', ()=>{
    const dd = generateDummyDict("n10,n50,sstart,sdummy,p01,d2017-08-01 22:20")
    assert(dd.constructor.name === 'DummyDict')
    assert(dd["n50"]=== 50)
    assert(dd["sstart"]=== 'start')
    assert(dd["p01"]=== null)
    assert(dd["d2017-08-01 22:20"].constructor.name === 'Date')
  })
})