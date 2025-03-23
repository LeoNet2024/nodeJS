
const express = require('express');
const router = express.Router();

const products = require('./product');

let produnctsObj = products.products;



router.use(express.json());


router.get('/:id',(req,res)=>
{

  const id = req.params.id;
  const selected = produnctsObj.find((el)=>el.id===id*1);

  console.log(selected)
  if (selected)
    res.json(selected);

  else
  res.status(404).end("not found")

})

router.put('/:id',(req,res)=>
{

  const id = req.params.id;
  const selected = produnctsObj.find((el)=>el.id===id*1);

  if (selected)
  res.send("prodcut updated")

  else
  res.status(404).end("not found")

})

router.delete('/:id',(req,res)=>
{

  const id = req.params.id;
  const selected = produnctsObj.find((el)=>el.id===id*1);

  if (selected)
  {
     newlist = produnctsObj.filter((el)=>el!== el.id)
    
    res.send("item deleted")
  }
  
  else
  res.status(404).end("not found")

})

router.post('/',(req,res)=>
{
  res.status(202).end("product created")
})



router.get('/',(req,res)=>
{
    console.log("main")
  console.log(req.path)
  res.json(products)
})








module.exports = router;




