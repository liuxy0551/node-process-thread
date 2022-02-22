const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length
// const numCPUs = 10 // worker 进程的数量一般和 CPU 核心数相同
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

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    
    // 衍生 worker 进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    app.listen(9000)
    console.log(`Worker ${process.pid} started`)
}
