
async function fetchProducts() {
    const response = await fetch('https://kreomart.onrender.com/api/products/',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data;
  }
  
  export default fetchProducts;