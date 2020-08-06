
cc.Class({
    extends: cc.Component,
    // 用来测试按钮的js
    properties: {
        colorSpritNode: cc.Node,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    changeColor() {
        console.log('点击修改颜色');
        this.colorSpritNode.color = cc.color(255, 153, 255, 255);
    },
    start() {

    },

    // update (dt) {},
});
