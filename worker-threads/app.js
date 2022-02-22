const Koa = require('koa')
const router = require('koa-router')()
const { Worker } = require('worker_threads')
const app = new Koa()

// 用来测试是否被阻塞
router.get('/test', (ctx) => {
    ctx.body = {
        pid: process.pid,
        msg: 'Hello World'
    }
})
router.get('/fibo', async (ctx) => {
    const { num = 38 } = ctx.query
    ctx.body = await asyncFibo(num)
})

const asyncFibo = (num) => {
    return new Promise((resolve, reject) => {
        // 创建 worker 线程并传递数据
        const worker = new Worker('./fibo.js', { workerData: { num } })
        // 主线程监听子线程发送的消息
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
        })
    })
}

app.use(router.routes())
app.listen(9000, () => {
    console.log('Server is running on 9000')
})
