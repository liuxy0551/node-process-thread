const start = Date.now()

// 斐波那契数组
const fibo = (n) => {
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1
}
fibo(38)

console.log(`duration: ${ Date.now() - start }`)
