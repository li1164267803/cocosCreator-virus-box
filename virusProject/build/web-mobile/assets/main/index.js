window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  0: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15dfd2MFmJJ2rmd0V7X2ipC", "0");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_labHp: cc.Label,
        m_Back: [ cc.Node ],
        m_Body: cc.Node
      },
      ctor: function ctor() {
        this.m_bHurt = false;
        this.m_bDie = false;
        this.m_SpeedY = 0;
        this.m_SpeedX = 0;
        this.m_bSleep = false;
      },
      onLoad: function onLoad() {
        this.m_Back[0].runAction(cc.rotateBy(5, 360).repeatForever());
        this.m_Back[1].runAction(cc.rotateBy(5, -360).repeatForever());
        this.setHp(99);
        this.setColor(new cc.Color(255, 130, 113));
        this.init();
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        100 == other.tag && this.hit();
      },
      init: function init() {
        this.m_Body.active = true;
        this.node.setScale(cc.v2(1, 1));
        this.m_Body.setScale(cc.v2(1, 1));
        this.m_bDie = false;
        this.randomSpeed();
        this.setMoveStart();
        this.randomColor();
      },
      hit: function hit() {
        var _this = this;
        this.m_HP -= 1;
        this.setHp(this.m_HP);
        window.gVirusMake.hit(1);
        this.runRandomColorAction(.2, this.node);
        if (this.m_HP <= 0) {
          this.m_bDie = true;
          var seq = cc.sequence(cc.scaleTo(.05, 0, 0), cc.callFunc(function() {
            window.gVirusMake.createDieAnim(_this.node);
            window.gVirusMake.onVirusKilled(_this.node);
          }));
          this.m_Body.runAction(seq);
        } else this.hurt();
      },
      hurt: function hurt() {
        if (!this.m_bHurt) {
          this.m_bHurt = true;
          var seq = cc.sequence(cc.scaleBy(.08, 1.1, 1.1), cc.scaleBy(.1, .9, .9), cc.callFunc(function() {
            this.m_bHurt = false;
          }.bind(this)));
          this.node.runAction(seq);
        }
      },
      setColor: function setColor(color) {
        this.node.color = color;
        setVirusColor(this.node, color);
      },
      setHp: function setHp(num) {
        this.m_HP = num;
        this.m_labHp.string = num;
      },
      runRandomColorAction: function runRandomColorAction(time, node, color) {
        null == color && (color = this.getRandomColor());
        for (var i = 0; i < node.children.length; i++) {
          var js = node.children[i].getComponent("color");
          if (null != js) {
            var colorAction = cc.tintTo(time, color.r, color.g, color.b);
            node.children[i].runAction(colorAction);
          }
          this.runRandomColorAction(time, node.children[i], color);
        }
      },
      randomColor: function randomColor() {
        this.setColor(this.getRandomColor());
      },
      getRandomColor: function getRandomColor() {
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
        return new cc.Color(rgb[0], rgb[1], rgb[2]);
      },
      randomSpeed: function randomSpeed() {
        this.m_SpeedY = random(100, 400);
        this.m_SpeedX = random(100, 400);
        random(0, 100) > 50 && (this.m_SpeedX *= -1);
      },
      setMoveStart: function setMoveStart() {
        this.node.y = 1780;
        this.node.x = random(160, 740);
      },
      sleep: function sleep(_sleep, pro) {
        if (this.m_bSleep == _sleep) return;
        this.m_bSleep = _sleep;
        if (_sleep) {
          this.m_SpeedX /= pro;
          this.m_SpeedY /= pro;
        } else {
          this.m_SpeedX *= pro;
          this.m_SpeedY *= pro;
        }
      },
      update: function update(dt) {
        if (this.m_bDie) return;
        if (this.node.y < -150) {
          this.setMoveStart();
          this.randomSpeed();
        }
        this.node.y -= this.m_SpeedY * dt;
        (this.m_SpeedX > 0 && this.node.x > 840 || this.m_SpeedX < 0 && this.node.x < 60) && (this.m_SpeedX *= -1);
        this.node.x += this.m_SpeedX * dt;
      }
    });
    cc._RF.pop();
  }, {} ],
  AirAutoPlay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72d16qGLLJNGoSVDwBmw3k3", "AirAutoPlay");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_light: [ cc.Node ],
        m_TailLight: cc.Node,
        m_Gun: cc.Node
      },
      onLoad: function onLoad() {
        this.m_light.forEach(function(v, i) {
          var seq = cc.sequence(cc.delayTime(.2 * i), cc.scaleTo(.4, 1, 1), cc.callFunc(function() {
            return v.setScale(cc.v2(0, 0));
          }), cc.delayTime(.5));
          v.runAction(seq.repeatForever());
        });
        this.m_Gun = this.m_Gun.getComponent("Gun");
      },
      play: function play() {
        this.node.setPosition(cc.v2(0, -966));
        this.node.setScale(cc.v2(.8, .8));
        this.m_TailLight.setScale(cc.v2(1, 1));
        var seq = cc.sequence(cc.delayTime(.5), cc.moveTo(.4, cc.v2(0, -415)), cc.scaleTo(.4, 1, 1));
        this.node.runAction(seq);
        var seqTailLight = cc.sequence(cc.delayTime(1), cc.scaleTo(.5, .6, .6));
        this.m_TailLight.runAction(seqTailLight);
      },
      moveOut: function moveOut() {
        var scaleTo = cc.scaleTo(.3, .6, .6);
        this.node.runAction(scaleTo.easing(cc.easeBackOut()));
        this.m_TailLight.runAction(cc.scaleTo(.5, 1, 1));
      },
      moveIn: function moveIn() {
        var scaleTo = cc.scaleTo(.3, 1, 1);
        this.node.runAction(scaleTo.easing(cc.easeBackOut()));
        this.m_TailLight.runAction(cc.scaleTo(.5, .6, .6));
      },
      BeginFire: function BeginFire() {
        this.m_Gun.BeginFire();
      },
      EndFire: function EndFire() {
        this.m_Gun.EndFire();
      }
    });
    cc._RF.pop();
  }, {} ],
  AirPlane: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a7eec2xdqVLYpZvZ8AI9iDz", "AirPlane");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Bg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d738n4rllE1oghS0nqQRKt", "Bg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      play: function play() {
        var scaleTo = cc.sequence(cc.delayTime(1), cc.scaleTo(.3, 1.2, 1.2));
        this.node.runAction(scaleTo);
      },
      moveOut: function moveOut() {
        var scaleTo = cc.scaleTo(.3, 1, 1);
        this.node.runAction(scaleTo);
      },
      moveIn: function moveIn() {
        var scaleTo = cc.scaleTo(.3, 1.2, 1.2);
        this.node.runAction(scaleTo);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Bottom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "baf6d7huEpFgIhBbyOLocHC", "Bottom");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      moveOut: function moveOut() {
        var moveTo = cc.moveTo(.3, cc.v2(0, -880));
        this.node.runAction(moveTo.easing(cc.easeBackOut()));
      },
      moveIn: function moveIn() {
        var moveTo = cc.moveTo(.3, cc.v2(0, -734));
        this.node.runAction(moveTo.easing(cc.easeBackOut()));
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "080f50crKJFu6mUQCOFgQ2G", "Bullet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      ctor: function ctor() {
        this.m_updateMove = false;
      },
      init: function init() {
        this.m_updateMove = false;
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        0 == other.tag && gGameCtl.onBullteKilled(this.node);
      },
      setSecondPos: function setSecondPos(pos) {
        var _this = this;
        var seq = cc.sequence(cc.moveTo(.1, pos), cc.callFunc(function() {
          _this.m_updateMove = true;
        }));
        this.node.runAction(seq);
      },
      update: function update(dt) {
        if (this.m_updateMove) {
          var y = this.node.y;
          y += 1e3 * dt;
          this.node.y = y;
          y > 920 && window.gGameCtl.onBullteKilled(this.node);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  ClickGet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "afd6d4fkdROfa4Fq/PGcKf8", "ClickGet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_labGold: cc.Label,
        m_progress: cc.ProgressBar
      },
      moveOut: function moveOut() {
        var moveTo = cc.moveTo(.3, cc.v2(540, 0));
        this.node.runAction(moveTo.easing(cc.easeBackOut()));
      },
      moveIn: function moveIn() {
        var moveTo = cc.moveTo(.3, cc.v2(367, 0));
        this.node.runAction(moveTo.easing(cc.easeBackOut()));
      },
      onClickGet: function onClickGet() {
        window.gGameCtl.createGoldAnim(this.node.getPosition(), cc.v2(-375, 710), 200, 15, gDataCtl.getTaskGold(), function(gold) {
          window.gDataCtl.AddGold(gold);
          window.gGameCtl.m_Top.updateData();
        });
        window.gDataCtl.clearTaskGold();
        this.updateData();
      },
      start: function start() {},
      updateData: function updateData() {
        this.m_labGold.string = goldCrarryBit(window.gDataCtl.getTaskGold());
      },
      update: function update(dt) {
        var time = window.gDataCtl.getColdAddTime();
        var dis = 1 / time;
        dis *= dt;
        this.m_progress.progress += dis;
        if (this.m_progress.progress >= 1) {
          this.m_progress.progress = 0;
          var gold = window.gDataCtl.getAwardGold();
          window.gDataCtl.addTaskGold(gold);
          window.gDataCtl.save();
          this.updateData();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  FullScreen: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b071b+SGhMooIUd5li7+7y", "FullScreen");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.fullScreen = function() {
        if (cc.sys.isNative) return;
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        rfs && rfs.call(el);
      };
      NewClass.prototype.exitFullScreen = function() {
        if (cc.sys.isNative) return;
        var efs = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen;
        efs && efs.call(document);
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  GameControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f1e7eBKPpVHxLpGtEaib2P7", "GameControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        logo: cc.Node,
        levelDesign: cc.Node,
        m_Top: cc.Node,
        m_setting: cc.Node,
        m_clackGet: cc.Node,
        m_bottom: cc.Node,
        m_tip: cc.Node,
        m_Bg: cc.Node,
        m_airPlane: cc.Node,
        m_goldPrafab: cc.Prefab,
        m_TouchControl: cc.Node,
        m_BulletPrefab: cc.Prefab,
        m_MonsterHP: cc.Node,
        m_VirusMake: cc.Node
      },
      ctor: function ctor() {
        console.log("\u7236\u7684ctor");
        this.m_ClassArray = [];
        this.goldPool = new cc.NodePool();
        this.bulletPool = new cc.NodePool();
      },
      onLoad: function onLoad() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        window.gGameCtl = this;
        console.log("\u7236\u7684onLoad");
        this.logo = this.logo.getComponent("Logo");
        this.m_ClassArray.push(this.logo);
        this.levelDesign = this.levelDesign.getComponent("leveDesign");
        this.levelDesign.reset();
        this.m_ClassArray.push(this.levelDesign);
        this.m_Top = this.m_Top.getComponent("Top");
        this.m_ClassArray.push(this.m_Top);
        this.m_setting = this.m_setting.getComponent("Setting");
        this.m_ClassArray.push(this.m_setting);
        this.m_clackGet = this.m_clackGet.getComponent("ClickGet");
        this.m_ClassArray.push(this.m_clackGet);
        this.m_bottom = this.m_bottom.getComponent("Bottom");
        this.m_ClassArray.push(this.m_bottom);
        this.m_tip = this.m_tip.getComponent("Tip");
        this.m_ClassArray.push(this.m_tip);
        this.m_Bg = this.m_Bg.getComponent("Bg");
        this.m_ClassArray.push(this.m_Bg);
        this.m_airPlane = this.m_airPlane.getComponent("AirAutoPlay");
        this.m_ClassArray.push(this.m_airPlane);
        window.gAirPlane = this.m_airPlane;
        this.m_MonsterHP = this.m_MonsterHP.getComponent("MonsterHP");
        this.m_ClassArray.push(this.m_MonsterHP);
        this.m_VirusMake = this.m_VirusMake.getComponent("VirusMask");
        this.m_ClassArray.push(this.m_VirusMake);
        this.m_ClassArray.forEach(function(v) {
          return v.play && v.play();
        });
        this.scheduleOnce(function() {
          return _this.m_TouchControl.active = true;
        }, 1.5);
      },
      createGoldAnim: function createGoldAnim(srcPos, dstPos, radius, goldCount, addGold, callBack) {
        var _this2 = this;
        var arr = this.getPoint(radius, srcPos.x, srcPos.y, goldCount);
        var nodeArr = [];
        arr.forEach(function(v) {
          var gold = _this2.createGold(_this2.node);
          var randPos = cc.v2(v.x + random(0, 50), v.y + random(0, 50));
          gold.setPosition(srcPos);
          nodeArr.push({
            gold: gold,
            randPos: randPos
          });
        });
        nodeArr.sort(function(a, b) {
          var disa = distance(a.randPos, dstPos);
          var disb = distance(b.randPos, dstPos);
          return disa - disb;
        });
        var notPlay = false;
        var targetGoldNode = this.m_Top.getGoldNode();
        nodeArr.forEach(function(v, i) {
          var seq = cc.sequence(cc.moveTo(.3, v.randPos), cc.delayTime(.02 * i), cc.moveTo(.3, dstPos), cc.callFunc(function(v) {
            cc.sys.localStorage.q = 123;
            if (!notPlay) {
              notPlay = true;
              var _seq = cc.sequence(cc.scaleTo(.1, .8, .8), cc.scaleTo(.1, .5, .5), cc.callFunc(function() {
                return notPlay = false;
              }));
              targetGoldNode.runAction(_seq);
            }
            i == nodeArr.length - 1 && null != callBack && callBack(addGold);
            _this2.onGoldKilled(v);
          }));
          v.gold.parent = _this2.node;
          v.gold.runAction(seq);
        });
      },
      createGold: function createGold(parentNode) {
        var enemy = null;
        enemy = this.goldPool.size() > 0 ? this.goldPool.get() : cc.instantiate(this.m_goldPrafab);
        enemy.parent = parentNode;
        return enemy;
      },
      onGoldKilled: function onGoldKilled(gold) {
        this.goldPool.put(gold);
      },
      createBullte: function createBullte(count) {
        if (count <= 1) {
          var bullteNode = null;
          bullteNode = this.bulletPool.size() > 0 ? this.bulletPool.get() : cc.instantiate(this.m_BulletPrefab);
          bullteNode.parent = this.node;
          var pos = this.m_airPlane.node.getPosition();
          pos.y += 116;
          bullteNode.setPosition(pos);
          var js = bullteNode.getComponent("Bullet");
          js.init();
          js.setSecondPos(cc.v2(pos.x, pos.y + 80));
        } else {
          var left = 1;
          var right = 1;
          var imgSize = 30;
          for (var i = 0; i < count; i++) {
            var ofset = 0;
            if (count % 2 != 0) if (0 == i) ofset = 0; else if (i % 2) {
              ofset = -imgSize * left;
              ofset += imgSize / 2 - 15;
              left++;
            } else {
              ofset = imgSize * right;
              ofset -= imgSize / 2 - 15;
              right++;
            } else if (i % 2) {
              ofset = -imgSize * left;
              ofset += imgSize / 2;
              left++;
            } else {
              ofset = imgSize * right;
              ofset -= imgSize / 2;
              right++;
            }
            var _bullteNode = null;
            _bullteNode = this.bulletPool.size() > 0 ? this.bulletPool.get() : cc.instantiate(this.m_BulletPrefab);
            _bullteNode.parent = this.node;
            var _pos = this.m_airPlane.node.getPosition();
            _pos.y += 116;
            _bullteNode.setPosition(_pos);
            var _js = _bullteNode.getComponent("Bullet");
            _js.init();
            _js.setSecondPos(cc.v2(_pos.x + ofset, _pos.y + 80));
          }
        }
      },
      onBullteKilled: function onBullteKilled(bullte) {
        this.bulletPool.put(bullte);
      },
      getPoint: function getPoint(r, ox, oy, count) {
        var point = [];
        var radians = Math.PI / 180 * Math.round(360 / count), i = 0;
        for (;i < count; i++) {
          var x = ox + r * Math.sin(radians * i), y = oy + r * Math.cos(radians * i);
          point.unshift({
            x: x,
            y: y
          });
        }
        return point;
      },
      Action: function Action(action) {
        action == ACTION_RESET ? this.ActionReset() : action == ACTION_PLAY ? this.ActionPlay() : action == ACTION_MOVE_OUT ? this.ActionMoveOut() : action == ACTION_MOVE_IN && this.ActionMoveIn();
      },
      ActionReset: function ActionReset() {
        this.m_ClassArray.forEach(function(v) {
          return v.reset && v.reset();
        });
      },
      ActionPlay: function ActionPlay() {
        this.m_ClassArray.forEach(function(v) {
          return v.play && v.play();
        });
      },
      ActionMoveOut: function ActionMoveOut() {
        this.m_ClassArray.forEach(function(v) {
          return v.moveOut && v.moveOut();
        });
      },
      ActionMoveIn: function ActionMoveIn() {
        this.m_ClassArray.forEach(function(v) {
          return v.moveIn && v.moveIn();
        });
      },
      moveAirPlane: function moveAirPlane(pos) {
        var slefPos = this.m_airPlane.node.getPosition();
        this.m_airPlane.node.setPosition(cc.v2(slefPos.x + pos.x, slefPos.y + pos.y));
      },
      test: function test(target, data) {
        "\u91cd\u7f6e" == data && window.gDataCtl.del();
        this.m_ClassArray.forEach(function(v) {
          "\u91cd\u7f6e" == data && v.reset && v.reset();
          "\u64ad\u653e" == data && v.play && v.play();
          "\u79fb\u51fa" == data && v.moveOut && v.moveOut();
          "\u79fb\u5165" == data && v.moveIn && v.moveIn();
        });
      },
      start: function start() {
        console.log("\u7236\u7684start");
      }
    });
    cc._RF.pop();
  }, {} ],
  Gun: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29eccOhGdJOJaGreQH0Wb0v", "Gun");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var scaleTo1 = cc.scaleTo(.1, .5, .5);
        var scaleTo2 = cc.scaleTo(.1, 1, 1);
        this.node.runAction(cc.sequence(scaleTo1, scaleTo2).repeatForever());
        this.node.active = false;
      },
      createBulltCallBack: function createBulltCallBack() {
        console.log("\u521b\u5efa\u5b50\u5f39");
        window.gGameCtl.createBullte(4);
      },
      BeginFire: function BeginFire() {
        this.createBulltCallBack();
        this.schedule(this.createBulltCallBack, .2);
        this.node.active = true;
      },
      EndFire: function EndFire() {
        this.node.active = false;
        this.unschedule(this.createBulltCallBack);
      }
    });
    cc._RF.pop();
  }, {} ],
  LogoVirus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "baafbsCRGBBB7MJgN9odq6S", "LogoVirus");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        circl: cc.Node,
        virus: cc.Node,
        tail: cc.Node
      },
      init: function init(x, y, width) {
        this.v2 = cc.v2(x, y);
        this.width = width;
      },
      onLoad: function onLoad() {},
      Begin: function Begin() {
        this.tail.runAction(cc.fadeOut(.7));
        var _out = cc.fadeOut(.2);
        var _in = cc.fadeIn(.4);
        var delayTime = cc.delayTime(.5);
        var seq = cc.sequence(_out, _in);
        this.circl.runAction(seq.repeatForever());
        this.virusAction();
      },
      virusAction: function virusAction() {
        var _this = this;
        var x = random(0, this.width);
        var y = random(0, this.width);
        var v2 = cc.v2(this.v2.x + x, this.v2.y + y);
        var seq = cc.sequence(cc.moveTo(.5, v2), cc.callFunc(function() {
          _this.virusAction();
        }));
        this.node.runAction(seq);
      },
      reset: function reset() {
        this.circl.opacity = 255;
        this.tail.opacity = 255;
        this.circl.stopAllActions();
        this.virus.stopAllActions();
        this.tail.stopAllActions();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Logo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "986e0AglIZOHaQt/1VYE2OL", "Logo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        Anim: [ cc.Node ]
      },
      callFun0: function callFun0() {
        var scale = cc.scaleTo(1, 1);
        var callF = cc.callFunc(this.callFun1.bind(this));
        var seq = cc.sequence(scale, callF);
        this.Anim[1].runAction(seq);
        var _out = cc.fadeOut(.2);
        var _in = cc.fadeIn(.4);
        var _seq = cc.sequence(_out, _in);
        this.Anim[0].runAction(_seq.repeatForever());
      },
      callFun1: function callFun1() {
        console.log("\u79fb\u52a8\u548c\u653e\u5927\u75c5\u6bd2");
        var moveTo1 = cc.moveTo(.3, cc.v2(431, 192));
        var moveTo2 = cc.moveTo(.3, cc.v2(455, -27));
        var scale1 = cc.scaleTo(.3, 1, 1);
        var scale2 = cc.scaleTo(.3, 1, 1);
        var spawn1 = cc.spawn(moveTo1, scale1);
        var spawn2 = cc.spawn(moveTo2, scale2);
        var seq = cc.sequence(spawn2, cc.callFunc(this.callFun2.bind(this)));
        this.Anim[2].runAction(spawn1);
        this.Anim[3].runAction(seq);
        var _out = cc.fadeOut(.4);
        var _in = cc.fadeIn(.4);
        var _seq = cc.sequence(_out, _in);
        this.Anim[1].runAction(_seq.repeatForever());
      },
      callFun2: function callFun2() {
        console.log("\u9690\u85cf\u62d6\u5c3e");
        var js = this.Anim[2].getComponent("LogoVirus");
        js.init(374, 135, 100);
        js.Begin();
        js = this.Anim[3].getComponent("LogoVirus");
        js.init(410, -62, 80);
        js.Begin();
      },
      onLoad: function onLoad() {},
      moveOut: function moveOut() {
        this.reset();
        this.node.setPosition(cc.v2(-30, 452));
        this.node.runAction(cc.moveTo(.3, -30, 942).easing(cc.easeBackIn()));
      },
      moveIn: function moveIn() {
        this.reset();
        this.node.setPosition(cc.v2(-30, 942));
        this.node.runAction(cc.moveTo(.3, -30, 452).easing(cc.easeBackOut()));
      },
      reset: function reset() {
        this.Anim[0].opacity = 255;
        this.Anim[1].opacity = 255;
        this.Anim[1].setScale(cc.v2(0, 1));
        this.Anim[2].setPosition(cc.v2(284, 54));
        this.Anim[2].setScale(cc.v2(.2, .2));
        this.Anim[3].setPosition(cc.v2(292, 32));
        this.Anim[3].setScale(cc.v2(.2, .2));
        this.Anim.forEach(function(v) {
          v.stopAllActions();
        });
        var js = this.Anim[2].getComponent("LogoVirus");
        js.reset();
        js = this.Anim[3].getComponent("LogoVirus");
        js.reset();
      },
      play: function play() {
        var _out = cc.fadeOut(.2);
        var _in = cc.fadeIn(.2);
        var seq = cc.sequence(_out, _in);
        var allSeq = cc.sequence(seq, seq, cc.callFunc(this.callFun0.bind(this)));
        this.Anim[0].runAction(allSeq);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  MonsterHP: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2e55NcQa1EOY3q+/q1C6sm", "MonsterHP");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_Gold: cc.Label,
        m_tipVirus: cc.Label,
        m_HpProgress: cc.ProgressBar
      },
      onLoad: function onLoad() {
        window.gVirusHpView = this;
        this.m_HpProgress.progress = 1;
      },
      reset: function reset() {
        this.m_Gold.string = 0;
        this.m_tipVirus.string = "100%";
        this.m_HpProgress.progress = 1;
      },
      moveOut: function moveOut() {
        console.log("\u663e\u793a\u8fdb\u5ea6\u6761");
        var seq = cc.sequence(cc.delayTime(.5), cc.fadeIn(.5));
        this.node.runAction(seq);
      },
      moveIn: function moveIn() {
        console.log("\u9690\u85cf\u8fdb\u5ea6\u6761");
        this.node.runAction(cc.fadeOut(.5));
      },
      changeProgress: function changeProgress(progress) {
        this.m_HpProgress.progress = progress;
        this.m_Gold.string = 0;
        this.m_tipVirus.string = 100 * progress.toFixed(2) + "%";
      }
    });
    cc._RF.pop();
  }, {} ],
  Setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63e4dZD0LBCsZ+91ec5mzyj", "Setting");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      moveOut: function moveOut() {
        var moveTo = cc.moveTo(.3, cc.v2(-490, 388));
        this.node.runAction(moveTo.easing(cc.easeBackOut()));
      },
      moveIn: function moveIn() {
        var moveTo = cc.moveTo(.3, cc.v2(-417, 388));
        this.node.runAction(moveTo.easing(cc.easeBackOut()));
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  ShaderHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49d0auleM9GkaUgf+inMFoR", "ShaderHelper");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ShaderProperty = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var ShaderProperty = function() {
      function ShaderProperty(key, value) {
        this.key = "";
        this.value = 0;
        this.key = key;
        this.value = value;
      }
      __decorate([ property({
        readonly: true
      }) ], ShaderProperty.prototype, "key", void 0);
      __decorate([ property(cc.Float) ], ShaderProperty.prototype, "value", void 0);
      ShaderProperty = __decorate([ ccclass("ShaderProperty") ], ShaderProperty);
      return ShaderProperty;
    }();
    exports.ShaderProperty = ShaderProperty;
    var ShaderEnum = cc.Enum({});
    var ShaderHelper = function(_super) {
      __extends(ShaderHelper, _super);
      function ShaderHelper() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._effectName = "";
        _this._program = 0;
        _this._maxValues = [];
        _this._props = [];
        _this.material = null;
        return _this;
      }
      ShaderHelper_1 = ShaderHelper;
      Object.defineProperty(ShaderHelper.prototype, "program", {
        get: function() {
          return this._program;
        },
        set: function(value) {
          if (this._program === value) return;
          this._program = value;
          console.log(ShaderEnum[this._program]);
          this.applyEffect();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ShaderHelper.prototype, "max", {
        get: function() {
          var effectName = ShaderEnum[this._program];
          var item = this._maxValues.find(function(item) {
            return item.key === effectName;
          });
          item || (item = new ShaderProperty(effectName, 65535));
          return item.value;
        },
        set: function(value) {
          var effectName = ShaderEnum[this._program];
          var item = this._maxValues.find(function(item) {
            return item.key === effectName;
          });
          if (!item) {
            item = new ShaderProperty(effectName, 65535);
            this._maxValues.push(item);
          }
          item.value = value;
          true;
          return;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ShaderHelper.prototype, "props", {
        get: function() {
          return this._props;
        },
        set: function(value) {
          this._props = value;
          this.applyEffect();
        },
        enumerable: false,
        configurable: true
      });
      ShaderHelper.prototype.start = function() {
        var _this = this;
        false;
        this.applyEffect();
      };
      ShaderHelper.prototype.applyEffect = function() {
        var sprite = this.node.getComponent(cc.Sprite);
        if (!sprite) return;
        var effectName = ShaderEnum[this.program];
        var effectAsset = ShaderHelper_1.effectAssets.find(function(item) {
          return item._name === effectName;
        });
        if (!effectAsset) return;
        var material = new cc.Material();
        material.effectAsset = effectAsset;
        material.name = effectAsset.name;
        var defineUserTexture = !!effectAsset.shaders.find(function(shader) {
          return shader.defines.find(function(def) {
            return "USE_TEXTURE" === def.name;
          });
        });
        defineUserTexture && material.define("USE_TEXTURE", true);
        sprite.setMaterial(0, material);
        this.material = sprite.getMaterial(0);
        this.setProperty(effectAsset);
        this.node.emit("effect-changed", this, this.material);
      };
      ShaderHelper.prototype.setProperty = function(effectAsset) {
        var _this = this;
        var oldProps;
        var properties;
        var keys;
        var values;
        var _loop_1;
        var this_1;
        var i;
        var isShowMax;
        false;
        this._props.length && this._props.forEach(function(item) {
          return item.key && _this.material.setProperty(item.key, item.value || 0);
        });
        cc.Class.Attr.setClassAttr(ShaderHelper_1, "props", "visible", !!this._props.length);
      };
      ShaderHelper.prototype.next = function() {
        this.program = (this.program + 1) % ShaderHelper_1.effectAssets.length;
      };
      ShaderHelper.prototype.prev = function() {
        if (0 === this.program) {
          this.program = ShaderHelper_1.effectAssets.length - 1;
          return;
        }
        this.program = (this.program - 1) % ShaderHelper_1.effectAssets.length;
      };
      var ShaderHelper_1;
      ShaderHelper.effectAssets = null;
      __decorate([ property ], ShaderHelper.prototype, "_program", void 0);
      __decorate([ property({
        type: ShaderEnum
      }) ], ShaderHelper.prototype, "program", null);
      __decorate([ property({
        type: [ ShaderProperty ]
      }) ], ShaderHelper.prototype, "_maxValues", void 0);
      __decorate([ property({
        type: cc.Float,
        range: [ 0, 65535, .1 ]
      }) ], ShaderHelper.prototype, "max", null);
      __decorate([ property({
        type: [ ShaderProperty ]
      }) ], ShaderHelper.prototype, "_props", void 0);
      __decorate([ property({
        type: [ ShaderProperty ]
      }) ], ShaderHelper.prototype, "props", null);
      ShaderHelper = ShaderHelper_1 = __decorate([ ccclass, executeInEditMode ], ShaderHelper);
      return ShaderHelper;
    }(cc.Component);
    exports.default = ShaderHelper;
    cc.game.on(cc.game.EVENT_ENGINE_INITED, function() {
      cc.loader.loadResDir("effect", cc.EffectAsset, function(error, res) {
        ShaderHelper.effectAssets = res;
        var obj = {};
        var array = ShaderHelper.effectAssets.map(function(item, i) {
          obj[item._name] = -1;
          return {
            name: item._name,
            value: i
          };
        });
        ShaderEnum = cc.Enum(obj);
        cc.Class.Attr.setClassAttr(ShaderHelper, "program", "enumList", array);
      });
    });
    cc._RF.pop();
  }, {} ],
  ShaderMouse: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ed2cS4TFpGyo6y5mPlpF50", "ShaderMouse");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, executeInEditMode = _a.executeInEditMode;
    var Shader = function(_super) {
      __extends(Shader, _super);
      function Shader() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Shader.prototype.onLoad = function() {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on("effect-changed", function(sender, material) {
          if (material.effect.passes[0]._properties.iResolution) {
            var size = _this.node.getBoundingBox().size;
            material.effect.setProperty("iResolution", cc.v2(size.width, size.height));
            _this._material = material;
          } else _this._material = null;
        }, this);
      };
      Shader.prototype.onDestroy = function() {
        this.node.targetOff(this);
      };
      Shader.prototype._onTouchMove = function(event) {
        this._material && this._material.effect.setProperty("mouse", event.getLocation());
      };
      Shader = __decorate([ ccclass, executeInEditMode ], Shader);
      return Shader;
    }(cc.Component);
    exports.default = Shader;
    cc._RF.pop();
  }, {} ],
  ShaderNameLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cd0ffQe75Ddod5dqnEgLHx", "ShaderNameLabel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ShaderHelper_1 = require("./ShaderHelper");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.shaderHelper = null;
        return _this;
      }
      NewClass.prototype.start = function() {
        var _this = this;
        if (!this.shaderHelper) return;
        setTimeout(function() {
          var effectAsset = ShaderHelper_1.default.effectAssets[_this.shaderHelper.program];
          _this.getComponent(cc.Label).string = effectAsset.name;
        }, 1e3);
      };
      __decorate([ property(ShaderHelper_1.default) ], NewClass.prototype, "shaderHelper", void 0);
      NewClass = __decorate([ ccclass, executeInEditMode ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "./ShaderHelper": "ShaderHelper"
  } ],
  ShaderTime: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5866cn/yXtO664c25gnwSdk", "ShaderTime");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ShaderHelper_1 = require("./ShaderHelper");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShaderTime = function(_super) {
      __extends(ShaderTime, _super);
      function ShaderTime() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._shaderHelper = null;
        _this._max = 65535;
        _this.step = .01;
        _this._start = 0;
        return _this;
      }
      ShaderTime.prototype.start = function() {
        this._shaderHelper = this.node.getComponent(ShaderHelper_1.default);
      };
      ShaderTime.prototype.update = function(dt) {
        if (!this.node.active) return;
        this._shaderHelper = this.node.getComponent(ShaderHelper_1.default);
        var material = this._shaderHelper.material;
        material && material.effect.passes[0]._properties.time && this._setShaderTime();
      };
      ShaderTime.prototype._setShaderTime = function() {
        var start = this._start;
        start > this._shaderHelper.max && (start = 0);
        start += this.step;
        this._shaderHelper.material.effect.setProperty("time", start);
        this._start = start;
      };
      __decorate([ property ], ShaderTime.prototype, "_max", void 0);
      __decorate([ property ], ShaderTime.prototype, "step", void 0);
      ShaderTime = __decorate([ ccclass ], ShaderTime);
      return ShaderTime;
    }(cc.Component);
    exports.default = ShaderTime;
    cc._RF.pop();
  }, {
    "./ShaderHelper": "ShaderHelper"
  } ],
  SpriteMate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11863md5kZD/owNByitxi42", "SpriteMate");
    "use strict";
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "\u3010\u594e\u7279\u5c14\u3011\u901a\u7528\u7ec4\u4ef6/SpriteIndex(\u56fe\u7247\u5207\u6362)"
      },
      properties: {
        spriteFrames: [ cc.SpriteFrame ],
        _index: 0,
        index: {
          type: cc.Integer,
          set: function set(value) {
            if (value < 0) return;
            this._index = value % this.spriteFrames.length;
            var sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = this.spriteFrames[this._index];
          },
          get: function get() {
            return this._index;
          }
        }
      },
      next: function next() {
        this.index++;
      }
    });
    cc._RF.pop();
  }, {} ],
  TestBtn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74409Wpr3REPbp+0qqfHt1C", "TestBtn");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        colorSpritNode: cc.Node
      },
      changeColor: function changeColor() {
        console.log("\u70b9\u51fb\u4fee\u6539\u989c\u8272");
        this.colorSpritNode.color = cc.color(255, 153, 255, 255);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Tip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17f0b3MqWRFFpclM/tIL7lz", "Tip");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      reset: function reset() {
        console.log("\u91cd\u7f6e");
        this.node.opacity = 255;
      },
      play: function play() {
        console.log("play");
        var seq = cc.sequence(cc.rotateTo(.3, -15), cc.rotateTo(.3, 15), cc.rotateTo(.3, -15), cc.rotateTo(.3, 15), cc.rotateTo(.3, 0), cc.delayTime(2));
        this.node.runAction(seq.repeatForever());
      },
      moveOut: function moveOut() {
        this.node.runAction(cc.fadeOut(.3).easing(cc.easeBackOut()));
      },
      moveIn: function moveIn() {
        this.node.runAction(cc.fadeIn(.3).easing(cc.easeBackOut()));
      }
    });
    cc._RF.pop();
  }, {} ],
  Top: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ae2fZcZWBB3Lm506cAhdki", "Top");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_GoldNode: cc.Node,
        m_labGold: cc.Label
      },
      onLoad: function onLoad() {
        this.updateData();
      },
      moveOut: function moveOut() {
        this.node.setPosition(cc.v2(0, 736));
        this.node.runAction(cc.moveTo(.2, -30, 942).easing(cc.easeBackIn()));
      },
      moveIn: function moveIn() {
        this.node.setPosition(cc.v2(0, 942));
        this.node.runAction(cc.moveTo(.2, 0, 736).easing(cc.easeBackOut()));
      },
      getGoldNode: function getGoldNode() {
        return this.m_GoldNode;
      },
      updateData: function updateData() {
        this.m_labGold.string = goldCrarryBit(window.gDataCtl.getGold());
      }
    });
    cc._RF.pop();
  }, {} ],
  TouchControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d0e6UfwVtL8aoT6t8md4kS", "TouchControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_BG: cc.Node
      },
      ctor: function ctor() {
        this.m_isCanTouchMove = false;
        this.m_isPlaying = false;
      },
      onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd, this);
      },
      TouchStart: function TouchStart() {
        var _this = this;
        this.m_BG.runAction(cc.fadeOut(.5));
        console.log("TouchStart");
        window.gAirPlane.BeginFire();
        this.scheduleOnce(function() {
          _this.m_isCanTouchMove = true;
        }, .5);
        window.gVirusMake.sleepVirus(false, 10);
        if (this.m_isPlaying) return;
        this.m_isPlaying = true;
        window.gGameCtl.Action(ACTION_MOVE_OUT);
      },
      TouchMove: function TouchMove(evevt) {
        if (!this.m_isCanTouchMove) return;
        var pos = evevt.getDelta();
        window.gGameCtl.moveAirPlane(pos);
        console.log("TouchMove");
      },
      TouchEnd: function TouchEnd() {
        window.gAirPlane.EndFire();
        this.m_BG.runAction(cc.fadeIn(.5));
        window.gVirusMake.sleepVirus(true, 10);
        console.log("TouchEnd");
      }
    });
    cc._RF.pop();
  }, {} ],
  Virus0: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c99dHTM95Jd7s5QMosCPaL", "Virus0");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_labHp: cc.Label,
        m_Back: [ cc.Node ]
      },
      onLoad: function onLoad() {
        this.m_Back[0].runAction(cc.rotateBy(5, 360).repeatForever());
        this.m_Back[1].runAction(cc.rotateBy(5, -360).repeatForever());
        this.setHp(99);
        this.setColor(new cc.Color(255, 130, 113));
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        100 == other.tag && this.hit();
      },
      hit: function hit() {
        this.m_HP -= 1;
        this.setHp(this.m_HP);
        this.m_HP <= 0 && (this.node.active = false);
      },
      setColor: function setColor(color) {
        setVirusColor(this.node, color);
      },
      setHp: function setHp(num) {
        this.m_HP = num;
        this.m_labHp.string = num;
      },
      update: function update(dt) {
        var dir = 100 * dt;
        this.node.y -= dir;
      }
    });
    cc._RF.pop();
  }, {} ],
  VirusMask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "05b6b+BHYZG2p2ovKmZJ4Yv", "VirusMask");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        m_VirusPrefab: [ cc.Prefab ],
        m_animDie: cc.Prefab,
        m_VirusParentl: cc.Node
      },
      ctor: function ctor() {},
      onLoad: function onLoad() {
        window.gVirusMake = this;
        this.dieAnimPool = new cc.NodePool();
        this.virusPool = [];
        for (var i = 0; i < this.m_VirusPrefab.length; i++) this.virusPool[i] = new cc.NodePool();
        this.m_BriefHp = 0;
      },
      begin: function begin() {
        this.m_Brief = 0;
        var level = window.gDataCtl.GetCurLevelDesign();
        this.m_AllHp = 0;
        console.log(window.gLevelDesign[level], window.gLevelDesign, level, "level");
        for (var i = 0; i < window.gLevelDesign[level].hp.length; i++) this.m_AllHp += window.gLevelDesign[level].hp[i];
        this.m_CurHp = this.m_AllHp;
        window.gVirusHpView.changeProgress(1);
        this.nextBrief();
      },
      nextBrief: function nextBrief() {
        var level = window.gDataCtl.GetCurLevelDesign();
        if (this.m_Brief >= window.gLevelDesign[level].hp.length) return;
        var hp = window.gLevelDesign[level].hp[this.m_Brief];
        this.m_BriefHp += hp;
        var hpMin = window.gLevelDesign[level].hpMin;
        var hpMax = window.gLevelDesign[level].hpMax;
        for (var i = 0; hp > 0; i++) {
          var type = random(0, window.gLevelDesign[level].virus.length);
          var node = this.createVirus(type);
          var js = node.getComponent("" + type);
          var randHp = random(hpMin, hpMax);
          js.setHp(randHp);
          hp -= randHp;
        }
        this.m_Brief++;
      },
      moveOut: function moveOut() {
        this.scheduleOnce(function() {
          this.begin();
        }.bind(this), 1.5);
      },
      createVirus: function createVirus(id) {
        var virus = null;
        virus = this.virusPool[id].size() > 0 ? this.virusPool[id].get() : cc.instantiate(this.m_VirusPrefab[id]);
        virus.parent = this.m_VirusParentl;
        var js = virus.getComponent("" + id);
        js.init();
        virus.id = id;
        return virus;
      },
      onVirusKilled: function onVirusKilled(virus) {
        var id = virus.id;
        this.virusPool[id].put(virus);
      },
      createDieAnim: function createDieAnim(node) {
        var pos = node.getPosition();
        var scale = node.getScale();
        var color = node.color;
        var anim;
        anim = this.dieAnimPool.size() > 0 ? this.dieAnimPool.get() : cc.instantiate(this.m_animDie);
        anim.parent = this.m_VirusParentl;
        anim.x = pos.x;
        anim.y = pos.y;
        anim.setScale(cc.v2(2 * scale, 2 * scale));
        anim.color = color;
        var js = anim.getComponent(cc.Animation);
        js.playOver = function() {
          this.onDieAnimKilled(anim);
        }.bind(this);
        js.play("die");
      },
      onDieAnimKilled: function onDieAnimKilled(node) {
        this.dieAnimPool.put(node);
      },
      sleepVirus: function sleepVirus(sleep, pro) {
        var children = this.m_VirusParentl.children;
        for (var i = 0; i < children.length; i++) {
          var node = children[i];
          var js = node.getComponent("" + node.id);
          js && js.sleep(sleep, pro);
        }
      },
      hit: function hit(value) {
        this.m_BriefHp -= value;
        this.m_CurHp -= value;
        this.m_BriefHp < 50 && this.nextBrief();
        window.gVirusHpView.changeProgress(this.m_CurHp / this.m_AllHp);
      }
    });
    cc._RF.pop();
  }, {} ],
  color: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "231697imm1At5A2CgAdLWPe", "color");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  data: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ebaaxH1YdEQbGqALFZQcPv", "data");
    "use strict";
    var data = cc.Class({
      ctor: function ctor() {
        this.gData = {};
        this.gLevelDesign = [ {
          hp: 0
        }, {
          hp: [ 200, 200, 200 ],
          virus: [ 0 ],
          hpMin: 1,
          hpMax: 50
        } ];
      },
      del: function del() {
        cc.sys.localStorage.removeItem("data");
        this.load();
      },
      save: function save() {
        var str = JSON.stringify(this.gData);
        cc.sys.localStorage.setItem("data", str);
      },
      load: function load() {
        var str = cc.sys.localStorage.getItem("data");
        this.gData = str ? JSON.parse(str) : {};
        return this.gData;
      },
      AddGold: function AddGold(gold) {
        null == this.gData.m_Gold && (this.gData.m_Gold = 0);
        this.gData.m_Gold += gold;
        this.save();
      },
      getGold: function getGold() {
        null == this.gData.m_Gold && (this.gData.m_Gold = 0);
        return this.gData.m_Gold;
      },
      AddGetGold: function AddGetGold(gold) {
        null == this.gData.m_GetGold && (this.gData.m_GetGold = 0);
        this.gData.m_GetGold += gold;
        this.save();
      },
      GetGetGold: function GetGetGold() {
        null == this.gData.m_GetGold && (this.gData.m_GetGold = 0);
        return this.gData.m_GetGold;
      },
      setColdAddTime: function setColdAddTime(time) {
        this.gData.m_GetGoldTime = time;
      },
      getColdAddTime: function getColdAddTime() {
        null == this.gData.m_GetGoldTime && (this.gData.m_GetGoldTime = 3);
        return this.gData.m_GetGoldTime;
      },
      setAwardGold: function setAwardGold(gold) {
        this.gData.m_AwardGold = gold;
        this.save();
      },
      getAwardGold: function getAwardGold() {
        null == this.gData.m_AwardGold && (this.gData.m_AwardGold = 4);
        return this.gData.m_AwardGold;
      },
      addTaskGold: function addTaskGold(gold) {
        null == this.gData.m_TaskGold && (this.gData.m_TaskGold = 0);
        this.gData.m_TaskGold += gold;
        this.save();
      },
      clearTaskGold: function clearTaskGold() {
        this.gData.m_TaskGold = 0;
        this.save();
      },
      getTaskGold: function getTaskGold() {
        null == this.gData.m_TaskGold && (this.gData.m_TaskGold = 0);
        return this.gData.m_TaskGold;
      },
      GetCurLevelDesign: function GetCurLevelDesign() {
        null == this.gData.m_LevelDesignNum && (this.gData.m_LevelDesignNum = 1);
        return this.gData.m_LevelDesignNum;
      },
      AddCurLevelDesign: function AddCurLevelDesign() {
        null == this.gData.m_LevelDesignNum && (this.gData.m_LevelDesignNum = 1);
        this.gData.m_LevelDesignNum++;
        this.save();
      }
    });
    window.gDataCtl = new data();
    window.gDataCtl.load();
    window.gData = window.gDataCtl.gData;
    window.gLevelDesign = window.gDataCtl.gLevelDesign;
    cc._RF.pop();
  }, {} ],
  leveDesign: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03812rHpiNM2prn9hW/YNOF", "leveDesign");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        item: [ cc.Node ]
      },
      ctor: function ctor() {
        console.log("\u5b50\u7684ctor");
        this.basePos = [];
      },
      onLoad: function onLoad() {
        var _this = this;
        console.log("\u5b50\u7684onLoad");
        window.gLevelDesignCtl = this;
        this.item.forEach(function(v, i) {
          return _this.basePos[i] = v.getPosition();
        });
      },
      reset: function reset() {
        var _this2 = this;
        var level = gDataCtl.GetCurLevelDesign();
        var starLevel = level - 2;
        this.item.forEach(function(v, index) {
          null != _this2.basePos[index] && _this2.item[index].setPosition(_this2.basePos[index]);
          _this2.item[index].setScale(.6, .6);
          _this2.item[index].opacity = 255;
          var js = v.getComponent("levelItem");
          js.setNumber(starLevel + index);
          js.setIndex(index);
        });
        this.item[2].setScale(cc.v2(1, 1));
        this.item[0].opacity = 0;
        this.item[4].opacity = 0;
      },
      moveOut: function moveOut() {
        var moveTo = cc.moveTo(.3, cc.v2(0, 665));
        var scaleTo = cc.scaleTo(.3, .4, .4);
        var spa = cc.spawn(moveTo, scaleTo);
        this.node.runAction(spa.easing(cc.easeBackOut()));
      },
      moveIn: function moveIn() {
        var moveTo = cc.moveTo(.3, cc.v2(0, 168));
        var scaleTo = cc.scaleTo(.3, 1, 1);
        var spa = cc.spawn(moveTo, scaleTo);
        this.node.runAction(spa.easing(cc.easeBackOut()));
      },
      play: function play() {},
      NextLevel: function NextLevel() {
        var _this3 = this;
        this.item.forEach(function(v, i) {
          var moveTo = cc.moveTo(.5, cc.v2(_this3.basePos[i - 1]));
          if (1 == i) {
            var out = cc.fadeOut(.5);
            var spawn = cc.spawn(out, moveTo);
            v.runAction(spawn);
          } else if (2 == i) {
            var scale = cc.scaleTo(.5, .6);
            var _spawn = cc.spawn(scale, moveTo);
            v.runAction(_spawn);
          } else if (3 == i) {
            var _scale = cc.scaleTo(.5, 1);
            var _spawn2 = cc.spawn(_scale, moveTo);
            v.runAction(_spawn2);
          } else if (4 == i) {
            var _in = cc.fadeIn(.5);
            var _spawn3 = cc.spawn(_in, moveTo);
            v.runAction(_spawn3);
          }
        });
        var dly = cc.delayTime(.5);
        var seq = cc.sequence(dly, cc.callFunc(function() {
          var level = gDataCtl.AddCurLevelDesign();
          _this3.reset();
        }));
        this.node.runAction(seq);
      },
      start: function start() {
        console.log("\u5b50\u7684start");
      }
    });
    cc._RF.pop();
  }, {} ],
  levelItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3b0ecfc9NBOLhld0nBM6qX", "levelItem");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        boss: cc.Node,
        number: cc.Label,
        point: [ cc.Node ]
      },
      onLoad: function onLoad() {},
      setNumber: function setNumber(num) {
        if (num <= 0) return this.node.opacity = 0;
        this.number.string = num;
        this.setImgBoss(num % 3 == 0);
      },
      setImgBoss: function setImgBoss(show) {
        this.boss.active = show;
      },
      setIndex: function setIndex(index) {
        this.index = index;
        1 == this.index || 2 == this.index ? this.SetPointShow(true) : this.SetPointShow(false);
        if (1 == index) {
          this.point[0].opacity = 255;
          this.point[1].opacity = 0;
        } else if (2 == index) {
          this.point[0].opacity = 0;
          this.point[1].opacity = 255;
        }
      },
      SetPointShow: function SetPointShow(bShow) {
        this.point[0].opacity = bShow ? 255 : 0;
        this.point[1].opacity = bShow ? 255 : 0;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "FullScreen", "ShaderHelper", "ShaderMouse", "ShaderNameLabel", "ShaderTime", "SpriteMate", "AirAutoPlay", "AirPlane", "Bg", "Bottom", "Bullet", "ClickGet", "GameControl", "Gun", "Logo", "LogoVirus", "MonsterHP", "Setting", "TestBtn", "Tip", "Top", "TouchControl", "VirusMask", "data", "leveDesign", "levelItem", "0", "Virus0", "color" ]);