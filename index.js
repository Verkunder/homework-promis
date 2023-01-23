// const fs = require('fs')

// fs.promises
// 	.readFile('./example.txt', 'utf-8')
// 	.then(data => console.log(data))
// 	.catch(err => console.error('ошибка', err))

// const fileRead = (filePath, meta) => {
// 	return new Promise((resolve, reject) => {
// 		fs.readFile(filePath, meta, (err, data) => {
// 			if (err) reject(err)
// 			else resolve(data)
// 		})
// 	})
// }

// fileRead('./example.txt', 'utf-8')
// 	.then(data => console.log(data))
// 	.catch(err => console.error('123'))

// const readFile = file => {
// 	return new Promise((resolve, reject) => {
// 		const fr = new FileReader()
// 		fr.onload = () => {
// 			resolve(fr.result)
// 		}
// 		fr.onerror = reject
// 		fr.readAsText(file.blob)
// 	})
// }

// readFile('./example.txt')
// 	.then(data => console.log('data'))
// 	.catch(err => console.error('error readFile'))

// Promise.resolve()
// 	.then(() => console.log(1)) // 1
// 	.catch(() => console.log(0))
// 	.then(() => {
// 		console.log(2) // 4
// 		throw new Error()
// 	})
// 	.catch(() => console.log(3)) // 6
// 	.then(() => console.log(4)) // 8

// Promise.resolve()
// 	.then(() => console.log(11)) // 2
// 	.then(() => {
// 		console.log(12) // 3
// 		throw new Error()
// 	})
// 	.catch(() => console.log(13)) // 5
// 	.then(() => console.log(14)) // 7

// const getMessage = () => Promise.resolve('my message')

// async function myFunc() {
// 	console.log('in func') // 2
// 	const res = await getMessage()
// 	console.log(res) // 5
// }

// console.log('before') // 1
// myFunc()
// console.log('after') // 3

// const getUserGitHub = async user => {
// 	try {
// 		const getGitHubUsers = await fetch(`https://api.github.com/users/${user}`)
// 		const gitUser = await getGitHubUsers.json()
// 		const elseGitUser = new Promise((resolve, reject) => {
// 			let img = document.createElement('img')
// 			img.src = gitUser.avatar_url
// 			img.className = 'promise-avatar-example'
// 			document.body.append(img)
// 			setTimeout(() => {
// 				img.remove()
// 				resolve(console.log(gitUser))
// 			}, 3000)
// 		})
// 	} catch (err) {
// 		console.error(err)
// 	}
// }

// getUserGitHub('Verkunder')

// const saveFiles = async (order, files) => {
// 	try {
// 		const changedOrder = await OrdersService.setStatusFinished(order)
// 		changedOrder.resultFiles = files
// 		const orderDto = new OrderDto(changedOrder)
// 		const client = await clientService.findByToken(order.client)
// 		const that = await changePermissions(orderDto, client)
// 		const payload = {
// 			orderId: orderDto.id,
// 			result: orderDto.filesResult,
// 			permissions: client.permissions,
// 		}
// 		eventsService.orderSuccess(client.token, payload)
// 		return changedOrder
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

// const array = [1, 2, 3, 4, 5, 6]

// const oneExample = async () => {
// 	const result = await Promise.all(
// 		array.map(async item => {
// 			const num = await item
// 			return num + 1
// 		})
// 	)
// 	console.log(result)
// }

// oneExample()

// const array = [1, 2, 3]

// const twoExample = async () => {
// 	const result = await array.reduce(async (acc, item) => {
// 		const num = await acc
// 		return num + item
// 	}, Promise.resolve(0))
// 	console.log(result)
// }

// twoExample()

// const array = [2, 4, 6, 7, 9, 10]

// const isEven = n => {
// 	return new Promise(resolve => {
// 		return setTimeout(() => {
// 			resolve(n % 2 === 0)
// 		}, 0)
// 	})
// }

// function asyncFilter(nums) {
// 	return Promise.all(nums.map(isEven)).then(res =>
// 		nums.filter((item, index) => res[index])
// 	)
// }
// asyncFilter(array).then(console.log)

const urls = ['url1', 'url2', 'url3']

function fakeFetch(url, params = '-') {
	console.log(`fakeFetch to: ${url} with params: ${params}`)
	return new Promise(resolve => {
		setTimeout(() => resolve(`${url} is DONE`), 1000)
	})
}

const reduceWay = callback =>
	urls
		.reduce(
			(acc, item) => acc.then(res => fakeFetch(item, res)),
			Promise.resolve()
		)
		.then(result => callback(result))

reduceWay(result => console.log(`result: ${result}`))
