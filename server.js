const express = require('express');
const res = require('express/lib/response');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/hosteldb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
mongoose.connect(url, { useNewUrlParser: true })
const Schema = mongoose.Schema
const hostelschema = new Schema({
  hostelno :Number,
    name :String,
    rooms :Number,
    warden_name:String,
mess_capacity:Number,
    
  })
  const hostel=mongoose.model('harini',hostelschema)

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000,function(){
    console.log('listening to 3000')
})
app.get('/hostel',async (req,res) => {
  const list =  await hostel.find()
  console.log(list)
  console .log('harini kumar')

  res.json(list);
})
app.post('/hostel', (req,res)=>{
    const hostelobj = new hostel(req.body)
    hostelobj.save(function (error, document) {
        if (error) console.error(error)
        console.log(document)
      });
    console .log(req.body)
    //res.send('harini kumar')
    res.json(req.body)
    
    
    })
    app.put('/hostel', async (req,res)=>{
      const no = req.body.hostelno
      let li= await hostel.findOne({'hostelno': no})
      console.log(li);
      li.name=req.body.name
      li.rooms=req.body.rooms
      li.save();
      /*hostelobj.save(function (error, document) {
          if (error) console.error(error)
          console.log(document)
        });*/
      console .log(req.body)
      res.json(req.body)
  
    })
    app.delete('/hostel', async (req,res)=>{
      const no = req.body.hostelno
      let li= await hostel.findOneAndDelete({'hostelno': no})
      res.json(req.body)
  
    })
    
