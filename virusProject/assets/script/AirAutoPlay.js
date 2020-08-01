
cc.Class({
    extends: cc.Component,
    // 用来播放飞机的自动脚本代码
    properties: {
        m_light: [cc.Node], // 机头圆圈
        m_TailLight: cc.Node, // 飞机尾焰
        m_Gun: cc.Node, // 飞机枪
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
        this.m_Gun = this.m_Gun.getComponent('Gun'); // 获取js
    },
    play() {
        this.node.setPosition(cc.v2(0, -966));
        this.node.setScale(cc.v2(0.8, 0.8));
        this.m_TailLight.setScale(cc.v2(1, 1))
        let seq = cc.sequence(cc.delayTime(0.5), cc.moveTo(0.4, cc.v2(0, -415)), cc.scaleTo(0.4, 1, 1));
        this.node.runAction(seq);

        let seqTailLight = cc.sequence(
            cc.delayTime(1),
            cc.scaleTo(0.5, 0.6, 0.6)
        );
        this.m_TailLight.runAction(seqTailLight);
    },
    moveOut() { // 移出
        let scaleTo = cc.scaleTo(0.3, 0.6, 0.6);
        this.node.runAction(scaleTo.easing(cc.easeBackOut()));
        this.m_TailLight.runAction(cc.scaleTo(0.5, 1, 1));
    },
    moveIn() { // 移入
        let scaleTo = cc.scaleTo(0.3, 1, 1);
        this.node.runAction(scaleTo.easing(cc.easeBackOut()));
        this.m_TailLight.runAction(cc.scaleTo(0.5, 0.6, 0.6));
    },
    BeginFire: function () { // 开火
        this.m_Gun.BeginFire();
    },
    EndFire: function () { // 结束开火
        this.m_Gun.EndFire();
    }

    // update (dt) {},
});
