import express from 'express'

const obj = express();
 const port = 3000;


 obj.use(express.json())

 let myData = [];
 let nextId = 1;

 obj.post('/teas',(req, res)=>{
   const {name, price} = req.body
   const newData = {id: nextId++, name, price}
   myData.push(newData);
   res.status(201).send(newData)
 })

 obj.get('/teas',(req,res)=>{
   res.status(200).send(myData);
 })


 obj.get('/teas/:id',(req, res)=>{
   const tea =  myData.find( t => t.id === parseInt(req.params.id))
   if(!tea){
      return res.status(404).send('tea not found')
   }
   res.status(200).send(tea)
 })



 obj.put('/teas/:id',(req,res)=>{
   const tea = myData.find( t => t.id === parseInt(req.params.id))

   if(!tea){
      return res.status(404).send('tea not found')
   }
   const {name, price} = req.body
   tea.name = name
   tea.price = price
   res.status(200).send(tea)

 })

 obj.delete('/teas/:id',(req,res)=>{
   const index = myData.findIndex (t=> t.id === parseInt(req.params.id))
   if(index === -1){
      return res.status(404).send('tea not found')
   }
   myData.splice(index, 1)
   return res.status(204).send('successfully deleted')
 })
 
 obj.listen(port,()=>{
    console.log(`server is running at ${port}...`);
    
 })