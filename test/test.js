var stringify = require('../index')
var assert = require('assert')
var Promise = require('bluebird')
var stringifyAsync = Promise.promisify(stringify)

describe('stringify tests', function () {
	it('should return correct string when array has different numbers', function (done) {

		Promise.all([
			stringifyAsync([1,2,3,4,5,6,7,8]),
			stringifyAsync([1, 3, 4, 5, 6, 7, 8]),
			stringifyAsync([1, 3, 4, 5, 6, 7, 8, 10, 11, 12]),
			stringifyAsync([1, 2, 3]),
			stringifyAsync([1, 2]),
			stringifyAsync([1, 2, 4]),
			stringifyAsync([1, 2, 4, 5, 6]),
			stringifyAsync([1, 2, 3, 7, 8, 9, 15, 17, 19, 20, 21]),
			stringifyAsync([1, 2, 3, 4, 5, 6, 100, 1091, 1999, 2000, 2001, 2002]),
			stringifyAsync([1]),
			stringifyAsync([1, 3, 5, 7, 9, 11])
		])
		.then(function (result) {
		   assert.equal(result[0], '1-8')
		   assert.equal(result[1], '1,3-8')
		   assert.equal(result[2], '1,3-8,10-12')
		   assert.equal(result[3], '1-3')
		   assert.equal(result[4], '1,2')
		   assert.equal(result[5], '1,2,4')
		   assert.equal(result[6], '1,2,4-6')
		   assert.equal(result[7], '1-3,7-9,15,17,19-21')
		   assert.equal(result[8], '1-6,100,1091,1999-2002')
		   assert.equal(result[9], '1')
		   assert.equal(result[10], '1,3,5,7,9,11')
		   done()
		})
		.catch(function (err) {
		   done(err)
		})
	})
})