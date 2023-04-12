const $div = $('.col-8');
const $button = $('.button');
const $delete = $('.delete');
const $update = $('.updateCar');
const $filter = $('#filter');
const $search = $('#search');

$filter.on('click', ()=>{
    $div.empty();
    cardBuild();
})

function cardBuild(){
fetch('https://expressserver-6z2l.onrender.com/api/cars')
.then(response => response.json())
.then(data => {
        let value = $search.val().toLowerCase();
        for (let i = 0; i < data.length; i++){
            let cars = data[i];
        if (cars.model.toLowerCase().includes(value) || cars.year == value || cars.color.toLowerCase().includes(value) || (cars.price == value) || cars.make.toLowerCase().includes(value)){

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
    }
    $search.val('');
})
}
cardBuild();

$button.on('click', ()=>{  //builds cards
    $div.empty();
    let make = $("#make").val();
    let model = $("#model").val();
    let year = $("#year").val();
    let color = $("#color").val();
    let price = $("#price").val();
    let image = $("#image").val(); 
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
        price: price,
        image: image
    };
   
    fetch('https://expressserver-6z2l.onrender.com/api/cars', { //POSTs new vehicles
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
        $("#image").val("");
        cardBuild();
    })
})

$delete.on('click', () => {  //DELETEs vehicles
    $div.empty();
    let id = $('#kill').val();
    fetch(`https://expressserver-6z2l.onrender.com/api/cars/${id}`, {
      method: 'DELETE'
    }) 
      .then(response => response.json())
      .then(response => {
        console.log(response);

    $("#kill").val("");
    cardBuild();
})
})

$update.on('click', ()=> {  //PATCH entries
    $div.empty();
    let id = $('#updateID').val();
    let feature = $("#spec").val();
    let value = $("#value").val();
    let data = {}
    data[feature] = value

    fetch(`https://expressserver-6z2l.onrender.com/api/cars/${id}`, {
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
