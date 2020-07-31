
cc.Class({
    extends: cc.Component,

    properties: {
        m_BG: cc.Node, // 鼠标抬起背景
    },

    ctor() {
        this.m_isCanTouchMove = false; // 是否在移动
        this.m_isPlaying = false; // 是否在玩游戏
    },
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd, this);
    },
    TouchStart() {
        this.m_BG.runAction(cc.fadeOut(0.5));
        console.log('TouchStart');
        if (this.m_isPlaying) return;
        this.m_isPlaying = true;
        window.gameCtl.Action(ACTION_MOVE_OUT); // 开始移动
        let seq = cc.sequence( // 0.5 秒后才能点击，先完成首页的动画过度
            cc.delayTime(0.5),
            cc.callFunc(() => {
                this.m_isCanTouchMove = true;
            })
        );
        this.node.runAction(seq);
    },
    TouchMove(evevt) {
        if (!this.m_isCanTouchMove) return
        let pos = evevt.getDelta(); // 获取按下时的鼠标移动位置
        window.gameCtl.moveAirPlane(pos); // 移动飞机的位置
        console.log('TouchMove');
    },
    TouchEnd() {
        this.m_BG.runAction(cc.fadeIn(0.5))
        console.log('TouchEnd');
    },
    start() {

    },

    // update (dt) {},
});
