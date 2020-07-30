let data = require('data');

cc.Class({
    extends: cc.Component,

    properties: {
        logo: cc.Node, // logo
        levelDesign: cc.Node, // 关卡
        m_Top: cc.Node, // 顶部
        m_setting: cc.Node, // 设置
        m_clackGet: cc.Node, // 金币
        m_bottom: cc.Node, // 底部
        m_tip: cc.Node, // 中心文字提示
        m_Bg: cc.Node, // 背景图
        m_airPlane: cc.Node, // 飞机
        m_goldPrafab: cc.Prefab, // 金币
    },

    ctor() {
        console.log('父的ctor');
        this.m_ClassArray = []; // 获取的数据集合
        this.goldPool = new cc.NodePool(); // 创建对象池的容器
        window.gDataCtl = new data();
        window.gDataCtl.load()
    },
    onLoad() {
        window.gameCtl = this;
        console.log('父的onLoad');

        this.logo = this.logo.getComponent('Logo');
        this.m_ClassArray.push(this.logo);
        this.logo.play();

        this.levelDesign = this.levelDesign.getComponent('leveDesign');
        this.m_ClassArray.push(this.levelDesign);
        this.levelDesign.reset();

        this.m_Top = this.m_Top.getComponent('Top');
        this.m_ClassArray.push(this.m_Top);

        this.m_setting = this.m_setting.getComponent('Setting');
        this.m_ClassArray.push(this.m_setting);

        this.m_clackGet = this.m_clackGet.getComponent('ClickGet');
        this.m_ClassArray.push(this.m_clackGet);

        this.m_bottom = this.m_bottom.getComponent('Bottom');
        this.m_ClassArray.push(this.m_bottom);

        this.m_tip = this.m_tip.getComponent('Tip');
        this.m_ClassArray.push(this.m_tip);

        this.m_Bg = this.m_Bg.getComponent('Bg');
        this.m_ClassArray.push(this.m_Bg);
        this.m_Bg.play()

        this.m_airPlane = this.m_airPlane.getComponent('AirAutoPlay');
        this.m_ClassArray.push(this.m_airPlane);
        this.m_airPlane.play();
    },
    createGoldAnim(srcPos, dstPos, radius, goldCount, ) { // 创建金币的动画
        /**
         * srcPos 位置
         * dstPos 
         * radius 半径
         * goldCount 产生的个数
         */
        let arr = this.getPoint(radius, srcPos.x, srcPos.y, goldCount);
        let nodeArr = [];

        arr.forEach(v => {
            let gold = cc.instantiate(this.m_goldPrafab);
            // 随机位置
            let randPos = cc.v2(v.x + random(0, 50), v.y + random(0, 50));
            gold.setPosition(srcPos);
            nodeArr.push({ gold, randPos })

        });
        // 根据两点的距离排序
        nodeArr.sort((a, b) => {
            let disa = distance(a.randPos, dstPos);
            let disb = distance(b.randPos, dstPos);
            return disa - disb
        })
        let notPlay = false; // 是否金币动画放大播放结束
        let targetGoldNode = this.m_Top.getGoldNode(); // 获取顶部的金币node

        nodeArr.forEach((v, i) => {
            let seq = cc.sequence(
                cc.moveTo(0.3, v.randPos),
                cc.delayTime(i * 0.02), // 距离越远的越靠后运动
                cc.moveTo(0.3, dstPos),
                cc.callFunc((v) => {
                    cc.sys.localStorage.q = 123
                    if (!notPlay) {
                        notPlay = true;
                        let seq = cc.sequence(
                            cc.scaleTo(0.1, 0.8, 0.8),
                            cc.scaleTo(0.1, 0.5, 0.5),
                            cc.callFunc(() => notPlay = false) // 金币动画放大结束
                        )
                        targetGoldNode.runAction(seq);
                    }
                    this.onGoldKilled(v)
                })
            )
            v.gold.parent = this.node; // 挂载到父节点 同 this.node.addChild(v.gold)
            v.gold.runAction(seq)
        });

    },
    createGold(parentNode) { // 制造对象池
        let enemy = null;
        if (this.goldPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.goldPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.enemyPrefab);
        }
        enemy.parent = parentNode; // 将生成的敌人加入节点树
        enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    },
    onGoldKilled(gold) { // 返回到对象池
        // enemy 应该是一个 cc.Node
        console.log('回');
        this.goldPool.put(gold); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    getPoint(r, ox, oy, count) {
        /**
        * 求圆周上等分点的坐标
        * ox,oy为圆心坐标
        * r为半径
        * count为等分个数
        */
        var point = []; //结果
        var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
            i = 0;
        for (; i < count; i++) {
            var x = ox + r * Math.sin(radians * i),
                y = oy + r * Math.cos(radians * i);

            point.unshift({ x: x, y: y }); //为保持数据顺时针
        }
        return point;
    },
    test(target, data) {
        if (data == '重置') window.gDataCtl.AddGold(999);
        this.m_ClassArray.forEach(v => {
            if (data == '重置') v.reset && v.reset()
            if (data == '播放') v.play && v.play()
            if (data == '移出') v.moveOut && v.moveOut()
            if (data == '移入') v.moveIn && v.moveIn()
        });
    },
    start() {
        console.log('父的start');
    },

    // update (dt) {},
});
