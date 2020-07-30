
cc.Class({
    extends: cc.Component,

    properties: {
        circl: cc.Node, // 圆圈
        virus: cc.Node, // 病毒
        tail: cc.Node, // 拖尾
    },

    init(x, y, width) {
        this.v2 = cc.v2(x, y);
        this.width = width;
    },
    onLoad() { },
    Begin() {
        this.tail.runAction(cc.fadeOut(0.7));
        let _out = cc.fadeOut(0.2);
        let _in = cc.fadeIn(0.4);
        let delayTime = cc.delayTime(0.5);
        // let seq = cc.sequence(_out, delayTime, _in);
        let seq = cc.sequence(_out, _in);
        this.circl.runAction(seq.repeatForever())
        this.virusAction()
    },
    virusAction() {
        let x = random(0, this.width); // 获取随机的位置
        let y = random(0, this.width);
        let v2 = cc.v2(this.v2.x + x, this.v2.y + y);
        // 回调，无限循环
        let seq = cc.sequence(cc.moveTo(0.5, v2), cc.callFunc(() => {
            this.virusAction()
        }))
        this.node.runAction(seq)
    },
    reset() {
        this.circl.opacity = 255;
        this.tail.opacity = 255;
        this.circl.stopAllActions();
        this.virus.stopAllActions();
        this.tail.stopAllActions();
    },
    start() {

    },

    // update (dt) {},
});
