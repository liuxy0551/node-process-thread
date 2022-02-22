const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

// 用来测试是否被阻塞
router.get('/test', (ctx) => {
    ctx.body = {
        pid: process.pid,
        msg: 'Hello World'
    }
})
router.get('/fibo', (ctx) => {
    const { num = 38 } = ctx.query
    const start = Date.now()
    // 斐波那契数列
    const fibo = (n) => {
        return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1
    }
    fibo(num)

    ctx.body = {
        pid: process.pid,
        duration: Date.now() - start
    }
})

app.use(router.routes())
app.listen(9000, () => {
    console.log('Server is running on 9000')
})
