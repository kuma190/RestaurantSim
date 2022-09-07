console.log("Starting Backend Connection Test");

const sendingJson = {
  name:"ThisName",
  phone:"999-999-9999"
}

async function fetchAsync () {
    const url = "http://localhost:3000/"
    /*let response = await fetch(url);

    //console.log(response.json());
    let data = await response.json();
    console.log(data.received);*/
    //return data;
    console.log(JSON.stringify(sendingJson));
    fetch("http://localhost:3000/", {
        method: 'POST',
        body: JSON.stringify(sendingJson),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });

  }
fetchAsync();


  /*
function httpGetAsync(theUrl, callback)
{
    const url = "http:localhost:3000";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
            consolel
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}
*/