
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
        window.gAirPlane.BeginFire(); // 显示飞机枪
        this.scheduleOnce(() => { // 0.5 秒后才能点击，先完成首页的动画过度
            this.m_isCanTouchMove = true;
        }, 0.5)
        window.gVirusMake.sleepVirus(false, 10)
        if (this.m_isPlaying) return;
        this.m_isPlaying = true;
        window.gGameCtl.Action(ACTION_MOVE_OUT); // 开始移动

    },
    TouchMove(evevt) {
        if (!this.m_isCanTouchMove) return
        let pos = evevt.getDelta(); // 获取按下时的鼠标移动位置
        window.gGameCtl.moveAirPlane(pos); // 移动飞机的位置
        console.log('TouchMove');
    },
    TouchEnd() {
        window.gAirPlane.EndFire();
        this.m_BG.runAction(cc.fadeIn(0.5))
        window.gVirusMake.sleepVirus(true, 10)
        console.log('TouchEnd');
    },
    // update (dt) {},
});
