const $div = $('.col-8');
const $button = $('.button');
const $delete = $('.delete');
const $update = $('.updateCar')


function cardBuild(){
fetch('http://127.0.0.1:3000/api/cars')
.then(response => response.json())
.then(data => {
    for (let i = 0; i < data.length; i++){
        let cars = data[i];
        let cards = $(`<div class="card border-warning mb-3 bg-dark-subtle" style="width: 12rem;">
        <img src="${cars.image}" class="card-img-top">
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
}
cardBuild();

$button.on('click', ()=>{
    $div.empty();
    let make = $("#make").val();
    let model = $("#model").val();
    let year = $("#year").val();
    let color = $("#color").val();
    let price = $("#price").val(); 
    if (!make || !model || !year || !color || !price){
        alert("All fields are required.");
        cardBuild();
        return
    }
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

        $("#make").val("");  //clears input fields
        $("#model").val("");
        $("#year").val("");
        $("#color").val("");
        $("#price").val("");
        cardBuild();
    })
})

$delete.on('click', () => {
    $div.empty();
    let id = $('#kill').val();
    fetch(`http://127.0.0.1:3000/api/cars/${id}`, {
      method: 'DELETE'
    }) 
      .then(response => response.json())
      .then(response => {
        console.log(response);

    $("#kill").val("");
    cardBuild();
})
})

$update.on('click', ()=> {
    $div.empty();
    let id = $('#updateID').val();
    let feature = $("#spec").val();
    let data = {}
    let value = $("#value").val();
    data[feature] = value

    fetch(`http://127.0.0.1:3000/api/cars/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)

        $("#updateID").val("");  //clears input fields
        $("#spec").val("");
        $("#value").val("");
        cardBuild();
    })
})
