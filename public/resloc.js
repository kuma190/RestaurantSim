/*

Made by Daniel Beltran
This page is made to display restaurant locataions

We need to determine if the user loged in is an admin therefore they have an extra option of adding a new restaurant location

*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYmVsdHJhbjEzIiwiYSI6ImNrcmV5eDUxejU1dGUyb3F1NGlpYTZnazEifQ.Iig_iiSEp_5x3wOotY8P1w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [ -96.364703,30.647577], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

console.log(document.cookie);
// Need to send a request to the backend end and create Restaurant Cards
/* console.log("Starting Backend Connection Test");

const sendingJson = {
  name:"ThisName",
  phone:"999-999-9999"
}*/

async function fetchAsync () {
    const url = "http://localhost:3000/restaurantLocations"
    /*let response = await fetch(url);

    //console.log(response.json());
    let data = await response.json();
    console.log(data.received);*/
    //return data;
    //console.log(JSON.stringify(sendingJson));
    fetch("http://localhost:3000/dbRoutes/restaurantLocations", {
        method: 'GET',
        /*body: JSON.stringify(sendingJson),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }*/
    })
    .then(response => response.json())
    .then(json => {

        var restaurantCardContainer = document.getElementById("restaurantCardContainer");
        
        console.log(json)
        json.forEach(restaurant => {
            console.log(restaurant);
            $(' #restaurantCardContainer').append(`
            <div class = "row">
                <div class="card" style="width: 100%;">
                <div class="card-body">
                  <h5 class="card-title">Restaurant Id: ${restaurant['id']}</h5>
                  <p class="card-text">Address:  ${restaurant['address']}, ${restaurant['city']}, ${restaurant['state']}  ${restaurant['zipcode']}</p>
                </div>
              </div>
            </div>
            `)

        const el = document.createElement('div');
        el.className = 'marker';
      
        // make a marker for each feature and add to the map30.6561794
 //lon: -96.3675766
        new mapboxgl.Marker(el).setLngLat([restaurant['lon'],restaurant['lat']]).addTo(map);
            //var newRestaurantCard = document.createElement(<></>)
            
        });



        console.log(json);
    });

  }
fetchAsync();

