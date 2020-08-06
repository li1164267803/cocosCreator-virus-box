const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    fullScreen() {
        if (cc.sys.isNative) {
            return;
        }
        let el = document.documentElement;
        let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
        if(rfs) {
            rfs.call(el);
        };
    }

    exitFullScreen() {
        if (cc.sys.isNative) {
            return;
        }
        let efs = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen;      
        if(efs) {
            efs.call(document);
        };
    }

    // update (dt) {}
}
