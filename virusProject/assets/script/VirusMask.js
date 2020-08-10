
cc.Class({
    extends: cc.Component,

    properties: {
        m_VirusPrefab: [cc.Prefab], // 病毒Prefab
        m_animDie: cc.Prefab, // 病毒消灭特效
        m_VirusParentl: cc.Node, // 病毒显示0，0载体
    },
    ctor() {
        // this.m_AllHp = 0; // 全部血量
        // this.m_Brief = 0; // 当前关卡第几小节
        // this.m_BriefHp = 0; // 当前关卡中一小节的血量
        // this.m_CurHp = 0; // 剩余血量
    },
    onLoad() {
        window.gVirusMake = this;
        this.dieAnimPool = new cc.NodePool(); // 病毒死亡特效池
        this.virusPool = [];
        for (let i = 0; i < this.m_VirusPrefab.length; i++) {
            this.virusPool[i] = new cc.NodePool();
        }
        this.m_BriefHp = 0;
    },
    begin() { // 开始
        this.m_Brief = 0; // 当前关卡第几小节
        let level = window.gDataCtl.GetCurLevelDesign(); // 获取当前关卡
        this.m_AllHp = 0; // 全部血量
        console.log(window.gLevelDesign[level], window.gLevelDesign, level, 'level');
        for (let i = 0; i < window.gLevelDesign[level].hp.length; i++) {
            this.m_AllHp += window.gLevelDesign[level].hp[i]; // 获取到当前关 全部血量
        };
        this.m_CurHp = this.m_AllHp;
        window.gVirusHpView.changeProgress(1);
        this.nextBrief();
    },
    nextBrief() {
        let level = window.gDataCtl.GetCurLevelDesign(); // 获取当前关卡
        if (this.m_Brief >= window.gLevelDesign[level].hp.length) return; // 小节关卡执行完毕
        let hp = window.gLevelDesign[level].hp[this.m_Brief]; // 当前小节的血量
        this.m_BriefHp += hp;
        let hpMin = window.gLevelDesign[level].hpMin;
        let hpMax = window.gLevelDesign[level].hpMax;
        for (let i = 0; hp > 0; i++) {
            let type = random(0, window.gLevelDesign[level].virus.length);
            let node = this.createVirus(type); // 确定创建的是什么类型的病毒
            let js = node.getComponent(`${type}`);
            let randHp = random(hpMin, hpMax); // 病毒随机血量
            js.setHp(randHp);
            hp -= randHp; // 一共剩余血量
        }
        this.m_Brief++; // 关卡+1
    },
    moveOut: function () {  // 移出
        this.scheduleOnce(function () { // 执行一次
            this.begin();
        }.bind(this), 1.5)
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
        js.playOver = function () {
            this.onDieAnimKilled(anim);
        }.bind(this)
        js.play('die');
    },
    onDieAnimKilled: function (node) { // 回收到池
        this.dieAnimPool.put(node);
    },
    sleepVirus(sleep, pro) { //sleep 是否休眠,pro 速度比例
        let children = this.m_VirusParentl.children;
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            let js = node.getComponent(`${node.id}`); // 获取到病毒的脚本文件
            if (js) js.sleep(sleep, pro)
        }
    },
    hit(value) { // 受伤
        this.m_BriefHp -= value;
        this.m_CurHp -= value;
        if (this.m_BriefHp < 50) {
            this.nextBrief()
        }
        window.gVirusHpView.changeProgress(this.m_CurHp / this.m_AllHp); // 修改页面的进度条血量
    },
    // update (dt) {},
});
