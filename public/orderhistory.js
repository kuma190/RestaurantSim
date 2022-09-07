var editInfo = {}
var modalInfo = {}


function getModalInputNodes(){
    modalChildren = document.getElementById("WorkerModalForm").children
    console.log(modalChildren)
    for (let i = 0; i < modalChildren.length; i++) {
        //console.log(children[i].dataset)
        if (modalChildren[i].children[0] != undefined){
        modalInfo[modalChildren[i].children[0].dataset.attri] = modalChildren[i].children[0]
        }
    } 
    console.log(modalInfo)
}
getModalInputNodes()

function getModalInputs(){
    modalChildren = document.getElementById("WorkerModalForm").children
    console.log(modalChildren)
    for (let i = 0; i < modalChildren.length; i++) {
        //console.log(children[i].dataset)
        if (modalChildren[i].children[0] != undefined){
        modalInfo[modalChildren[i].children[0].dataset.attri] = modalChildren[i].children[0].value
        }
    } 
    //console.log(modalInfo)
    return modalInfo
}

function submit(){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    newdata = getModalInputs()
    console.log("newdata",newdata)
    const options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(newdata)  ,
        test:   "hello"
    };
    fetch("http://localhost:3000/orderRoutes/editOrder", options )
    .then(response => {

        console.log(response);
    });

}

function turnModalOn(element){
    //get values in row
    row = element.parentNode.parentNode;
    console.log(row.dataset.id)
    //var children = [...row.childNodes];


    let children = row.children;

  for (let i = 0; i < children.length; i++) {
    //console.log(children[i].dataset)
    editInfo[children[i].dataset.attri] = children[i].innerHTML
  }
  console.log(editInfo)
  for (key in editInfo){
      if (key in modalInfo && editInfo[key] != 'null'){
          modalInfo[key].value = editInfo[key]
      }
  }

    // Get the modal
   
var modal = document.getElementById("editModal");

    modal.style.display = "block";

}

function closeModal(){
    // Get the modal
var modal = document.getElementById("editModal");

// When the user clicks on <span> (x), close the modal

  modal.style.display = "none";


}

async function fetchAsync () {
    const url = "http://localhost:3000/restaurantLocations"
    /*let response = await fetch(url);

    //console.log(response.json());
    let data = await response.json();
    console.log(data.received);*/
    //return data;
    //console.log(JSON.stringify(sendingJson));
    fetch("http://localhost:3000/orderRoutes/ordersHistory", {
        method: 'GET',
        /*body: JSON.stringify(sendingJson),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }*/
    })
    .then(response => response.json())
    .then(json => {

        var workersTable = document.getElementById("workersTable");
        
        console.log(workersTable)
        
        json.forEach(worker => {

            console.log(worker);
            $(' #workersTable').append(`
            <tr data-id = "${worker['order_id']}">
                <td data-attri = "orderID" data-user = "${worker['order_id']}">${worker['order_id']}</td>
                <td data-attri = "timestamp" data-user = "${worker['ts']}">${worker['ts']}</td>
                <td data-attri = "currentStatus" data-user = "${worker['currentStatus']}">${worker['currentStatus']}</td>
                <td data-attri = "restAddress" data-user = "${worker['address']}">${worker['address']}</td>
                <td data-attri = "city" data-user = "${worker['city']}">${worker['city']}</td>
                <td data-attri = "state" data-user = "${worker['state']}">${worker['state']}</td>
                <td data-attri = "zipcode" data-user = "${worker['zipcode']}">${worker['zipcode']}</td>
                <td data-attri = "food" data-user = "${worker['FoodType']}">${worker['FoodType']}</td>
                <td data-attri = "calories" data-user = "${worker['calories']}">${worker['calories']}</td>
                <td data-attri = "cusine" data-user = "${worker['cuisine']}">${worker['cuisine']}</td>
                <td data-attri = "price" data-user = "${worker['price']}">${worker['price']}</td>
                <td data-attri = "edit" data-user = "${worker['order_id']}"><button onClick = "turnModalOn(this)" class="btn" type="button">Edit Order</button></td>
                <td data-attri = "delete" data-user = "${worker['order_id']}"><button class="btn" type="button">Delete Order</button></td>
                
            </tr>
        `)
        }
        )

//         const el = document.createElement('div');
//         el.className = 'marker';
      
//         // make a marker for each feature and add to the map30.6561794
//  //lon: -96.3675766
//         new mapboxgl.Marker(el).setLngLat([-96.3675766,30.6561794]).addTo(map);
//             //var newRestaurantCard = document.createElement(<></>)
            
//         });



        console.log(json);
    });

  }

  fetchAsync();


// // Get the modal
// var modal = document.getElementById("editModal");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];





// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

 

