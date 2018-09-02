window.onload = function(e){

	var num;
	var span = document.querySelector('.display');
	var but = document.getElementsByTagName('button');
	var numeral =[];
	console.log(numeral);

	for (var i = 0; i < but.length; i++) {
		but[i].onclick = function() {
			if(this.classList.contains('numeral')){
				var symbol = this.getAttribute('data-sym');
				addNumber(symbol);	
			} else if(this.classList.contains('op')){
				var num = parseFloat(span.childNodes[2].nodeValue);
				numeral.push(num);
				// document.querySelector('.display').innerHTML = "";
				num = 0;

			}
		} 
	}
	

	function addNumber(symbol){
		return str = span.innerHTML += symbol;
		// var num = parseFloat(span.childNodes[2].nodeValue);
		// console.log(num);
		// console.log(typeof(num));
		
		// document.querySelector('.display').innerHTML = "";

	}

	// function clear(element){
 //    	document.getElementByTagName('span').innerHTML = "";
	// }

}