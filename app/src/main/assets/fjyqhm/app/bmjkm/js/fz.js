//显示处理
function showInit(data) {
    var us = new UncommonWordShow(
        [data.key], {
            tid: data.tid,
            token: data.token,
            onlyUncc: false,
            events: {
                beforeLoad: function() {},
                loading: function() {},
                loaded: function() {},
                onError: function() {},
                loadStyle: function(res) {}
            }
        });
}
//方正字库
var kb = "";
//触发事件，隐藏生僻字键盘
$("body").on("tap", ".mui-content", function() {
    kb.hide();
});
//录入生僻字
function dkspzjp() {
    kb.show();
}
//初始化生僻字库
function initSpz(data) {
    kb = new FzKeyboard('#name', {
        tid: data.tid,
        token: data.token,
        onlyUncc: false,
        css: 'my-css-name',
        bottom: 30,
        position: 'centre',
        positionRange: 80,
        drag: true,
        hideAnimate: true,
        zIndex: 1000,
        width: 566,
        fzKeyboardHeight: 300,
        limitWords: 100,
        scene: "system01",
        events: {
            hide: function() {

            },
            inputComplet: function(str) {

            },
            init: function() {

            },
            initFont: function() {

            }
        }
    });
}