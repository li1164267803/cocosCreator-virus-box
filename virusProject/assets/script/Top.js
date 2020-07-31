
cc.Class({
    extends: cc.Component,

    properties: {
        m_GoldNode: cc.Node, // 顶部的金币node
        m_labGold: cc.Label, // 顶部得金币数量
    },

    onLoad() {
        this.updateData();
    },
    moveOut() { // 移出logo
        this.node.setPosition(cc.v2(0, 736));
        // 缓动展示的图，个别字段和creato的名字不一样 https://blog.csdn.net/wzh051527/article/details/38438521 
        this.node.runAction(cc.moveTo(0.2, -30, 942).easing(cc.easeBackIn()))
    },
    moveIn() { // 移出logo
        this.node.setPosition(cc.v2(0, 942));
        this.node.runAction(cc.moveTo(0.2, 0, 736).easing(cc.easeBackOut()))
    },
    getGoldNode: function () {
        return this.m_GoldNode;
    },
    updateData() {
        this.m_labGold.string = goldCrarryBit(window.gDataCtl.getGold());
    },

    // update (dt) {},
});
