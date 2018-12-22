
	function forEach(list, callback) {
		for (var n = 0; n < list.length; n++) {
			callback.call(list[n], n);
		}
	};


	var weapons = ['shuriken', 'katana', 'nunchuks'];

	var x = 5;


	if (x == 5){
		forEach (
			weapons,
			function(index) {
				if(this == weapons[index]) {
					console.log('Got the expected velue of ' + weapons[index]);
				}
			}                  
		);	
	}