const $div = $('.col-8');
const $button = $('.button');
const $delete = $('.delete');

fetch('/api/cars')
 .then(response => response.json())
 .then(data => {
     for (let i = 0; i < data.length; i++){
     let cars = data[i];
     let cards = $(`<div class="card border-warning mb-3 bg-dark-subtle" style="width: 12rem;">
     <img src="..." class="card-img-top" alt="...">
       <div class="card-body">
       <h5 class="card-title">${cars.make}</h5>
       <p class="card-text">Model: ${cars.model}</p>
       <p class="card-text">Year: ${cars.year}</p>
       <p class="card-text">Color: ${cars.color}</p>
       <p class="card-text">Price: $${cars.price}</p>
       <p class="card-text">Car ID: ${cars.id}</p>
     </div>
   </div>`)

   $div.append(cards)
     }
 })

$button.on('click', ()=>{
    let make = $("#make").val();
    console.log(make)
    let model = $("#model").val();
    let year = $("#year").val();
    let color = $("#color").val();
    let price = $("#price").val();
    let data = { 
        make: make,
        model: model,
        year: year,
        color: color,
        price: price
      };

    fetch('http://127.0.0.1:3000/api/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
})

$delete.on('click', () => {
    let id = $('#kill').val();
    fetch(`/api/cars/${id}`, {
      method: 'DELETE',
    }) 
      .then(data => {
        alert('Car deleted successfully');
      })
      .catch(error => {
        alert(`Error deleting car: ${error.message}`);
      });
  });


//  <img src="..." class="card-img-top" alt="...">