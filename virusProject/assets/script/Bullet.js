
cc.Class({
    extends: cc.Component,

    properties: {
    },


    // onLoad () {},
    ctor() {
        this.m_updateMove = false;
    },
    init() {
        this.m_updateMove = false;
    },
    onCollisionEnter: function (other, self) {
        // tag 为0 的时候是碰到了病毒
        if (other.tag == 0) gameCtl.onBullteKilled(this.node); // 消除子弹
        // console.log("//onLoad -> other", other)
        // if( self.node === this.node){
        //     gameCtl.onBulletKilled(this.node);
        // }
    },
    setSecondPos(pos) { // 设置子弹位置
        let seq = cc.sequence(
            cc.moveTo(0.1, pos),
            cc.callFunc(() => {
                this.m_updateMove = true;
            })
        );
        this.node.runAction(seq);
    },
    update(dt) {
        if (this.m_updateMove) {
            let y = this.node.y; // 获取子弹当前的位置
            y += 1000 * dt; // 速度*时间
            this.node.y = y;

            if (y > 920) {
                window.gameCtl.onBullteKilled(this.node); // 超出屏幕销毁子弹
            }
        }
    },
});
