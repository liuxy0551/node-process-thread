const axios = require('axios')

const url = `http://127.0.0.1:9000/fibo?num=38`
const start = Date.now()

for (let i = 0; i < 10; i++) {
    axios.get(url).then((res) => {
        console.log(res.data, `耗时: ${ Date.now() - start }ms`)
    })
}
