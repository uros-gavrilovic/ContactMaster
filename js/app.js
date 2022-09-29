$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

function emptyList(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
}
function emptyAllInputs(){
    mainForm.reset();
    modifyForm.reset();
    createForm.reset();
    console.log("izbrisano");
}
function hideModify(){
  modifyForm.classList.add("modifyFormHidden");
  modifyForm.classList.remove("modifyForm");
    let modifyContactName = document.getElementById("modifyNameID");
    let modifyNumber = document.getElementById("modifyPhoneNumberID");
    modifyContactName.value = "";
    modifyNumber.value = "";
    modifyButton.disabled = false;
    modifyButton.style.backgroundColor = rgb(64,64,64);
    modifyButton.style.color = "white";
    modifyButton.style.border = "solid 5px rgb(64,64,64)"
    
}
function showModify(){
    let modifyForm = document.getElementById('modifyFormID');
    modifyForm.classList.add("modifyForm");
    modifyForm.classList.remove("modifyFormHidden");
    modifyButton.disabled = true;
    modifyButton.style.backgroundColor = rgb(254,220,50);
    modifyButton.style.color = "black";
    modifyButton.style.border = "solid 5px black"
}
function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

// Client ID and API key from the Developer Console
var CLIENT_ID = '15630246044-gdp59mh587blemsg94eefflavrkfseqn.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCJe3bpqnnCWjuFXG2n00IFjJIcLZ1dFio';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/contacts";
// var SCOPES = "https://www.googleapis.com/auth/contacts.readonly";

var mainForm = document.getElementById('mainFormID');
var modifyForm = document.getElementById('modifyFormID');
var createForm = document.getElementById('createFormID');

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var list = document.getElementById("listID");
var modifyButton = document.getElementById('btnModifyID');
var deleteSubmit = document.getElementById('btnDeleteSubmitID');
var createSubmit = document.getElementById('btnCreateSubmitID');
var modifySubmit = document.getElementById('btnModifySubmitID');


var contactName = document.getElementById('nameID');
var phoneNumber = document.getElementById('phoneNumberID');
var modifyContactName = document.getElementById('modifyNameID');
var modifyPhoneNumber = document.getElementById('modifyPhoneNumberID');
var createContactName = document.getElementById('createNameID');
var createPhoneNumber = document.getElementById('createPhoneNumberID');

var contactSelected = false;

function formatNumber(number){
  if(number.length === 12 || number.startsWith(38)){
    number = ("+").concat(number);
    //console.log("Function \"formatNumber\" returned result: " + number);
    return number;
  } else {
    number = ("+381").concat(number.substr(1));
    //console.log("Function \"formatNumber\" returned result: " + number);
    return number;
  }
}

signoutButton.addEventListener("click", function(){
    emptyList(list);
    emptyAllInputs();
    contactSelected = false;
})
modifyButton.addEventListener("click", function(){
    if(contactSelected === true){
        showModify();
    }
})
list.addEventListener("change", function(){
    hideModify();
    console.log("Selected contact: " + list.value);
    contactSelected = true;
    let stringSplitter = list.value.split(' +');
    contactName.value = stringSplitter[0];
    phoneNumber.value = stringSplitter[1];
})


deleteSubmit.addEventListener("click", deleteContact);
async function deleteContact(e){
  if(contactSelected === false){
    console.log("Kontakt NIJE SELEKTOVAN!");
    return false;
  }

  let name = contactName.value;
  let number = formatNumber(phoneNumber.value.toString());

  let message = "Da li ste sigurni da želite da izbrišete ovaj kontakt?\n\n"
    + "Ime: " + name + "\n"
    + "Broj Telefona: " + number;
    
  if(!window.confirm(message)) {
    return false;
  }

  console.log("Deleting contact \"" + name + "\"...");
  deleteGivenUser(name);
  await sleep(1000);
  this.form.submit();

}

modifySubmit.addEventListener("click", modifyContact);
async function modifyContact(e){
  if(modifyForm.checkValidity() === true){
    let oldName = contactName.value;
    let oldPhone = formatNumber(phoneNumber.value.toString());
    let newName = modifyContactName.value;
    let newPhone = formatNumber(modifyPhoneNumber.value.toString());

    let message = "Da li ste sigurni da želite da modifikujete ovaj kontakt?\n\n"
    + "Staro ime: " + oldName + "\n"
    + "Stari broj telefona: " + oldPhone + "\n\n"
    + "Novo ime: " + newName + "\n"
    + "Novi broj telefona: " + newPhone + "\n";
    
    if(!window.confirm(message)) {
      return false;
    }

    let inputName = newName;
    let length = inputName.split(" ").length;
    let firstName;
    let lastName;

    if(length >= 2){
      firstName = inputName.split(" ", length-1).join(" ");
      lastName = inputName.split(" ").pop();
    } else {
      firstName = inputName;
      lastName = "";
    }
    console.log("Updating contact...\nName: " + oldName + "\nPhone number: " + oldPhone + "\n\nNew firstname: " + firstName + "\nNew lastname: " + lastName + "\nNew phone number: " + newPhone);
    updateUserFields(firstName, lastName, newPhone, oldName);
    await sleep(1000);
    this.form.submit();

  } else {
    checkFormValidity(modifyForm);
  }
}

