
cc.Class({
    extends: cc.Component,

    properties: {
        boss: cc.Node,
        number: cc.Label,
        point: [cc.Node],
    },


    onLoad() { },
    setNumber(num) {
        if (num <= 0) return this.node.opacity = 0;
        this.number.string = num;
        this.setImgBoss(num % 3 == 0)
    },
    setImgBoss(show) {
        this.boss.active = show
    },
    setIndex(index) {
        this.index = index;
        if (this.index == 1 || this.index == 2) {
            this.SetPointShow(true)
        } else {
            this.SetPointShow(false)
        }
        if (index == 1) {
            this.point[0].opacity = 255;
            this.point[1].opacity = 0;
        } else if (index == 2) {
            this.point[0].opacity = 0;
            this.point[1].opacity = 255;
        }
    },
    SetPointShow: function (bShow) {
        this.point[0].opacity = bShow ? 255 : 0;
        this.point[1].opacity = bShow ? 255 : 0;
    },
    start() {

    },

    // update (dt) {},
});
