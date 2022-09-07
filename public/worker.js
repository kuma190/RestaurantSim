var editInfo = {}
var modalInfo = {}

//error message when update or add does not work
function displayUpdateFailure(){
    errMessage = document.getElementById('ModalError')
    errMessage.innerHTML = ''
    errMessage.innerHTML = "Error or Warning from database. Please Change your Edits!"
}

//makes modal preset inputs clear
function resetModalInputs(){
    for (key in modalInfo){
        modalInfo[key].value = ""
    }
}

//gets input nodes of every modal field an stores it in a global dict array
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
//runs it immediately
getModalInputNodes()

//gets the values in modal and returns it.
function getModalInputs(){
    modalChildren = document.getElementById("WorkerModalForm").children
    console.log(modalChildren)
    modalValues = {}
    for (let i = 0; i < modalChildren.length; i++) {
        //console.log(children[i].dataset)
        if (modalChildren[i].children[0] != undefined){
        modalValues[modalChildren[i].children[0].dataset.attri] = modalChildren[i].children[0].value
        }
    } 
    //console.log(modalValues)
    return modalValues
}

//sends post request to edit a worker
function submitEdit(){
    
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    newdata = getModalInputs()
    console.log("newdata",newdata)
    const options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(newdata)  
    };
    fetch("http://localhost:3000/akRoutes/editWorker", options )
    .then(response => {

        console.log(response);
        if (response.status == 200){
            document.getElementById("ModalError").innerHTML = ''
            fetchAsync()

        }
        else{
            fetchAsync()
            displayUpdateFailure();
        }
        
    });
}

//sends post request to add a worker
function submitAdd(){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    newdata = getModalInputs()
    console.log("newdata",newdata)
    const options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(newdata)  
    };
    fetch("http://localhost:3000/akRoutes/AddWorker", options )
    .then(response => {

        console.log(response);
        if (response.status == 200){
            document.getElementById("ModalError").innerHTML = ''
            fetchAsync()

        }
        else{
            fetchAsync()
            displayUpdateFailure();
        }
        
    });

}

//activated when modal submit button is pressed. Based on its action data attribute, it submits an edit or an add request.
//the action is set when the "add worker" or "edit worker" is pressed
function submit(){
    submitButton = document.getElementById("submitButton")
    console.log(submitButton.dataset.action)
    if (submitButton.dataset.action == "edit"){
        submitEdit()
    }
    else{
        submitAdd()
    }

}

//returns a dictionary of {cell data-attri:cell value}
function getRowInfo(row){
    let children = row.children;
    info = {}
    for (let i = 0; i < children.length; i++) {
        //console.log(children[i].dataset)
        info[children[i].dataset.attri] = children[i].innerHTML
    }
    return info

}

//activated when "delete worker" button is pressed. gets row info to post, waits for it to be deleted from database, then deletes row.
function deleteRow(element){
    var row = element.parentNode.parentNode;
    console.log("row to be deleted",row)

    deleteInfo = getRowInfo(row)

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    newdata = deleteInfo
    console.log("deletedata",newdata)
    const options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(newdata)  
    };
    fetch("http://localhost:3000/akRoutes/deleteWorker", options )
    .then(response => {

        console.log(response);
        if (response.status == 200){
            row.parentNode.removeChild(row);

        }
        else{
            console.log("failure");
        }
        
    });
}

//activated when edit or add button is pressed, sets the data-action of submit button and makes modal visible.
function turnModalOn(element){
    //get values in row
    if (element.id == false){
        console.log("id",element.id)
    }
    if (element.id == false){
        document.getElementById('submitButton').dataset.action = "edit";
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
}
else
{
    console.log("add button pressed")
    resetModalInputs()
    document.getElementById('submitButton').dataset.action = "add";
}

    // Get the modal
   
var modal = document.getElementById("editModal");

    modal.style.display = "block";

}

//makes modal not visible when. function is activated when the 'X' is pressed
function closeModal(){
    // Get the modal
var modal = document.getElementById("editModal");

// When the user clicks on <span> (x), close the modal

  modal.style.display = "none";


}

//clears tbody of workertable. gets all workers and puts it in tbody of 'workerTable
async function fetchAsync () {
    const url = "http://localhost:3000/restaurantLocations"
    document.getElementById("workersTable").getElementsByTagName("tbody")[0].innerHTML = ""
    /*let response = await fetch(url);

    //console.log(response.json());
    let data = await response.json();
    console.log(data.received);*/
    //return data;
    //console.log(JSON.stringify(sendingJson));
    fetch("http://localhost:3000/akRoutes/currentWorkers", {
        method: 'GET',
        /*body: JSON.stringify(sendingJson),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }*/
    })
    .then(response => response.json())
    .then(json => {

        var workersTable = document.getElementById("workersTable");
        getModalInputNodes()
        console.log(workersTable)
        json.forEach(worker => {
            date = new Date(Date.parse(worker['birthday']))
            newdate = date.toString("YYYY-dd-MM")
            htmldate = date.toLocaleDateString('en-CA');
            console.log(worker);
            $(' #workersTable > tbody').append(`
            <tr data-id = "${worker['username']}">
                <td data-attri = "username" data-user = "${worker['username']}">${worker['username']}</td>
                <td data-attri = "first_name" data-user = "${worker['username']}">${worker['first_name']}</td>
                <td data-attri = "last_name" data-user = "${worker['username']}">${worker['last_name']}</td>
                <td data-attri = "birthday" data-user = "${worker['username']}">${htmldate}</td>
                <td data-attri = "email" data-user = "${worker['username']}">${worker['email']}</td>
                <td data-attri = "address" data-user = "${worker['username']}">${worker['address']}</td>
                <td data-attri = "city" data-user = "${worker['username']}">${worker['city']}</td>
                <td data-attri = "state" data-user = "${worker['username']}">${worker['state']}</td>
                <td data-attri = "zip" data-user = "${worker['username']}">${worker['zip']}</td>
                <td data-attri = "password" data-user = "${worker['username']}">${worker['password']}</td>
                <td data-attri = "restaurant_id" data-user = "${worker['username']}">${worker['restaurant_id']}</td>
                <td data-attri = "position" data-user = "${worker['username']}">${worker['position']}</td>
                <td data-attri = "edit" data-user = "${worker['username']}"><button style="font-size:100%;" onClick = "turnModalOn(this)" class="btn" type="button">Edit Worker</button></td>
                <td data-attri = "delete" data-user = "${worker['username']}"><button style="font-size:100%;" onClick = "deleteRow(this)" class="btn" type="button">Delete Worker</button></td>
                
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

 

