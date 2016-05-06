'use strict';
exports.mShape = function(n, shape, scale){ // n should be int, shape should be Array, scale is optional
	if (typeof n === 'string') n = parseInt(n)
	if (typeof n === 'undefined') throw new Error('value not provided')
	if (typeof shape === 'undefined') throw new Error('Shape not defined')
		
	var scale = scale || 100
	
	var fin = 0,
		lmid = Math.floor((shape.length-1)/2),
		hmid = Math.ceil((shape.length-1)/2),
		min = Math.min.apply(null, shape),
		max = Math.max.apply(null, shape),
		side = false
	
	if (n <= min || n >= max){
		// too small or large
		return 0
	} else if (n >= shape[lmid] && n <= shape[hmid]){
		// center
		return scale
	} else if (n < shape[lmid]){
		shape = shape.splice(0,lmid+1)
	} else if (n > shape[hmid]){
		side = true // right side
		shape = shape.splice(hmid,shape.length-hmid)
	}
	
	var step = scale / (shape.length - 1) ,
		lb = 0,
		hb = 0,
		p = 0

	shape.every(function(point, pos){
		if (n <= point){
			hb = point // highbound	
			return false
		}
		p = pos // position in [shape]
		lb = point // lowbound
		return true
	})
	
	var val = step * ((n - lb)/(hb - lb) + p)
	if (side) var val = step * (-(n - lb) / (hb - lb) + (shape.length-p-1))
		
	return val
}