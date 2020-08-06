// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_Gold: cc.Label, // 金币
        m_tipVirus: cc.Label, // 病毒剩余
        m_HpProgress: cc.ProgressBar, // 病毒HP
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    reset() {
        console.log('reset');

        this.m_Gold.string = 0;
        this.m_tipVirus.string = '100%';
        this.m_HpProgress.progress = 1;
    },
    moveOut() { // 显示进度条
        console.log('显示进度条');

        let seq = cc.sequence(
            cc.delayTime(0.5),
            cc.fadeIn(0.5)
        );
        this.node.runAction(seq);
    },
    moveIn() { // 隐藏进度条
        console.log('隐藏进度条');

        this.node.runAction(cc.fadeOut(0.5));
    },

    // update (dt) {},
});