// We will add an option for user (if they are admin, to add/update/ or remove  resturant )
var userType = "admin";
if(userType === "admin"){
    console.log("User is admin");
    /* 
        So if the user is an Admin, we need to create a panel for them that allows for 
        update, delete, and insert of a restaurant, they have 3 options
        
    */
    $(' #cardContainer').append(`
        <div class = "col" >
            <h3>Admin Panel</h3>
            <div id = "adminRadioSelection" style="display: inline;">
                <div class="form-check adminRadio" style="display: inline;">
                    <input class="form-check-input" type="radio" name="adminOptions" id="insertOption" value="insert" checked>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Insert
                    </label>
                </div>
                <div class="form-check adminRadio" style="display: inline;">
                    <input class="form-check-input" type="radio" name="adminOptions" id="updateOption" value="update">
                    <label class="form-check-label" for="flexRadioDefault2">
                        Update
                    </label>
                </div>
                <div class="form-check adminRadio" style="display: inline;">
                    <input class="form-check-input" type="radio" name="adminOptions" id="deleteOption" value="delete">
                    <label class="form-check-label" for="flexRadioDefault2">
                        Delete
                    </label>
                </div>
            </div>
            <div id="formSelected"> </div>
        </div>`
    )
    
    // Admin Radio Buttons Form generator
    // ISSUE found, when user clicks around radio, sometimes it is undefined
    const radios = document.querySelectorAll('.adminRadio');
    for (const radio of radios) {
        radio.onclick = (e) => {
            console.log(e.target.value);
            //Now we need to generate the selected form
            if(e.target.value === "insert"){
                $('#formSelected').html(`
                
                                        
                    <div class="form__group">
                        <input id = "addressForm" type="text" placeholder="Address" class="form__input" />
                    </div>
            
                    <div class="form__group">
                        <input id = "cityForm" type="text" placeholder="City" class="form__input" />
                    </div>
            
                    <div class="form__group">
                        <input id = "stateForm" type="text" placeholder="State" class="form__input" />
                    </div>
            
                    <div class="number">
                        <input id = "zipcodeForm" type="text" placeholder="Zipcode" class="form__input" />
                    </div>
                    
                    <div class="number">
                        <input id = "latitudeForm" type="text" placeholder="Latitude" class="form__input" />
                    </div>
                    <div class="number">
                        <input id = "lontitudeForm" type="text" placeholder="Lontitude" class="form__input" />
                    </div>
                    <button id="formSubmitButton" style="background-color:#a9a9ab; "class="btn" type="button">Submit</button>
                
            

            
                `);

                // Submit event listener will need to be moved later
                 // EventListener for when Admin Submits form
                var submitButton = document.getElementById("formSubmitButton");
                submitButton.addEventListener('click',  e => {
                    console.log("Submit Button CLicked");
                    // I am going to assmume that this is the insert option
                    // 1. Retreive information from form
                    // 2. Generate Post Request
                    // 3. Refresh Page
                    // 1. 

                    var address = document.getElementById('addressForm').value;

                    var postInsertData = {
                        address : document.getElementById('addressForm').value,
                        city : document.getElementById('cityForm').value,
                        state : document.getElementById('stateForm').value,
                        zipcode : document.getElementById('zipcodeForm').value,
                        latitude : document.getElementById('latitudeForm').value,
                        lontitude : document.getElementById('lontitudeForm').value
                    }
                    console.log(JSON.stringify(postInsertData));
                    fetch("http://localhost:3000/dbRoutes/restaurantLocations", {
                        method: 'POST',
                        body: JSON.stringify(postInsertData),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                    });

                    /*var insertJsonData = {
                        address=,
                    }*/

                    // 2. 
                   


                }); 
                //end of submit button listener

            }// end of INSERT
            if(e.target.value === "update"){
                $('#formSelected').html(`
                
                    <div class="form__group">
                        <input id = "idForm" type="text" placeholder="Restaurant Id" class="form__input" />
                    </div>                    
                    <div class="form__group">
                        <input id = "addressForm" type="text" placeholder="Address" class="form__input" />
                    </div>
            
                    <div class="form__group">
                        <input id = "cityForm" type="text" placeholder="City" class="form__input" />
                    </div>
            
                    <div class="form__group">
                        <input id = "stateForm" type="text" placeholder="State" class="form__input" />
                    </div>
            
                    <div class="number">
                        <input id = "zipcodeForm" type="text" placeholder="Zipcode" class="form__input" />
                    </div>
                    
                    <div class="number">
                        <input id = "latitudeForm" type="text" placeholder="Latitude" class="form__input" />
                    </div>
                    <div class="number">
                        <input id = "lontitudeForm" type="text" placeholder="Lontitude" class="form__input" />
                    </div>
                    <button id="formSubmitButton" style="background-color:#a9a9ab; "class="btn" type="button">Submit</button>
                
            

            
                `);

                // Submit event listener will need to be moved later
                 // EventListener for when Admin Submits form
                var submitButton = document.getElementById("formSubmitButton");
                submitButton.addEventListener('click',  e => {
                    console.log("Submit Button CLicked");
                    // I am going to assmume that this is the insert option
                    // 1. Retreive information from form
                    // 2. Generate Post Request
                    // 3. Refresh Page
                    // 1. 

                    var address = document.getElementById('addressForm').value;
                    console.log(address);       

                    var postInsertData = {
                        restaurantid : document.getElementById('idForm').value,
                        address : document.getElementById('addressForm').value,
                        city : document.getElementById('cityForm').value,
                        state : document.getElementById('stateForm').value,
                        zipcode : document.getElementById('zipcodeForm').value,
                        latitude : document.getElementById('latitudeForm').value,
                        lontitude : document.getElementById('lontitudeForm').value
                    }
                    console.log(JSON.stringify(postInsertData));
                    fetch("http://localhost:3000/dbRoutes/restaurantLocations", {
                        method: 'PUT',
                        body: JSON.stringify(postInsertData),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                    });

                    /*var insertJsonData = {
                        address=,
                    }*/

                    // 2. 
                   


                }); 
                //end of submit button listener

            }// end of Update

            if(e.target.value === "delete"){
                $('#formSelected').html(`
                
                    <div class="form__group">
                        <input id = "idForm" type="text" placeholder="Restaurant Id" class="form__input" />
                    </div>                    
                   
                    <button id="formSubmitButton" style="background-color:#a9a9ab; "class="btn" type="button">Submit</button>
                
            

            
                `);

                // Submit event listener will need to be moved later
                 // EventListener for when Admin Submits form
                var submitButton = document.getElementById("formSubmitButton");
                submitButton.addEventListener('click',  e => {
                    console.log("Submit Button CLicked");
                    // I am going to assmume that this is the insert option
                    // 1. Retreive information from form
                    // 2. Generate Post Request
                    // 3. Refresh Page
                    // 1. 
     
                    var postInsertData = {
                        restaurantid : document.getElementById('idForm').value,
                    }
                    console.log(JSON.stringify(postInsertData));
                    fetch("http://localhost:3000/dbRoutes/restaurantLocations", {
                        method: 'DELETE',
                        body: JSON.stringify(postInsertData),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                    });

                    /*var insertJsonData = {
                        address=,
                    }*/

                    // 2. 
                   


                }); 
                //end of submit button listener

            }// end of delete
            


        }// End of Radio CLick


    }// End of For Radios

   


} // End if Admin

