

const ACTION_RESET = 0; // 重置
const ACTION_PLAY = 1; // 开始
const ACTION_MOVE_OUT = 2; // 离开
const ACTION_MOVE_IN = 3; // 进入

window.COLLISION_WALL = 0; // 碰撞墙
window.COLLISION_BULLET = 1; // 碰撞子弹
window.COLLISION_VIRUS = 2; // 碰撞病毒

window.gGameCtl = null; // 创建全局的金币动画
window.gAirPlane = null; // 全局的自动飞机

function random(min, max) { // 随机数
    return Math.floor(Math.random() * (max - min)) + min
}

function distance(p1, p2) { // 两点之间的距离
    var dx = Math.abs(p2.x - p1.x);
    var dy = Math.abs(p2.y - p1.y);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function goldCrarryBit(gold) { // 货币进位
    let arr = [
        [100000000, 'N'],
        [10000000, 'T'],
        [1000000, 'G'],
        [100000, 'M'],
        [10000, 'K'],
        [1000, 'B'],
    ];
    for (const v of arr) {
        let value = gold / v[0]
        if (value > 1) return value.toFixed(1) + v[1]
    }
    return gold
}

function setVirusColor(node, color) { // 设置病毒颜色
    if (node.children.length >= 1) {
        node.children.forEach(nodeChildren => {
            let js = nodeChildren.getComponent('color');
            if (js) nodeChildren.color = color;
            setVirusColor(nodeChildren, color)
        });
    }
}

// 隐藏自定义cocos的进场景遮罩
window.loadingBg = document.getElementById("loading-bg");
cc.macro.ENABLE_TRANSPARENT_CANVAS = true; // 开启背景透明
// 开启背景透明的时候打包后要在css去掉body的默认灰色背景并且设置Camera的background四个都为0
cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
  if (window.loadingBg) window.loadingBg.style.display = "none";
});