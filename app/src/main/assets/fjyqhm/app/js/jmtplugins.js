var u = navigator.userAgent;
var i = u.indexOf("mzt/");
var v = parseInt(u.substring(i + 4, i + 6));
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || v < 49) {
    /*
     * link plugins
     * version : 3.2
     * author : yulsh
     * date : 2015-4-9
     */

    ;
    (function(window) {
        /**
            Link专属插件类
            @class app.link
        */
        window.app.link = window.app.link || {};

        /*=====================================用户登陆========================================*/
        /**
                该接口用于获取Link登陆后的用户信息
                  具体包括： loginId,password,userId,db_loginId,userName,sex,email,orgName,picture,picture_local等信息
            @method app.link.getLoginInfo
            @static
            @param callback {Function} 回调函数，返回json对象
            @example
        		app.link.getLoginInfo(function(result){
        			app.alert(result);
        		});
        */
        app.link.getLoginInfo = function(callback, failCallback) {
            var successCallback = function(result) {
                if (result) {
                    callback(app.utils.toJSON(result));
                } else {
                    failCallback(app.utils.toJSON("{'error':'true','msg':'用户不存在'}"));
                }
            };
            var cordovaFailCallback = function(msg) {
                failCallback(app.utils.toJSON("{'error':'true','msg':'" + msg + "'}"));
            }
            Cordova.exec(successCallback, cordovaFailCallback, "LinkPlugin", "getLoginInfo", []);
        }

        // successCallback，用户继续操作回调（wifi网络下自动回调此方法）
        // errorCallback，用户取消操作回调
        app.link.networType = function(successCallback, errorCallback) {
            Cordova.exec(successCallback, errorCallback, "LinkPlugin", "getNetWorkStatus", []);
        }
        /**
         * 分享网页
         * title 为分享是网页标题
         * desc 为摘要信息
         * thumbUrl 缩略图地址
         * targetUrl 网页地址
         * successCallback 成功回调
         * errorCallback 失败回调
         */
        app.link.shareWebPage = function(title, desc, thumbUrl, targetUrl, successCallback, errorCallback) {
            var params = {
                webpage: {
                    title: title,
                    targetUrl: targetUrl,
                    desc: desc,
                    thumbUrl: thumbUrl
                }
            };
            Cordova.exec(successCallback, errorCallback, "ShareSDKPlugin", "uishare", [params]);
        }

        /**
         * 跳转到登录界面，不管当前有没有用户登录
         */
        app.link.goLogin = function(successCallback, failCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            var cordovaFailCallback = function(result) {
                failCallback(result);
            }
            Cordova.exec(cordovaSuccessCallback, cordovaFailCallback, "LinkPlugin", "goLogin", [param]);
        }

        /**
         * 获取移动端app的版本号
         **/
        app.link.getVersion = function(callback) {
            var successCallback = function(result) {
                callback(app.utils.toJSON(result));
            };
            Cordova.exec(successCallback, null, "LinkPlugin", "getVersion", []);
        }

        /**
         * 使用原生人脸识别
         * param:js对象（含多个属性）
         **/
        app.link.getFaceCheck = function(callback, failCallback, param) {
            var successCallback = function(result) {
                callback(JSON.parse(result));
            };
            var cordovaFailCallback = function(result) {
                failCallback(JSON.parse(result));
            }
            Cordova.exec(successCallback, cordovaFailCallback, "LinkPlugin", "getFaceCheck", [param]);
        }

        /**
         * 调用原生高级认证
         * cordovaSuccessCallback：高级认证成功
         * cordovaFailCallback：高级认证失败
         */
        app.link.getSeniorAuth = function(successCallback, failCallback) {
            var cordovaSuccessCallback = function(result) {
                successCallback(result);
            };
            var cordovaFailCallback = function(result) {
                failCallback(result);
            }
            Cordova.exec(cordovaSuccessCallback, cordovaFailCallback, "LinkPlugin", "getSeniorAuth", []);
        }

        /**
         * 调用原生静默认证
         * callback： 返回静默认证过程中的图片
         */
        app.link.getSilentAuth = function(callback, failCallback, param) {
            var successCallback = function(result) {
                callback(JSON.parse(result));
            };
            var cordovaFailCallback = function(result) {
                failCallback(JSON.parse(result));
            }
            Cordova.exec(successCallback, cordovaFailCallback, "LinkPlugin", "getSilentAuth", [param]);
        }

        /**
         * 调用原生百度地图
         * cordovaSuccessCallback：获取具体地址，经纬度json串
         */
        app.link.getBaiduMap = function(successCallback) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "LinkPlugin", "getBaiduMap", []);
        }

        /**
         * 调用服务获取城市信息
         * cordovaSuccessCallback：成功回调，JSONObject为用户信息，是JSONObject类型
         */
        app.link.getCurrentCity = function(successCallback, errorCallback) {
            Cordova.exec(successCallback, errorCallback, "LinkPlugin", "getCurrentCity", []);
        }


        /**
         * 调用手机拍照功能
         * cordovaSuccessCallback:获取图片（base64）
         */
        app.link.getTakePictures = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "LinkPlugin", "getTakePictures", [param]);
        }

        /**
         * 调用手势解锁
         * cordovaSuccessCallback:
         */
        app.link.getGestureUnlock = function(successCallback) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "LinkPlugin", "getGestureUnlock", []);
        }


        /**
         * 调用地图导航
         */
        app.link.getMapNavigator = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "LocationPlugin", "mapNavigator", [param]);
        }


        /**
         * 打开新页面
         */
        app.link.goOpenNewPageOrExit = function(param, successCallback) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "Page", "goOpenNewPageOrExit", [param]);
        }

        /**
         * 获取终端ip
         */
        app.link.getIpAddress = function(successCallback) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "Page", "getIpAddress", []);
        }

        /**
         * 平安银行支付
         */
        app.link.openPingAnPay = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "Page", "openPingAnPay", [param]);
        }

        /**
         * 文件上传
         * 2：个人证照类 3：咨询投诉类 4：意见征集
         */
        app.link.uploadFile = function(successCallback, errorCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            var cordovaErrorCallback = function(result) {
                errorCallback(result);
            };
            Cordova.exec(cordovaSuccessCallback, cordovaErrorCallback, "Page", "uploadFile", [param]);
        }

        /**
         * 临时操作
         * 相关参数请参照交互文档
         */
        app.link.temporaryOperation = function(param) {
            Cordova.exec(null, null, "Page", "temporaryOperation", [param]);
        }

        /**
         * 打开原生视频录制
         * cordovaSuccessCallback：返回调用接口的返回结果
         */
        app.link.getFile = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "getFile", [param]);
        }

        /**
         * 获取通讯录信息
         * cordovaSuccessCallback:获取用户名和手机号/电话号
         */
        app.link.getAddressBookList = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "getAddressBookList", [param]);
        }


        /**
         * 语音识别
         */
        app.link.speechRecognition = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "speechRecognition", [param]);
        }

        /**
         * html5获取设备信息
         */
        app.link.getDeviceInfo = function(successCallback) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "h5GetDeviceInfo", []);
        }

        /**
         * 跳转至指定原生页面
         * param:参照文档传入指定参数值
         */
        app.link.startNativePage = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "startNativePage", [param]);
        }

        /**
         * 打开原生视频录制
         * cordovaSuccessCallback：返回调用接口的返回结果
         */
        app.link.getMediaRecorder = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "getMediaRecorder", [param]);
        }

        /**
         * 打开其他app
         */
        app.link.jumpOtherApp = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "jumpOtherApp", [param]);
        }

        /**
         * 云闪付H5支付
         */
        app.link.wapPay = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "wapPay", [param]);
        }

        /**
         * 做支付宝认证
         */
        app.link.doAlipayVerify = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "doAlipayVerify", [param]);
        }

        /**
         * 去支付宝支付
         */
        app.link.doAlipayPayment = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "doAlipayPayment", [param]);
        }

        /**
         * confirm
         */
        app.link.confirm = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "confirm", [param]);
        }


        /**
         * prompt
         */
        app.link.prompt = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "prompt", [param]);
        }

        /**
         * softInput
         */
        app.link.softInput = function(param) {
            Cordova.exec(null, null, "PhonePlugin", "softInput", [param]);
        }

        /**
         * clickEventData
         */
        app.link.clickEventData = function(param) {
            Cordova.exec(null, null, "PhonePlugin", "clickEventData", [param]);
        }

        /**
         * 保存图片/视频到系统
         */
        app.link.saveFileToGallery = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "saveFileToGallery", [param]);
        }

        /**
         * 查看/签署pdf文件
         */
        app.link.showPDF = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "showPDF", [param]);
        }

        /**
         * 查看edc文件
         */
        app.link.showEDC = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "showEDC", [param]);
        }

        /**
         * OCR
         */
        app.link.getOCR = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "getOCR", [param]);
        }

        /**
         * 调整屏幕亮度
         */
        app.link.adjustBrightness = function(param) {
            Cordova.exec(null, null, "PhonePlugin", "adjustBrightness", [param]);
        }

        /**
         * 回复屏幕亮度
         */
        app.link.resetBrightness = function() {
            Cordova.exec(null, null, "PhonePlugin", "resetBrightness", []);
        }

        /**
         *播放或录制音频
         */
        app.link.playOrRecordAudio = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "playOrRecordAudio", [param]);
        }

        /**
         *播放或录制视频
         */
        app.link.playOrRecordVideo = function(successCallback, param) {
            var cordovaSuccessCallback = function(result) {
                successCallback(JSON.parse(result));
            };
            Cordova.exec(cordovaSuccessCallback, null, "PhonePlugin", "playOrRecordVideo", [param]);
        }

        /**
         * 公用方法(param中methodCode进行拓展)
         */
        app.link.publicMethod = function(callback, failCallback, param) {
            var successCallback = function(result) {
                callback(JSON.parse(result));
            };
            var cordovaFailCallback = function(result) {
                failCallback(JSON.parse(result));
            }
            Cordova.exec(successCallback, cordovaFailCallback, "LinkPlugin", "publicMethod", [param]);
        }

    })(window);
}