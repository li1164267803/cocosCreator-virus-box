/**
 * 精灵切换
 */

cc.Class({
    extends: cc.Component,
    editor: {
        menu: '【奎特尔】通用组件/SpriteIndex(图片切换)',
    },
    properties: {
        spriteFrames: [cc.SpriteFrame],

        _index: 0,
        index: {
            type: cc.Integer,
            set(value) {
                if (value < 0) {
                    return;
                }
                this._index = value % this.spriteFrames.length;
                let sprite = this.node.getComponent(cc.Sprite);
                sprite.spriteFrame = this.spriteFrames[this._index];
            },
            get() {
                return this._index;
            }
        }
    },

    next() {
        this.index++
    }
});
