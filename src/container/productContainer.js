import fs from 'fs';
import __dirname from '../utils.js';

export default class ProductContainer {
  constructor(){
    this.path = __dirname+'/files/products.json';
  }
  getAllProducts = async() =>{
    if(fs.existsSync(this.path)){
    let result = await fs.promises.readFile(this.path,'utf-8');
    return JSON.parse(result);
    }else{
      return []
    }
  }

  saveProduct = async(product) =>{
    try{
      let products = await this.getAllProducts();
      if(products.length===0){
          product.id=1;
          products.push(product);
          await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
      }else{
          product.id = products[products.length-1].id+1;
          products.push(product);
          await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
      }
    }catch(error){
      console.log("Cannot write file: "+error)

    }
  }
  
}





  


  
 





