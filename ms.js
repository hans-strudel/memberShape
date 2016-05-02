
exports.fuzz = function(n, shape){ // n should be int, shape should be Array
	var fin = 0,
	len = shape.length
	lmid = Math.floor((shape.length-1)/2)
	hmid = Math.ceil((shape.length-1)/2)
	min = Math.min.apply(null, shape)
	max = Math.max.apply(null, shape)
	
	if (n <= min || n >= max){
		// too small or large
		return 0
	} else if (n >= shape[lmid] && n <= shape[hmid]){
		// center
		return 100
	} else if (n < shape[lmid]){
		side = false // left side
		shape = shape.splice(0,lmid+1)
	} else if (n > shape[hmid]){
		side = true // right side
		shape = shape.splice(hmid,len-hmid)
	}
	
	vals = []
	//console.log(n,lmid,hmid,shape)
	
	lm = -1 // leftmost
	shape.forEach(function(point,index,array){
		val = (side)?100:0
		val += ((side)?-1:1) * ((index)/(array.length-1) * 100)
		vals.push(val)
		//console.log(vals)
		if (n >= point){
			lm = index
		}
		if (n < point && lm >= 0){
			rm = index
			fin = (vals[lm] + vals[rm])/(shape[rm]-n+1)
			//console.log(lm,rm,shape,vals)
			lm = -1
		}
	})
	//console.log(vals)
	return fin
}
for (x = 0; x < 15; x++){
	console.log(x + ' :',exports.fuzz(x, [0,3,7,9,10]))
}