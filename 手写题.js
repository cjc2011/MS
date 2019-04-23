// this is a pen 转大写字母
// str.split(' ').map(function(item){
// 	return item.charAt(0).toUpperCase() + item.slice(1)
// }).join(' ')

// var a = {n : 1}
// var b = a 
// a.x = a = { n :2}
// console.log(a.x)
// console.log(b.x)
// console.log(b.x === a)
// 解析 连续赋值操作中 会先寻找a.x的值 a.x等于(a = {n:2}) => a.x = {n:2} 然后再进行a = {n:2}的操作 a被重写了 所以a.x = undefind 
