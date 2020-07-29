
cc.Class({
    extends: cc.Component,
    // 用来播放飞机的自动脚本代码
    properties: {
        m_light: [cc.Node], // 机头圆圈
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
    },

    onLoad() {
        this.m_light.forEach((v, i) => {
            let seq = cc.sequence(
                cc.delayTime(i * 0.2),
                cc.scaleTo(0.4, 1, 1),
                cc.callFunc(() => v.setScale(cc.v2(0, 0))),
                cc.delayTime(0.5),
            )
            v.runAction(seq.repeatForever())
        });

    },
    play() {
        this.node.setPosition(cc.v2(0, -966));
        this.node.setScale(cc.v2(0.8, 0.8));
        let seq = cc.sequence(cc.delayTime(0.5), cc.moveTo(0.4, cc.v2(0, -415)), cc.scaleTo(0.4, 1, 1));
        this.node.runAction(seq);
    },
    moveOut() { // 移出
        // let moveTo = cc.moveTo(0.3, cc.v2(0, -966));
        // this.node.runAction(moveTo.easing(cc.easeBackOut()));
    },
    moveIn() { // 移入
        let moveTo = cc.moveTo(0.3, cc.v2(0, -415));
        this.node.runAction(moveTo.easing(cc.easeBackOut()));
    },
    start() {

    },

    // update (dt) {},
});
