cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
    },

    // onLoad () {},
    moveOut() { // 移出关卡
        let moveTo = cc.moveTo(0.3, cc.v2(0, -880));
        this.node.runAction(moveTo.easing(cc.easeBackOut()))
    },
    moveIn() { // 移出关卡
        let moveTo = cc.moveTo(0.3, cc.v2(0, -734));
        this.node.runAction(moveTo.easing(cc.easeBackOut()))
    },
    start() {

    },

    // update (dt) {},
});
