cc.Class({
    extends: cc.Component,

    properties: {
        m_labGold: cc.Label, // 显示一圈得金币
        m_progress: cc.ProgressBar, // 进度条
    },

    // onLoad () {},
    moveOut() { // 移出关卡
        let moveTo = cc.moveTo(0.3, cc.v2(540, 0));
        this.node.runAction(moveTo.easing(cc.easeBackOut()))
    },
    moveIn() { // 移出关卡
        let moveTo = cc.moveTo(0.3, cc.v2(367, 0));
        this.node.runAction(moveTo.easing(cc.easeBackOut()))
    },
    onClickGet() { // 点击金币
        // if (gDataCtl.getTaskGold() <= 0) return;
        window.gameCtl.createGoldAnim(
            this.node.getPosition(),
            cc.v2(-375, 710),
            200,
            15,
            gDataCtl.getTaskGold(),
            (gold) => {
                window.gDataCtl.AddGold(gold); // top添加金币
                window.gameCtl.m_Top.updateData(); // 更新页面
            }
        );
        window.gDataCtl.clearTaskGold(); // 清空计时的金币
        this.updateData();
    },

    start() { },
    updateData() {
        this.m_labGold.string = goldCrarryBit(window.gDataCtl.getTaskGold());
    },
    update(dt) { // 自动增加金币
        let time = window.gDataCtl.getColdAddTime(); // 获取一圈金币得时间
        let dis = 1 / time;
        dis *= dt;
        this.m_progress.progress += dis;
        if (this.m_progress.progress >= 1) {
            this.m_progress.progress = 0;
            let gold = window.gDataCtl.getAwardGold(); // 获取奖励金币
            window.gDataCtl.addTaskGold(gold); // 设置金币
            window.gDataCtl.save(); // 保存
            this.updateData(); // 更新金币数据
        }
    },
});
