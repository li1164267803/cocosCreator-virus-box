
cc.Class({
    extends: cc.Component,

    properties: {
        Anim: [cc.Node],
    },

    callFun0() { // 进度条的放大
        // 将节点大小缩放到指定的倍数。
        let scale = cc.scaleTo(1, 1);
        let callF = cc.callFunc(this.callFun1.bind(this));
        let seq = cc.sequence(scale, callF); // 顺序执行
        this.Anim[1].runAction(seq);

        let _out = cc.fadeOut(0.2);
        let _in = cc.fadeIn(0.4);
        let _seq = cc.sequence(_out, _in);
        this.Anim[0].runAction(_seq.repeatForever());
    },
    callFun1() { // 移动和放大病毒
        console.log('移动和放大病毒');
        let moveTo1 = cc.moveTo(0.3, cc.v2(431, 192));
        let moveTo2 = cc.moveTo(0.3, cc.v2(455, -27));
        let scale1 = cc.scaleTo(0.3, 1, 1);
        let scale2 = cc.scaleTo(0.3, 1, 1);
        let spawn1 = cc.spawn(moveTo1, scale1); // 同时进行   同步
        let spawn2 = cc.spawn(moveTo2, scale2);

        let seq = cc.sequence(spawn2, cc.callFunc(this.callFun2.bind(this))); // 顺序执行
        this.Anim[2].runAction(spawn1)
        this.Anim[3].runAction(seq);
        // 进度条闪烁
        let _out = cc.fadeOut(0.4);
        let _in = cc.fadeIn(0.4);
        let _seq = cc.sequence(_out, _in);
        this.Anim[1].runAction(_seq.repeatForever());
    },
    callFun2() { // 隐藏拖尾
        console.log('隐藏拖尾');
        let js = this.Anim[2].getComponent('LogoVirus'); // 获取当前病毒的js脚本
        js.init(374, 135, 100)
        js.Begin();
        js = this.Anim[3].getComponent('LogoVirus');
        js.init(410, -62, 80)
        js.Begin();
    },
    onLoad() { },
    moveOut() { // 移出logo
        this.reset();
        this.node.setPosition(cc.v2(-30, 452));
        // 缓动展示的图，个别字段和creato的名字不一样 https://blog.csdn.net/wzh051527/article/details/38438521 
        this.node.runAction(cc.moveTo(0.3, -30, 942).easing(cc.easeBackIn()))
    },
    moveIn() { // 移出logo
        this.reset();
        this.node.setPosition(cc.v2(-30, 942));
        this.node.runAction(cc.moveTo(0.3, -30, 452).easing(cc.easeBackOut()))
    },
    reset() { // 重置元素的位置
        this.Anim[0].opacity = 255;
        this.Anim[1].opacity = 255;
        this.Anim[1].setScale(cc.v2(0, 1));
        this.Anim[2].setPosition(cc.v2(284, 54))
        this.Anim[2].setScale(cc.v2(0.2, 0.2))
        this.Anim[3].setPosition(cc.v2(292, 32))
        this.Anim[3].setScale(cc.v2(0.2, 0.2))
        this.Anim.forEach(v => {
            v.stopAllActions();
        });

        let js = this.Anim[2].getComponent('LogoVirus'); // 获取当前病毒的js脚本
        js.reset();
        js = this.Anim[3].getComponent('LogoVirus'); // 获取当前病毒的js脚本
        js.reset();
    },
    play() {
        let _out = cc.fadeOut(0.2)
        let _in = cc.fadeIn(0.2)
        // let seq = cc.sequence(_out, _in, cc.callFunc(this.callFun.bind(this))).repeat(5)
        let seq = cc.sequence(_out, _in)
        let allSeq = cc.sequence(seq, seq, cc.callFunc(this.callFun0.bind(this)))
        this.Anim[0].runAction(allSeq)
    },
    start() { },

    // update (dt) {},
});
