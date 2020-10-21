
//切换用户信息的显示隐藏
function showUserInfo() {
    if ($("#showUserInfo").hasClass("on")) {
        $("#showUserInfo").removeClass("on");
        $("#tipName").text(enName);
        $("#tipIdcard").text(enIdcard);
    } else {
        $("#showUserInfo").addClass("on");
        $("#tipName").text(deName);
        $("#tipIdcard").text(deIdcard);
    }
}

//拉码失败后处理数据
function sbDetail() {
    //设置显示
    $(".youma").hide();
    $(".wuma").show();
    $("#img1").show();
    $("#noP").hide();
    $("#okP").hide();
    $("#tsxx").hide();
    $(".eui-fBtn").hide();
    $("#wtrdnBtn").hide();
    $("#hsjc").hide();
}
//补0操作
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}
//根据时间搓获取时间
function getMyDate(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(), //年
        oMonth = oDate.getMonth() + 1, //月
        oDay = oDate.getDate(), //日
        oHour = oDate.getHours(), //时
        oMin = oDate.getMinutes(), //分
        oSen = oDate.getSeconds(), //秒
        oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
    return oTime;
}
//自动刷新时间
function setTime() {
    var oDate = getMyDate(new Date().getTime());
    $("#otime").html(oDate);
    setTimeout(function () {
        setTime()
    }, 1000)
}
//获取随机串
function getCode() {
    var code = "";
    for (var i = 0; i < 12; i++) {
        code += Math.floor(Math.random() * 10);
        if ((i + 1) % 4 == 0) {
            code += " ";
        }
    }
    return code;
}
//拉码成功后处理数据
function cgDetail(resultData) {
    //设置用户信息
    deName = resultData.name;
    deIdcard = resultData.idcard;
    enName = "*" + resultData.name.substring(1);
    var len = resultData.idcard.length;
    var str = "";
    for (var i = 0; i < len - 5; i++) {
        str += "*";
    }
    enIdcard = resultData.idcard.substring(0, 2) + str + resultData.idcard.substring(len - 3, len);
    //设置显示
    $("#newQrcode").empty();
    $(".youma").show();
    $(".wuma").hide();
    $("#img1").hide();
    $("#tsxx").show();
    $(".eui-fBtn").show();
    //拼接码内容
    //var oDate = getMyDate(new Date().getTime());
    var ewmVal = resultData.QR_CODE + "|" + new Date().getTime();

    $("#okP").show();
    $("#noP").hide();
    var qrnode2 = new AraleQRCode({
        render: 'canvas',
        correctLevel: 0,
        text: ewmVal,
        size: '200',
        background: '#fff',
        foreground: '#00736a',
        pdground: '#00736a',
        image: "data:image/png;base64,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",
        imageSize: '40'
    });
    document.getElementById('newQrcode').appendChild(qrnode2);


    //拼接随机码
    var code = resultData.RANDOM_CODE;
    if (code != null && code != "") {
        var code = resultData.RANDOM_CODE.substring(0, 4) + "&nbsp;" + resultData.RANDOM_CODE.substring(4, 8)
            + "&nbsp;" + resultData.RANDOM_CODE.substring(8, 12);
    }
    code = getCode();
    $("#randCode").html(code);
    $("#tipName").text(enName);
    $("#tipIdcard").text(enIdcard);
    setTime();  //设置时间

}