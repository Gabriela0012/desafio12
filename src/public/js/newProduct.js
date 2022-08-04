const productForm = document.getElementById('productForm');


productForm.addEventListener('submit',event =>{
  event.preventDefault();
  const formData = new FormData(productForm);
  console.log(formData);
  fetch('/api/products',{
    method: 'POST',
    body: formData
  }).then(result =>result.json()).then(json => console.log(json));
  
})
