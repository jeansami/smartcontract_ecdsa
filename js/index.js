var EC = elliptic.ec;
var ec = new EC('secp256k1');
var key;
var web3js;

window.addEventListener('load', function() {
	//generate_new_ecdsa_keys();
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
});

/* Sign form */

var signButton = document.getElementById("signButton");
signButton.addEventListener("click" , onSignButtonClicked);

function onSignButtonClicked()
{
	var textToSign = document.getElementById("textToSign").value;
	
	if( textToSign != "" )
		display_message("success" , "Text hash: " + signText( textToSign ));
	
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
	
	if( textToVerify != "" )
		display_message("success" , "Text hash: " + signText( textToVerify ));
	
	verifyFile("fileToVerify");
}

function verifyFile(fileId)
{
	var signSuccess = retrieveFile(fileId);
	
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
		display_message("success" ,"file hash: " + finalHash);
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
}

/* ecdsa signature (not using Ethereum) */

/*document.getElementById("generateKeys").addEventListener("click" , generate_new_ecdsa_keys); 

function generate_new_ecdsa_keys()
{
	console.log("genrating...");
	key = ec.genKeyPair();
}

function signECDSA(msgHash)
{
	var signature = key.sign(msgHash);
	console.log(signature);
	// Export DER encoded signature in Array
	var derSign = signature.toDER();
	console.log(derSign);
}

function verify_ecdsa_signature(pubPoint , msgHash , signature)
{
	var x = pubPoint.getX();
	var y = pubPoint.getY();

	var pub = pubPoint.encode('hex');

	var key = ec.keyFromPublic(pub, 'hex');

	console.log( key.verify(msgHash, signature) );
}*/