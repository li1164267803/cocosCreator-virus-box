
cc.Class({
    extends: cc.Component,

    properties: {
        logo: cc.Node, // logo
        levelDesign: cc.Node, // 关卡
        m_Top: cc.Node, // 顶部
        m_setting: cc.Node, // 设置
        m_clackGet: cc.Node, // 金币
        m_bottom: cc.Node, // 底部
        m_tip: cc.Node, // 中心文字提示
        m_Bg: cc.Node, // 背景图
        m_airPlane: cc.Node, // 飞机
    },

    // LIFE-CYCLE CALLBACKS:
    ctor() {
        console.log('父的ctor');
        this.m_ClassArray = []; // 获取的数据集合
    },
    onLoad() {
        console.log('父的onLoad');
        this.logo = this.logo.getComponent('Logo');
        this.m_ClassArray.push(this.logo);
        this.logo.play();

        this.levelDesign = this.levelDesign.getComponent('leveDesign');
        this.m_ClassArray.push(this.levelDesign);
        this.levelDesign.reset();

        this.m_Top = this.m_Top.getComponent('Top');
        this.m_ClassArray.push(this.m_Top);

        this.m_setting = this.m_setting.getComponent('Setting');
        this.m_ClassArray.push(this.m_setting);

        this.m_clackGet = this.m_clackGet.getComponent('ClickGet');
        this.m_ClassArray.push(this.m_clackGet);

        this.m_bottom = this.m_bottom.getComponent('Bottom');
        this.m_ClassArray.push(this.m_bottom);

        this.m_tip = this.m_tip.getComponent('Tip');
        this.m_ClassArray.push(this.m_tip);

        this.m_Bg = this.m_Bg.getComponent('Bg');
        this.m_ClassArray.push(this.m_Bg);
        this.m_Bg.play()

        this.m_airPlane = this.m_airPlane.getComponent('AirAutoPlay');
        this.m_ClassArray.push(this.m_airPlane);
        this.m_airPlane.play()
    },
    test(target, data) {
        this.m_ClassArray.forEach(v => {
            if (data == '重置') v.reset && v.reset()
            if (data == '播放') v.play && v.play()
            if (data == '移出') v.moveOut && v.moveOut()
            if (data == '移入') v.moveIn && v.moveIn()
        });
    },
    start() {
        console.log('父的start');
    },

    // update (dt) {},
});
