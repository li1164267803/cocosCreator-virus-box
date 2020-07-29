
cc.Class({
    extends: cc.Component,

    properties: {},

    // onLoad () {},
    play() {
        let scaleTo = cc.sequence(cc.delayTime(1), cc.scaleTo(0.3, 1.2, 1.2));
        this.node.runAction(scaleTo)
    },
    moveOut() { // 移出关卡
        let scaleTo = cc.scaleTo(0.3, 1, 1);
        this.node.runAction(scaleTo)
    },
    moveIn() { // 移出关卡
        let scaleTo = cc.scaleTo(0.3, 1.2, 1.2);
        this.node.runAction(scaleTo)
    },
    start() { },

    // update (dt) {},
});
