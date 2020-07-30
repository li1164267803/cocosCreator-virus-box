// https://docs.cocos.com/creator/manual/zh/advanced-topics/data-storage.html?h=localstorage
// cc.sys.localStorage.setItem(key, value);
// cc.sys.localStorage.getItem(key);
// cc.sys.localStorage.removeItem(key);
// JSON.parse(jsonstr); //可以将json字符串转换成json对象 
// JSON.stringify(jsonobj); //可以将json对象转换成json对符串 

cc.Class({
    del: function () {
        cc.sys.localStorage.removeItem(data);
        this.load();
    },
    save: function () {
        var str = JSON.stringify(window.gData);
        cc.sys.localStorage.setItem('data', str);
    },
    load: function () {
        console.log('loadloadload');
        var str = cc.sys.localStorage.getItem('data');
        if (str) {
            window.gData = JSON.parse(str);
        } else {
            window.gData = {}
        }
        return window.gData;
    },

    AddGold: function (gold) {
        console.log("window.gData", window.gData)
        if (window.gData.m_Gold == null) {
            window.gData.m_Gold = 0;
        }
        window.gData.m_Gold += gold;
        this.save();
    },
    GetGold: function () {
        if (window.gData.m_Gold == null) {
            window.gData.m_Gold = 0;
        }
        return window.gData.m_Gold;
    },
    AddGetGold: function (gold) {

        if (window.gData.m_GetGold == null) {
            window.gData.m_GetGold = 0;
        }
        window.gData.m_GetGold += gold;
        this.save();
    },
    GetGetGold: function () {
        if (window.gData.m_GetGold == null) {
            window.gData.m_GetGold = 0;
        }
        return window.gData.m_GetGold;
    },

});
