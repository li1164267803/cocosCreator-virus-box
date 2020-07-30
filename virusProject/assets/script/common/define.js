window.gameCtl = null; // 创建全局的金币动画
window.gData = {}; // 全局的本地数据
window.gDataCtl = null; // 设置数据的方法
function random(min, max) { // 随机数
    return Math.floor(Math.random() * (max - min)) + min
}

function distance(p1, p2) { // 两点之间的距离
    var dx = Math.abs(p2.x - p1.x);
    var dy = Math.abs(p2.y - p1.y);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}