
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
    },

    // onLoad () {},
    moveOut() { // 移出logo
        this.node.setPosition(cc.v2(0, 736));
        // 缓动展示的图，个别字段和creato的名字不一样 https://blog.csdn.net/wzh051527/article/details/38438521 
        this.node.runAction(cc.moveTo(0.2, -30, 942).easing(cc.easeBackIn()))
    },
    moveIn() { // 移出logo
        this.node.setPosition(cc.v2(0, 942));
        this.node.runAction(cc.moveTo(0.2, 0, 736).easing(cc.easeBackOut()))
    },
    start() {

    },

    // update (dt) {},
});
