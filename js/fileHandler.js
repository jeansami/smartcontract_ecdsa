/* 

https://www.html5rocks.com/en/tutorials/file/dndfiles/ 
https://stackoverflow.com/questions/7015544/calculating-a-hash-code-for-a-large-file-in-parallel 

*/

var blockSize = 1024;
var finalHash = "";

function retrieveFile(fileId)
{
	var files = document.getElementById(fileId).files;
	var cursorPos = 0;
	var hashes = new Array();
	finalHash = "";
	
    if (!files.length) {
      console.log("no file selected");
      return false;
    }

    var file = files[0];
    var start = 0;
    var stop = min( start + blockSize - 1 , file.size - 1 );

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
     
		hashes.push( signText( evt.target.result ) );
		
		if( stop != file.size - 1 )
		{
			start = stop + 1;
			stop = min( start + blockSize - 1 , file.size - 1 );
			blob = file.slice(start, stop);
			reader.readAsBinaryString(blob);
		}
		else
		{
			var concatedHash = "";
			for(var i = 0 ; i < hashes.length ; i++)
				concatedHash += hashes[i];
			
			finalHash = signText(concatedHash);
		}
      }
    };
	
	var blob = file.slice(start, stop);
	reader.readAsBinaryString(blob);
	
	return true;
}

function signText(text)
{
	return web3.sha3(text);
}

function min(a,b)
{
	if(a < b)
		return a;
	return b;
}