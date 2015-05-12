var cc = require("../cocos/index.js");

cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    var designSize = cc.size(480, 800);
    var screenSize = cc.view.getFrameSize();

    if(!cc.sys.isNative && screenSize.height < 800){
        designSize = cc.size(320, 480);
        cc.loader.resPath = "res/imgs/battle/Normal";
    }else{
        cc.loader.resPath = "res/imgs/battle/HD";
    }
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);

    //load resources
    cc.LoaderScene.preload([ "HelloWorld.jpg", "CloseNormal.png", "CloseSelected.png" ], function () {
        var MyScene = require("../cocos/scene.js");

        cc.director.runScene(new MyScene());
    }, this);
};

cc.game.run();

module.exports = {
    start : function(){

    }
};