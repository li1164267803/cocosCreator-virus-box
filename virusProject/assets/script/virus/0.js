
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
        this.m_SpeedY = 0; // Y轴速度
        this.m_SpeedX = 0; // X轴速度
        this.m_bSleep = false; // 病毒休眠状态
    },
    onLoad() {
        this.m_Back[0].runAction(cc.rotateBy(5, 360).repeatForever());
        this.m_Back[1].runAction(cc.rotateBy(5, -360).repeatForever());
        this.setHp(99);
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
        this.randomSpeed();
        this.setMoveStart();
        this.randomColor();
    },
    hit() { // 被子弹击中
        this.m_HP -= 1
        this.setHp(this.m_HP);
        window.gVirusMake.hit(1)
        this.runRandomColorAction(0.2, this.node); // 击中改变颜色
        if (this.m_HP <= 0) { // 血量见底
            this.m_bDie = true;
            let seq = cc.sequence(
                cc.scaleTo(0.05, 0, 0),
                cc.callFunc(() => {
                    window.gVirusMake.createDieAnim(this.node);
                    window.gVirusMake.onVirusKilled(this.node);
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
        this.node.color = color;
        setVirusColor(this.node, color); // 插件方法
    },
    setHp(num) { // 设置病毒血量
        this.m_HP = num
        this.m_labHp.string = num
    },
    runRandomColorAction(time, node, color) { // 递归执行随机颜色切换动画
        if (color == null) color = this.getRandomColor();
        for (var i = 0; i < node.children.length; i++) {
            var js = node.children[i].getComponent('color');
            if (js != null) {
                var colorAction = cc.tintTo(time, color.r, color.g, color.b); // 颜色过度动画
                node.children[i].runAction(colorAction);
            }
            this.runRandomColorAction(time, node.children[i], color);
        }
    },
    randomColor() { // 随机病毒颜色
        this.setColor(this.getRandomColor())
    },
    getRandomColor() { // 获取随机颜色
        var arr = new Array(3);
        arr[0] = random(127, 255);
        arr[1] = 127;
        arr[2] = 255;
        var rgb = new Array();
        for (var i = 0; i < 2; i++) {
            var index = random(0, arr.length);
            rgb.push(arr[index]);
            arr.splice(index, 1);
        }
        rgb.push(arr[0]);
        return new cc.Color(rgb[0], rgb[1], rgb[2])
    },
    randomSpeed() { // 随机速度
        this.m_SpeedY = random(100, 400);
        this.m_SpeedX = random(100, 400);
        if (random(0, 100) > 50) this.m_SpeedX *= -1; // 如果x轴初始大于50，为反向运动
    },
    setMoveStart() { // 设置开始的病毒位置
        this.node.y = 1780;
        this.node.x = random(160, 740); // 根据病毒的宽度计算的  位置的起点已左下角的0，0开始
    },
    sleep(sleep, pro) { // 休眠 修改速度
        if (this.m_bSleep == sleep) return;
        this.m_bSleep = sleep;
        if (sleep) {
            this.m_SpeedX /= pro;
            this.m_SpeedY /= pro;
        } else {
            this.m_SpeedX *= pro;
            this.m_SpeedY *= pro;
        }
    },
    update(dt) {
        if (this.m_bDie) return;
        if (this.node.y < -150) {
            this.setMoveStart();
            this.randomSpeed();
        }
        this.node.y -= this.m_SpeedY * dt;
        // 如果碰到两边的边界，速度给反方向
        if ((this.m_SpeedX > 0 && this.node.x > 840) || (this.m_SpeedX < 0 && this.node.x < 60)) {
            this.m_SpeedX *= -1
        }
        this.node.x += this.m_SpeedX * dt;
    },
});
