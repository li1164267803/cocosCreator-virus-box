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
    reset() {
        console.log('重置');
        this.node.opacity = 255;

    },
    play() {
        console.log('play');

        let seq = cc.sequence(
            cc.rotateTo(0.3, -15),
            cc.rotateTo(0.3, 15),
            cc.rotateTo(0.3, -15),
            cc.rotateTo(0.3, 15),
            cc.rotateTo(0.3, 0),
            cc.delayTime(2)
        )
        this.node.runAction(seq.repeatForever())
    },
    moveOut() { // 移出关卡
        this.node.runAction(cc.fadeOut(0.3).easing(cc.easeBackOut()))
    },
    moveIn() { // 移出关卡
        this.node.runAction(cc.fadeIn(0.3).easing(cc.easeBackOut()))
    },

    // update (dt) {},
});
