const axios = require('axios')

const start = Date.now()
const fn = (url) => {
    axios.get(`http://127.0.0.1:9000/${ url }`).then((res) => {
        console.log(res.data, `耗时: ${ Date.now() - start }ms`)
    })
}

fn('test')
fn('fibo?num=43')
fn('test')
