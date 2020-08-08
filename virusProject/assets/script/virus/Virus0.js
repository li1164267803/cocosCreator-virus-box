
cc.Class({
    extends: cc.Component,

    properties: {
        m_labHp: cc.Label, // 血量
        m_Back: [cc.Node], // 背景的三角
    },


    onLoad() {
        this.m_Back[0].runAction(cc.rotateBy(5, 360).repeatForever());
        this.m_Back[1].runAction(cc.rotateBy(5, -360).repeatForever());
        this.setHp(99);
        this.setColor(new cc.Color(255, 130, 113))
    },

    onCollisionEnter: function (other, self) {
        // console.log("//onLoad -> other", other)
        // if( self.node === this.node){
        //     gGameCtl.onBulletKilled(this.node);
        // }
        // tag 100为子弹
        if (other.tag == 100) {
            this.hit()
        }
    },
    hit() { // 被子弹击中
        this.m_HP -= 1
        this.setHp(this.m_HP);
        if (this.m_HP <= 0) {
            this.node.active = false;
        }
    },
    setColor(color) { // 设置颜色
        setVirusColor(this.node, color)
    },
    setHp(num) { // 设置病毒血量
        this.m_HP = num
        this.m_labHp.string = num
    },
    update(dt) {
        let dir = dt * 100;
        this.node.y -= dir;
    },
});