createSubmit.addEventListener("click", createContact);
async function createContact(){
  if(createForm.checkValidity() === true){
    let phone = formatNumber(createPhoneNumber.value.toString());
    let inputName = createContactName.value;

    let message = "Da li ste sigurni da želite da kreirate ovaj kontakt?\n\n"
    + "Ime: " + inputName + "\n"
    + "Broj telefona: " + phone + "\n";
    
    if(!window.confirm(message)) {
      return false;
    }
    
    let length = inputName.split(" ").length;
    let firstName;
    let lastName;

    if(length >= 2){
      firstName = inputName.split(" ", length-1).join(" ");
      lastName = inputName.split(" ").pop();
    } else {
      firstName = inputName;
      lastName = "";
    }
    console.log("Adding contact...\nFirstname: " + firstName + "\nLastname: " + lastName + "\nPhone number: " + phone);
    addNewUser(firstName,lastName,phone);
    await sleep(1000);
    this.form.submit();
  } else {
    checkFormValidity(createForm);
  }
}


function checkFormValidity(form){
  for(var i=0; i<form.length; i++){
    if(form[i].reportValidity() === true){
      continue;
    } else{
      break;
    }
  }
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
let bodyRightDiv = document.getElementById("bodyDivRightID");
let messageNotification = document.getElementById("bodyDivLeftMessageID");

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    messageNotification.style.display = 'none';
    list.style.display = 'block';
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listConnectionNames();
    bodyRightDiv.classList.remove("blur");
    bodyRightDiv.classList.remove("disable")
  } else {
    messageNotification.style.display = 'block';
    list.style.display = 'none';
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    hideModify();
    contactSelected = false;
    bodyRightDiv.classList.add("blur");
    bodyRightDiv.classList.add("disable")
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  // var pre = document.getElementById('content');
  // var textContent = document.createTextNode(message + '\n');
  // pre.appendChild(textContent);

  // ovako sam jAAAAAAAAAAAAAAAAA
  var list = document.getElementById('listID');
  var option = document.createElement("option");
  option.text = message;
  list.add(option);

}

/**
 * Print the display name if available for 500 connections.
 */
function listConnectionNames() {
  gapi.client.people.people.connections.list({
     'resourceName': 'people/me',
     'pageSize': 500,
     'personFields': 'names,emailAddresses,phoneNumbers',
   }).then(function(response) {
     var connections = response.result.connections;
     //appendPre('Connections:');

     if (connections.length > 0) {
       for (i = 0; i < connections.length; i++) {
         var person = connections[i];
         if (person.names && person.names.length > 0) {
           appendPre(person.names[0].displayName + " " + person.phoneNumbers[0].canonicalForm)
         } else {
           appendPre("No display name found for connection.");
         }
       }
     } else {
       appendPre('No connections found.');
     }
   });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ------------------------------------------------------------------------------------------------------------

//NEW FUNCTIONS
function addNewUser(firstName,lastName,number){

  //console.log(firstName);
  gapi.client.people.people.createContact({
       
     phoneNumbers: [{value: number}],
      names: [
    {
      displayName: firstName+lastName,
      familyName: lastName,
      givenName: firstName,
    },
  ],
}).then((person) => {
  //console.log(person);
  console.log("SUCCESS!");
  listConnectionNames();
})  
}
function deleteGivenUser(givenUser){
  gapi.client.people.people.connections.list({
       'resourceName': 'people/me',
       'pageSize': 1000,
       'personFields': 'names,phoneNumbers',
     }).then(function(response) {
       var connections = response.result.connections;
       var toDelete;
       if (connections.length > 0) {
         for (i = 0; i < connections.length; i++) {
           var person = connections[i];
           if(person.names[0].displayName===givenUser){
           toDelete=person.resourceName; 
             break;
           }
         }
       }
       //console.log(toDelete);
       console.log("SUCCESS!");
       var res=gapi.client.people.people.deleteContact({resourceName:toDelete}).then(()=>{
         listConnectionNames();
       });

     });
}
function updateUserFields(firstName, lastName, number, oldDisplayName) {
  gapi.client.people.people.connections.list({
    'resourceName': 'people/me',
    'pageSize': 1000,
    'personFields': 'names,phoneNumbers'
  }).then(function (response) {
    var connections = response.result.connections;
    var toChange;
    if (connections.length > 0) {
      for (i = 0; i < connections.length; i++) {
        var person = connections[i];
        if (person.names[0].displayName === oldDisplayName) {
          toChange = person;
          break;
        }
      }
    }
    console.log("SUCCESS!");
    //console.log(toChange);
    gapi.client.people.people.updateContact({
      "resourceName": toChange.resourceName,
      "updatePersonFields": "names,phoneNumbers",
      "resource": {
        "etag": toChange.etag,
        "names": [
          {
            "givenName": firstName,
            "familyName": lastName
          }
        ],
        "phoneNumbers": [
          {
            "value": number
          }
        ]
      }
    }).then(() => {
      listConnectionNames();
    });
  })
}
