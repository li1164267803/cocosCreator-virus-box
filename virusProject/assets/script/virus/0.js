
cc.Class({
    extends: cc.Component,

    properties: {
        m_labHp: cc.Label, // 血量
        m_Back: [cc.Node], // 背景的三角
        m_Body: cc.Node, // 病毒body
        m_animDie: cc.Animation, // 病毒死亡动画
    },

    ctor() {
        this.m_bHurt = false; // 
        this.m_bDie = false; // 是否死亡
    },
    onLoad() {
        this.m_Back[0].runAction(cc.rotateBy(5, 360).repeatForever());
        this.m_Back[1].runAction(cc.rotateBy(5, -360).repeatForever());
        this.setHp(90);
        this.setColor(new cc.Color(255, 130, 113));
        this.init();

    },

    onCollisionEnter: function (other, self) {
        // if( self.node === this.node){
        //     gGameCtl.onBulletKilled(this.node);
        // }
        // tag 100为子弹
        if (other.tag == 100) {
            this.hit()
        }


    },
    init() {
        cc.director.getCollisionManager().enabled = true; // 开启碰撞
        this.m_Body.active = true; // 病毒box
        this.m_animDie.node.active = false; // 病毒死亡动画
        this.node.setScale(cc.v2(1, 1));
        this.m_Body.setScale(cc.v2(1, 1));
        this.m_animDie.node.setScale(cc.v2(2, 2));
        this.m_bDie = false; // 是否死亡
    },
    hit() { // 被子弹击中
        this.m_HP -= 1
        this.setHp(this.m_HP);
        if (this.m_HP <= 0) { // 血量见底
            this.m_bDie = true;
            cc.director.getCollisionManager().enabled = false; // 关闭碰撞
            let seq = cc.sequence(
                cc.scaleTo(0.05, 0, 0),
                cc.callFunc(() => {
                    this.m_animDie.node.active = true;
                    this.m_animDie.play('die');
                    console.log('死亡');
                    this.m_animDie.playOver = function () {
                        this.m_animDie.node.active = false;
                        console.log('动画播放结束');
                    }.bind(this)
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
