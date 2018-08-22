window.onload = function(e){

	var buttons  = document.querySelectorAll('input[type=button]');

	var inp1     = document.querySelector('input[name=num1]');
	var inp2     = document.querySelector('input[name=num2]');

	var span     = document.querySelector('.res');

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function() {
			var op = this.getAttribute('data-op');
			calculate(op);
		}
	}

	function calculate(op) {
		var a = parseInt(inp1.value);
		var b = parseInt(inp2.value);
		var res;

		if(op === '+') {
			res = a + b;
		}
		else if(op === '-') {
			res = a - b;
		}
		else if(op === '*') {
			res = a * b;
		}
		else if(op === '/') {
			res = a / b;
		}
		else {
			res = 'что-то пошло не так :)'
		}
		
		span.innerHTML = res;
	}
}