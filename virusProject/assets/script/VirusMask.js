
cc.Class({
    extends: cc.Component,

    properties: {
        m_VirusPrefab: [cc.Prefab], // 病毒Prefab
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
    },

    onLoad() {
        let node = cc.instantiate(this.m_VirusPrefab[0]);
        node.parent = gameCtl.node;
        node.setPosition(cc.v2(0, 960))
    },

    start() { },

    // update (dt) {},
});
