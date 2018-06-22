
function recoverAddr(msgHash, signature , textToVerify) 
{
	var r = sig.substr(0,66);
	var s = "0x" + sig.substr(66,64);
	var v = 28;
	
	var array = [textToVerify];
    aray.push( contract.methods.ecrecover(msgHash, v, r, s).call() );
	return array;
}

function isSigned(addr, signature , textToVerify ) 
{
	var r = sig.substr(0,66);
	var s = "0x" + sig.substr(66,64);
	var v = 28;
	
	var array = [addr , textToVerify];
    array.push( contract.methods.isSigned( addr , msgHash, v , r , s ) );
	return array;
}