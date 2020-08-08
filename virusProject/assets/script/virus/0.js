
cc.Class({
    extends: cc.Component,

    properties: {
        m_labHp: cc.Label, // 血量
        m_Back: [cc.Node], // 背景的三角
        m_Body: cc.Node, // 病毒body
    },

    ctor() {
        this.m_bHurt = false; // 
        this.m_bDie = false; // 是否死亡
    },
    onLoad() {
        this.m_Back[0].runAction(cc.rotateBy(5, 360).repeatForever());
        this.m_Back[1].runAction(cc.rotateBy(5, -360).repeatForever());
        this.setHp(20);
        this.setColor(new cc.Color(255, 130, 113));
        this.init();
    },

    onCollisionEnter: function (other, self) {
        // tag 100为子弹
        if (other.tag == 100) {
            this.hit()
        }
    },
    init() {
        this.m_Body.active = true; // 病毒box
        this.node.setScale(cc.v2(1, 1));
        this.m_Body.setScale(cc.v2(1, 1));
        this.m_bDie = false; // 是否死亡
    },
    hit() { // 被子弹击中
        this.m_HP -= 1
        this.setHp(this.m_HP);
        if (this.m_HP <= 0) { // 血量见底
            this.m_bDie = true;
            let seq = cc.sequence(
                cc.scaleTo(0.05, 0, 0),
                cc.callFunc(() => {
                    window.gVirusMake.createDieAnim(this.node);
                    window.gVirusMake.onDieAnimKilled(this.node);
                })
            );
            this.m_Body.runAction(seq);
        } else this.hurt();
    },
    hurt() { // 受到伤害
        if (!this.m_bHurt) {
            this.m_bHurt = true;
            var seq = cc.sequence( // 收到伤害后病毒的缩小放大效果
                cc.scaleBy(0.08, 1.1, 1.1),
                cc.scaleBy(0.1, 0.9, 0.9),
                cc.callFunc(function () {
                    this.m_bHurt = false;
                }.bind(this)),
            );
            this.node.runAction(seq);
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
        if (this.m_bDie) return;
        let dir = dt * 100;
        this.node.y -= dir;
    },
});
