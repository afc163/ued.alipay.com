define("alipay/share/0.1.2/share-debug", [ "$-debug" ], function(require, exports, module) {
    var Share;
    var jQuery = require("$-debug");
    var defaults, mapping;
    // 默认配置
    defaults = {
        container: null,
        service: [],
        param: {
            title: "",
            url: "",
            pic: "",
            source: "支付宝"
        },
        triggerClass: "ui-icon-sns"
    };
    // 各个服务分享接口的匹配关系
    mapping = {
        // 新浪微博
        // http://open.weibo.com/wiki/ShareCode
        sina: {
            apiUrl: "http://v.t.sina.com.cn/share/share.php",
            title: "title",
            url: "url",
            pic: "pic",
            source: null,
            encoding: "utf-8"
        },
        // 腾讯微博
        // http://open.t.qq.com/apps/share/explain.php
        qq: {
            apiUrl: "http://v.t.qq.com/share/share.php",
            title: "title",
            url: "url",
            pic: "pic",
            source: null,
            encoding: "utf-8"
        },
        // 开心网
        kaixin: {
            apiUrl: "http://www.kaixin001.com/repaste/bshare.php",
            title: "title",
            url: "rurl",
            pic: null,
            source: null,
            encoding: "utf-8"
        },
        // 人人网
        renren: {
            apiUrl: "http://share.renren.com/share/buttonshare.do",
            title: "title",
            url: "link",
            pic: null,
            source: null,
            encoding: "utf-8"
        },
        // 豆瓣网
        douban: {
            apiUrl: "http://shuo.douban.com/!service/share",
            title: "name",
            url: "href",
            pic: "image",
            source: null,
            encoding: "utf-8"
        },
        // 搜狐微博
        sohu: {
            apiUrl: "http://t.sohu.com/third/post.jsp",
            title: "title",
            url: "url",
            pic: null,
            source: null,
            encoding: "gbk"
        },
        // 网易微博
        netease: {
            apiUrl: "http://t.163.com/article/user/checkLogin.do",
            title: "info",
            url: "link",
            pic: null,
            source: "source",
            encoding: "utf-8"
        },
        //qq空间
        qzone: {
            apiUrl: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
            title: "title",
            url: "url",
            pic: "pics",
            source: null,
            encoding: "utf-8"
        }
    };
    module.exports = Share = function(config) {
        var c = jQuery.extend(defaults, config), ct = c.container, s = c.service;
        if (typeof config.special !== "undefined" && config.special) {
            c.special = config.special;
        }
        // container is Array, then init everyone
        if (jQuery.isArray(ct)) {
            jQuery.each(function(index, ele) {
                bind(ele, c);
            });
        } else if (typeof ct === "object") {
            bind(ct, c);
        } else if (typeof ct === "string") {
            var el = jQuery(ct);
            if (el.length > 0) {
                bind(el, c);
            }
        }
    };
    // Helper 
    // ------
    // 遍历所有dom绑定click事件
    // @Parameter {Element} target 
    // @Parameter {Object} config  配置文件
    function bind(target, config) {
        jQuery(config.triggerClass, target).each(function(index, ele) {
            var serviceId = config.service[index];
            if (serviceId) {
                jQuery(ele).on("click", function(e) {
                    e.preventDefault();
                    var finalUrl = makeUrl(serviceId, config);
                    window.open(finalUrl, "_blank", "top=100,left=200,width=1000,height=618");
                });
            }
        });
    }
    // 通过服务id生成最终的url
    // @Parameter {String} serviceId   服务的键值，在mapping中配置，如新浪为sina
    // @Parameter {Object} config  配置文件
    function makeUrl(serviceId, config) {
        var map = mapping[serviceId];
        var inDefaultParam = config.param;
        var inParam, i, val, arr = [];
        if (!map) {
            throw new Error(serviceId + " is not support.");
        }
        if (config.special && config.special[serviceId]) {
            inParam = jQuery.extend(jQuery.extend({}, inDefaultParam), config.special[serviceId]);
        } else {
            inParam = inDefaultParam;
        }
        for (i in inParam) {
            if (i === "url") {
                val = inParam[i].replace(/&/g, "%26");
            } else {
                val = map.encoding == "utf-8" ? encodeURIComponent(inParam[i]) : escape(inParam[i]);
            }
            if (map[i]) {
                arr.push(map[i] + "=" + val);
            } else {
                arr.push(i + "=" + val);
            }
        }
        return map.apiUrl + "?" + arr.join("&");
    }
});
