var key;
var web3js;
var contractAddress = "";
var contract;

window.addEventListener('load', function() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
	  // Use Mist/MetaMask's provider
	  web3js = new Web3(web3.currentProvider);
	} else {	  
	  console.log("Please install metamask to proceed");
	}
	
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // Great success! All the File APIs are supported.
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
	
	//contract = new web3js.eth.Contract(/* put ABI here */, contractAddress);
});

/* Sign form */

var signButton = document.getElementById("signButton");
signButton.addEventListener("click" , onSignButtonClicked);

function onSignButtonClicked()
{
	var textToSign = document.getElementById("textToSign").value;
	
	/* if there is text we sign it else we sign the file */
	if( textToSign != "" )
	{
		var hash = hashText( textToSign );
		display_message("success" , "hash (" + textToSign + ") : " + hash);
		sign_hash(hash , textToSign , web3.eth.accounts[0] , "text");
	}
	else
		signFile("fileToSign");
}

function signFile(fileId)
{
	var signSuccess = retrieveFile(fileId);
	
	if( signSuccess )
		check_hash_ready();
	else
		display_message("warning" ,"No file selected");
}

/* verify form */

var verifyButton = document.getElementById("verifyButton");
verifyButton.addEventListener("click" , onVerifyButtonClicked);

function onVerifyButtonClicked()
{
	var textToVerify = document.getElementById("textToVerify").value;
	var signature = document.getElementById("signatureText").value;
	var address = document.getElementById("address").value;
	
	if( signature == "" )
	{
		display_message("warning" , "No signature provided");
		return;
	}
	
	console.log(signature);
	if( textToVerify != "" )
	{	
		var hash = hashText( textToVerify );
		display_message("success" , "hash (" + textToVerify + ") : " + hash);
		if( address == "" )
		{
			recoverAddr(msgHash, signature).then(function(result)
			{
				display_message("info" , result[0] + " was signed by " + result[1]);
			});
		}
		else
			isSigned(web3.eth.accounts[0], signature , textToVerify).then(function(result) {
				if( result[2] )
					display_message("success" , result[1] + " was signed by " + result[0]);
				else
					display_message("error" , result[1] + " wasn't signed by " + result[0]);
			});
	}		
	else
		verifyFile("fileToVerify");
}

function verifyFile(fileId)
{
	var signSuccess = retrieveFile(fileId);
	
	/* if there is text we verify it else we verify the file */
	if( signSuccess )
		check_hash_ready();
	else
		display_message("warning" ,"No file selected");
}

/* as file retrieving is asychronus we check each second if it has ended */
function check_hash_ready()
{
	if( finalHash ==  "")
	{
		setTimeout(check_hash_ready , 500);
	}
	else
	{
		display_message("success" ,"hash (" + lastFileHashed + ") : " + finalHash);
		sign_hash(finalHash , lastFileHashed , web3.eth.accounts[0] , "file");
	}
}

/* function for console */

var eventConsole = $("#console");

function display_message(type , message)
{
	if( type == "success" )
	{
		eventConsole.append('<div class="eventConsole alert alert-success">' + message + "</div>");
	}
	else if( type == "info" )
	{
		eventConsole.append('<div class="eventConsole alert alert-info">' + message + "</div>");
	}
	else if( type == "error" )
	{
		eventConsole.append('<div class="eventConsole alert alert-danger">' + message + "</div>");
	}
	else if( type == "warning" )
	{
		eventConsole.append('<div class="eventConsole alert alert-warning">' + message + "</div>");
	}
	
	document.getElementById("console").scrollTop =  9999999;
}