// https://docs.cocos.com/creator/manual/zh/advanced-topics/data-storage.html?h=localstorage
// cc.sys.localStorage.setItem(key, value);
// cc.sys.localStorage.getItem(key);
// cc.sys.localStorage.removeItem(key);
// JSON.parse(jsonstr); //可以将json字符串转换成json对象 
// JSON.stringify(jsonobj); //可以将json对象转换成json对符串 

let data = cc.Class({
    ctor: function () {
        this.gData = {}
    },
    del: function () { // 删除
        cc.sys.localStorage.removeItem('data');
        this.load();
    },
    save: function () { // 保存
        var str = JSON.stringify(this.gData);
        cc.sys.localStorage.setItem('data', str);
    },
    load: function () {
        var str = cc.sys.localStorage.getItem('data');
        if (str) {
            this.gData = JSON.parse(str);
        } else {
            this.gData = {}
        }
        return this.gData;
    },
    AddGold: function (gold) { // 设置top金币数
        if (this.gData.m_Gold == null) {
            this.gData.m_Gold = 0;
        }
        this.gData.m_Gold += gold;
        this.save();
    },
    getGold: function () { // 获取总得金币数
        if (this.gData.m_Gold == null) {
            this.gData.m_Gold = 0;
        }
        return this.gData.m_Gold;
    },
    AddGetGold: function (gold) {
        if (this.gData.m_GetGold == null) {
            this.gData.m_GetGold = 0;
        }
        this.gData.m_GetGold += gold;
        this.save();
    },
    GetGetGold: function () {
        if (this.gData.m_GetGold == null) {
            this.gData.m_GetGold = 0;
        }
        return this.gData.m_GetGold;
    },
    // 设置获取金币时间
    setColdAddTime(time) {
        this.gData.m_GetGoldTime = time;
    },
    // 获取，金币进度时间
    getColdAddTime() {
        if (this.gData.m_GetGoldTime == null) {
            this.gData.m_GetGoldTime = 3
        }
        return this.gData.m_GetGoldTime
    },
    // 设置奖励金币
    setAwardGold(gold) {
        this.gData.m_AwardGold = gold;
        this.save()
    },
    // 获取奖励金币
    getAwardGold() {
        if (this.gData.m_AwardGold == null) {
            this.gData.m_AwardGold = 4
        }
        return this.gData.m_AwardGold
    },
    // 添加得黄金
    addTaskGold(gold) {
        if (this.gData.m_TaskGold == null) {
            this.gData.m_TaskGold = 0
        }
        this.gData.m_TaskGold += gold;
        this.save()
    },
    // 清除黄金
    clearTaskGold: function () {
        this.gData.m_TaskGold = 0;
        this.save();
    },
    // 获取黄金
    getTaskGold: function () {
        if (this.gData.m_TaskGold == null) {
            this.gData.m_TaskGold = 0
        }
        return this.gData.m_TaskGold;
    },
});

// window.gData = {}; // 全局的本地数据
// window.gDataCtl = null; // 设置数据的方法
window.gDataCtl = new data();
window.gDataCtl.load();
window.gData = window.gDataCtl.gData;
