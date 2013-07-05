// http://static.opentok.com/v1.1/js/TB.min.js

/*!
 * OpenTok JavaScript Library v1.1.6
 * http://www.tokbox.com/
 *
 * Copyright (c) 2011 TokBox, Inc.
 *
 * Date: May 13 11:42:49 2013
 */
/*
 *	SWFObject v2.2 <http://code.google.com/p/swfobject/>
 * 	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 *
 * 	Permission is hereby granted, free of charge, to any person obtaining a copy
 * 	of this software and associated documentation files (the "Software"), to deal
 * 	in the Software without restriction, including without limitation the rights
 * 	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * 	copies of the Software, and to permit persons to whom the Software is
 * 	furnished to do so, subject to the following conditions:
 *
 * 	The above copyright notice and this permission notice shall be included in
 * 	all copies or substantial portions of the Software
 */
var swfobject = function () {
    var aq = "undefined",
        aD = "object",
        ab = "Shockwave Flash",
        X = "ShockwaveFlash.ShockwaveFlash",
        aE = "application/x-shockwave-flash",
        ac = "SWFObjectExprInst",
        ax = "onreadystatechange",
        af = window,
        aL = document,
        aB = navigator,
        aa = false,
        Z = [aN],
        aG = [],
        ag = [],
        al = [],
        aJ, ad, ap, at, ak = false,
        aU = false,
        aH, an, aI = true,
        ah = function () {
            var a = typeof aL.getElementById != aq && typeof aL.getElementsByTagName != aq && typeof aL.createElement != aq,
                e = aB.userAgent.toLowerCase(),
                c = aB.platform.toLowerCase(),
                h = c ? /win/.test(c) : /win/.test(e),
                j = c ? /mac/.test(c) : /mac/.test(e),
                g = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                d = !+"\v1",
                f = [0, 0, 0],
                k = null;
            if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
                k = aB.plugins[ab].description;
                if (k && !(typeof aB.mimeTypes != aq && aB.mimeTypes[aE] && !aB.mimeTypes[aE].enabledPlugin)) {
                    aa = true;
                    d = false;
                    k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    f[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10);
                    f[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    f[2] = /[a-zA-Z]/.test(k) ? parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof af.ActiveXObject != aq) {
                    try {
                        var i = new ActiveXObject(X);
                        if (i) {
                            k = i.GetVariable("$version");
                            if (k) {
                                d = true;
                                k = k.split(" ")[1].split(",");
                                f = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)]
                            }
                        }
                    } catch (b) {}
                }
            }
            return {
                w3: a,
                pv: f,
                wk: g,
                ie: d,
                win: h,
                mac: j
            }
        }(),
        aK = function () {
            if (!ah.w3) {
                return
            }
            if ((typeof aL.readyState != aq && aL.readyState == "complete") || (typeof aL.readyState == aq && (aL.getElementsByTagName("body")[0] || aL.body))) {
                aP()
            }
            if (!ak) {
                if (typeof aL.addEventListener != aq) {
                    aL.addEventListener("DOMContentLoaded", aP, false)
                }
                if (ah.ie && ah.win) {
                    aL.attachEvent(ax, function () {
                        if (aL.readyState == "complete") {
                            aL.detachEvent(ax, arguments.callee);
                            aP()
                        }
                    });
                    if (af == top) {
                        (function () {
                            if (ak) {
                                return
                            }
                            try {
                                aL.documentElement.doScroll("left")
                            } catch (a) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            aP()
                        })()
                    }
                }
                if (ah.wk) {
                    (function () {
                        if (ak) {
                            return
                        }
                        if (!/loaded|complete/.test(aL.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        aP()
                    })()
                }
                aC(aP)
            }
        }();

    function aP() {
        if (ak) {
            return
        }
        try {
            var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
            b.parentNode.removeChild(b)
        } catch (a) {
            return
        }
        ak = true;
        var d = Z.length;
        for (var c = 0; c < d; c++) {
            Z[c]()
        }
    }

    function aj(a) {
        if (ak) {
            a()
        } else {
            Z[Z.length] = a
        }
    }

    function aC(a) {
        if (typeof af.addEventListener != aq) {
            af.addEventListener("load", a, false)
        } else {
            if (typeof aL.addEventListener != aq) {
                aL.addEventListener("load", a, false)
            } else {
                if (typeof af.attachEvent != aq) {
                    aM(af, "onload", a)
                } else {
                    if (typeof af.onload == "function") {
                        var b = af.onload;
                        af.onload = function () {
                            b();
                            a()
                        }
                    } else {
                        af.onload = a
                    }
                }
            }
        }
    }

    function aN() {
        if (aa) {
            Y()
        } else {
            am()
        }
    }

    function Y() {
        var d = aL.getElementsByTagName("body")[0];
        var b = ar(aD);
        b.setAttribute("type", aE);
        var a = d.appendChild(b);
        if (a) {
            var c = 0;
            (function () {
                if (typeof a.GetVariable != aq) {
                    var e = a.GetVariable("$version");
                    if (e) {
                        e = e.split(" ")[1].split(",");
                        ah.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]
                    }
                } else {
                    if (c < 10) {
                        c++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                d.removeChild(b);
                a = null;
                am()
            })()
        } else {
            am()
        }
    }

    function am() {
        var g = aG.length;
        if (g > 0) {
            for (var h = 0; h < g; h++) {
                var c = aG[h].id;
                var l = aG[h].callbackFn;
                var a = {
                    success: false,
                    id: c
                };
                if (ah.pv[0] > 0) {
                    var i = aS(c);
                    if (i) {
                        if (ao(aG[h].swfVersion) && !(ah.wk && ah.wk < 312)) {
                            ay(c, true);
                            if (l) {
                                a.success = true;
                                a.ref = av(c);
                                l(a)
                            }
                        } else {
                            if (aG[h].expressInstall && au()) {
                                var e = {};
                                e.data = aG[h].expressInstall;
                                e.width = i.getAttribute("width") || "0";
                                e.height = i.getAttribute("height") || "0";
                                if (i.getAttribute("class")) {
                                    e.styleclass = i.getAttribute("class")
                                }
                                if (i.getAttribute("align")) {
                                    e.align = i.getAttribute("align")
                                }
                                var f = {};
                                var d = i.getElementsByTagName("param");
                                var k = d.length;
                                for (var j = 0; j < k; j++) {
                                    if (d[j].getAttribute("name").toLowerCase() != "movie") {
                                        f[d[j].getAttribute("name")] = d[j].getAttribute("value")
                                    }
                                }
                                ae(e, f, c, l)
                            } else {
                                aF(i);
                                if (l) {
                                    l(a)
                                }
                            }
                        }
                    }
                } else {
                    ay(c, true);
                    if (l) {
                        var b = av(c);
                        if (b && typeof b.SetVariable != aq) {
                            a.success = true;
                            a.ref = b
                        }
                        l(a)
                    }
                }
            }
        }
    }

    function av(b) {
        var d = null;
        var c = aS(b);
        if (c && c.nodeName == "OBJECT") {
            if (typeof c.SetVariable != aq) {
                d = c
            } else {
                var a = c.getElementsByTagName(aD)[0];
                if (a) {
                    d = a
                }
            }
        }
        return d
    }

    function au() {
        return !aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312)
    }

    function ae(f, d, h, e) {
        aU = true;
        ap = e || null;
        at = {
            success: false,
            id: h
        };
        var a = aS(h);
        if (a) {
            if (a.nodeName == "OBJECT") {
                aJ = aO(a);
                ad = null
            } else {
                aJ = a;
                ad = h
            }
            f.id = ac;
            if (typeof f.width == aq || (!/%$/.test(f.width) && parseInt(f.width, 10) < 310)) {
                f.width = "310"
            }
            if (typeof f.height == aq || (!/%$/.test(f.height) && parseInt(f.height, 10) < 137)) {
                f.height = "137"
            }
            aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
            var b = ah.ie && ah.win ? "ActiveX" : "PlugIn",
                c = "MMredirectURL=" + af.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aL.title;
            if (typeof d.flashvars != aq) {
                d.flashvars += "&" + c
            } else {
                d.flashvars = c
            } if (ah.ie && ah.win && a.readyState != 4) {
                var g = ar("div");
                h += "SWFObjectNew";
                g.setAttribute("id", h);
                a.parentNode.insertBefore(g, a);
                a.style.display = "none";
                (function () {
                    if (a.readyState == 4) {
                        a.parentNode.removeChild(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            aA(f, d, h)
        }
    }

    function aF(a) {
        if (ah.ie && ah.win && a.readyState != 4) {
            var b = ar("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(aO(a), b);
            a.style.display = "none";
            (function () {
                if (a.readyState == 4) {
                    a.parentNode.removeChild(a)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            a.parentNode.replaceChild(aO(a), a)
        }
    }

    function aO(b) {
        var d = ar("div");
        if (ah.win && ah.ie) {
            d.innerHTML = b.innerHTML
        } else {
            var e = b.getElementsByTagName(aD)[0];
            if (e) {
                var a = e.childNodes;
                if (a) {
                    var f = a.length;
                    for (var c = 0; c < f; c++) {
                        if (!(a[c].nodeType == 1 && a[c].nodeName == "PARAM") && !(a[c].nodeType == 8)) {
                            d.appendChild(a[c].cloneNode(true))
                        }
                    }
                }
            }
        }
        return d
    }

    function aA(e, g, c) {
        var d, a = aS(c);
        if (ah.wk && ah.wk < 312) {
            return d
        }
        if (a) {
            if (typeof e.id == aq) {
                e.id = c
            }
            if (ah.ie && ah.win) {
                var f = "";
                for (var i in e) {
                    if (e[i] != Object.prototype[i]) {
                        if (i.toLowerCase() == "data") {
                            g.movie = e[i]
                        } else {
                            if (i.toLowerCase() == "styleclass") {
                                f += ' class="' + e[i] + '"'
                            } else {
                                if (i.toLowerCase() != "classid") {
                                    f += " " + i + '="' + e[i] + '"'
                                }
                            }
                        }
                    }
                }
                var h = "";
                for (var j in g) {
                    if (g[j] != Object.prototype[j]) {
                        h += '<param name="' + j + '" value="' + g[j] + '" />'
                    }
                }
                a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
                ag[ag.length] = e.id;
                d = aS(e.id)
            } else {
                var b = ar(aD);
                b.setAttribute("type", aE);
                for (var k in e) {
                    if (e[k] != Object.prototype[k]) {
                        if (k.toLowerCase() == "styleclass") {
                            b.setAttribute("class", e[k])
                        } else {
                            if (k.toLowerCase() != "classid") {
                                b.setAttribute(k, e[k])
                            }
                        }
                    }
                }
                for (var l in g) {
                    if (g[l] != Object.prototype[l] && l.toLowerCase() != "movie") {
                        aQ(b, l, g[l])
                    }
                }
                a.parentNode.replaceChild(b, a);
                d = b
            }
        }
        return d
    }

    function aQ(b, d, c) {
        var a = ar("param");
        a.setAttribute("name", d);
        a.setAttribute("value", c);
        b.appendChild(a)
    }

    function aw(a) {
        var b = aS(a);
        if (b && b.nodeName == "OBJECT") {
            if (ah.ie && ah.win) {
                b.style.display = "none";
                (function () {
                    if (b.readyState == 4) {
                        aT(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                b.parentNode.removeChild(b)
            }
        }
    }

    function aT(a) {
        var b = aS(a);
        if (b) {
            for (var c in b) {
                if (typeof b[c] == "function") {
                    b[c] = null
                }
            }
            b.parentNode.removeChild(b)
        }
    }

    function aS(a) {
        var c = null;
        try {
            c = aL.getElementById(a)
        } catch (b) {}
        return c
    }

    function ar(a) {
        return aL.createElement(a)
    }

    function aM(a, c, b) {
        a.attachEvent(c, b);
        al[al.length] = [a, c, b]
    }

    function ao(a) {
        var b = ah.pv,
            c = a.split(".");
        c[0] = parseInt(c[0], 10);
        c[1] = parseInt(c[1], 10) || 0;
        c[2] = parseInt(c[2], 10) || 0;
        return (b[0] > c[0] || (b[0] == c[0] && b[1] > c[1]) || (b[0] == c[0] && b[1] == c[1] && b[2] >= c[2])) ? true : false
    }

    function az(b, f, a, c) {
        if (ah.ie && ah.mac) {
            return
        }
        var e = aL.getElementsByTagName("head")[0];
        if (!e) {
            return
        }
        var g = (a && typeof a == "string") ? a : "screen";
        if (c) {
            aH = null;
            an = null
        }
        if (!aH || an != g) {
            var d = ar("style");
            d.setAttribute("type", "text/css");
            d.setAttribute("media", g);
            aH = e.appendChild(d);
            if (ah.ie && ah.win && typeof aL.styleSheets != aq && aL.styleSheets.length > 0) {
                aH = aL.styleSheets[aL.styleSheets.length - 1]
            }
            an = g
        }
        if (ah.ie && ah.win) {
            if (aH && typeof aH.addRule == aD) {
                aH.addRule(b, f)
            }
        } else {
            if (aH && typeof aL.createTextNode != aq) {
                aH.appendChild(aL.createTextNode(b + " {" + f + "}"))
            }
        }
    }

    function ay(a, c) {
        if (!aI) {
            return
        }
        var b = c ? "visible" : "hidden";
        if (ak && aS(a)) {
            aS(a).style.visibility = b
        } else {
            az("#" + a, "visibility:" + b)
        }
    }

    function ai(b) {
        var a = /[\\\"<>\.;]/;
        var c = a.exec(b) != null;
        return c && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b
    }
    var aR = function () {
        if (ah.ie && ah.win) {
            window.attachEvent("onunload", function () {
                var a = al.length;
                for (var b = 0; b < a; b++) {
                    al[b][0].detachEvent(al[b][1], al[b][2])
                }
                var d = ag.length;
                for (var c = 0; c < d; c++) {
                    aw(ag[c])
                }
                for (var e in ah) {
                    ah[e] = null
                }
                ah = null;
                for (var f in swfobject) {
                    swfobject[f] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function (a, e, c, b) {
            if (ah.w3 && a && e) {
                var d = {};
                d.id = a;
                d.swfVersion = e;
                d.expressInstall = c;
                d.callbackFn = b;
                aG[aG.length] = d;
                ay(a, false)
            } else {
                if (b) {
                    b({
                        success: false,
                        id: a
                    })
                }
            }
        },
        getObjectById: function (a) {
            if (ah.w3) {
                return av(a)
            }
        },
        embedSWF: function (k, e, h, f, c, a, b, i, g, j) {
            var d = {
                success: false,
                id: e
            };
            if (ah.w3 && !(ah.wk && ah.wk < 312) && k && e && h && f && c) {
                ay(e, false);
                aj(function () {
                    h += "";
                    f += "";
                    var r = {};
                    if (g && typeof g === aD) {
                        for (var p in g) {
                            r[p] = g[p]
                        }
                    }
                    r.data = k;
                    r.width = h;
                    r.height = f;
                    var o = {};
                    if (i && typeof i === aD) {
                        for (var q in i) {
                            o[q] = i[q]
                        }
                    }
                    if (b && typeof b === aD) {
                        for (var l in b) {
                            if (typeof o.flashvars != aq) {
                                o.flashvars += "&" + l + "=" + b[l]
                            } else {
                                o.flashvars = l + "=" + b[l]
                            }
                        }
                    }
                    if (ao(c)) {
                        var m = aA(r, o, e);
                        if (r.id == e) {
                            ay(e, true)
                        }
                        d.success = true;
                        d.ref = m
                    } else {
                        if (a && au()) {
                            r.data = a;
                            ae(r, o, e, j);
                            return
                        } else {
                            ay(e, true)
                        }
                    } if (j) {
                        j(d)
                    }
                })
            } else {
                if (j) {
                    j(d)
                }
            }
        },
        switchOffAutoHideShow: function () {
            aI = false
        },
        ua: ah,
        getFlashPlayerVersion: function () {
            return {
                major: ah.pv[0],
                minor: ah.pv[1],
                release: ah.pv[2]
            }
        },
        hasFlashPlayerVersion: ao,
        createSWF: function (a, b, c) {
            if (ah.w3) {
                return aA(a, b, c)
            } else {
                return undefined
            }
        },
        showExpressInstall: function (b, a, d, c) {
            if (ah.w3 && au()) {
                ae(b, a, d, c)
            }
        },
        removeSWF: function (a) {
            if (ah.w3) {
                aw(a)
            }
        },
        createCSS: function (b, a, c, d) {
            if (ah.w3) {
                az(b, a, c, d)
            }
        },
        addDomLoadEvent: aj,
        addLoadEvent: aC,
        getQueryParamValue: function (b) {
            var a = aL.location.search || aL.location.hash;
            if (a) {
                if (/\?/.test(a)) {
                    a = a.split("?")[1]
                }
                if (b == null) {
                    return ai(a)
                }
                var c = a.split("&");
                for (var d = 0; d < c.length; d++) {
                    if (c[d].substring(0, c[d].indexOf("=")) == b) {
                        return ai(c[d].substring((c[d].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function () {
            if (aU) {
                var a = aS(ac);
                if (a && aJ) {
                    a.parentNode.replaceChild(aJ, a);
                    if (ad) {
                        ay(ad, true);
                        if (ah.ie && ah.win) {
                            aJ.style.display = "block"
                        }
                    }
                    if (ap) {
                        ap(at)
                    }
                }
                aU = false
            }
        }
    }
}();
/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
window.opentokdebug = (function () {
    var i = this,
        m = i.document,
        g = Array.prototype.slice,
        f = i.console,
        h = {}, r, c, q = 0,
        t = ["error", "warn", "info", "log", "debug"],
        b = "assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),
        j = b.length,
        o = false,
        d = m.createElement("div"),
        a = [];
    while (--j >= 0) {
        (function (u) {
            h[u] = function () {
                f = i.console;
                if (q !== 0 && f) {
                    if (f[u] && typeof (f[u].apply) != "undefined") {
                        f[u].apply(f, arguments)
                    } else {
                        var v = g.call(arguments);
                        if (u.indexOf("group") != -1) {
                            v.unshift("[" + u + "]");
                            h.log(v.join(" "))
                        }
                    }
                }
            }
        })(b[j])
    }
    j = t.length;
    while (--j >= 0) {
        (function (u, v) {
            h[v] = function () {
                var x = g.call(arguments),
                    w = [v, e()].concat(x);
                a.push(w);
                if (!k(u)) {
                    return
                }
                if (o) {
                    var y = m.createTextNode(w);
                    d.appendChild(y);
                    d.appendChild(m.createElement("br"))
                }
                s(w);
                f = i.console;
                if (!f && !o) {
                    return
                }
                f[v] ? p(v, x) : p("log", x)
            }
        })(j, t[j])
    }

    function p(v, u) {
        if (typeof (f[v].apply) != "undefined") {
            f[v].apply(f, u)
        } else {
            f[v](u.join(" "))
        }
    }

    function s(u) {
        if (r && (c || !f || !f.log)) {
            r.apply(i, u)
        }
    }
    h.setLevel = function (u) {
        q = typeof u === "number" ? u : 9
    };

    function k(u) {
        return q > 0 ? q > u : t.length + q <= u
    }
    h.setCallback = function () {
        var v = g.call(arguments),
            u = a.length,
            w = u;
        r = v.shift() || null;
        c = typeof v[0] === "boolean" ? v.shift() : false;
        w -= typeof v[0] === "number" ? v.shift() : u;
        while (w < u) {
            s(a[w++])
        }
    };
    h.getLogs = function () {
        return a.join("\n")
    };
    h.setDomInsertion = function (v, u) {
        o = v;
        if (v && m.body) {
            m.body.appendChild(d);
            var w = "debug";
            if (typeof (u) == "string") {
                w = u
            }
            d.className = w
        } else {
            d.parentNode.removeChild(d)
        }
    };

    function l(v) {
        try {
            return v instanceof HTMLElement
        } catch (u) {
            return (typeof v === "object") && (v.nodeType === 1) && (typeof v.style === "object") && (typeof v.ownerDocument === "object")
        }
    }

    function e() {
        var u = new Date();
        return u.toLocaleTimeString() + u.getMilliseconds()
    }
    h.exportLogs = function (u) {
        if (l(u)) {
            u.innerHTML = a.join("<br />")
        }
    };
    return h
})();
if (!Object.keys) {
    Object.keys = function (c) {
        if (c !== Object(c)) {
            throw new TypeError("Object.keys called on non-object")
        }
        var a = [],
            b;
        for (b in c) {
            if (Object.prototype.hasOwnProperty.call(c, b)) {
                a.push(b)
            }
        }
        return a
    }
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (c) {
        if (this === void 0 || this === null) {
            throw new TypeError()
        }
        var d = Object(this);
        var a = d.length >>> 0;
        if (a === 0) {
            return -1
        }
        var e = 0;
        if (arguments.length > 0) {
            e = Number(arguments[1]);
            if (e !== e) {
                e = 0
            } else {
                if (e !== 0 && e !== Infinity && e !== -Infinity) {
                    e = (e > 0 || -1) * Math.floor(Math.abs(e))
                }
            }
        }
        if (e >= a) {
            return -1
        }
        var b = e >= 0 ? e : Math.max(a - Math.abs(e), 0);
        for (; b < a; b++) {
            if (b in d && d[b] === c) {
                return b
            }
        }
        return -1
    }
}(function (d) {
    var e = /chrome\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/.exec(navigator.userAgent.toLowerCase());
    var c = function () {
        var f = d.navigator.userAgent.toLowerCase(),
            g;
        if (f.indexOf("firefox") > -1) {
            return "Firefox"
        }
        if (f.indexOf("opera") > -1) {
            return "Opera"
        } else {
            if (f.indexOf("msie") > -1) {
                return "IE"
            } else {
                if (f.indexOf("chrome") > -1) {
                    return "Chrome"
                }
            }
        } if ((g = d.navigator.vendor) && g.toLowerCase().indexOf("apple") > -1) {
            return "Safari"
        }
        return "unknown"
    };
    var b = function () {
        return navigator.userAgent.indexOf("Macintosh") >= 0 && !(navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin.filename == "PepperFlashPlayer.plugin")
    };
    d.TB_ChromeAllowFix = {
        allowDenyBugPresent: c() === "Chrome" && (parseInt(e[1], 10) == 21 || (parseInt(e[1], 10) > 21 && b()))
    };
    var a = function (g, f) {
        return Math.round(g * Math.pow(10, f)) / Math.pow(10, f)
    };
    d.TB_ChromeAllowFix.AllowFixer = function (j) {
        var m = {}, p = {}, g = {}, i;
        var k = function () {
            if (!j || !j.parentNode) {
                this.stop();
                return
            }
            o("parent", j.offsetParent);
            o("element", j);
            i = setTimeout(k, 500)
        };
        var o = function (s, r) {
            if (!r) {
                return
            }
            if (!g[s]) {
                g[s] = {}
            }
            if (!p[s]) {
                p[s] = {
                    marginLeft: r.style.marginLeft
                }
            } else {
                if (r.style.marginLeft && parseFloat(r.style.marginLeft) !== g[s].marginLeft) {
                    p[s].marginLeft = r.style.marginLeft
                }
            }
            var q = r.getBoundingClientRect();
            if (!m[s] || m[s].left != q.left || m[s].top != q.top) {
                f(r);
                g[s].marginLeft = r.style.marginLeft && r.style.marginLeft.length ? parseFloat(r.style.marginLeft) : null;
                m[s] = r.getBoundingClientRect()
            }
        };
        var f = function (t) {
            var x = t.getBoundingClientRect(),
                r = x.left,
                w = a(Math.round(r) - r, 3);
            if (w != 0) {
                var v = h(t, "marginLeft");
                t.style.marginLeft = v + w + "px"
            }
            var q = x.top,
                s = a(Math.round(q) - q, 3);
            if (s != 0) {
                var u = h(t, "top");
                t.style.top = u + s + "px";
                if (l(t, "position") === "static") {
                    t.style.position = "relative"
                }
            }
        };
        var h = function (r, s) {
            var q = l(r, s);
            n = parseFloat(q, 10);
            return n ? n : 0
        };
        var l = function (r, s) {
            var q = r.ownerDocument.defaultView.getComputedStyle(r, null)[s];
            return q === "" ? r.style[s] : q
        };
        this.start = function () {
            if (!i) {
                k()
            }
        };
        this.stop = function () {
            if (i) {
                clearTimeout(i);
                i = null
            }
            if (j) {
                j.style.marginLeft = p.element.marginLeft;
                var q = j.offsetParent;
                if (q) {
                    q.style.marginLeft = p.parent.marginLeft
                }
            }
        }
    }
})(window);
(function (aU) {
    var A = "11.1.0";
    var ax = 215;
    var j = 138;
    var v;
    var B;
    var a2;
    var L = false;
    var ag = {};
    var O = "true";
    var G = "http://static.opentok.com";
    var aw = G + "/opentok/assets/flash/expressInstall.swf";
    if (O == "true" && aU.location.protocol == "https:") {
        G = "https://swww.tokbox.com"
    }
    var M;
    var H = {};
    var ao = {};
    var aK = false;
    var z = false;
    var aH = false;
    var aY;
    var e = {
        1000: "Failed To Load",
        1004: "Authentication error",
        1005: "Invalid Session ID",
        1006: "Connect Failed",
        1007: "Connect Rejected",
        1008: "Connect Time-out",
        1009: "Security Error",
        1010: "Not Connected",
        1011: "Invalid Parameter",
        1012: "Peer-to-peer Stream Play Failed",
        1013: "Peer-to-peer Connection Failed",
        1014: "API Response Failure",
        2000: "Internal Error",
        2001: "Embed Failed",
        1500: "Unable to Publish",
        1510: "Unable to Signal",
        1520: "Unable to Force Disconnect",
        1530: "Unable to Force Unpublish",
        1535: "Force Unpublish on Invalid Stream",
        1540: "Unable to record archive",
        1550: "Unable to play back archive",
        1560: "Unable to create archive",
        1570: "Unable to load archive",
        3000: "Archive load exception",
        3001: "Archive create exception",
        3002: "Playback stop exception",
        3003: "Playback start exception",
        3004: "Record start exception",
        3005: "Record stop exception",
        3006: "Archive load exception",
        3007: "Session recording in progress",
        3008: "Archive recording internal failure"
    };

    function a0() {
        return aU.location.hostname
    }
    var ab = 1,
        ap = {}, c = (function () {
            var a4 = (function () {
                var a5 = document.getElementsByTagName("script");
                a5 = a5[a5.length - 1];
                a5 = a5.getAttribute("src") || a5.src;
                return a5
            })();
            var a3 = a4.match(/[\?\&]apikey=([^&]+)/i);
            return a3 ? a3[1] : ""
        })();

    function aD() {
        this._listeners = {};
        this.addEventListener = function (a4, a5) {
            if (!a4) {
                throw new Error("EventDispatcher.addEventListener :: No type specified")
            }
            if (!a5) {
                throw new Error("EventDispatcher.addEventListener :: No listener function specified")
            }
            u("TB.addEventListener(" + a4 + ")");
            if (!this._listeners.hasOwnProperty(a4)) {
                this._listeners[a4] = []
            } else {
                for (var a3 = 0; a3 < this._listeners[a4].length; a3++) {
                    if (this._listeners[a4][a3] == a5) {
                        u("TB.addEventListener :: already have listener for " + a4 + ")");
                        return
                    }
                }
            }
            this._listeners[a4].push(a5)
        };
        this.removeEventListener = function (a4, a5) {
            if (!a4) {
                throw new Error("EventDispatcher.removeEventListener :: No type specified")
            }
            if (!a5) {
                throw new Error("EventDispatcher.removeEventListener :: No listener function specified")
            }
            u("TB.removeEventListener(" + a4 + ")");
            if (this._listeners.hasOwnProperty(a4)) {
                for (var a3 = 0; a3 < this._listeners[a4].length; a3++) {
                    if (this._listeners[a4][a3] == a5) {
                        this._listeners[a4].splice(a3, 1);
                        break
                    }
                }
            }
        };
        this.dispatchEvent = function (a6) {
            if (!a6) {
                throw new Error("EventDispatcher.dispatchEvent :: No event specified")
            }
            if (!a6.type) {
                throw new Error("EventDispatcher.dispatchEvent :: Event has no type")
            }
            if (!a6.target) {
                a6.target = this
            }
            u("TB.dispatchEvent(" + a6.type + ")");
            if (this._listeners.hasOwnProperty(a6.type)) {
                var a5 = this._listeners[a6.type];
                if (a5 instanceof Array) {
                    for (var a3 = 0; a3 < a5.length; a3++) {
                        var a4 = av(a5[a3], a6);
                        setTimeout(a4, 1)
                    }
                } else {
                    throw new Error("EventDispatcher.dispatchEvent :: Invalid object type in listeners")
                }
            }
        }
    }

    function W(a5, a3) {
        this.type = a5;
        this.cancelable = a3 ? a3 : false;
        this.target = null;
        var a4 = false;
        this.preventDefault = function () {
            if (this.cancelable) {
                a4 = true
            } else {
                a1("Event.preventDefault :: Trying to preventDefault on an Event that isn't cancelable")
            }
        };
        this.isDefaultPrevented = function () {
            return a4
        }
    }

    function aC(a3, a4) {
        this.superClass = W;
        this.superClass(a3);
        this.value = a4
    }

    function K(a4, a6, a7, a5, a3) {
        this.superClass = W;
        this.superClass(a4);
        this.message = a6;
        this.title = a7;
        this.code = a5;
        this.component = a3
    }

    function ai(a3, a4) {
        this.superClass = W;
        this.superClass(a3);
        this.issueId = a4
    }

    function N(a3) {
        this.superClass = W;
        this.superClass(a3)
    }

    function m(a3) {
        this.superClass = W;
        this.superClass(a3)
    }

    function ac(a3) {
        this.superClass = W;
        this.superClass(a3)
    }

    function aJ(a4, a3, a5) {
        this.superClass = W;
        this.superClass(a4);
        this.connections = a3;
        this.reason = a5
    }

    function aL(a4, a6, a5, a3) {
        this.superClass = W;
        this.superClass(a4, a3);
        this.streams = a6;
        this.reason = a5
    }

    function aX(a5, a4, a6, a3) {
        this.superClass = W;
        this.superClass(a5);
        this.connections = a4;
        this.streams = a6;
        this.archives = a3;
        this.groups = []
    }

    function y(a4, a5, a3) {
        this.superClass = W;
        this.superClass(a4, a3);
        this.reason = a5
    }

    function aQ(a3, a4) {
        this.superClass = W;
        this.superClass(a3);
        this.fromConnection = a4
    }

    function an(a3, a5, a4) {
        this.superClass = W;
        this.superClass(a3);
        this.streamId = a5;
        this.volume = a4
    }

    function g(a4, a3, a5) {
        this.superClass = W;
        this.superClass(a4);
        this.camera = a3;
        this.microphone = a5
    }

    function am(a6, a3, a5, a4, a7) {
        this.superClass = W;
        this.superClass(a6);
        this.cameras = a3;
        this.microphones = a5;
        this.selectedCamera = a4;
        this.selectedMicrophone = a7
    }

    function o(a4, a5, a3, a7, a6) {
        this.superClass = W;
        this.superClass(a4);
        this.widthFrom = a5;
        this.widthTo = a3;
        this.heightFrom = a7;
        this.heightTo = a6
    }

    function Y(a4, a6, a7, a3, a5) {
        this.superClass = W;
        this.superClass(a4);
        this.type = a4;
        this.stream = a6;
        this.changedProperty = a7;
        this.oldValue = a3;
        this.newValue = a5
    }

    function aI(a4, a3) {
        this.superClass = W;
        this.superClass(a4);
        this.archives = a3
    }

    function a(a4, a3, a5) {
        this.superClass = W;
        this.superClass(a4);
        this.archive = a3;
        this.streams = a5
    }

    function al(a3, a4) {
        this.superClass = W;
        this.superClass(a3);
        this.changedValues = a4
    }

    function ar(a3, a6, a4, a5) {
        this.superClass = W;
        this.superClass(a3);
        this.reasonCode = a6;
        this.reason = a4;
        this.failedValues = a5
    }
    var aO = (function () {
        var bb = 4000,
            be = false,
            a9 = {}, a4 = {}, a6, a7 = document.head || document.getElementsByTagName("head")[0],
            bd, bc = function () {
                if (bd) {
                    clearTimeout(bd);
                    bd = null
                }
            }, a3 = function () {
                bc();
                if (a6) {
                    a6.onload = a6.onreadystatechange = null;
                    if (a7 && a6.parentNode) {
                        a7.removeChild(a6)
                    }
                    a6 = undefined
                }
            }, a5 = function () {
                if (a6.readyState && !/loaded|complete/.test(a6.readyState)) {
                    return
                }
                bc();
                if (!be) {
                    a8._onLoadTimeout()
                }
            }, ba = function (bf, bg) {
                if (bg && a4[bg] && a4[bg][bf]) {
                    return a4[bg][bf]
                }
                return a9[bf]
            }, a8 = {
                load: function () {
                    be = false;
                    setTimeout(function () {
                        a6 = document.createElement("script");
                        a6.async = "async";
                        a6.src = G + "/v1.1.6/js/dynamic_config.min.js";
                        a6.onload = a6.onreadystatechange = function () {
                            a5.call(a8)
                        };
                        a7.appendChild(a6)
                    }, 1);
                    bd = setTimeout(function () {
                        a8._onLoadTimeout()
                    }, bb)
                },
                _onLoadTimeout: function () {
                    a3();
                    a1("TB DynamicConfig failed to load in " + bb + " ms");
                    this.dispatchEvent(new ac("dynamicConfigLoadFailed"))
                },
                isLoaded: function () {
                    return be
                },
                replaceWith: function (bf) {
                    a3();
                    if (!bf) {
                        bf = {}
                    }
                    a9 = bf.global || {};
                    a4 = bf.partners || {};
                    if (!be) {
                        be = true
                    }
                    this.dispatchEvent(new m("dynamicConfigChanged"))
                },
                get: function (bf, bh, bi) {
                    var bg = ba(bf, bi);
                    return bg ? bg[bh] : null
                }
            };
        a8.superClass = aD;
        a8.superClass();
        return a8
    })();

    function R(a5, a3, a4) {
        this.connectionId = a5;
        this.creationTime = Number(a3);
        this.data = a4;
        this.quality = null
    }

    function ae(a3, a6, a4, ba, bd, bb, bc, a8, a5, a9, a7, be) {
        this.streamId = a3;
        this.sessionId = a9;
        this.connection = a6;
        this.name = a4;
        this.data = ba;
        this.type = bd;
        this.creationTime = bb;
        this.hasAudio = bc;
        this.hasVideo = a8;
        this.orientation = a5;
        this.peerId = a7;
        this.quality = be;
        this.startRecording = function (bg) {
            u("Stream.startRecording()");
            var bj = "controller_" + a9,
                bi;
            bg = H[a9][bg.archiveId];
            if (!bg) {
                bi = "Stream.startRecording :: Archive not created.";
                aG(bi);
                throw new Error(bi)
            }
            if (bg.type != b.PER_STREAM) {
                bi = "Stream.startRecording :: Trying to record per stream on a " + bg.type + " archive";
                aG(bi);
                throw new Error(bi)
            }
            if (bj && this.connection && this.connection.connectionId) {
                try {
                    var bf = document.getElementById(bj);
                    bf.startRecordingStream(this.streamId, bg.archiveId)
                } catch (bh) {
                    bi = "Stream.startRecording :: " + bh;
                    aG(bi);
                    throw new Error(bi)
                }
            } else {
                bi = "Stream.startRecording :: Connection required to record an archive.";
                aG(bi);
                throw new Error(bi)
            }
        };
        this.stopRecording = function (bg) {
            u("Stream.stopRecording()");
            var bi;
            bg = H[a9][bg.archiveId];
            if (!bg) {
                bi = "Stream.stopRecording :: Archive not created.";
                aG(bi);
                throw new Error(bi)
            }
            if (bg.type != b.PER_STREAM) {
                bi = "Stream.stopRecording :: Trying to stop recording per stream on a " + bg.type + " archive";
                aG(bi);
                throw new Error(bi)
            }
            var bj = "controller_" + a9;
            if (bj && this.connection && this.connection.connectionId) {
                try {
                    var bf = document.getElementById(bj);
                    bf.stopRecordingStream(this.streamId, bg.archiveId)
                } catch (bh) {
                    bi = "Stream.stopRecording :: " + bh;
                    aG(bi);
                    throw new Error(bi)
                }
            } else {
                bi = "Stream.stopRecording :: Connection required to record an archive.";
                aG(bi);
                throw new Error(bi)
            }
        }
    }

    function aA(a6, a4) {
        this.id = a6;
        this.replacedDivId = a4;
        this.parentClass = aD;
        this.parentClass();
        var a3 = this;
        this._ = {
            parent: this
        };
        var a5 = [];
        this._.DOMcomponent = document.getElementById(this.id);
        this._.load = function (a8, a9) {
            ap[a3.id] = a3;
            for (var a7 in a8) {
                if (a8.hasOwnProperty(a7)) {
                    a3[a7] = a8[a7]
                }
            }
            aY.onLoad(function () {
                var ba = a3.replacedDivId,
                    bb = a3.id;
                if (!ba) {
                    document.body.appendChild((function () {
                        var bc = document.createElement("div");
                        ba = "component_replace_" + bb;
                        bc.setAttribute("id", ba);
                        return bc
                    })())
                } else {
                    if (typeof (ba) !== "string" && "id" in ba) {
                        if (!ba.id) {
                            ba.id = "tmpId" + Math.random()
                        }
                        ba = ba.id
                    }
                }
                a3.replacedDivId = ba;
                if (!document.getElementById(ba)) {
                    errorMsg = "UIComponent :: replaceElementId does not exist in DOM.";
                    aG(errorMsg);
                    throw new Error(errorMsg)
                }
                X(a3.src, a3.replacedDivId, a3.properties.width, a3.properties.height, A, false, a3.properties, a3.params, a3.attributes)
            })
        };
        this._.onload = function () {
            u("Component loaded: " + this.id);
            this._.DOMcomponent = document.getElementById(this.id);
            for (var a7 = 0; a7 < a5.length; a7++) {
                a5[a7].call(this._)
            }
            if (this.modified) {
                this.setStyle(this._style);
                this.modified = false
            }
            this.dispatchEvent(new W("loaded"))
        };
        this._.callFlash = function (bb, a8, a7) {
            if (!a7 || typeof (a7) !== "object") {
                a7 = {}
            }
            if (!a8) {
                a8 = []
            }
            u("Pending: " + bb + "(" + a8.join(",") + ") on component " + this.parent.id);
            var a9 = a7.debug || (bb + "(" + a8.join(",") + ") on component " + this.parent.id + " failed");
            var ba = function ba() {
                try {
                    u("callFlash: " + bb + "(" + a8.join(",") + ") on component " + this.parent.id);
                    return this.DOMcomponent[bb].apply(this.DOMcomponent, a8)
                } catch (bc) {
                    if (!a7 || !a7.hasOwnProperty("silentError") || !a7.silentError) {
                        aG(a9);
                        throw new Error(a9)
                    }
                }
                return false
            };
            if (!a7.once) {
                a5.push(ba)
            }
            if (this.DOMcomponent) {
                return ba.call(this)
            } else {
                if (a7.otherwise) {
                    return (typeof (a7.otherwise) !== "function") ? a7.otherwise : a7.otherwise()
                }
            }
        }
    }

    function aj(a6, a4) {
        aA.apply(this, arguments);
        var a3 = ["showMicButton", "showSpeakerButton", "showSettingsButton", "showCameraToggleButton", "nameDisplayMode", "buttonDisplayMode", "showSaveButton", "showRecordButton", "showRecordStopButton", "showReRecordButton", "showPauseButton", "showPlayButton", "showPlayStopButton", "showStopButton", "backgroundImageURI", "showControlPanel", "showRecordCounter", "showPlayCounter", "showControlBar", "showPreviewTime"];
        this.getStyle = function (a9) {
            var a7 = document.getElementById(this.id),
                bc;
            if (!this.loaded) {
                if (a9) {
                    return this._style[a9]
                } else {
                    return this._style
                }
            } else {
                if (a7) {
                    try {
                        var ba = a7.getStyle(a9);
                        if (typeof (ba) == "string") {
                            return ba
                        }
                        for (var a8 in ba) {
                            if (ba[a8] == "false") {
                                ba[a8] = false
                            }
                            if (ba[a8] == "true") {
                                ba[a8] = true
                            }
                            if (a3.indexOf(a8) < 0) {
                                delete ba[a8]
                            }
                        }
                        return ba
                    } catch (bb) {
                        bc = "Publisher.getStyle:: Failed to call getStyle. " + bb;
                        aG(bc);
                        throw new Error(bc)
                    }
                } else {
                    bc = "Publisher.getStyle:: Publisher " + this.id + " does not exist.";
                    aG(bc);
                    throw new Error(bc)
                }
            }
        };
        this._style = {};
        var a5 = {
            buttonDisplayMode: ["auto", "off", "on"],
            nameDisplayMode: ["auto", "off", "on"],
            showSettingsButton: [true, false],
            showMicButton: [true, false],
            showCameraToggleButton: [true, false],
            showSaveButton: [true, false],
            backgroundImageURI: null,
            showControlBar: [true, false],
            showPlayCounter: [true, false],
            showRecordCounter: [true, false],
            showPreviewTime: [true, false]
        };
        this.setStyle = function (a9, bc) {
            u("Publisher.setStyle: " + a9.toString());
            var a7 = document.getElementById(this.id),
                bb;
            if (!this.loaded) {
                if (arguments.length > 1) {
                    if (this._style.hasOwnProperty(a9) && (a9 == "backgroundImageURI" || (a5[a9].indexOf(bc) > -1))) {
                        u("setStyle::Setting " + a9 + " to " + bc);
                        this._style[a9] = bc
                    } else {
                        a1("setStyle::Invalid style property passed " + a9 + " : " + bc)
                    }
                } else {
                    for (var a8 in a9) {
                        this.setStyle(a8, a9[a8])
                    }
                }
                this.modified = true
            } else {
                if (a7) {
                    try {
                        a7.setStyle(a9, bc)
                    } catch (ba) {
                        bb = "Publisher.setStyle:: Failed to call setStyle. " + ba;
                        aG(bb);
                        throw new Error(bb)
                    }
                } else {
                    bb = "Publisher.setStyle:: Publisher " + this.id + " does not exist.";
                    aG(bb);
                    throw new Error(bb)
                }
            }
            return this
        }
    }

    function w(a4, a3) {
        aj.apply(this, arguments);
        this.getImgData = function () {
            return this._.callFlash("getImgData")
        }
    }

    function U(a7, a6, a5) {
        a5 = (a5) ? aP(a5) : {};
        if (a5.name !== undefined && a5.name.length > 1000) {
            errorMsg = "Session.publish :: name property longer than 1000 chars.";
            aG(errorMsg);
            throw new Error(errorMsg)
        }
        if (a5.data !== undefined && a5.data.length > 1000) {
            errorMsg = "Session.publish :: data property longer than 1000 chars.";
            aG(errorMsg);
            throw new Error(errorMsg)
        }
        a5.apiKey = a5.apiKey || c;
        if (!a5.apiKey) {
            errorMsg = "initPublisher :: apiKey missing.";
            aG(errorMsg);
            throw new Error(errorMsg)
        }
        w.apply(this, arguments);
        this._style = {
            showMicButton: true,
            showSettingsButton: true,
            showCameraToggleButton: true,
            nameDisplayMode: "auto",
            buttonDisplayMode: "auto",
            backgroundImageURI: null
        };
        var a3 = 264;
        var a4 = 198;
        this.loaded = false;
        this.panelId = null;
        this.properties = k({
            microphoneGain: 50,
            publishAudio: true,
            publishVideo: true
        }, a5, {
            simulateMobile: b.simulateMobile,
            publisherId: this.id,
            startTime: (new Date()).getTime()
        });
        if (!this.properties.width || isNaN(this.properties.width)) {
            this.properties.width = a3
        }
        if (!this.properties.height || isNaN(this.properties.height)) {
            this.properties.height = a4
        }
        if (a5 && a5.hasOwnProperty("style")) {
            this.setStyle(a5.style);
            this.properties.style = encodeURIComponent(V(this.properties.style));
            this.modified = true
        }
        if (this.properties.wmode) {
            delete this.properties.wmode
        }
        if (this.properties.apikey) {
            delete this.properties.apikey
        }
        this._.load({
            src: G + "/v1.1.6/flash/f_publishwidget.swf?partnerId=" + a5.apiKey,
            attributes: {
                id: this.id,
                style: "outline:none;"
            },
            params: {
                allowscriptaccess: "always",
                wmode: a5.wmode || "transparent"
            }
        });
        this._.refresh = function () {
            this.parent.properties.startTime = (new Date()).getTime();
            this.callFlash("cleanupView", null, {
                once: true
            });
            this.parent.replacedDivId = this.parent.id;
            this.load()
        };
        this._.publishToSession = function (bb, a9, a8, ba) {
            this.callFlash("publishToSession", [bb, a9, a8, ba]);
            return this.parent
        };
        this._.unpublishFromSession = function (a8) {
            if (this.DOMcomponent) {
                this.callFlash("unpublishFromSession", [a8])
            }
            return this.parent
        };
        this.setMicrophoneGain = function (a8) {
            this.properties.microphoneGain = parseInt(a8, 10);
            this._.callFlash("setMicGain", [a8], {
                debug: "Microphone gain adjustment on publisher " + this.id + " failed. "
            });
            return this
        };
        this.getMicrophoneGain = function () {
            return this._.callFlash("getMicGain", null, {
                debug: "Microphone gain request on publisher " + this.id + " failed. ",
                otherwise: this.properties.microphoneGain
            })
        };
        this.getEchoCancellationMode = function () {
            return this._.callFlash("getEchoCancellationMode", null, {
                debug: "Getting echo cancellation mode for publisher " + this.id + " failed. ",
                otherwise: "unknown"
            })
        };
        this.enableMicrophone = function () {
            this.publishAudio(true);
            return this
        };
        this.disableMicrophone = function () {
            this.publishAudio(false);
            return this
        };
        this.publishAudio = function (a8) {
            u("Publisher.publishAudio()");
            this.properties.publishAudio = !! a8;
            this._.callFlash("setStreamProperty", ["publishAudio", !! a8]);
            return this
        };
        this.publishVideo = function (a8) {
            u("Publisher.publishVideo()");
            this.properties.publishVideo = !! a8;
            this._.callFlash("setStreamProperty", ["publishVideo", !! a8]);
            return this
        };
        this.setCamera = function (a8) {
            this.properties.cameraName = [typeof (a8) === "string" ? a8 : a8.name];
            this._.callFlash("setCamera", this.properties.cameraName);
            return this
        };
        this.setMicrophone = function (a8) {
            this.properties.microphoneName = [typeof (a8) === "string" ? a8 : a8.name];
            this._.callFlash("setMicrophone", this.properties.microphoneName);
            return this
        };
        this.detectDevices = function () {
            this._.callFlash("detectDevices");
            return this
        };
        this.detectMicActivity = function (a8) {
            this._.callFlash("detectMicActivity", [a8 !== false]);
            return this
        };
        this.destroy = function () {
            if (this._.DOMcomponent && this._.DOMcomponent.parentNode) {
                this._.callFlash("cleanupView");
                this._.DOMcomponent.parentNode.removeChild(this._.DOMcomponent);
                this._.DOMcomponent = null
            } else {
                u("The item doesn't exist to be detroyed")
            }
            return this
        };
        this._.signalRecording = function (a8) {
            return this.callFlash(a8 ? "signalRecordingStarted" : "signalRecordingStopped")
        }
    }

    function ah(a7, a8, a6, a4) {
        this.superClass = w;
        this.superClass(a8, a6);
        this._style = {
            nameDisplayMode: "auto",
            buttonDisplayMode: "auto",
            backgroundImageURI: null
        };
        this.modified = false;
        if (a4 && a4.hasOwnProperty("style")) {
            this.setStyle(a4.style);
            this.modified = true
        }
        this.stream = a7;
        this.properties = a4;
        this.loaded = false;
        this.audioVolume = 50;
        var a3 = true;
        var a5 = true;
        if (a4) {
            if (a4.hasOwnProperty("subscribeToAudio") && (a4.subscribeToAudio === "false" || a4.subscribeToAudio == false)) {
                a3 = false
            }
            if (a4.hasOwnProperty("subscribeToVideo") && (a4.subscribeToVideo === "false" || a4.subscribeToVideo == false)) {
                a5 = false
            }
            if (a4.hasOwnProperty("audioVolume")) {
                this.audioVolume = parseInt(a4.audioVolume, 10)
            }
        }
        this.enableAudio = function () {
            this.subscribeToAudio(true)
        };
        this.disableAudio = function () {
            this.subscribeToAudio(false)
        };
        this.setAudioVolume = function (bc) {
            var a9 = document.getElementById(this.id),
                bb;
            if (!this.loaded) {
                this.audioVolume = bc
            } else {
                if (a9) {
                    try {
                        a9.setAudioVolume(bc)
                    } catch (ba) {
                        bb = "Volume adjustment on subscriber " + this.id + " failed";
                        aG(bb);
                        throw new Error(bb)
                    }
                } else {
                    bb = "Subscriber " + this.id + " does not exist.";
                    aG(bb);
                    throw new Error(bb)
                }
            }
            return this
        };
        this.getAudioVolume = function () {
            var a9 = document.getElementById(this.id),
                bb;
            if (!this.loaded) {
                return this.audioVolume
            }
            if (a9) {
                try {
                    return a9.getAudioVolume()
                } catch (ba) {
                    bb = "Volume adjustment on subscriber " + this.id + " failed";
                    aG(bb);
                    throw new Error(bb)
                }
            } else {
                bb = "Subscriber " + this.id + " does not exist.";
                aG(bb);
                throw new Error(bb)
            }
            return this
        };
        this._subscribeToAudio = function (a9, ba) {
            u("Subscriber.subscribeToAudio()");
            if (!ba || a3) {
                if (!this.loaded) {
                    this.audioSubscribed = a9;
                    this.modified = true
                } else {
                    l(this.id, "subscribeToAudio", a9)
                }
            }
        };
        this.subscribeToAudio = function (a9) {
            a3 = a9;
            this._subscribeToAudio(a3, false)
        };
        this._subscribeToVideo = function (a9, ba) {
            u("Subscriber.subscribeToVideo()");
            if (!ba || a5) {
                if (!this.loaded) {
                    this.videoSubscribed = a9;
                    this.modified = true
                } else {
                    l(this.id, "subscribeToVideo", a9)
                }
            }
        };
        this.subscribeToVideo = function (a9) {
            a5 = a9;
            this._subscribeToVideo(a5, false)
        };
        this.changeOrientation = function (a9) {
            u("Subscriber.changeOrientation()");
            l(this.id, "changeOrientation", a9)
        }
    }

    function au(a6, a5, a3, a4) {
        this.superClass = aA;
        this.superClass(a6, a5);
        if (a3) {
            this.publisher = a3;
            this.component = a3
        } else {
            this.publisher = null;
            this.component = a3
        }
        this.parentCreated = false;
        this.properties = a4
    }

    function aW(a4, a3) {
        this.name = a4;
        this.status = a3
    }

    function aT(a4, a3) {
        this.name = a4;
        this.status = a3
    }

    function C(a5, a4, a8, a7, a3) {
        this.archiveId = a5;
        this.type = a4;
        this.title = a8;
        this.sessionId = a7;
        var a6;
        if (a3 == "sessionRecordingInProgress") {
            this.status = "open"
        } else {
            this.status = a3
        }
        this.startPlayback = function (ba) {
            if (!ba) {
                ba = false
            }
            u("Archive.startPlayback() : " + ba);
            var be = "controller_" + a7,
                bb = b.sessions[a7].connection,
                bd;
            if (!ao[a7][this.archiveId]) {
                bd = "Archive.startPlayback :: Archive not loaded.";
                aG(bd);
                throw new Error(bd)
            }
            if (be && bb && bb.connectionId) {
                try {
                    var a9 = document.getElementById(be);
                    a9.startPlayback(this.archiveId, ba)
                } catch (bc) {
                    bd = "Archive.startPlayback :: " + bc;
                    aG(bd);
                    throw new Error(bd)
                }
            } else {
                bd = "Archive.startPlayback :: Connection required to play back an archive.";
                aG(bd);
                throw new Error(bd)
            }
        };
        this.stopPlayback = function () {
            u("Archive.stopPlayback()");
            var bd = "controller_" + a7,
                ba = b.sessions[a7].connection,
                bc;
            if (bd && ba && ba.connectionId) {
                try {
                    var a9 = document.getElementById(bd);
                    a9.stopPlayback(this.archiveId)
                } catch (bb) {
                    bc = "Archive.stopPlayback :: " + bb;
                    aG(bc);
                    throw new Error(bc)
                }
            } else {
                bc = "Archive.stopPlayback :: Connection required to stop playing back an archive.";
                aG(bc);
                throw new Error(bc)
            }
        };
        this.getStateManager = function () {
            u("Archive.getStateManager() " + a5);
            if (a6) {
                return a6
            } else {
                var bb = "controller_" + a7;
                var a9 = b.sessions[a7].connection;
                if (bb && a9 && a9.connectionId) {
                    a6 = new T(bb, a5);
                    return a6
                }
            }
            var ba = "Archive.getStateManager :: Connection required to getStateManager. Make sure that this archive was loaded in a Session.";
            aG(ba);
            throw new Error(ba)
        }
    }

    function aq(a5, a4, a3) {
        this.superClass = w;
        this.superClass(a5, a4);
        this._style = {
            buttonDisplayMode: "auto",
            showCameraToggleButton: true,
            showControlBar: true,
            showMicButton: true,
            showPlayCounter: true,
            showRecordCounter: true,
            showSaveButton: true,
            showSettingsButton: true
        };
        this.id = a5;
        this.properties = a3;
        this.saveArchive = function () {
            var a6 = document.getElementById(this.id);
            a6.save()
        };
        this.setCamera = function (a6) {
            u("Recorder.setCamera(" + a6 + ")");
            i(this.id, a6, true)
        };
        this.setMicrophone = function (a6) {
            u("Recorder.setMicrophone(" + a6 + ")");
            i(this.id, a6, false)
        };
        this.stopRecording = function () {
            recorderElement = document.getElementById(this.id);
            recorderElement.stopRecording()
        };
        this.startRecording = function (a6) {
            recorderElement = document.getElementById(this.id);
            recorderElement.startRecording(a6)
        };
        this.startPlaying = function () {
            u("Recorder.startPlaying()");
            try {
                var a6 = document.getElementById(this.id);
                a6.startPlaying()
            } catch (a8) {
                var a7 = "Recorder.startPlaying :: " + a8;
                aG(a7);
                throw new Error(a7)
            }
        };
        this.stopPlaying = function () {
            u("Recorder.stopPlaying()");
            try {
                var a6 = document.getElementById(this.id);
                a6.stopPlaying()
            } catch (a8) {
                var a7 = "Recorder.stopPlaying :: " + a8;
                aG(a7);
                throw new Error(a7)
            }
        };
        this.setTitle = function (a9) {
            var a6 = document.getElementById(this.id),
                a8;
            if (!this.loaded) {
                this._title = a9;
                this.modified = true
            } else {
                if (a6) {
                    try {
                        a6.setTitle(a9)
                    } catch (a7) {
                        a8 = "Setting archive title on Recorder " + this.id + " failed.";
                        aG(a8);
                        throw new Error(a8)
                    }
                } else {
                    a8 = "Recorder " + this.id + " does not exist.";
                    aG(a8);
                    throw new Error(a8)
                }
            }
        }
    }

    function aM(a5, a4, a3) {
        this.superClass = w;
        this.superClass(a5, a4);
        this._style = {
            showPlayButton: true,
            showStopButton: true,
            showSpeakerButton: true,
            showPreviewTime: true
        };
        this.id = a5;
        this.properties = a3;
        this.loadArchive = function (a9) {
            var a8;
            if (a9) {
                if (this.loaded) {
                    try {
                        var a6 = document.getElementById(this.id);
                        a6.loadArchive(a9);
                        this.archiveId = a9
                    } catch (a7) {
                        a8 = "Player.loadArchive :: " + a7;
                        aG(a8);
                        throw new Error(a8)
                    }
                } else {
                    this._archiveId = a9
                }
            } else {
                a8 = "Player.loadArchive :: Archive id required to load an archive.";
                aG(a8);
                throw new Error(a8)
            }
        };
        this.play = function () {
            if (this.loaded) {
                try {
                    var a6 = document.getElementById(this.id);
                    a6.startPlayback()
                } catch (a8) {
                    var a7 = "Player.play :: " + a8;
                    aG(a7);
                    throw new Error(a7)
                }
            } else {
                this._play = true
            }
        };
        this.stop = function () {
            if (this.loaded) {
                try {
                    var a6 = document.getElementById(this.id);
                    a6.stopPlayback()
                } catch (a8) {
                    var a7 = "Player.stop :: " + a8;
                    aG(a7);
                    throw new Error(a7)
                }
            } else {
                this._play = false
            }
        };
        this.pause = function () {
            if (this.loaded) {
                try {
                    var a6 = document.getElementById(this.id);
                    a6.pausePlayback()
                } catch (a8) {
                    var a7 = "Player.pause :: " + a8;
                    aG(a7);
                    throw new Error(a7)
                }
            } else {
                this._play = false
            }
        }
    }

    function aV(a7) {
        this.superClass = aD;
        this.superClass();
        this.apiKey = a7;
        this.panels = {};
        this.showMicSettings = true;
        this.showCamSettings = true;
        var a4 = 360;
        var a6 = 270;
        var a3 = 340;
        var a5 = 230;
        this.detectDevices = function () {
            u("DeviceManager.detectDevices()");
            if (!a2) {
                var bc = {};
                bc.allowscriptaccess = "always";
                a2 = "opentok_deviceDetector";
                var a8 = {};
                a8.id = a2;
                var a9 = {};
                aY.onLoad(function () {
                    var bd = document.createElement("div");
                    bd.setAttribute("id", a2);
                    bd.style.display = "none";
                    document.body.appendChild(bd);
                    swfobject.embedSWF(G + "/v1.1.6/flash/f_devicedetectorwidget.swf?partnerId=" + a7, a2, 1, 1, A, false, a9, bc, a8)
                })
            } else {
                try {
                    var ba = document.getElementById(a2);
                    ba.detectDevices()
                } catch (bb) {
                    aG(bb);
                    throw new Error("DeviceManager.detectDevices() :: Failed to locate existing device detector " + bb)
                }
            }
        };
        this.displayPanel = function (bb, bg, bc) {
            u("DeviceManager.displayPanel(" + bb + ")");
            var bq;
            if (bg) {
                bq = "displayPanel_" + bg.id
            } else {
                bq = "displayPanel_global"
            } if (bg && b.sessions) {
                for (var bn in b.sessions) {
                    if (b.sessions[bn].hasOwnProperty("publishers") && b.sessions[bn].publishers[bg.id]) {
                        b.sessions[bn].publishers[bg.id].panelId = bq
                    }
                }
            }
            var bl = document.getElementById(bq);
            if (bl) {
                a1("DeviceManager.displayPanel :: there is already a device panel" + (bg ? " for this component" : ""));
                return this.panels[bq]
            }
            var bf = false;
            var bi = (bc) ? aP(bc) : {};
            var bo = {};
            bo.allowscriptaccess = "always";
            var bm = a4;
            var bk = a6;
            if ("showCloseButton" in bi) {
                if (bi.showCloseButton == false) {
                    bm = a3;
                    bk = a5
                }
            } else {
                bi.showCloseButton = true
            } if (!("showMicSettings" in bi)) {
                bi.showMicSettings = this.showMicSettings
            }
            if (!("showCamSettings" in bi)) {
                bi.showCamSettings = this.showCamSettings
            }
            if (!bb) {
                bb = "devicePanel_replace_div";
                var bh = document.createElement("div");
                bh.setAttribute("id", bb);
                var ba = document.createElement("div");
                ba.setAttribute("id", "devicePanel_parent_" + (bg ? bg.id : "global"));
                ba.style.position = "absolute";
                var be = ("pageYOffset" in aU && typeof (aU.pageYOffset) == "number") ? aU.pageYOffset : (document.body && document.body.scrollTop) ? document.body.scrollTop : (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : 0;
                var a9 = ("innerHeight" in aU) ? aU.innerHeight : (document.documentElement && document.documentElement.offsetHeight) ? document.documentElement.offsetHeight : a6;
                be += (a9 * 0.2);
                ba.style.top = be + "px";
                ba.style.left = "50%";
                ba.style.width = bm + "px";
                ba.style.height = bk + "px";
                ba.style.marginLeft = (0 - bm / 2) + "px";
                ba.style.marginTop = (0 - bk / 4) + "px";
                if ("zIndex" in bi) {
                    ba.style.zIndex = bi.zIndex;
                    delete bi.zIndex
                } else {
                    ba.style.zIndex = af() + 1
                }
                document.body.appendChild(ba);
                bf = true;
                ba.appendChild(bh)
            }
            var bj = document.getElementById(bb);
            if (!bj) {
                var a8 = "DeviceManager.displayPanel :: replaceElementId does not exist in DOM.";
                aG(a8);
                throw new Error(a8)
            }
            var bp;
            if (this.panels[bq]) {
                this.removePanel(this.panels[bq])
            }
            if (bg) {
                bp = new au(bq, bb, bg, bi)
            } else {
                bp = new au(bq, bb, null, bi)
            }
            bp.parentCreated = bf;
            this.panels[bq] = bp;
            var bd = {};
            bd.id = bp.id;
            bd.style = "outline:none;";
            bi.devicePanelId = bq;
            if (bi.wmode) {
                bo.wmode = bi.wmode;
                delete bi.wmode
            } else {
                bo.wmode = "transparent"
            }
            X(G + "/v1.1.6/flash/f_devicewidget.swf?partnerId=" + this.apiKey, bb, bm, bk, A, false, bi, bo, bd);
            return bp
        };
        this.removePanel = function (a9) {
            var bf;
            if (!a9.hasOwnProperty("id")) {
                bf = "DeviceManager.removePanel :: invalid DevicePanel object";
                aG(bf);
                throw new Error(bf)
            }
            u("DeviceManager.removePanel(" + a9.id + ")");
            var be = document.getElementById(a9.id);
            if (!be) {
                bf = "DeviceManager.removePanel :: DevicePanel does not exist in DOM";
                aG(bf);
                throw new Error(bf)
            }
            var bh = be.parentNode;
            var bg = a9.parentCreated;
            for (var bb in this.panels) {
                if (this.panels[bb].hasOwnProperty("id") && bb == a9.id) {
                    var a8 = this.panels[bb];
                    t(this.panels[bb]);
                    delete this.panels[bb];
                    var bc = function () {
                        if (a8.publisher && b.sessions) {
                            for (var bi in b.sessions) {
                                if (b.sessions[bi].hasOwnProperty("disconnect") && b.sessions[bi].publishers[a8.publisher.id]) {
                                    b.sessions[bi].publishers[a8.publisher.id].panelId = null
                                }
                            }
                        }
                    };
                    setTimeout(bc, 2)
                }
            }
            if (bg) {
                try {
                    var bd = bh.parentNode;
                    bd.removeChild(bh)
                } catch (ba) {
                    bf = "Failed to clean up the parent of the device panel " + ba;
                    aG(bf);
                    throw new Error(bf)
                }
            }
        }
    }

    function aS(a8) {
        var a3 = 1;
        var a7 = 1;
        this.recorders = {};
        this.players = {};
        this.apiKey = a8;
        var a4 = 320;
        var a5 = 271;
        var a6 = 31;
        this.displayRecorder = function (a9, be, bd) {
            if (!a9) {
                errorMsg = "RecorderManager.displayRecorder :: Token required to displayRecorder";
                aG(errorMsg);
                throw new Error(errorMsg)
            }
            var bh = "recorder_" + a8 + "_" + a3++;
            var bc = (bd) ? aP(bd) : {};
            bc.token = a9;
            bc.partnerId = a8;
            bc.recorderId = bh;
            if (bc.hasOwnProperty("style")) {
                var bg = bc.style.showControlBar;
                bc.style = encodeURIComponent(V(bc.style))
            }
            var ba = {};
            ba.allowscriptaccess = "always";
            if (bc.wmode) {
                ba.wmode = bc.wmode;
                delete bc.wmode
            } else {
                ba.wmode = "transparent"
            }
            var bb = {};
            bb.id = bh;
            bb.style = "outline:none;";
            if (!bc.width || isNaN(bc.width)) {
                bc.width = a4
            }
            if (!bc.height || isNaN(bc.height)) {
                bc.height = a5;
                if (bg == false) {
                    bc.height -= a6
                }
            }
            var bf = false;
            if (!be) {
                be = "recorder_replace_" + a3;
                bf = true
            }
            aY.onLoad(function () {
                if (bf) {
                    var bi = document.createElement("div");
                    bi.setAttribute("id", be);
                    document.body.appendChild(bi)
                }
                X(G + "/v1.1.6/flash/f_recordwidget.swf?partnerId=" + a8, be, bc.width, bc.height, A, false, bc, ba, bb)
            });
            this.recorders[bh] = new aq(bh, be, bc);
            return this.recorders[bh]
        };
        this.removeRecorder = function (a9) {
            if (!a9) {
                var ba = "Session.removeRecorder :: recorder cannot be null";
                aG(ba);
                throw new Error(ba)
            }
            u("Session.removeRecorder(" + a9.id + ")");
            t(a9);
            delete this.recorders[a9.id]
        };
        this.displayPlayer = function (bd, a9, bg, bf) {
            if (!bd) {
                errorMsg = "RecorderManager.displayPlayer :: Valid ArchiveId required";
                aG(errorMsg);
                throw new Error(errorMsg)
            }
            var ba = "player_" + a8 + "_" + a7++;
            var be = (bf) ? aP(bf) : {};
            be.token = a9;
            be.archiveId = bd;
            be.partnerId = a8;
            be.playerId = ba;
            if (be.hasOwnProperty("style")) {
                var bi = be.style.showControlBar;
                be.style = encodeURIComponent(V(be.style))
            }
            var bb = {};
            bb.allowscriptaccess = "always";
            if (be.wmode) {
                bb.wmode = be.wmode;
                delete be.wmode
            } else {
                bb.wmode = "transparent"
            }
            var bc = {};
            bc.id = ba;
            bc.style = "outline:none;";
            if (!be.width || isNaN(be.width)) {
                be.width = a4
            }
            if (!be.height || isNaN(be.height)) {
                be.height = a5;
                if (bi == false) {
                    be.height -= a6
                }
            }
            if (!be.autoPlay) {
                be.autoPlay = false
            }
            var bh = false;
            if (!bg) {
                bg = "player_replace_" + a7;
                bh = true
            }
            aY.onLoad(function () {
                if (bh) {
                    var bj = document.createElement("div");
                    bj.setAttribute("id", bg);
                    document.body.appendChild(bj)
                }
                X(G + "/v1.1.6/flash/f_playerwidget.swf?partnerId=" + a8, bg, be.width, be.height, A, false, be, bb, bc)
            });
            this.players[ba] = new aM(ba, bg, be);
            return this.players[ba]
        };
        this.removePlayer = function (a9) {
            if (!a9) {
                var ba = "Session.removePlayer :: player cannot be null";
                aG(ba);
                throw new Error(ba)
            }
            u("Session.removePlayer(" + a9.id + ")");
            t(a9);
            delete this.players[a9.id]
        }
    }

    function Q(a8) {
        this.superClass = aD;
        this.superClass();
        this.sessionId = a8;
        this.connection = null;
        this.subscribers = {};
        this.publishers = {};
        this.streams = {};
        this.apiKey = null;
        this.capabilities = null;
        this.connected = false;
        this.connecting = false;
        var a6 = 1;
        var a3 = 264;
        var a4 = 198;
        var a5;
        var a7;
        this.connect = function (bg, bc, bb) {
            if (this.connecting) {
                a1("Session.connect :: Patience, please.");
                return
            }
            u("Session.connect(" + bg + ")");
            var bd;
            if (!b.checkSystemRequirements()) {
                bd = "Session.connect :: Flash Player Version 11.1+ required";
                aG(bd);
                throw new Error(bd)
            }
            if (!bg) {
                bd = "Session.connect :: API key required to connect";
                aG(bd);
                throw new Error(bd)
            }
            if (!bc) {
                bd = "Session.connect :: Token required to connect";
                aG(bd);
                throw new Error(bd)
            }
            if (this.connected) {
                a1("Session.connect :: Session already connected");
                return
            }
            if (bc == "moderator_token" || bc == "devtoken") {
                a1('Session.connect :: "devtoken" and "moderator_token" are being deprecated soon. Please generate a token from https://dashboard.tokbox.com')
            }
            this.connecting = true;
            var a9 = (bb) ? aP(bb) : {};
            this.apiKey = bg;
            this.token = bc;
            this.properties = bb;
            var bf = {};
            bf.allowscriptaccess = "always";
            if (a9.wmode) {
                bf.wmode = a9.wmode;
                delete a9.wmode
            }
            if (a9.connectionData) {
                a9.connectionData = encodeURIComponent(a9.connectionData)
            }
            a5 = "controller_" + this.sessionId;
            var ba = {};
            ba.id = a5;
            a9.sessionId = this.sessionId;
            a9.token = this.token;
            var be = "replace_" + this.sessionId;
            aY.onLoad(function () {
                var bi = document.createElement("div");
                bi.setAttribute("id", be);
                bi.style.display = "none";
                document.body.appendChild(bi);
                var bh = new Date();
                a9.startTime = bh.getTime();
                swfobject.embedSWF(G + "/v1.1.6/flash/f_controllerwidget.swf?partnerId=" + bg, be, 1, 1, A, false, a9, bf, ba)
            });
            if (aU.location.protocol == "file:") {
                setTimeout("TB.controllerLoadCheck()", 8000)
            }
        };
        this.disconnect = function () {
            u("Session.disconnect()");
            if (!a5 || this.connecting) {
                a1("Session.disconnect :: No connection to disconnect");
                return
            }
            var a9 = document.getElementById(a5);
            if (a9) {
                if (!isUnloading) {
                    try {
                        a9.cleanupView()
                    } catch (bb) {
                        var ba = "Session.disconnect :: Failed to disconnect - " + bb;
                        aG(ba);
                        throw new Error(ba)
                    }
                }
            } else {
                a1("Session.disconnect :: No connection to disconnect")
            }
        };
        this.disconnectComponents = function () {
            u("Session.disconnectComponents() - disconnecting publishers and subscribers");
            for (var bb in this.publishers) {
                if (this.publishers[bb].hasOwnProperty("id")) {
                    try {
                        this.unpublish(this.publishers[bb])
                    } catch (ba) {
                        a1("disconnectComponents:: Failed to unpublish publisher " + bb)
                    }
                }
            }
            for (var a9 in this.subscribers) {
                if (this.subscribers[a9].hasOwnProperty("id")) {
                    try {
                        at(this.subscribers[a9])
                    } catch (ba) {
                        a1("disconnectComponent:: Failed to disconnect subscriber " + a9)
                    }
                }
            }
        };
        this.cleanup = function () {
            u("Session.cleanup()");
            for (var bb in this.publishers) {
                if (this.publishers[bb].hasOwnProperty("id")) {
                    try {
                        this.unpublish(this.publishers[bb]);
                        if (this.publishers[bb]._.DOMcomponent) {
                            this.publishers[bb].destroy()
                        }
                    } catch (ba) {
                        a1("cleanup:: Failed to unpublish publisher " + bb)
                    }
                }
            }
            for (var a9 in this.subscribers) {
                if (this.subscribers[a9].hasOwnProperty("id")) {
                    this.unsubscribe(this.subscribers[a9])
                }
            }
            this.publishers = {};
            this.subscribers = {};
            a7 = undefined
        };
        this.cleanupConnection = function () {
            u("Session.cleanupConnection() - removing controller");
            this.connection = null;
            if (!a5) {
                a1("Session.cleanup :: No connection to clean up");
                return
            }
            if (document.getElementById(a5)) {
                setTimeout(function () {
                    aF(a5, "TB.sessionDisconnected :: ");
                    a5 = null
                }, 0)
            } else {
                a1("Session.cleanup :: No connection to clean up")
            }
        };
        this.publish = function (bb, a9) {
            u("Session.publish(" + bb + "):" + a9);
            var ba;
            if (!this.connection || !this.connection.connectionId) {
                ba = "Session.publish :: Connection required to publish";
                aG(ba);
                throw new Error(ba)
            }
            if (!bb || typeof (bb) === "string") {
                bb = b.initPublisher(this.apiKey, bb, k(a9, {
                    sessionId: this.sessionId,
                    connectionId: this.connection.connectionId,
                    token: this.token
                }))
            } else {
                if (bb instanceof U) {
                    if ("session" in bb && bb.session && "sessionId" in bb.session) {
                        if (bb.session.sessionId === this.sessionId) {
                            a1("Cannot publish " + bb.id + " again to " + this.sessionId + ". Please call session.unpublish(publisher) first.")
                        } else {
                            a1("Cannot publish " + bb.id + " publisher already attached to " + bb.session.sessionId + ". Please call session.unpublish(publisher) first.")
                        }
                        return bb
                    }
                    bb._.publishToSession(this.sessionId, this.connection.connectionId, this.token, this.apiKey)
                } else {
                    ba = "Session.publish :: First parameter passed in is neither a string nor an instance of the Publisher";
                    aG(ba);
                    throw new Error(ba)
                }
            }
            this.publishers[bb.id] = bb;
            bb.session = this;
            return bb
        };
        this.unpublish = function (a9) {
            if (!a9) {
                throw new Error("Session.unpublish :: publisher parameter missing, publisher cannot be null")
            } else {
                if (!a9.hasOwnProperty("_") || !a9._.hasOwnProperty("unpublishFromSession")) {
                    throw new Error("Session.unpublish :: unknown publisher type, publisher must be created with TB.initPublisher()")
                }
            } if (a9.session && a9.session.sessionId == this.sessionId) {
                a9._.unpublishFromSession(this.sessionId)
            } else {
                if (!a9.session) {
                    a9.destroy()
                } else {
                    if (a9.session.sessionId != this.sessionId) {
                        a1("The publisher " + a9.id + " is trying to unpublish from a session " + this.sessionId + " it is not attached to")
                    }
                }
            } if (a9.panelId && v && v.panels[a9.panelId]) {
                v.removePanel(v.panels[a9.panelId])
            }
            a9.session = null
        };
        this.forceUnpublish = function (bd) {
            var bc, bb;
            if (bd && typeof (bd) == "string") {
                bc = bd
            } else {
                if (bd && typeof (bd) == "object" && bd.hasOwnProperty("streamId")) {
                    bc = bd.streamId
                } else {
                    bb = "Session.forceUnpublish :: Invalid stream type";
                    aG(bb);
                    throw new Error(bb)
                }
            } if (!this.streams[bc]) {
                b.exceptionHandler("Call to forceUnpublish() failed. The specified stream is not publishing to the session.", "Force Unpublish on Invalid Stream", 1535);
                return
            }
            u("Session.forceUnpublish(" + bc + ")");
            if (bc) {
                try {
                    var a9 = document.getElementById(a5);
                    a9.forceUnpublish(bc)
                } catch (ba) {
                    bb = "Session.forceUnpublish :: " + ba;
                    aG(bb);
                    throw new Error(bb)
                }
            } else {
                bb = "Session.forceUnpublish :: Stream does not exist.";
                aG(bb);
                throw new Error(bb)
            }
        };
        this.subscribe = function (bj, bg, bf) {
            var be;
            if (!this.connection || !this.connection.connectionId) {
                be = "Session.subscribe :: Connection required to subscribe";
                aG(be);
                throw new Error(be)
            }
            if (!bj) {
                be = "Session.subscribe :: stream cannot be null";
                aG(be);
                throw new Error(be)
            }
            if (!bj.hasOwnProperty("streamId")) {
                be = "Session.subscribe :: invalid stream object";
                aG(be);
                throw new Error(be)
            }
            u("Session.subscribe(" + bj.streamId + ")");
            if (!bg) {
                var a9 = document.createElement("div");
                bg = "subscriber_replace_" + this.sessionId + "_" + a6;
                a9.setAttribute("id", bg);
                document.body.appendChild(a9)
            }
            var bb = document.getElementById(bg);
            if (!bb) {
                be = "Session.subscribe :: replaceElementId does not exist in DOM.";
                aG(be);
                throw new Error(be)
            }
            var bd = (bf) ? aP(bf) : {};
            var bh = "subscriber_" + bj.streamId + "_" + a6++;
            var bk = new ah(bj, bh, bg, bd);
            var ba = {};
            ba.allowscriptaccess = "always";
            if (bd.wmode) {
                ba.wmode = bd.wmode;
                delete bd.wmode
            } else {
                ba.wmode = "transparent"
            } if (bd.hasOwnProperty("style")) {
                bd.style = encodeURIComponent(V(bd.style))
            }
            var bc = {};
            bc.id = bk.id;
            bc.style = "outline:none;";
            bd.subscriberId = bh;
            bd.connectionId = this.connection.connectionId;
            bd.sessionId = this.sessionId;
            bd.streamId = bj.streamId;
            bd.streamType = bj.type;
            bd.name = bj.name;
            bd.token = this.token;
            bd.simulateMobile = b.simulateMobile;
            bd.isPublishing = (Object.keys(this.publishers).length > 0);
            if (!bj.hasAudio) {
                bd.subscribeToAudio = "false";
                bd.hasAudio = "false"
            }
            if (!bj.hasVideo) {
                bd.subscribeToVideo = "false";
                bd.hasVideo = "false"
            }
            bd.orientation = bj.orientation;
            bd.peerId = bj.peerId;
            if (!bd.width || isNaN(bd.width)) {
                bd.width = a3
            }
            if (!bd.height || isNaN(bd.height)) {
                bd.height = a4
            }
            this.subscribers[bk.id] = bk;
            var bi = new Date();
            bd.startTime = bi.getTime();
            X(G + "/v1.1.6/flash/f_subscribewidget.swf?partnerId=" + this.apiKey, bg, bd.width, bd.height, A, false, bd, ba, bc);
            return bk
        };
        this.unsubscribe = function (a9) {
            if (!a9) {
                var ba = "Subscribe.unsubscribe :: subscriber cannot be null";
                aG(ba);
                throw new Error(ba)
            }
            u("Session.unsubscribe(" + a9.id + ")");
            t(a9);
            delete this.subscribers[a9.id]
        };
        this.signal = function () {
            u("Session.signal()");
            var bb;
            if (a5 && this.connection && this.connection.connectionId) {
                try {
                    var a9 = document.getElementById(a5);
                    a9.sendSignal()
                } catch (ba) {
                    bb = "Session.signal :: " + ba;
                    aG(bb);
                    throw new Error(bb)
                }
            } else {
                bb = "Session.signal :: Connection required to signal.";
                aG(bb);
                throw new Error(bb)
            }
        };
        this.forceDisconnect = function (ba) {
            if (ba) {
                u("Session.forceDisconnect(" + ba.connectionId + ")")
            }
            var bd, bc;
            if (ba && typeof (ba) == "string") {
                bd = ba
            } else {
                if (ba && typeof (ba) == "object" && ba.hasOwnProperty("connectionId")) {
                    bd = ba.connectionId
                } else {
                    bc = "Session.forceDisconnect :: Invalid connection type";
                    aG(bc);
                    throw new Error(bc)
                }
            } if (a5 && this.connection && this.connection.connectionId) {
                try {
                    var a9 = document.getElementById(a5);
                    a9.forceDisconnect(bd)
                } catch (bb) {
                    bc = "Session.forceDisconnect :: " + bb;
                    aG(bc);
                    throw new Error(bc)
                }
            } else {
                bc = "Session.forceDisconnect :: Connection required to forceDisconnect.";
                aG(bc);
                throw new Error(bc)
            }
        };
        this.getSubscribersForStream = function (bd) {
            var a9 = null,
                bb;
            if (!bd) {
                bb = "Session.getSubscribersForStream :: stream cannot be null";
                aG(bb);
                throw new Error(bb)
            } else {
                var bc;
                if (typeof (bd) == "string") {
                    bc = bd
                } else {
                    if (typeof (bd) == "object" && bd.hasOwnProperty("streamId")) {
                        bc = bd.streamId
                    } else {
                        bb = "Session.getSubscribersForStream :: Invalid stream type";
                        aG(bb);
                        throw new Error(bb)
                    }
                }
                a9 = [];
                for (var ba in this.subscribers) {
                    if (this.subscribers[ba].hasOwnProperty("stream") && this.subscribers[ba].stream.streamId == bc) {
                        a9.push(this.subscribers[ba])
                    }
                }
            }
            return a9
        };
        this.getPublisherForStream = function (bf) {
            var bd;
            if (!bf) {
                bd = "Session.getPublisherForStream :: stream cannot be null";
                aG(bd);
                throw new Error(bd)
            } else {
                var be;
                if (typeof (bf) == "string") {
                    be = bf
                } else {
                    if (typeof (bf) == "object" && bf.hasOwnProperty("streamId")) {
                        be = bf.streamId
                    } else {
                        bd = "Session.getPublisherForStream :: Invalid stream type";
                        aG(bd);
                        throw new Error(bd)
                    }
                }
                for (var bc in this.publishers) {
                    var bb = this.publishers[bc];
                    if (bb) {
                        try {
                            var a9 = bb._.callFlash("getStreamId", [], {
                                silentError: true
                            });
                            if (a9 === be) {
                                return this.publishers[bc]
                            }
                            if (!a9) {
                                a1("Failed to get streamId for publisher: " + this.publishers[bc].id);
                                delete this.publishers[bc]
                            }
                        } catch (ba) {
                            a1("Failed to get streamId for publisher: " + this.publishers[bc].id);
                            delete this.publishers[bc]
                        }
                    } else {
                        a1("Removing unknown publisher from stream");
                        delete this.publishers[bc]
                    }
                }
            }
            return null
        };
        this.createArchive = function (bd, ba, bc) {
            u("Session.createArchive()");
            if (a5 && this.connection && this.connection.connectionId) {
                if (ba == b.PER_SESSION || ba == b.PER_STREAM) {
                    try {
                        var a9 = document.getElementById(a5);
                        a9.createArchive(bd, ba, bc)
                    } catch (bb) {
                        errorMsg = "Session.createArchive :: " + bb;
                        aG(errorMsg);
                        throw new Error(errorMsg)
                    }
                } else {
                    errorMsg = "Session.createArchive :: Invalid type specfied.";
                    aG(errorMsg);
                    throw new Error(errorMsg)
                }
            } else {
                errorMsg = "Session.createArchive :: Connection required to create an archive.";
                aG(errorMsg);
                throw new Error(errorMsg)
            }
        };
        this.loadArchive = function (bc) {
            u("Session.loadArchive()");
            var bb;
            if (a5 && this.connection && this.connection.connectionId) {
                try {
                    var a9 = document.getElementById(a5);
                    a9.loadArchive(bc)
                } catch (ba) {
                    bb = "Session.loadArchive :: " + ba;
                    aG(bb);
                    throw new Error(bb)
                }
            } else {
                bb = "Session.loadArchive :: Connection required to load an archive.";
                aG(bb);
                throw new Error(bb)
            }
        };
        this.startRecording = function (ba) {
            u("Session.startRecording()");
            ba = H[this.sessionId][ba.archiveId];
            var bc;
            if (!ba) {
                bc = "Session.startRecording :: Archive not created.";
                aG(bc);
                throw new Error(bc)
            }
            if (ba.type != b.PER_SESSION) {
                bc = "Session.startRecording :: Trying to record per session on a " + ba.type + " archive";
                aG(bc);
                throw new Error(bc)
            }
            if (a5 && this.connection && this.connection.connectionId) {
                try {
                    var a9 = document.getElementById(a5);
                    a9.startRecordingSession(ba.archiveId)
                } catch (bb) {
                    bc = "Session.startRecording :: " + bb;
                    aG(bc);
                    throw new Error(bc)
                }
            } else {
                bc = "Session.startRecording :: Connection required to record an archive.";
                aG(bc);
                throw new Error(bc)
            }
        };
        this.stopRecording = function (ba) {
            u("Session.stopRecording()");
            ba = H[this.sessionId][ba.archiveId];
            var bc;
            if (!ba) {
                bc = "Session.stopRecording :: Archive not created.";
                aG(bc);
                throw new Error(bc)
            }
            if (ba.type != b.PER_SESSION) {
                bc = "Session.stopRecording :: Trying to stop recording per session on a " + ba.type + " archive";
                aG(bc);
                throw new Error(bc)
            }
            if (a5 && this.connection && this.connection.connectionId) {
                try {
                    var a9 = document.getElementById(a5);
                    a9.stopRecordingSession(ba.archiveId)
                } catch (bb) {
                    bc = "Session.stopRecording :: " + bb;
                    aG(bc);
                    throw new Error(bc)
                }
            } else {
                bc = "Session.stopRecording :: Connection required to record an archive.";
                aG(bc);
                throw new Error(bc)
            }
        };
        this.closeArchive = function (ba) {
            u("Session.closeArchive()");
            var bc;
            if (a5 && this.connection && this.connection.connectionId) {
                try {
                    var a9 = document.getElementById(a5);
                    a9.closeArchive(ba.archiveId)
                } catch (bb) {
                    bc = "Session.closeArchive :: " + bb;
                    aG(bc);
                    throw new Error(bc)
                }
            } else {
                bc = "Session.closeArchive :: Connection required to close an archive.";
                aG(bc);
                throw new Error(bc)
            }
        };
        this.getStateManager = function () {
            u("Session.getStateManager()");
            if (a7) {
                return a7
            } else {
                if (a5 && this.connection && this.connection.connectionId) {
                    a7 = new T(a5);
                    return a7
                }
            }
            var a9 = "Session.getStateManager :: Connection required to getState. Wait for sessionConnected before you getStateManager.";
            aG(a9);
            throw new Error(a9)
        }
    }

    function T(a4, a5) {
        this.superClass = aD;
        this.superClass();
        var a3 = 20;
        this.archiveId = a5;
        this.set = function (a9, bc) {
            var a8 = a9,
                bb;
            if (typeof (a9) === "string" && (typeof (bc) === "string" || bc == null)) {
                a8 = {};
                a8[a9] = bc
            } else {
                if (typeof (a9) === "object" && bc == null) {
                    if (Object.keys(a8).length > a3) {
                        aG("StateManager.set :: Maximum number of keys exceeded");
                        this.dispatchEvent(new ar("changeFailed", 405, "Maximum number of keys exceeded", a8));
                        return
                    }
                } else {
                    bb = "StateManager.set :: Invalid parameters passed. set() takes either two string parameters or one object of key value pairs.";
                    aG(bb);
                    throw new Error(bb)
                }
            } if (a5) {
                this.dispatchEvent(new ar("changeFailed", 450, " Cannot set set state for an archive.", a8));
                return
            }
            for (var a7 in a8) {
                if (typeof (a8[a7]) !== "string" && a8[a7] != null) {
                    aG("StateManager.set :: Invalid value " + a8[a7].toString() + " is not a string");
                    this.dispatchEvent(new ar("changeFailed", 403, " Invalid value, value must be a string", a8));
                    return
                }
                if (a8[a7] && typeof (a8[a7]) == "string" && a7.indexOf(" ") > -1) {
                    this.dispatchEvent(new ar("changeFailed", 402, "Invalid key -- either key length limit exceeded or key contains invalid values.", a8))
                }
            }
            if (a4) {
                try {
                    var a6 = document.getElementById(a4);
                    a6.setState(a8)
                } catch (ba) {
                    bb = "StateManager.set :: " + ba;
                    aG(bb);
                    throw new Error(bb)
                }
            }
        };
        this.superAddEventListener = this.addEventListener;
        this.addEventListener = function (bb, a6) {
            var bc = false;
            if (bb == "changed") {
                bc = null
            } else {
                if (bb.indexOf("changed:") === 0) {
                    bc = bb.split(":")[1];
                    if (bc.indexOf(" ") > -1) {
                        return
                    }
                }
            } if (bc !== false) {
                if (a5) {
                    bc = "TB_archive_" + a5 + "_"
                }
                if (a4) {
                    try {
                        var a8 = document.getElementById(a4);
                        var bd = a8.subscribeToKeyChange(bc);
                        if (bd != null) {
                            var ba = {};
                            for (var bc in bd) {
                                var be = bc.replace(/\$25/g, "-");
                                ba[be] = bd[bc]
                            }
                            var bf = av(a6, new al(bc ? "changed:" + bc : "changed", ba));
                            setTimeout(bf, 1)
                        }
                    } catch (a7) {
                        var a9 = "StateManager.addEventListener :: " + a7;
                        aG(a9);
                        throw new Error(a9)
                    }
                }
            }
            this.superAddEventListener(bb, a6)
        }
    }
    var S = (function () {
        var a6 = "http://hlg.tokbox.com/prod/logging/ClientEvent";
        if (O == "true" && aU.location.protocol == "https:") {
            a6 = "https://api.opentok.com/hl/logging/ClientEvent"
        }
        var a8 = "opentok-logging-frame",
            a7 = {}, a5 = {
                payloadType: "payload_type",
                streamId: "stream_id",
                sessiondId: "sessiond_id",
                connectionId: "connection_id",
                widgetType: "widget_type",
                widgetId: "widget_id"
            }, ba = swfobject ? swfobject.getFlashPlayerVersion() : null,
            a3 = ba ? [ba.major, ba.minor, ba.release].join(".") : "none",
            a4 = function (bd) {
                var bc = document.getElementById("opentok_analytics_logging");
                if (bc && bc.parentNode) {
                    bc.parentNode.removeChild(bc)
                }
                bc = ak("form", {
                    id: "opentok_analytics_logging",
                    action: a6,
                    method: "post",
                    target: a8,
                    style: "display:none;"
                });
                for (var bb in bd) {
                    if (bd.hasOwnProperty(bb)) {
                        aZ(bc, bb, bd[bb])
                    }
                }
                document.body.appendChild(bc);
                return bc
            }, a9 = function (be, bd, bf) {
                if (!bf) {
                    return false
                }
                var bb = [bf, bd, be].join("_"),
                    bc = aO.get("exceptionLogging", "messageLimitPerPartner", bf);
                if (bc === null || bc === undefined) {
                    return false
                }
                return (a7[bb] || 0) <= bc
            };
        return {
            error: function (bg, be, bf, bd, bc) {
                if (!bc) {
                    bc = {}
                }
                var bi = bc.partnerId;
                if (aO.get("exceptionLogging", "enabled", bi) !== true) {
                    return
                }
                if (a9(bg, be, bi)) {
                    b.log("ClientEvents.error has throttled an error of type " + be + "." + bg + " for partner " + (bi || "No Partner Id"));
                    return
                }
                var bb = [bi, be, bg].join("_"),
                    bh = this.escapePayload(D(bd, {
                        message: bf,
                        userAgent: navigator.userAgent,
                        flashVersion: a3
                    }));
                a7[bb] = typeof (a7[bb]) !== "undefined" ? a7[bb] + 1 : 1;
                return this.log(D(bc, {
                    action: be + "." + bg,
                    payloadType: bh[0],
                    payload: bh[1]
                }))
            },
            log: function (bb) {
                var bg = bb.partnerId;
                if (!bb) {
                    bb = {}
                }
                var bd, be = D({
                        variation: "",
                        guid: "",
                        widgetId: "",
                        sessionId: "",
                        connectionId: "",
                        streamId: "",
                        partnerId: "",
                        source: aU.location.href,
                        section: "",
                        build: ""
                    }, bb),
                    bf = function () {
                        b.log("logged: {action: " + be.action + ", variation: " + be.variation + ", payload_type: " + be.payload_type + ", payload: " + be.payload + "}")
                    };
                for (var bc in a5) {
                    if (a5.hasOwnProperty(bc) && be[bc]) {
                        be[a5[bc]] = be[bc];
                        delete be[bc]
                    }
                }
                bd = a4(be);
                Z(a8, bd, {
                    removeFormOnComplete: true,
                    onComplete: bf
                })
            },
            escapePayload: function (be) {
                var bd = [],
                    bb = [];
                for (var bc in be) {
                    if (be.hasOwnProperty(bc) && be[bc] !== null && be[bc] !== undefined) {
                        bd.push(be[bc] ? be[bc].toString().replace("|", "\\|") : "");
                        bb.push(bc.toString().replace("|", "\\|"))
                    }
                }
                return [bb.join("|"), bd.join("|")]
            }
        }
    })();

    function aE() {
        this.superClass = aD;
        this.superClass();
        var a4 = false,
            a6 = false,
            a3 = this,
            a9 = function () {
                return a6 && a4
            }, a7 = function () {
                if (a9()) {
                    a3.dispatchEvent(new N("envLoaded"))
                }
            }, ba = function () {
                a6 = true;
                aO.load();
                a7()
            }, a5 = function () {
                a4 = true;
                aO.removeEventListener("dynamicConfigChanged", a5);
                aO.removeEventListener("dynamicConfigLoadFailed", a8);
                a7()
            }, a8 = function () {
                a5()
            };
        swfobject.addDomLoadEvent(ba);
        aO.addEventListener("dynamicConfigChanged", a5);
        aO.addEventListener("dynamicConfigLoadFailed", a8);
        this.onLoad = function (bb) {
            if (a9()) {
                bb();
                return
            }
            this.addEventListener("envLoaded", bb)
        }
    }

    function p(a3) {
        if (!a3.success) {
            aG("Failed to embed SWF " + a3.id);
            b.exceptionHandler("Failed to embed SWF " + a3.id, "Embed Failed", 2001)
        }
    }

    function X(a6, bb, a8, ba, a3, a5, a4, a7, a9) {
        if (!swfobject.hasFlashPlayerVersion(a3)) {
            aG("Flash Player " + a3 + " or higher required");
            b.exceptionHandler("Flash Player " + a3 + " or higher required", "Embed Failed", 2001);
            return
        }
        swfobject.embedSWF(a6, bb, a8, ba, a3, a5, a4, a7, a9, p)
    }

    function av(a4, a3) {
        return function () {
            if (a4 != null) {
                a4(a3)
            } else {
                aG("Event handler is null")
            }
        }
    }

    function aB(a3) {
        aU.opentokdebug.debug("[FLASHDEBUG] opentok: " + a3)
    }

    function u(a3) {
        aU.opentokdebug.debug("[DEBUG] opentok: " + a3)
    }

    function r(a3) {
        aU.opentokdebug.info("[INFO] opentok: " + a3)
    }

    function a1(a3) {
        aU.opentokdebug.warn("[WARN] opentok: " + a3)
    }

    function aG(a3) {
        aU.opentokdebug.error("[ERROR] opentok: " + a3)
    }

    function aN(a6, a4, a5) {
        var a3 = document.getElementById("opentok_console");
        if (a3) {
            a3.innerHTML += (a5 + "<br>")
        }
    }

    function d(a3) {
        if (ag.hasOwnProperty(a3)) {
            return ag[a3]
        } else {
            return new R(a3, NaN, null)
        }
    }

    function E(a3, a6) {
        var a5 = a3.streamId;
        var a4 = b.sessions[a6];
        if (a4) {
            if (a4.streams[a5]) {
                return a4.streams[a5]
            } else {
                var a7 = new ae(a5, d(a3.connectionId), a3.name, a3.streamData, a3.type, a3.creationTime, a3.hasAudio, a3.hasVideo, a3.orientation, a6, a3.peerId, a3.quality);
                a4.streams[a5] = a7;
                return a7
            }
        }
        return null
    }

    function f(a4, a5) {
        var a6 = [];
        for (var a3 = 0; a3 < a4.length; a3++) {
            a6.push(E(a4[a3], a5))
        }
        return a6
    }

    function s(a3, a4) {
        var a5 = new C(a3.id, a3.type, a3.title, a4, a3.status);
        if (!H.hasOwnProperty(a4)) {
            H[a4] = {}
        }
        H[a4][a3.id] = a5;
        return a5
    }

    function ay(a4) {
        var a6 = [];
        for (var a5 = 0; a5 < a4.length; a5++) {
            var a3 = new R(a4[a5].connectionId, a4[a5].creationTime, a4[a5].data);
            a6.push(a3);
            ag[a3.connectionId] = a3
        }
        return a6
    }

    function ad(a3) {
        if (a3.status == b.ACTIVE) {
            return new aW(a3.name, b.ACTIVE)
        } else {
            if (a3.status == b.INACTIVE) {
                return new aW(a3.name, b.INACTIVE)
            } else {
                return new aW(a3.name, b.UNKNOWN)
            }
        }
    }

    function P(a3) {
        return new aT(a3.name, a3.status)
    }

    function J(a3) {
        var a5 = new Array();
        for (var a4 = 0; a4 < a3.length; a4++) {
            a5.push(new aW(a3[a4].name, a3[a4].status))
        }
        return a5
    }

    function I(a3) {
        var a5 = new Array();
        for (var a4 = 0; a4 < a3.length; a4++) {
            a5.push(new aT(a3[a4].name, a3[a4].status))
        }
        return a5
    }

    function at(a3) {
        if (!a3.hasOwnProperty("id")) {
            return
        }
        var a4 = document.getElementById(a3.id);
        if (a4) {
            try {
                a4.cleanupView()
            } catch (a5) {
                a1("Disconnecting " + a3.id + " failed")
            }
        } else {
            a1("Disconnecting " + a3.id + " failed")
        }
    }

    function t(a4) {
        var a5 = document.getElementById(a4.id);
        if (a5) {
            try {
                a5.cleanupView();
                var a3 = a5.parentNode;
                a3.removeChild(a5)
            } catch (a6) {
                a1("Removing " + a4.id + " failed " + a6)
            }
        } else {
            a1("Element " + a4.id + " does not exist")
        }
    }

    function aF(a3, a6) {
        try {
            if (a3) {
                swfobject.removeSWF(a3);
                a3 = null
            }
        } catch (a5) {
            var a4 = a6 + a5;
            aG(a4);
            b.exceptionHandler(a4, "Internal Error", 2000)
        }
    }

    function l(a8, a7, a6) {
        var a3 = document.getElementById(a8);
        if (a3) {
            try {
                a3.setStreamProperty(a7, a6)
            } catch (a5) {
                var a4 = "Changing settings on component " + a8 + " failed.";
                aG(a4);
                throw new Error(a4)
            }
        } else {
            a4 = "Component " + a8 + " does not exist.";
            aG(a4);
            throw new Error(a4)
        }
    }

    function i(a8, a7, a3) {
        var a4 = document.getElementById(a8);
        if (a4) {
            try {
                if (a3) {
                    a4.setCamera(a7.name)
                } else {
                    a4.setMicrophone(a7.name)
                }
            } catch (a6) {
                var a5 = "Changing hardware settings on publisher " + a8 + " failed.";
                aG(a5);
                throw new Error(a5)
            }
        } else {
            a5 = "Publisher " + a8 + " does not exist.";
            aG(a5);
            throw new Error(a5)
        }
    }

    function af(a9, a6) {
        a6 = a6 || Infinity;
        a9 = a9 || document.body;
        var ba, bb, a8 = 1,
            a5 = [],
            a7 = 0;
        var a4 = a9.childNodes,
            a3 = a4.length;
        while (a7 < a3) {
            ba = a4[a7++];
            if (ba.nodeType != 1) {
                continue
            }
            if (aa(ba, "position") !== "static") {
                bb = aa(ba, "z-index");
                if (bb == "auto") {
                    bb = af(ba)
                } else {
                    bb = parseInt(bb, 10) || 0
                }
            } else {
                bb = af(ba)
            } if (bb > a8 && bb <= a6) {
                a8 = bb
            }
        }
        return a8
    }

    function aa(a6, a5) {
        var a3, a7, a4 = document.defaultView || aU;
        if (a6.nodeType == 1) {
            a3 = a5.replace(/\-([a-z])/g, function (a9, a8) {
                return a8.toUpperCase()
            });
            a7 = a6.style[a3];
            if (!a7) {
                if (a6.currentStyle) {
                    a7 = a6.currentStyle[a3]
                } else {
                    if (a4.getComputedStyle) {
                        a7 = a4.getComputedStyle(a6, "").getPropertyValue(a5)
                    }
                }
            }
        }
        return a7 || ""
    }

    function D(a3, a5) {
        for (var a4 in a5) {
            if (a5.hasOwnProperty(a4)) {
                a3[a4] = a5[a4]
            }
        }
        return a3
    }

    function ak(a5, a4) {
        var a6 = document.createElement(a5);
        for (var a3 in a4) {
            a6.setAttribute(a3, a4[a3])
        }
        return a6
    }

    function aZ(a5, a4, a6) {
        var a3 = document.createElement("textarea");
        a3.setAttribute("name", a4);
        a3.value = a6;
        a3.style.display = "none";
        a5.appendChild(a3)
    }

    function x(a5) {
        var a4 = a5.width || 390;
        var a3 = a5.height || 242;
        var a6 = document.createElement("div");
        a6.setAttribute("id", a5.id || "modalDiv" + (Math.random() * (99999999)));
        a6.style.position = "absolute";
        a6.style.top = "25%";
        a6.style.left = "50%";
        a6.style.width = a4 + "px";
        a6.style.height = a3 + "px";
        a6.style.marginLeft = (0 - a4 / 2) + "px";
        a6.style.marginTop = (0 - a3 / 4) + "px";
        a6.style.paddingLeft = "32px";
        a6.style.paddingRight = "15px";
        a6.style.paddingTop = "15px";
        a6.style.display = "block";
        a6.style.visibility = "visible";
        a6.style.lineHeight = "15px";
        a6.style.zIndex = af() + 1;
        a6.innerHTML = a5.innerHTML || "";
        a6.style.backgroundColor = "#F7F7F7";
        a6.style.border = "1px solid #CCC";
        a6.style.fontWeight = "normal";
        a6.style.fontFamily = "'Lucida Grande', 'Trebuchet MS', sans-serif";
        a6.style.color = "#4c4c4c";
        a6.style.fontSize = "13px";
        return a6
    }

    function aR(a4) {
        a4.width = a4.width || 390;
        a4.height = a4.height || 242;
        var a6 = x(a4);
        var a5 = document.createElement("input");
        a5.setAttribute("type", "button");
        a5.setAttribute("value", "Close");
        a5.style.display = "inline";
        a5.style.visibility = "visible";
        a5.style.width = "100px";
        a5.style.position = "absolute";
        a5.style.bottom = "10px";
        var a3 = parseInt(a6.style.paddingLeft, 10) + parseInt(a6.style.paddingRight, 10);
        a5.style.left = (a4.width + a3) / 2 - 50 + "px";
        a5.onclick = function () {
            if (a6.parentNode) {
                a6.parentNode.removeChild(a6)
            }
        };
        a6.appendChild(a5);
        document.body.appendChild(a6)
    }

    function F(a8) {
        var a5 = [];
        var a7 = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70);
        var a9 = 45;
        var a6 = a8 || new Array(8, 4, 4, 4, 12);
        for (var a4 = 0; a4 < a6.length; a4++) {
            for (var a3 = 0; a3 < a6[a4]; a3++) {
                a5.push(a7[Math.floor(Math.random() * a7.length)])
            }
        }
        return String.fromCharCode.apply(null, a5)
    }

    function Z(a8, a7, a5) {
        if (!a5) {
            a5 = {}
        }
        var a3 = false,
            a6 = function () {
                if (a3) {
                    return
                }
                a3 = true;
                if (a5.onSubmit && a7) {
                    if (a7.addEventListener) {
                        a7.addEventListener("submit", a5.onSubmit(), false)
                    } else {
                        if (element.attachEvent) {
                            a7.attachEvent("onsubmit", a5.onSubmit())
                        }
                    }
                }
                a7.submit();
                setTimeout(function () {
                    var a9 = document.getElementById(a8);
                    if (a9) {
                        a9.parentNode.removeChild(a9)
                    }
                    if (a5.removeFormOnComplete === true && a7.parentNode) {
                        a7.parentNode.removeChild(a7)
                    }
                    if (a5.onComplete) {
                        a5.onComplete()
                    }
                }, 1000)
            };
        a7.setAttribute("target", a8);
        if (!document.getElementById(a8)) {
            var a4 = ak("iframe", {
                id: a8,
                name: a8,
                style: "display:none;width:0;height:0;"
            });
            a4.onload = a6;
            document.body.appendChild(a4);
            if (a4.attachEvent) {
                a4.attachEvent("onload", a6)
            }
        } else {
            a6()
        }
    }

    function az(a3) {
        try {
            var a4 = document.getElementById(a3);
            if (a4) {
                return a4.fetchData()
            }
        } catch (a5) {
            a1("Failed to get logs for " + a3 + " " + a5);
            return ""
        }
    }

    function V(a4) {
        var a3 = "{ ";
        for (var a5 in a4) {
            if (typeof (a4[a5]) == "boolean") {
                a3 += '"' + a5 + '":' + a4[a5] + ", "
            } else {
                a3 += '"' + a5 + '":"' + a4[a5].toString() + '", '
            }
        }
        if (a3.length > 1) {
            a3 = a3.substring(0, a3.length - 2) + " }"
        } else {
            a3 = "{}"
        }
        return a3
    }

    function aP(a5) {
        var a3 = (a5 instanceof Array) ? [] : {};
        for (var a4 in a5) {
            if (a4 == "clone") {
                continue
            }
            if (a5[a4] && typeof a5[a4] == "object") {
                a3[a4] = aP(a5[a4])
            } else {
                a3[a4] = a5[a4]
            }
        }
        return a3
    }

    function k(a5, a4) {
        var a3, a7 = {};
        if (typeof (a5) === "object" && typeof (a4) === "object") {
            for (a3 in a5) {
                if (a5.hasOwnProperty(a3)) {
                    a7[a3] = a5[a3];
                    if (a3 in a4) {
                        a7[a3] = k(a5[a3], a4[a3])
                    }
                }
            }
            for (a3 in a4) {
                if (a4.hasOwnProperty(a3)) {
                    if (!(a3 in a5)) {
                        a7[a3] = a4[a3]
                    }
                }
            }
        } else {
            a7 = a4
        } if (arguments.length > 2) {
            var a6 = Array.prototype.slice.call(arguments);
            a6 = a6.slice(2);
            a6.unshift(a7);
            return k.apply(this, a6)
        }
        return a7
    }
    this.isUnloading = false;
    aU.onunload = function () {
        isUnloading = true;
        for (var a3 in b.sessions) {
            if (b.sessions[a3].hasOwnProperty("disconnect")) {
                b.sessionDisconnectedHandler = function () {};
                b.sessions[a3].disconnect();
                b.sessions[a3].cleanupConnection();
                b.sessions[a3].cleanup()
            }
        }
    };
    M = new aD();
    var q, h = document.location.hash;
    var b = {
        sessions: {},
        DEBUG: 5,
        LOG: 4,
        INFO: 3,
        WARN: 2,
        ERROR: 1,
        NONE: 0,
        ACTIVE: "active",
        INACTIVE: "inactive",
        UNKNOWN: "unknown",
        PER_SESSION: "perSession",
        PER_STREAM: "perStream",
        EXCEPTION: "exception",
        ISSUE_REPORTED: "issueReported",
        SESSION_CONNECTED: "sessionConnected",
        SESSION_DISCONNECTED: "sessionDisconnected",
        STREAM_CREATED: "streamCreated",
        STREAM_DESTROYED: "streamDestroyed",
        CONNECTION_CREATED: "connectionCreated",
        CONNECTION_DESTROYED: "connectionDestroyed",
        SIGNAL_RECEIVED: "signalReceived",
        STREAM_PROPERTY_CHANGED: "streamPropertyChanged",
        MICROPHONE_LEVEL_CHANGED: "microphoneLevelChanged",
        ARCHIVE_CREATED: "archiveCreated",
        ARCHIVE_CLOSED: "archiveClosed",
        ARCHIVE_LOADED: "archiveLoaded",
        ARCHIVE_SAVED: "archiveSaved",
        SESSION_RECORDING_STARTED: "sessionRecordingStarted",
        SESSION_RECORDING_STOPPED: "sessionRecordingStopped",
        SESSION_RECORDING_IN_PROGRESS: "sessionRecordingInProgress",
        STREAM_RECORDING_IN_PROGRESS: "streamRecordingInProgress",
        SESSION_NOT_RECORDING: "sessionNotRecording",
        STREAM_NOT_RECORDING: "streamNotRecording",
        STREAM_RECORDING_STARTED: "streamRecordingStarted",
        STREAM_RECORDING_STOPPED: "streamRecordingStopped",
        PLAYBACK_STARTED: "playbackStarted",
        PLAYBACK_PAUSED: "playbackPaused",
        PLAYBACK_STOPPED: "playbackStopped",
        RECORDING_STARTED: "recordingStarted",
        RECORDING_STOPPED: "recordingStopped",
        RESIZE: "resize",
        SETTINGS_BUTTON_CLICK: "settingsButtonClick",
        DEVICE_INACTIVE: "deviceInactive",
        INVALID_DEVICE_NAME: "invalidDeviceName",
        ACCESS_ALLOWED: "accessAllowed",
        ACCESS_DENIED: "accessDenied",
        ACCESS_DENIED_NO_DEVICES: "accessDeniedNoDevices",
        ECHO_CANCELLATION_MODE_CHANGED: "echoCancellationModeChanged",
        DEVICES_DETECTED: "devicesDetected",
        DEVICES_SELECTED: "devicesSelected",
        CLOSE_BUTTON_CLICK: "closeButtonClick",
        MICLEVEL: "microphoneActivityLevel",
        MICGAINCHANGED: "microphoneGainChanged",
        HAS_REQUIREMENTS: 1,
        OLD_FLASH_VERSION: 0,
        BASIC_STREAM: "basic",
        ARCHIVED: "archive",
        simulateMobile: false,
        $: {
            createModalDiv: x,
            tbAlert: aR
        },
        setLogLevel: function (a3) {
            aU.opentokdebug.setLevel(a3);
            if (a3 == this.NONE) {
                aU.opentokdebug.setCallback(null)
            } else {
                aU.opentokdebug.setCallback(aN, true, 0);
                if (a3 >= this.DEBUG && !z) {
                    u("OpenTok JavaScript library v1.1.6");
                    u("Release notes: http://www.tokbox.com/opentok/docs/js/release-notes.html");
                    u("Known issues: http://www.tokbox.com/opentok/docs/js/release-notes.html#knownIssues");
                    z = true
                }
            }
            u("TB.setLogLevel(" + a3 + ")")
        },
        reportIssue: function (a4) {
            if (aH) {
                return
            }
            u("TB.reportIssue");
            var a5 = F();
            if (a4 && a4.length > 300) {
                a4 = a4.substr(0, 300)
            }
            try {
                this.reportIssueHandler(a5, false, a4, true);
                aH = true
            } catch (a3) {
                aH = false
            }
        },
        log: function (a3) {
            aU.opentokdebug.log("[LOG] opentok: " + a3)
        },
        ClientEvents: S,
        Config: {
            get: function () {
                return aO.get.apply(aO, arguments)
            }
        },
        initSession: function (a4) {
            if (!b.checkSystemRequirements()) {
                u("TB.initSession() failed -- invalid Flash Player version.");
                b.upgradeSystemRequirements()
            }
            u("TB.initSession(" + a4 + ")");
            if (a4 == null || a4 === "") {
                var a3 = "TB.initSession :: sessionId cannot be null";
                aG(a3);
                throw new Error(a3)
            }
            if (!this.sessions.hasOwnProperty(a4)) {
                this.sessions[a4] = new Q(a4)
            }
            if (!ap.hasOwnProperty(a4)) {
                ap[a4] = this.sessions[a4]
            }
            return this.sessions[a4]
        },
        initPublisher: function (a5, a3, a4) {
            u("TB.initPublisher(" + a3 + ")");
            if (!a4 || typeof (a4) !== "object") {
                a4 = {}
            }
            a4.apiKey = a5;
            if (!b.checkSystemRequirements()) {
                u("TB.initPublisher() failed -- invalid Flash Player version.");
                b.upgradeSystemRequirements()
            } else {
                return new U("publisher_" + ab++, a3, a4)
            }
        },
        initDeviceManager: function (a4) {
            u("TB.initDeviceManager(" + a4 + ")");
            if (!a4) {
                var a3 = "TB.initDeviceManager :: apiKey cannot be null";
                aG(a3);
                throw new Error(a3)
            }
            if (!v) {
                if (!b.checkSystemRequirements()) {
                    u("TB.initDeviceManager() failed -- invalid Flash Player version.");
                    b.upgradeSystemRequirements();
                    return
                } else {
                    v = new aV(a4)
                }
            }
            return v
        },
        initRecorderManager: function (a4) {
            u("TB.initRecorderManager(" + a4 + ")");
            if (!a4) {
                var a3 = "TB.initRecorderManager :: apiKey cannot be null";
                aG(a3);
                throw new Error(a3)
            }
            if (!B) {
                if (!b.checkSystemRequirements()) {
                    u("TB.initRecorderManager() failed -- invalid Flash Player version.");
                    b.upgradeSystemRequirements();
                    return
                } else {
                    B = new aS(a4)
                }
            }
            return B
        },
        addEventListener: function (a3, a4) {
            M.addEventListener(a3, a4)
        },
        removeEventListener: function (a3, a4) {
            M.removeEventListener(a3, a4)
        },
        dispatchEvent: function (a3) {
            u("TB.dispatchEvent()");
            a3.target = this;
            M.dispatchEvent(a3)
        },
        checkSystemRequirements: function () {
            u("TB.checkSystemRequirements()");
            var a3 = A,
                a4 = Array.prototype.slice.call(arguments),
                a6 = ["h264", "aec"];
            for (var a5 = 0; a5 < a4.length; a5++) {
                if (typeof (a4[a5]) !== "string" || a6.indexOf(a4[a5].toLowerCase()) === -1) {
                    aG("Invalid argument passed to TB.checkSystemRequirements: Permitted parameters are " + a6.join(", ") + "; received '" + a4[a5] + "'")
                } else {
                    a4[a5] = a4[a5].toLowerCase()
                }
            }
            if (a4.indexOf("h264") > -1) {
                a3 = "11"
            } else {
                if (a4.indexOf("aec") > -1) {
                    a3 = "10.3"
                }
            }
            return swfobject.hasFlashPlayerVersion(a3) ? this.HAS_REQUIREMENTS : this.OLD_FLASH_VERSION
        },
        upgradeSystemRequirements: function () {
            aY.onLoad(function () {
                var a3 = "_upgradeFlash";
                document.body.appendChild((function () {
                    var a5 = document.createElement("iframe");
                    a5.id = a3;
                    a5.style.position = "absolute";
                    a5.style.position = "fixed";
                    a5.style.height = "100%";
                    a5.style.width = "100%";
                    a5.style.top = "0px";
                    a5.style.left = "0px";
                    a5.style.right = "0px";
                    a5.style.bottom = "0px";
                    try {
                        a5.style.backgroundColor = "rgba(0,0,0,0.2)"
                    } catch (a4) {
                        a5.style.backgroundColor = "transparent";
                        a5.setAttribute("allowTransparency", "true")
                    }
                    a5.setAttribute("frameBorder", "0");
                    a5.frameBorder = "0";
                    a5.scrolling = "no";
                    a5.setAttribute("scrolling", "no");
                    a5.src = G + "/v1.1.6/html/upgradeFlash.html#" + encodeURIComponent(document.location.href);
                    return a5
                })());
                q && clearInterval(q);
                q = setInterval(function () {
                    var a5 = document.location.hash,
                        a4 = /^#?\d+&/;
                    if (a5 !== h && a4.test(a5)) {
                        h = a5;
                        if (a5.replace(a4, "") === "close_window") {
                            document.body.removeChild(document.getElementById(a3));
                            document.location.hash = ""
                        }
                    }
                }, 100)
            })
        },
        dynamicConfigLoadedHandler: function (a3) {
            aO.replaceWith(a3)
        },
        _exceptionHandler: function (a3, a9, a7, a4) {
            var a8 = e[a7],
                a5 = a4 ? aP(a4) : {};
            aG("TB.exception :: title: " + a8 + " (" + a7 + ") msg: " + a9);
            if (!a5.partnerId) {
                if (v || B) {
                    a5.partnerId = (v || B).apiKey
                }
                if (!a5.partnerId) {
                    aG("TB._exceptionHandler called but could not find a partner ID.")
                }
            }
            try {
                S.error(a7, "tb.exception", a8, {
                    details: a9
                }, a5);
                this.dispatchEvent(new K(this.EXCEPTION, a9, a8, a7, a3))
            } catch (a6) {
                aG("TB.exception :: Failed to dispatch exception - " + a6.toString())
            }
        },
        handleJsException: function (a6, a5, a3) {
            if (a3 && !a3.target) {
                a3.target = null
            }
            var a4, a7 = a3.session;
            if (a7) {
                a4 = {
                    sessionId: a7.sessionId,
                    partnerId: a7.apiKey
                };
                if (a7.connected) {
                    a4.connectionId = a7.connection.connectionId
                }
            }
            this._exceptionHandler(a3.target, a6, a5, a4)
        },
        exceptionHandler: function (a4, a8, a3, a7, a5) {
            var a6;
            if (a4) {
                a6 = ap[a4];
                if (!a6) {
                    a1("Could not find the component with component ID " + a4)
                }
            }
            this._exceptionHandler(a6, a8, a7, a5)
        },
        controllerLoadedHandler: function () {
            aK = true
        },
        controllerLoadCheck: function (a4) {
            if (!aK) {
                var a3 = "The connection timed out. Make sure that you have allowed this page in theFlash Player Global Settings Manager. Go to:";
                adobeURL = "http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html";
                prompt(a3, adobeURL)
            }
        },
        flashLogger: function (a3) {
            aB(a3)
        },
        sessionConnectedHandler: function (ba, bb, a3, a6, a4, bf, bd, bg) {
            u("TB.sessionConnected: " + ba + " - " + bb);
            var bc = this.sessions[ba],
                a5, a9;
            if (bg) {
                bc.apiKey = bg
            }
            try {
                for (a9 = 0, len = a3.length; a9 < len; a9++) {
                    a5 = a3[a9];
                    if (a5.connectionId === bb) {
                        bc.connection = new R(bb, a5.creationTime, a5.data);
                        break
                    }
                }
                bc.connected = true;
                bc.connecting = false;
                bc.connection.quality = bf;
                bc.capabilities = a4;
                var bi = ay(a3);
                var bh = f(a6, bc.sessionId);
                var be = [];
                for (a9 = 0; a9 < bd.length; a9++) {
                    var a7 = s(bd[a9], ba);
                    be.push(a7)
                }
                bc.dispatchEvent(new aX(this.SESSION_CONNECTED, bi, bh, be))
            } catch (a8) {
                b.handleJsException("TB.sessionConnected :: " + a8, 2000, {
                    session: bc,
                    target: bc
                })
            }
        },
        sessionDisconnectedHandler: function (a8, a7) {
            u("TB.sessionDisconnected(" + a7 + ")");
            var a6 = this.sessions[a8];
            try {
                a6.disconnectComponents();
                a6.cleanupConnection();
                a6.connected = false;
                var a5 = new y(this.SESSION_DISCONNECTED, a7, true);
                a6.dispatchEvent(a5)
            } catch (a4) {
                b.handleJsException("TB.sessionDisconnected :: " + a4, 2000, {
                    session: a6,
                    target: a6
                })
            }
            var a3 = function () {
                if (!a5.isDefaultPrevented()) {
                    try {
                        a6.cleanup()
                    } catch (a9) {
                        b.handleJsException("TB.sessionDisconnected :: " + a9, 2000, {
                            session: a6,
                            target: a6
                        })
                    }
                }
            };
            setTimeout(a3, 2)
        },
        streamCreatedHandler: function (a7, a3, a6) {
            u("TB.streamCreated");
            var a5 = this.sessions[a7],
                a8 = f(a3, a7);
            try {
                a5.dispatchEvent(new aL(this.STREAM_CREATED, a8, a6))
            } catch (a4) {
                b.handleJsException("TB.streamCreated :: " + a4, 2000, {
                    session: a5,
                    target: stream
                })
            }
        },
        streamDestroyedHandler: function (a7, a5, a9) {
            u("TB.streamDestroyed");
            var a8, a3, bb = this.sessions[a7],
                bd = f(a5, a7),
                a4 = new aL(this.STREAM_DESTROYED, bd, a9, true);
            for (a8 = 0; a8 < bd.length; a8++) {
                var bc = bd[a8];
                delete bb.streams[bc.streamId]
            }
            try {
                bb.dispatchEvent(a4);
                for (a8 = 0; a8 < a4.streams.length; a8++) {
                    a3 = bb.getPublisherForStream(a4.streams[a8]);
                    if (a3) {
                        a3.session = null
                    }
                }
            } catch (a6) {
                b.handleJsException("TB.streamDestroyed :: " + a6, 2000, {
                    session: bb,
                    target: bb
                })
            }
            var ba = function () {
                for (a8 = 0; a8 < a4.streams.length; a8++) {
                    if (!a4.isDefaultPrevented()) {
                        var bg = bb.getSubscribersForStream(a4.streams[a8]);
                        for (var be = 0; be < bg.length; be++) {
                            try {
                                bb.unsubscribe(bg[be])
                            } catch (bf) {
                                b.handleJsException("TB.streamDestroyed :: " + bf, 2000, {
                                    session: bb,
                                    target: bg[be]
                                })
                            }
                        }
                    }
                    a3 = bb.getPublisherForStream(a4.streams[a8]);
                    if (a3) {
                        if (!a4.isDefaultPrevented()) {
                            try {
                                a3.destroy()
                            } catch (bf) {
                                b.handleJsException("TB.streamDestroyed :: " + bf, 2000, {
                                    session: bb,
                                    target: a3
                                })
                            }
                        }
                        delete bb.publishers[a3.id]
                    }
                }
            };
            setTimeout(ba, 2)
        },
        streamPropertyChangedHandler: function (a9, a7, a5, a3, a6) {
            u("TB.streamPropertyChangedHandler");
            var bb = this.sessions[a9];
            var bc = E(a7, a9);
            bc[a5] = a6;
            var a4 = new Y(this.STREAM_PROPERTY_CHANGED, bc, a5, a3, a6);
            bb.dispatchEvent(a4);
            try {
                var bd, ba;
                if ("hasAudio" == a5) {
                    for (ba in bb.subscribers) {
                        bd = bb.subscribers[ba];
                        if (bd.hasOwnProperty("stream") && bd.stream.streamId == bc.streamId) {
                            bd._subscribeToAudio(a6, true);
                            break
                        }
                    }
                } else {
                    if ("hasVideo" == a5) {
                        for (ba in bb.subscribers) {
                            bd = bb.subscribers[ba];
                            if (bd.hasOwnProperty("stream") && bd.stream.streamId == bc.streamId) {
                                bd._subscribeToVideo(a6, true);
                                break
                            }
                        }
                    } else {
                        if ("orientation" == a5) {
                            for (ba in bb.subscribers) {
                                bd = bb.subscribers[ba];
                                if (bd.hasOwnProperty("stream") && bd.stream.streamId == bc.streamId) {
                                    bd.changeOrientation(a6);
                                    break
                                }
                            }
                        } else {
                            if ("quality" == a5) {} else {
                                u("Unknown property changed")
                            }
                        }
                    }
                }
            } catch (a8) {
                b.handleJsException("TB.streamPropertyChangedHandler :: " + a8, 2000, {
                    session: bb
                })
            }
        },
        microphoneLevelChangedHandler: function (a6, ba, a3, a7) {
            var a9 = this.sessions[a6],
                a8;
            if (!a9) {
                b.handleJsException("TB.microphoneLevelChangedHandler :: Invalid session ID: " + a6, 2000);
                return
            }
            try {
                var bb = a9.subscribers[ba];
                var a4 = new an(this.MICROPHONE_LEVEL_CHANGED, a3, a7);
                a9.dispatchEvent(a4)
            } catch (a5) {
                b.handleJsException("microphoneLevelChanged :: " + a5, 2000, {
                    session: a9
                })
            }
        },
        connectionCreatedHandler: function (a8, a3, a7) {
            u("TB.connectionCreated");
            var a6 = this.sessions[a8],
                a4 = ay(a3);
            try {
                a6.dispatchEvent(new aJ(this.CONNECTION_CREATED, a4, a7))
            } catch (a5) {
                b.handleJsException("TB.connectionCreated :: " + a5, 2000, {
                    session: a6
                })
            }
        },
        connectionDestroyedHandler: function (a8, a3, a7) {
            u("TB.connectionDestroyed");
            var a6 = this.sessions[a8],
                a4 = ay(a3);
            try {
                a6.dispatchEvent(new aJ(this.CONNECTION_DESTROYED, a4, a7))
            } catch (a5) {
                b.handleJsException("TB.connectionDestroyed :: " + a5, 2000, {
                    session: a6
                })
            }
        },
        signalHandler: function (a6, a3) {
            u("TB.signal");
            var a5 = this.sessions[a6];
            try {
                a5.dispatchEvent(new aQ(this.SIGNAL_RECEIVED, d(a3)))
            } catch (a4) {
                b.handleJsException("TB.signal ::" + a4, 2000, {
                    session: a5
                })
            }
        },
        archiveCreatedHandler: function (a6, a3) {
            u("TB.archiveCreatedHandler:" + a6 + " - " + a3);
            var a5 = this.sessions[a6],
                a7 = s(a3, a6);
            try {
                a5.dispatchEvent(new aI(this.ARCHIVE_CREATED, [a7]))
            } catch (a4) {
                b.handleJsException("TB.archiveCreatedHandler :: " + a4, 2000, {
                    session: a5
                })
            }
        },
        archiveClosedHandler: function (a7, a3) {
            u("TB.archiveClosedHandler:" + a7 + " - " + a3.id);
            try {
                var a6 = this.sessions[a7];
                var a4 = s(a3, a7);
                a6.dispatchEvent(new aI(this.ARCHIVE_CLOSED, [a4]));
                delete H[a7][a3.id]
            } catch (a5) {
                b.handleJsException("TB.archiveClosedHandler :: " + a5, 2000, {
                    session: a6
                })
            }
        },
        archiveLoadedHandler: function (a6, a3) {
            u("TB.archiveLoadedHandler:" + a6 + " - " + a3.archiveId);
            var a5 = this.sessions[a6];
            try {
                var a7 = new C(a3.id, a3.type, a3.title, a6);
                if (!ao.hasOwnProperty(a6)) {
                    ao[a6] = {}
                }
                ao[a6][a3.id] = a7;
                a5.dispatchEvent(new aI(this.ARCHIVE_LOADED, [a7]))
            } catch (a4) {
                b.handleJsException("TB.archiveLoadedHandler :: " + a4, 2000, {
                    session: a5
                })
            }
        },
        sessionRecordingStartedHandler: function (a7, a3) {
            u("TB.sessionRecordingStartedHandler:" + a7 + " - " + a3.id);
            try {
                var a6 = this.sessions[a7];
                var a4 = s(a3, a7);
                a6.dispatchEvent(new aI(this.SESSION_RECORDING_STARTED, [a4]))
            } catch (a5) {
                b.handleJsException("TB.sessionRecordingStartedHandler :: " + a5, 2000, {
                    session: a6
                })
            }
        },
        sessionRecordingStoppedHandler: function (a9, a3) {
            u("TB.sessionRecordingStoppedHandler:" + a9 + " - " + a3);
            try {
                var a8 = this.sessions[a9];
                var a4 = s(a3, a9);
                a8.dispatchEvent(new aI(this.SESSION_RECORDING_STOPPED, [a4]));
                for (var a7 in a8.publishers) {
                    if (a8.publishers[a7].hasOwnProperty("id")) {
                        var a6 = document.getElementById(a8.publishers[a7].id);
                        if (a6.signalRecordingStopped) {
                            a6.signalRecordingStopped()
                        }
                    }
                }
            } catch (a5) {
                b.handleJsException("TB.sessionRecordingStoppedHandler :: " + a5, 2000, {
                    session: a8
                })
            }
        },
        sessionRecordingInProgressHandler: function (a5) {
            u("TB.sessionRecordingInProgressHandler");
            var a4 = this.sessions[a5];
            try {
                a4.dispatchEvent(new W(this.SESSION_RECORDING_IN_PROGRESS, false))
            } catch (a3) {
                b.handleJsException("TB.sessionRecordingStartedHandler :: " + a3, 2000, {
                    session: a4
                })
            }
        },
        sessionNotRecordingHandler: function (a5) {
            u("TB.sessionNotRecordingHandler");
            var a4 = this.sessions[a5];
            try {
                a4.dispatchEvent(new W(this.SESSION_NOT_RECORDING, false))
            } catch (a3) {
                b.handleJsException("TB.sessionNotRecordingHandler :: " + a3, 2000, {
                    session: a4
                })
            }
        },
        streamRecordingStartedHandler: function (a9, a4) {
            u("TB.streamRecordingStartedHandler:" + a9);
            var a7 = this.sessions[a9],
                ba = f(a4, a9);
            try {
                a7.dispatchEvent(new aL(this.STREAM_RECORDING_STARTED, ba, "", false));
                for (var a3 = 0; a3 < a4.length; a3++) {
                    var a8 = a4[a3];
                    var a6 = a7.getPublisherForStream(a8);
                    if (a6) {
                        a6._.signalRecording(true);
                        u("TB.streamRecordingStartedHandler: signal: " + a8.streamId)
                    }
                }
            } catch (a5) {
                b.handleJsException("TB.streamRecordingStartedHandler :: " + a5, 2000, {
                    session: a7
                })
            }
        },
        streamRecordingStoppedHandler: function (a9, a4) {
            u("TB.streamRecordingStoppedHandler");
            var a7 = this.sessions[a9],
                ba = f(a4, a9);
            try {
                a7.dispatchEvent(new aL(this.STREAM_RECORDING_STOPPED, ba, "", false));
                for (var a3 = 0; a3 < a4.length; a3++) {
                    var a8 = a4[a3];
                    var a6 = a7.getPublisherForStream(a8);
                    if (a6) {
                        a6._.signalRecording(false);
                        u("TB.streamRecordingStoppedHandler: signal: " + a8.streamId)
                    }
                }
            } catch (a5) {
                b.handleJsException("TB.streamRecordingStoppedHandler :: " + a5, 2000, {
                    session: a7
                })
            }
        },
        streamRecordingInProgressHandler: function (a6, a3) {
            u("TB.streamRecordingInProgressHandler");
            var a5 = this.sessions[a6],
                a7 = f(a3, a6);
            try {
                a5.dispatchEvent(new aL(this.STREAM_RECORDING_IN_PROGRESS, a7, "", false))
            } catch (a4) {
                b.handleJsException("TB.streamRecordingInProgressHandler :: " + a4, 2000, {
                    session: a5
                })
            }
        },
        streamNotRecordingHandler: function (a6, a3) {
            u("TB.streamNotRecordingHandler");
            var a5 = this.sessions[a6];
            try {
                a5.dispatchEvent(new aL(this.STREAM_NOT_RECORDING, a3, "", false))
            } catch (a4) {
                b.handleJsException("TB.streamNotRecordingHandler :: " + a4, 2000, {
                    session: a5
                })
            }
        },
        playbackStartedHandler: function (a7, a4) {
            u("TB.playbackStartedHandler");
            var a6 = this.sessions[a7],
                a3 = new C(a4.id, a4.type, a4.title, a7);
            try {
                a6.dispatchEvent(new aI(this.PLAYBACK_STARTED, [a3]))
            } catch (a5) {
                b.handleJsException("TB.playbackStartedHandler :: " + a5, 2000, {
                    session: a6
                })
            }
        },
        playbackStoppedHandler: function (a7, a4) {
            u("TB.playbackStoppedHandler");
            var a6 = this.sessions[a7],
                a3 = new C(a4.id, a4.type, a4.title, a7);
            try {
                a6.dispatchEvent(new aI(this.PLAYBACK_STOPPED, [a3]))
            } catch (a5) {
                b.handleJsException("TB.playbackStoppedHandler :: " + a5, 2000, {
                    session: a6
                })
            }
        },
        videoComponentLoadedHandler: function (a5, a7) {
            try {
                if (a7 in ap) {
                    if ("_" in ap[a7] && "onload" in ap[a7]._) {
                        var a3 = ap[a7];
                        a3.loaded = true;
                        a3._.onload.call(a3)
                    }
                } else {
                    if (a5) {
                        var a6 = this.sessions[a5];
                        if (!a6) {
                            return
                        }
                        var bb = a6.subscribers[a7];
                        if (bb && !bb.loaded) {
                            bb._.DOMcomponent = document.getElementById(bb.id);
                            bb.loaded = true;
                            if (bb.modified) {
                                if (bb.audioSubscribed != null) {
                                    bb.subscribeToAudio(bb.audioSubscribed)
                                }
                                if (bb.videoSubscribed != null) {
                                    bb.subscribeToVideo(bb.videoSubscribed)
                                }
                                bb.setAudioVolume(bb.audioVolume);
                                bb.setStyle(bb._style);
                                bb.modified = false
                            }
                            bb.dispatchEvent(new W("loaded"))
                        }
                    } else {
                        var a9 = B.players[a7];
                        if (a9 && a9.id) {
                            a9._.DOMcomponent = document.getElementById(a7)
                        }
                        if (a9 && a9._archiveId) {
                            a9.loadArchive(a9._archiveId);
                            a9._archiveId = null
                        }
                        if (a9 && a9._play) {
                            a9.play();
                            a9._play = false
                        }
                        var ba = B.recorders[a7];
                        var a8 = a9 ? a9 : ba;
                        if (a8 && !a8.loaded) {
                            a8.loaded = true;
                            a8._.DOMcomponent = document.getElementById(a8.id);
                            if (a8.modified) {
                                a8.setStyle(a8._style);
                                if (a8 == ba && a8._title) {
                                    a8.setTitle(_title);
                                    _title = ""
                                }
                                a8.modified = false
                            }
                            a8.dispatchEvent(new W("loaded"))
                        }
                    }
                }
            } catch (a4) {
                b.handleJsException("videoComponentLoaded:: initialize component " + a7 + " - " + a4, 2000, {
                    session: a6
                })
            }
        },
        videoWidgetStyleHeightFrom: null,
        videoWidgetStyleWidthFrom: null,
        resizeVideoComponentToTarget: function (a9, bc) {
            u("TB.resize");
            try {
                var a3 = (bc in ap) ? ap[bc] : B.recorders[bc];
                var bb = this.sessions[a9];
                if (!a3) {
                    b.handleJsException("TB.resize :: Invalid ID: " + bc, 2000, {
                        session: bb
                    });
                    return
                }
                var a4 = document.getElementById(bc);
                if (!a4) {
                    b.handleJsException("TB.resize :: " + widgetType + " " + bc + " does not exist in the DOM", 2000, {
                        session: bb
                    });
                    return
                }
                var ba = a4.width;
                var a8 = a4.height;
                if (a4.width != a3.properties.width) {
                    a4.width = a3.properties.width
                }
                if (a4.height != a3.properties.height) {
                    a4.height = a3.properties.height
                }
                if (a4.style.height != videoWidgetStyleHeightFrom) {
                    a4.style.height = videoWidgetStyleHeightFrom
                }
                if (a4.style.width != videoWidgetStyleWidthFrom) {
                    a4.style.width = videoWidgetStyleWidthFrom
                }
                var a6 = a4.width;
                var a7 = a4.height;
                if (ba != a6 || a8 != a7) {
                    a3.dispatchEvent(new o(this.RESIZE, ba, a6, a8, a7))
                }
            } catch (a5) {
                b.handleJsException("resizeVideoComponentToTarget :: Error resizing " + widgetType + " - " + a5, 2000, {
                    session: bb
                })
            }
        },
        resizeVideoComponentToShowSecurity: function (ba, bd, be) {
            u("TB.resize");
            var bc = this.sessions[ba];
            var a4 = (bd in ap) ? ap[bd] : B.recorders[bd];
            if (!a4) {
                b.handleJsException("TB.resize :: Invalid " + widgetType + " ID: " + bd, 2000, {
                    session: bc
                });
                return
            }
            var a5 = document.getElementById(bd);
            if (!a5) {
                b.handleJsException("TB.resize :: " + widgetType + " " + bd + " does not exist in the DOM", 2000, {
                    session: bc
                });
                return
            }
            var bb = a4.properties.width = a5.width;
            var a9 = a4.properties.height = a5.height;
            videoWidgetStyleHeightFrom = a5.style.height;
            videoWidgetStyleWidthFrom = a5.style.width;
            var a3 = ax * be;
            var bf = j * be;
            if (a5.width < a3) {
                a5.width = a3;
                a5.style.width = a3 + "px"
            }
            if (a5.height < bf) {
                a5.height = bf;
                a5.style.height = bf + "px"
            }
            var a7 = a5.width;
            var a8 = a5.height;
            var a6 = a5.style;
            if (bb != a7 || a9 != a8 || videoWidgetStyleWidthFrom != a6.width || videoWidgetStyleHeightFrom != a6.height) {
                a4.dispatchEvent(new o(this.RESIZE, bb, a7, a9, a8))
            }
        },
        settingsButtonClickHandler: function (a9, a3) {
            u("TB.settingsButtonClick");
            var a8 = this.sessions[a9];
            var a7 = (a3 in ap) ? ap[a3] : false;
            if (!a7) {
                b.handleJsException("TB.settingsButtonClick :: Invalid publisher ID: " + publisherId, 2000, {
                    session: a8
                });
                return
            }
            try {
                var a6 = new W(this.SETTINGS_BUTTON_CLICK, true);
                a7.dispatchEvent(a6);
                var a4 = function () {
                    if (!a6.isDefaultPrevented()) {
                        var ba = b.initDeviceManager(a8 ? a8.apiKey : a7.properties.apiKey);
                        ba.displayPanel(null, a7, {})
                    }
                };
                setTimeout(a4, 2)
            } catch (a5) {
                b.handleJsException("settingsButtonClick :: " + a5, 2000, {
                    session: a8
                })
            }
        },
        recorderSettingsButtonClickHandler: function (a7) {
            u("TB.recorderSettingsButtonClick");
            try {
                var a3 = B.recorders[a7];
                if (!a3) {
                    errorMsg = "TB.recorderSettingsButtonClick :: Invalid recorder ID: " + a7;
                    aG(errorMsg);
                    b.exceptionHandler(errorMsg, "Internal Error", 2000);
                    return
                }
                var a6 = new W(this.SETTINGS_BUTTON_CLICK, true);
                a3.dispatchEvent(a6);
                var a4 = function () {
                    if (!a6.isDefaultPrevented()) {
                        var a8 = b.initDeviceManager(B.apiKey);
                        a8.displayPanel(null, a3, {})
                    }
                };
                setTimeout(a4, 2)
            } catch (a5) {
                b.handleJsException("recorderSettingsButtonClick :: " + a5, 2000)
            }
        },
        deviceAccessHandler: function (a7, bb, ba) {
            var a9 = this.sessions[a7];
            u("TB.deviceAccessHandler: " + ba);
            var a5 = (bb in ap) ? ap[bb] : B.recorders[bb],
                a3 = (bb in ap);
            if (!a5) {
                b.handleJsException("TB.deviceAccessHandler :: Invalid " + widgetType + " ID: " + bb, 2000, {
                    session: a9
                });
                return
            }
            try {
                if (ba == b.ACCESS_DENIED_NO_DEVICES) {
                    var a4 = new W(b.ACCESS_DENIED, true)
                } else {
                    a4 = new W(ba, true)
                }
                a5.dispatchEvent(a4);
                if (a3 && (ba == b.ACCESS_DENIED)) {
                    var a8 = function () {
                        if (a5 && a5.hasOwnProperty("_") && a5._.hasOwnProperty("refresh")) {
                            a5._.refresh()
                        }
                    };
                    setTimeout(a8, 2)
                }
            } catch (a6) {
                b.handleJsException(ba + " :: " + a6, 2000, {
                    session: a9
                })
            }
        },
        deviceInactiveHandler: function (a9, a3, a4, a6) {
            u("TB.deviceInactiveHandler");
            try {
                var a7 = this.sessions[a9];
                if (a3 && a3 in ap) {
                    var a8 = ap[a3];
                    if ("dispatchEvent" in a8) {
                        a8.dispatchEvent(new g(this.DEVICE_INACTIVE, a4, a6))
                    } else {
                        b.handleJsException("TB.deviceInactiveHandler :: Invalid component ID: " + a3, 2000, {
                            session: a7
                        })
                    }
                    return
                }
            } catch (a5) {
                b.handleJsException("deviceInactive :: " + a5, 2000, {
                    session: a7
                })
            }
        },
        invalidDeviceNameHandler: function (a8, ba, a7, a5) {
            u("TB.invalidDeviceNameHandler");
            var bb = this.sessions[a8];
            if (!bb) {
                b.handleJsException("TB.deviceInactiveHandler :: Invalid session ID: " + a8, 2000);
                return
            }
            try {
                var a4 = bb.publishers[ba];
                if (!a4) {
                    aG("TB.deviceInactiveHandler :: Invalid publisher ID: " + ba);
                    return
                }
                switch (a5) {
                case "camera":
                    var a9 = new aW(a7, "invalid");
                    var bc = null;
                    break;
                case "microphone":
                    bc = new aT(a7, "invalid");
                    a9 = null;
                    break
                }
                var a3 = new g(this.INVALID_DEVICE_NAME, a9, bc);
                a4.dispatchEvent(a3)
            } catch (a6) {
                b.handleJsException("deviceInactive :: " + a6, 2000, {
                    session: bb
                })
            }
        },
        echoCancellationModeChangedHandler: function (a3, a4, a6) {
            u("TB.echoCancellationModeChangedHandler");
            try {
                if (a3 && a3 in ap) {
                    var a7 = ap[a3];
                    if ("dispatchEvent" in a7) {
                        a7.dispatchEvent(new g(this.ECHO_CANCELLATION_MODE_CHANGED, a4, a6))
                    }
                    return
                }
            } catch (a5) {
                b.handleJsException("TB.echoCancellationModeChangedHandler :: Internal Error", 2000)
            }
        },
        microphoneActivityLevelHandler: function (a5, a3) {
            u("TB.microphoneActivityLevelHandler:" + a5);
            if (a3 && a3 in ap) {
                var a4 = ap[a3];
                if ("dispatchEvent" in a4) {
                    a4.dispatchEvent(new aC(this.MICLEVEL, a5))
                }
                return
            }
        },
        micGainChangedHandler: function (a3, a4) {
            u("TB.micGainChangedHandler:" + a3);
            if (a4 in ap) {
                ap[a4].dispatchEvent(new aC(this.MICGAINCHANGED, a3))
            }
        },
        devicesDetectedHandler: function (a3, a9, a8, ba, a4) {
            u("TB.devicesDetected");
            try {
                var bb = J(a3);
                var a6 = I(a9);
                if (a4 && a4 in ap) {
                    var a5 = ap[a4];
                    if ("dispatchEvent" in a5) {
                        a5.dispatchEvent(new am(this.DEVICES_DETECTED, bb, a6, bb[a8], a6[ba]))
                    }
                    return
                } else {
                    v.dispatchEvent(new am(this.DEVICES_DETECTED, bb, a6, bb[a8], a6[ba]));
                    setTimeout(function () {
                        aF(a2, "devicesDetectedHandler :: ");
                        a2 = null
                    }, 0)
                }
            } catch (a7) {
                b.handleJsException("devicesDetectedHandler :: " + a7, 2000)
            }
        },
        devicesSelectedHandler: function (a3, a4, a6) {
            u("TB.devicesSelected");
            try {
                var a7 = v.panels[a3];
                if (!a7) {
                    aG("TB.devicesSelected :: Invalid DevicePanel ID: " + a3);
                    return
                }
                if (a7.component) {
                    a7.component.setCamera(a4);
                    a7.component.setMicrophone(a6)
                }
                a7.dispatchEvent(new g(this.DEVICES_SELECTED, a4, a6))
            } catch (a5) {
                b.handleJsException("devicesSelected :: " + a5, 2000)
            }
        },
        closeButtonClickHandler: function (a3) {
            u("TB.closeButtonClick");
            try {
                var a7 = v.panels[a3];
                if (!a7) {
                    b.handleJsException("TB.devicesSelected :: Invalid DevicePanel ID: " + a3, 2000);
                    return
                }
                var a6 = new W(this.CLOSE_BUTTON_CLICK, true);
                a7.dispatchEvent(a6);
                var a4 = function () {
                    if (!a6.isDefaultPrevented()) {
                        v.removePanel(a7)
                    }
                };
                setTimeout(a4, 2)
            } catch (a5) {
                b.handleJsException("closeButtonClick :: " + a5, 2000)
            }
        },
        playerArchiveLoadedHandler: function (a3) {
            u("Player.archiveLoadedHandler");
            try {
                var a4 = B.players[a3];
                a4.dispatchEvent(new W(this.ARCHIVE_LOADED))
            } catch (a5) {
                b.handleJsException("Player.archiveLoadedHandler :: " + a5, 2000)
            }
        },
        playingStartedHandler: function (a3) {
            u("Player.playingHandler");
            try {
                var a4 = B.players[a3];
                a4.dispatchEvent(new W(this.PLAYBACK_STARTED))
            } catch (a5) {
                b.handleJsException("Player.playingStartedHandler :: " + a5, 2000)
            }
        },
        playingPausedHandler: function (a3) {
            u("Player.playingPausedHandler");
            try {
                var a4 = B.players[a3];
                a4.dispatchEvent(new W(this.PLAYBACK_PAUSED))
            } catch (a5) {
                b.handleJsException("Player.playingPausedHandler :: " + a5, 2000)
            }
        },
        playingStoppedHandler: function (a3, a5) {
            u("Player.playingStoppedHandler");
            try {
                var a4 = B.players[a3];
                a4.dispatchEvent(new W(this.PLAYBACK_STOPPED))
            } catch (a6) {
                b.handleJsException("Player.playingStoppedHandler :: " + a6, 2000)
            }
        },
        recordingStartedHandler: function (a5) {
            u("Recorder.recordingStartedHandler");
            try {
                var a3 = B.recorders[a5];
                a3.dispatchEvent(new W(this.RECORDING_STARTED))
            } catch (a4) {
                b.handleJsException("Recorder.recordingStartedHandler :: " + a4, 2000)
            }
        },
        recordingStoppedHandler: function (a5) {
            u("Recorder.recordingStoppedHandler");
            try {
                var a3 = B.recorders[a5];
                a3.dispatchEvent(new W(this.RECORDING_STOPPED))
            } catch (a4) {
                b.handleJsException("Recorder.recordingStoppedHandler :: " + a4, 2000)
            }
        },
        recorderPlaybackStartedHandler: function (a5) {
            u("Recorder.playbackStartedddHandler");
            try {
                var a3 = B.recorders[a5];
                a3.dispatchEvent(new W(this.PLAYBACK_STARTED))
            } catch (a4) {
                b.handleJsException("Recorder.playbackStartedHandler :: " + a4, 2000)
            }
        },
        recorderPlaybackStoppedHandler: function (a5) {
            u("Recorder.playbackStoppedHandler");
            try {
                var a3 = B.recorders[a5];
                a3.dispatchEvent(new W(this.PLAYBACK_STOPPED))
            } catch (a4) {
                b.handleJsException("Recorder.playbackStoppedHandler :: " + a4, 2000)
            }
        },
        archiveSavedHandler: function (a6, a4) {
            u("Recorder.archiveSavedHandler");
            try {
                var a3 = B.recorders[a6];
                var a7 = new C(a4.id, a4.type, a4.title);
                a3.dispatchEvent(new aI(this.ARCHIVE_SAVED, [a7]))
            } catch (a5) {
                b.handleJsException("Recorder.archiveSavedHandler :: " + a5, 2000)
            }
        },
        stateChangedHandler: function (a8, a5) {
            u("TB.stateChangeHandler");
            var a7 = this.sessions[a8];
            var a4;
            if (!a7) {
                b.handleJsException("TB.stateChangedHandler :: Invalid session ID: " + a8, 2000);
                return
            }

            function a3(bf) {
                var bc = {};
                for (var be in bf) {
                    keyValue = bf[be];
                    be = be.replace(/"/g, "");
                    var bb = be.match(/TB_archive_([^_]+)_(.*)/);
                    if (bb) {
                        archiveId = bb[1];
                        be = bb[2];
                        var bd = ao[a8][archiveId];
                        if (!bd) {
                            b.handleJsException("Archive.startPlayback :: Archive not loaded.", 2000);
                            return
                        }
                        bc[be] = keyValue;
                        a4 = bd.getStateManager()
                    }
                }
                if (a4) {
                    a5 = bc
                } else {
                    a4 = a7.getStateManager()
                }
            }
            var ba = false;
            a3(a5);
            for (var a6 in a5) {
                if (!ba) {
                    a4.dispatchEvent(new al("changed", a5));
                    ba = true
                }
                var a9 = {};
                a9[a6] = a5[a6];
                a4.dispatchEvent(new al("changed:" + a6, a9))
            }
            if (!ba) {
                a7.getStateManager().dispatchEvent(new al("changed", a5))
            }
        },
        stateChangedFailedHandler: function (a8, a7, a5, a6) {
            u("TB.stateChangedFailedHandler reasonCode:" + a7 + " reason:" + a5);
            var a4 = this.sessions[a8];
            if (!a4) {
                b.handleJsException("TB.stateChangedFailedHandler :: Invalid session ID: " + a8, 2000);
                return
            }
            var a3 = a4.getStateManager();
            a3.dispatchEvent(new ar("changeFailed", a7, a5, a6))
        },
        reportIssueHandler: function (bm, bd, bk, ba) {
            u("TB.reportIssueHandler");
            if (bd == null) {
                bd = false
            }
            if (L) {
                return
            }
            var a5 = document.createElement("form");
            a5.setAttribute("action", "http://www.tokbox.com/reportIssue.php");
            a5.setAttribute("method", "post");
            a5.setAttribute("target", "formresult");
            aZ(a5, "issueId", bm);
            aZ(a5, "userAgent", navigator.userAgent);
            aZ(a5, "environment", "JS");
            var bb = swfobject.getFlashPlayerVersion();
            aZ(a5, "flashVersion", bb.major + "." + bb.minor + "." + bb.release);
            var a7 = aU.opentokdebug.getLogs();
            aZ(a5, "jsLogs", a7);
            var a3 = false;
            var a8 = {};
            a8.length = 0;
            for (var bl in b.sessions) {
                var a4 = b.sessions[bl];
                if (!a4.hasOwnProperty("sessionId")) {
                    continue
                }
                if (!a3) {
                    aZ(a5, "apiKey", a4.apiKey);
                    a3 = true
                }
                aZ(a5, "session_" + ++a8.length, a4.sessionId);
                a8[a4.sessionId] = 0;
                var bh = "controller_" + a4.sessionId;
                var bq = az(bh);
                if (bq) {
                    aZ(a5, "widget_" + a4.sessionId + "_" + ++a8[a4.sessionId], bq)
                }
                if (a4.hasOwnProperty("subscribers")) {
                    for (var bg in a4.subscribers) {
                        if (a4.subscribers[bg].hasOwnProperty("id")) {
                            var bn = az(a4.subscribers[bg].id);
                            aZ(a5, "widget_" + a4.sessionId + "_" + ++a8[a4.sessionId], bn)
                        }
                    }
                }
            }
            if (ap) {
                aZ(a5, "session_" + ++a8.length, "null");
                a8["null"] = 0;
                for (var bc in ap) {
                    var bo = ap[bc],
                        a9 = null,
                        bj = "null";
                    if (bo.hasOwnProperty("id")) {
                        a9 = az(bo.id);
                        if (bo.session && "sessionId" in bo.session) {
                            bj = bo.session.sessionId
                        }
                        aZ(a5, "widget_" + bj + "_" + ++a8[bj], a9)
                    }
                }
            }
            if (!bd) {
                if (!bk && !ba) {
                    var bf = document.createElement("textarea");
                    bf.setAttribute("name", "description");
                    bf.setAttribute("rows", 8);
                    bf.setAttribute("cols", 40);
                    bf.style.height = "110px";
                    bf.style.width = "300px";
                    bf.style.display = "block";
                    bf.style.visibility = "visible";
                    a5.appendChild(bf);
                    var bp = document.createElement("input");
                    bp.setAttribute("type", "submit");
                    bp.setAttribute("value", "Report Issue");
                    bp.style.display = "inline";
                    bp.style.visibility = "visible";
                    a5.appendChild(bp);
                    var bi = document.createElement("input");
                    bi.setAttribute("type", "button");
                    bi.setAttribute("value", "Cancel");
                    bi.style.display = "inline";
                    bi.style.visibility = "visible";
                    a5.appendChild(bi);
                    var be = x({
                        id: "opentokReportIssue",
                        width: 390,
                        height: 242,
                        innerHTML: '<span style="color:#4c4c4c;font-size:18px;display:inline;visibility:visible;">We\'re sorry to hear that something went wrong.</span><br/><br/>Please help us to debug your issue by providing a description of what happened.'
                    });
                    be.appendChild(a5);
                    document.body.appendChild(be);
                    L = true;
                    closeForm = function () {
                        document.body.removeChild(be);
                        L = false
                    };
                    bi.onclick = closeForm;
                    a5.onsubmit = function () {
                        aU.open("#", "formresult", "scrollbars=no,menubar=no,height=200,width=400,resizable=yes,toolbar=no,status=no");
                        setTimeout(function () {
                            closeForm()
                        }, 1000)
                    }
                } else {
                    aZ(a5, "description", bk);
                    document.body.appendChild(a5);
                    onHiddenPostSubmit = function () {
                        if (ba) {
                            b.dispatchEvent(new ai(b.ISSUE_REPORTED, bm));
                            clearTimeout(a6)
                        }
                    };
                    var a6 = setTimeout("hiddenPostTimeoutHandler()", 7000);
                    hiddenPostTimeoutHandler = function () {
                        if (ba) {
                            b.dispatchEvent(new K(b.EXCEPTION, "The call to TB.reportIssue() did not succeed in sending the issue to the server.", "Report Issue Failure", 2010))
                        }
                    };
                    Z("formresult", a5, {
                        removeFormOnComplete: true,
                        onSubmit: onHiddenPostSubmit
                    })
                }
            }
            if (bd) {
                a5.onsubmit = function () {
                    aU.open("#", "formresult", "scrollbars=no,menubar=no,height=200,width=400,resizable=yes,toolbar=no,status=no");
                    setTimeout(function () {
                        closeForm()
                    }, 1000)
                };
                aZ(a5, "showReport", true);
                document.body.appendChild(a5);
                a5.submit()
            }
        }
    };
    aU.TB = b;
    aY = new aE();
    b.onLoad = function () {
        aY.onLoad.apply(aY, arguments)
    }
})(window);
(function (d) {
    if (!TB_ChromeAllowFix.allowDenyBugPresent) {
        return
    }
    var e = d.initPublisher;
    d.initPublisher = function () {
        var i = e.apply(this, arguments),
            j;
        i.addEventListener("accessDialogOpened", function () {
            j = new TB_ChromeAllowFix.AllowFixer(document.getElementById(i.id));
            j.start()
        });
        i.addEventListener("accessDialogClosed", function () {
            j.stop()
        });
        return i
    };
    var g = d.initDeviceManager;
    d.initDeviceManager = function () {
        var j = g.apply(this, arguments),
            l = {};
        var i = j.displayPanel;
        j.displayPanel = function () {
            var m = i.apply(this, arguments);
            var o = new TB_ChromeAllowFix.AllowFixer(document.getElementById(m.id));
            o.start();
            l[m] = o;
            return m
        };
        var k = j.removePanel;
        j.removePanel = function (m) {
            if (l[m]) {
                l[m].stop()
            }
            return k.apply(this, arguments)
        };
        return j
    };
    var b = d.initRecorderManager;
    d.initRecorderManager = function () {
        var j = b.apply(this, arguments);
        var i = j.displayRecorder;
        j.displayRecorder = function () {
            var l = i.apply(this, arguments),
                m;
            l.addEventListener("loaded", function () {
                m = new TB_ChromeAllowFix.AllowFixer(document.getElementById(l.id));
                m.start()
            });
            var k = function () {
                if (m) {
                    m.stop()
                }
            };
            l.addEventListener("accessAllowed", k);
            l.addEventListener("accessDenied", k);
            return l
        };
        return j
    };
    var c = d.resizeVideoComponentToShowSecurity;
    d.resizeVideoComponentToShowSecurity = function (k, i, j) {
        if (j != 1) {
            d.$.tbAlert({
                innerHTML: "<h2>Warning!</h2><p>You may not be able to click the allow button to allow access to your camera because your browser is zoomed in. Please restore your browser to the normal zoom level by clicking on the 'View' drop down menu and then clicking 'Actual Size'.</p>",
                height: 160
            })
        }
        return c.apply(this, arguments)
    };
    var f = h(document);
    if (f) {
        var a = new TB_ChromeAllowFix.AllowFixer(f);
        a.start()
    }

    function h(j) {
        var k = j.defaultView || j.parentWindow;
        try {
            var q = k.parent.document.getElementsByTagName("iframe");
            for (var l = q.length; l-- > 0;) {
                var p = q[l];
                var o = p.contentDocument || p.contentWindow.document;
                if (o === j) {
                    return p
                }
            }
        } catch (m) {
            opentokdebug.error("[ERROR] opentok: Unable to access the parent iframe to adjust for Chrome Allow/Deny issue. You may not be able to click the allow button.")
        }
        return null
    }
})(TB);