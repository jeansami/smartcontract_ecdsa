var lastFileSignature = "";
var lastTextSignature = "";

/* signs the given hash with the given eth account */
function sign_hash(hash , msg , account , type)
{
	web3.eth.sign(account, hash, function (err, result) {
		if (err)
		{
			display_message("error" , err);
			return console.error(err);
		}
		
		display_message("success" , "ECDSA signature (" + msg + ") : " + result);
		
		if( type == "file" )
			lastFileSignature = result;
		else // text
			lastTextSignature = result;
	});
}