
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
const app = express();
import http from 'http';


app.use(compression())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/echo', async (req, res)=>{
  await wait(200)
  res.send(req.query)
})

// load router
import {router} from './route/f'
app.use(router);


function wait(msec){
  return new Promise((res)=>{
    setTimeout(res, msec)
  })
}
const server = http.createServer(app).listen(3000);

export {app, server};