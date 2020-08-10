
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        let scaleTo1 = cc.scaleTo(0.1, 0.5, 0.5);
        let scaleTo2 = cc.scaleTo(0.1, 1, 1);
        this.node.runAction(cc.sequence(scaleTo1, scaleTo2).repeatForever())
        this.node.active = false;
    },
    createBulltCallBack() {
        console.log('创建子弹');
        window.gGameCtl.createBullte(2); // 创建子弹
    },
    BeginFire() { // 开始开火
        this.createBulltCallBack();
        this.schedule(this.createBulltCallBack, 0.2);
        this.node.active = true;
    },
    EndFire() { // 结束开火
        this.node.active = false;
        this.unschedule(this.createBulltCallBack);
    },
    // update (dt) {},
});
