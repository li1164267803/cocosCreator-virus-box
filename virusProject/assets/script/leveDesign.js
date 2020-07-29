
cc.Class({
    extends: cc.Component,

    properties: {
        item: [cc.Node],
    },

    ctor() { // ctor构造函数执行是在onLoad之前，先执行子集的ctor，最后在执行父级的ctor
        // 子ctor>父ctor>父onLoad>子onLoad>父start>子start
        console.log('子的ctor');
        this.curLevel = 5; // 当前的关卡
        this.basePos = []; // 记录关卡的位置
    },
    onLoad() {
        console.log('子的onLoad');
        this.item.forEach((v, i) => this.basePos[i] = v.getPosition()); // 记录初始的位置
    },
    reset() { // 重置位置和状态
        let starLevel = this.curLevel - 2;
        this.item.forEach((v, index) => {
            if (this.basePos[index] != null) this.item[index].setPosition(this.basePos[index]); //重置位置关卡信息
            this.item[index].setScale(0.6, 0.6);
            this.item[index].opacity = 255;
            let js = v.getComponent('levelItem');
            js.setNumber(starLevel + index); // 设置是第几关
            js.setIndex(index)
        });
        this.item[2].setScale(cc.v2(1, 1));
        this.item[0].opacity = 0;
        this.item[4].opacity = 0;
    },
    moveOut() { // 移出关卡
        let moveTo = cc.moveTo(0.3, cc.v2(0, 665));
        let scaleTo = cc.scaleTo(0.3, 0.4, 0.4);
        let spa = cc.spawn(moveTo, scaleTo);
        this.node.runAction(spa.easing(cc.easeBackOut()))
    },
    moveIn() { // 移出关卡
        let moveTo = cc.moveTo(0.3, cc.v2(0, 168));
        let scaleTo = cc.scaleTo(0.3, 1, 1);
        let spa = cc.spawn(moveTo, scaleTo);
        this.node.runAction(spa.easing(cc.easeBackOut()))
    },
    play() { // 播放
        this.item.forEach((v, i) => {
            let moveTo = cc.moveTo(0.5, cc.v2(this.basePos[i - 1])); // 获取需要移动的位置
            if (i == 1) {
                let out = cc.fadeOut(0.5);
                let spawn = cc.spawn(out, moveTo);
                v.runAction(spawn);
            } else if (i == 2) {
                let scale = cc.scaleTo(0.5, 0.6);
                let spawn = cc.spawn(scale, moveTo);
                v.runAction(spawn);
            } else if (i == 3) {
                let scale = cc.scaleTo(0.5, 1);
                let spawn = cc.spawn(scale, moveTo);
                v.runAction(spawn);
            } else if (i == 4) {
                let _in = cc.fadeIn(0.5);
                let spawn = cc.spawn(_in, moveTo);
                v.runAction(spawn);
            }
        });
        // 延迟重置关卡位置
        let dly = cc.delayTime(0.5);
        let seq = cc.sequence(dly, cc.callFunc(() => {
            this.curLevel++;
            this.reset()
        }))
        this.node.runAction(seq);
    },
    start() {
        console.log('子的start');
    },

    // update (dt) {},
});
