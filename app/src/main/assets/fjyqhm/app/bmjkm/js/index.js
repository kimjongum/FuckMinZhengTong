//接口异常下刷新当前页面，重新加载数据
function sxym() {
    window.location.reload();
}
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
//429，访问量过大倒计时
function fwlcountdown(t) {
    $("#nosxym").text("去生成(" + t + "s)");
    t--;
    if (t == 0) {
        $("#nosxym").hide();
        $("#sxym").show();
    } else {
        setTimeout(function() {
            fwlcountdown(t)
        }, 1000)
    }
}
//设置自动刷新时间
function countdown() {
    s--;
    if (s == 0) {
        refreshEwm();
        countdown()
    } else {
        setTimeout(function() {
            countdown(s)
        }, 1000)
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
    setTimeout(function() {
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
    if (resultData.jkzt == "1") {
        $("#noP").show();
        $("#okP").hide();
        var qrnode1 = new AraleQRCode({
            render: 'canvas',
            correctLevel: 0,
            text: ewmVal,
            size: '200',
            background: '#fff',
            foreground: '#9d0a0f',
            pdground: '#9d0a0f',
            image: "images/logo2.png",
            imageSize: '40'
        });
        document.getElementById('newQrcode').appendChild(qrnode1);
    } else {
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
            image: "images/logo1.png",
            imageSize: '40'
        });
        document.getElementById('newQrcode').appendChild(qrnode2);
    }
    //是否显示核酸检测
    if (resultData.HSJCSJ != null && resultData.HSJCJG != "") {
        var startTiem = new Date(resultData.HSJCSJ).getTime();
        var endTime = new Date().getTime()
        var sjc = parseInt((endTime - startTiem) / (1000 * 3600 * 24));
        if (resultData.jkzt != "1" && sjc >= 0 && sjc < 7) {
            $("#hsjcjg").html(resultData.HSJCSJ + "&nbsp核酸检测：" + resultData.HSJCJG);
            $("#hsjcjg").show();
        }
    } else {
        $("#hsjcjg").hide();
        $("#hsjcjg").html("");
    }
    //拼接随机码
    var code = resultData.RANDOM_CODE;
    if (code != null && code != "") {
        var code = resultData.RANDOM_CODE.substring(0, 4) + "&nbsp;" + resultData.RANDOM_CODE.substring(4, 8) +
            "&nbsp;" + resultData.RANDOM_CODE.substring(8, 12);
    }
    code = getCode();
    $("#randCode").html(code);
    $("#tipName").text(enName);
    $("#tipIdcard").text(enIdcard);
    setTime(); //设置时间
    if (!/^[\u4e00-\u9fa5]+$/i.test(deName)) {
        getFzspz("#tipName");
    }
}