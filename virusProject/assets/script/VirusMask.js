
cc.Class({
    extends: cc.Component,

    properties: {
        m_VirusPrefab: [cc.Prefab], // 病毒Prefab
        m_animDie: cc.Prefab, // 病毒消灭特效
        m_VirusParentl: cc.Node, // 病毒显示0，0载体
    },

    onLoad() {
        window.gVirusMake = this;
        this.dieAnimPool = new cc.NodePool(); // 创建特效池

        this.virusPool = [];
        for (let i = 0; i < this.m_VirusPrefab.length; i++) {
            this.virusPool[i] = new cc.NodePool();
        }

        this.createVirus(0);
    },
    createVirus(id) { // 创建病毒
        let virus = null;
        if (this.virusPool[id].size() > 0) {
            virus = this.virusPool[id].get();
        } else {
            virus = cc.instantiate(this.m_VirusPrefab[id]);
        }
        virus.parent = this.m_VirusParentl;
        let js = virus.getComponent(`${id}`);
        js.init();
        virus.id = id;
        return virus;
    },
    onVirusKilled: function (virus) {
        let id = virus.id;
        this.virusPool[id].put(virus); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    createDieAnim: function (node) { // 创建病毒死亡特效
        let pos = node.getPosition(); // 获取死亡时位置
        let scale = node.getScale(); // 获取node大小
        let color = node.color; // 获取颜色

        let anim;
        if (this.dieAnimPool.size() > 0) {
            anim = this.dieAnimPool.get();
        } else {
            anim = cc.instantiate(this.m_animDie);
        }
        anim.parent = this.m_VirusParentl;

        anim.x = pos.x;
        anim.y = pos.y;
        anim.setScale(cc.v2(scale * 2, scale * 2));
        anim.color = color;

        let js = anim.getComponent(cc.Animation);
        if (js) {
            js.playOver = function () {
                this.onDieAnimKilled(anim);
            }.bind(this)
            js.play('die');
        }
    },
    onDieAnimKilled: function (node) { // 回收到池
        this.dieAnimPool.put(node);
    },
    // update (dt) {},
});
