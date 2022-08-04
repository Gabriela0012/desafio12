
//https://www.codegrepper.com/code-examples/javascript/document+ready+without+jquery
// “document ready without jquery”
$(function () {
  let socket= io();
  const productForm = $('#productForm')
  const productViewContainer = $('#productViewContainer')



  productForm.submit((event) => {
    event.preventDefault()

    const newProduct = {
      title: productForm[0][0].value,
      price: productForm[0][1].value,
      image: productForm[0][2].value,
    }

    socket.emit('addNewProduct', newProduct)
    productForm.trigger('reset')
    console.log('hola')
  })
  socket.on('updateProductList', productListHandler);{
    async function productListHandler(allProducts) {
      const productLayout = await fetch('partials/products.handlebars')
      const layoutText = await productLayout.text()
      const compiledHbsTemplate = Handlebars.compile(layoutText)
      const html = compiledHbsTemplate({ allProducts })
      productViewContainer.empty().append(html)
    }

  }

  
        
         
 

      

        

})
      

