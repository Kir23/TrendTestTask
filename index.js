function stringify(array, clb) {
	process.nextTick(() => {
		let result = ''

		try {
			if (!array.length)
				return clb(null, result)

			let last = start = array.shift()

			for (const value of array) {
				if (value - last > 1) {
					result += formatPair(start, last, ',')
					start = value
				}

				last = value
			}

			result += formatPair(start, last, '')

		} catch (err) {
			return clb(err)
		}

		return clb(null, result)
	})
}

function formatPair(start, end, separator) {
	const diff = end - start

	switch (diff) {
		case 0:
			return start + separator
		case 1:
			return `${start},${end}${separator}`
		default:
			return `${start}-${end}${separator}`
	}
}

module.exports = stringify