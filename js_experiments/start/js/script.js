window.onload = function(e){

	function Student(n, a){
		this.name = n;
		// console.log(n);
		this.age = a;
		// console.log(a);
		var CONST = 80;

		this.sayHello = function(){
			alert('hello from ' + this.name);
			// console.log(sayHello());
		}

		this.getAge = function(){
			alert('Age ' + this.name + ' is' + this.age);
		}

		var self = this;
		self.calc = function(){
			return CONST - self.age;
			console.log(self.calc);
		}
	}

	var s = new Student('Alex', 25);
	// console.log(s.calc());
	var s1 = new Student('Masha', 18);
	// console.log(s1.calc());

	s.sayHello();
	// s1.sayHello();
	console.log(s.calc());
	// // s1.call();
	// s.getAge();
	// s1.getAge();



}