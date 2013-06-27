// https://apis.google.com/js/api.js

var gapi = window.gapi = window.gapi || {};
gapi._bs = new Date().getTime();
(function () {
    var f = encodeURIComponent,
        g = window,
        k = decodeURIComponent,
        m = "push",
        n = "test",
        s = "shift",
        t = "replace",
        x = "length",
        A = "split",
        B = "join";
    var C = g,
        D = document,
        aa = C.location,
        ba = function () {}, ca = /\[native code\]/,
        F = function (a, b, c) {
            return a[b] = a[b] || c
        }, da = function (a) {
            for (var b = 0; b < this[x]; b++)
                if (this[b] === a) return b;
            return -1
        }, ea = function (a) {
            a = a.sort();
            for (var b = [], c = void 0, d = 0; d < a[x]; d++) {
                var e = a[d];
                e != c && b[m](e);
                c = e
            }
            return b
        }, G = function () {
            var a;
            if ((a = Object.create) && ca[n](a)) a = a(null);
            else {
                a = {};
                for (var b in a) a[b] = void 0
            }
            return a
        }, H = F(C, "gapi", {});
    var I;
    I = F(C, "___jsl", G());
    F(I, "I", 0);
    F(I, "hel", 10);
    var J = function () {
        var a = aa.href,
            b;
        if (I.dpo) b = I.h;
        else {
            b = I.h;
            var c = RegExp("([#].*&|[#])jsh=([^&#]*)", "g"),
                d = RegExp("([?#].*&|[?#])jsh=([^&#]*)", "g");
            if (a = a && (c.exec(a) || d.exec(a))) try {
                b = k(a[2])
            } catch (e) {}
        }
        return b
    }, fa = function (a) {
            var b = F(I, "PQ", []);
            I.PQ = [];
            var c = b[x];
            if (0 === c) a();
            else
                for (var d = 0, e = function () {
                        ++d === c && a()
                    }, h = 0; h < c; h++) b[h](e)
        }, K = function (a) {
            return F(F(I, "H", G()), a, G())
        };
    var L = F(I, "perf", G()),
        M = F(L, "g", G()),
        ga = F(L, "i", G());
    F(L, "r", []);
    G();
    G();
    var N = function (a, b, c) {
        var d = L.r;
        "function" === typeof d ? d(a, b, c) : d[m]([a, b, c])
    }, P = function (a, b, c) {
            b && 0 < b[x] && (b = O(b), c && 0 < c[x] && (b += "___" + O(c)), 28 < b[x] && (b = b.substr(0, 28) + (b[x] - 28)), c = b, b = F(ga, "_p", G()), F(b, c, G())[a] = (new Date).getTime(), N(a, "_p", c))
        }, O = function (a) {
            return a[B]("__")[t](/\./g, "_")[t](/\-/g, "_")[t](/\,/g, "_")
        };
    var R = G(),
        S = [],
        T = function (a) {
            throw Error("Bad hint" + (a ? ": " + a : ""));
        };
    S[m](["jsl",
        function (a) {
            for (var b in a)
                if (Object.prototype.hasOwnProperty.call(a, b)) {
                    var c = a[b];
                    "object" == typeof c ? I[b] = F(I, b, []).concat(c) : F(I, b, c)
                }
            if (b = a.u) a = F(I, "us", []), a[m](b), (b = /^https:(.*)$/.exec(b)) && a[m]("http:" + b[1])
        }
    ]);
    var ha = /^(\/[a-zA-Z0-9_\-]+)+$/,
        ia = /^[a-zA-Z0-9\-_\.!]+$/,
        ja = /^gapi\.loaded_[0-9]+$/,
        ka = /^[a-zA-Z0-9,._-]+$/,
        oa = function (a, b, c, d) {
            var e = a[A](";"),
                h = R[e[s]()],
                l = null;
            h && (l = h(e, b, c, d));
            if (b = l) b = l, c = b.match(la), d = b.match(ma), b = !! d && 1 === d[x] && na[n](b) && !! c && 1 === c[x];
            b || T(a);
            return l
        }, qa = function (a, b, c, d) {
            a = pa(a);
            ja[n](c) || T("invalid_callback");
            b = U(b);
            d = d && d[x] ? U(d) : null;
            var e = function (a) {
                return f(a)[t](/%2C/g, ",")
            };
            return [f(a.d)[t](/%2C/g, ",")[t](/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) :
                "", "/rt=j/sv=1/d=1/ed=1", a.a ? "/am=" + e(a.a) : "", a.b ? "/rs=" + e(a.b) : "", "/cb=", e(c)][B]("")
        }, pa = function (a) {
            "/" !== a.charAt(0) && T("relative path");
            for (var b = a.substring(1)[A]("/"), c = []; b[x];) {
                a = b[s]();
                if (!a[x] || 0 == a.indexOf(".")) T("empty/relative directory");
                else if (0 < a.indexOf("=")) {
                    b.unshift(a);
                    break
                }
                c[m](a)
            }
            a = {};
            for (var d = 0, e = b[x]; d < e; ++d) {
                var h = b[d][A]("="),
                    l = k(h[0]),
                    p = k(h[1]);
                2 == h[x] && (l && p) && (a[l] = a[l] || p)
            }
            b = "/" + c[B]("/");
            ha[n](b) || T("invalid_prefix");
            c = V(a, "k", !0);
            d = V(a, "am");
            a = V(a, "rs");
            return {
                d: b,
                version: c,
                a: d,
                b: a
            }
        }, U = function (a) {
            for (var b = [], c = 0, d = a[x]; c < d; ++c) {
                var e = a[c][t](/\./g, "_")[t](/-/g, "_");
                ka[n](e) && b[m](e)
            }
            return b[B](",")
        }, V = function (a, b, c) {
            a = a[b];
            !a && c && T("missing: " + b);
            if (a) {
                if (ia[n](a)) return a;
                T("invalid: " + b)
            }
            return null
        }, na = /^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
        ma = /\/cb=/g,
        la = /\/\//g,
        ra = function () {
            var a = J();
            if (!a) throw Error("Bad hint");
            return a
        };
    R.m = function (a, b, c, d) {
        (a = a[0]) || T("missing_hint");
        return "https://apis.google.com" + qa(a, b, c, d)
    };
    var W = decodeURI("%73cript"),
        X = function (a, b) {
            for (var c = [], d = 0; d < a[x]; ++d) {
                var e = a[d];
                e && 0 > da.call(b, e) && c[m](e)
            }
            return c
        }, sa = function (a) {
            "loading" != D.readyState ? Y(a) : D.write("<" + W + ' src="' + encodeURI(a) + '"></' + W + ">")
        }, Y = function (a) {
            var b = D.createElement(W);
            b.setAttribute("src", a);
            b.async = "true";
            (a = D.getElementsByTagName(W)[0]) ? a.parentNode.insertBefore(b, a) : (D.head || D.body || D.documentElement).appendChild(b)
        }, ta = function (a, b) {
            var c = b && b._c;
            if (c)
                for (var d = 0; d < S[x]; d++) {
                    var e = S[d][0],
                        h = S[d][1];
                    h && Object.prototype.hasOwnProperty.call(c,
                        e) && h(c[e], a, b)
                }
        }, ua = function (a, b) {
            Z(function () {
                var c;
                c = b === J() ? F(H, "_", G()) : G();
                c = F(K(b), "_", c);
                a(c)
            })
        }, va = function (a, b) {
            var c = b || {};
            "function" == typeof b && (c = {}, c.callback = b);
            ta(a, c);
            var d = a ? a[A](":") : [],
                e = c.h || ra(),
                h = F(I, "ah", G());
            if (h["::"] && d[x]) {
                for (var l = [], p = null; p = d[s]();) {
                    var u = p[A]("."),
                        u = h[p] || h[u[1] && "ns:" + u[0] || ""] || e,
                        r = l[x] && l[l[x] - 1] || null,
                        y = r;
                    r && r.hint == u || (y = {
                        hint: u,
                        c: []
                    }, l[m](y));
                    y.c[m](p)
                }
                var z = l[x];
                if (1 < z) {
                    var E = c.callback;
                    E && (c.callback = function () {
                        0 == --z && E()
                    })
                }
                for (; d = l[s]();) $(d.c,
                    c, d.hint)
            } else $(d || [], c, e)
        }, $ = function (a, b, c) {
            a = ea(a) || [];
            var d = b.callback,
                e = b.config,
                h = b.timeout,
                l = b.ontimeout,
                p = null,
                u = !1;
            if (h && !l || !h && l) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
            var r = F(K(c), "r", []).sort(),
                y = F(K(c), "L", []).sort(),
                z = [].concat(r),
                E = function (a, b) {
                    if (u) return 0;
                    C.clearTimeout(p);
                    y[m].apply(y, q);
                    var d = ((H || {}).config || {}).update;
                    d ? d(e) : e && F(I, "cu", [])[m](e);
                    if (b) {
                        P("me0", a, z);
                        try {
                            ua(b, c)
                        } finally {
                            P("me1", a, z)
                        }
                    }
                    return 1
                };
            0 < h && (p = C.setTimeout(function () {
                u = !0;
                l()
            }, h));
            var q = X(a, y);
            if (q[x]) {
                var q = X(a, r),
                    v = F(I, "CP", []),
                    w = v[x];
                v[w] = function (a) {
                    if (!a) return 0;
                    P("ml1", q, z);
                    var b = function (b) {
                        v[w] = null;
                        E(q, a) && fa(function () {
                            d && d();
                            b()
                        })
                    }, c = function () {
                            var a = v[w + 1];
                            a && a()
                        };
                    0 < w && v[w - 1] ? v[w] = function () {
                        b(c)
                    } : b(c)
                };
                if (q[x]) {
                    var Q = "loaded_" + I.I++;
                    H[Q] = function (a) {
                        v[w](a);
                        H[Q] = null
                    };
                    a = oa(c, q, "gapi." + Q, r);
                    r[m].apply(r, q);
                    P("ml0", q, z);
                    b.sync || C.___gapisync ? sa(a) : Y(a)
                } else v[w](ba)
            } else E(q) && d && d()
        };
    var Z = function (a) {
        if (I.hee && 0 < I.hel) try {
            return a()
        } catch (b) {
            I.hel--, va("debug_error", function () {
                g.___jsl.hefn(b)
            })
        } else return a()
    };
    H.load = function (a, b) {
        return Z(function () {
            return va(a, b)
        })
    };
    M.bs0 = g.gapi._bs || (new Date).getTime();
    N("bs0");
    M.bs1 = (new Date).getTime();
    N("bs1");
    delete g.gapi._bs;
})();
gapi.load("", {
    callback: window["gapi_onload"],
    _c: {
        "jsl": {
            "ci": {
                "client": {},
                "plus_layer": {
                    "isEnabled": false
                },
                "isLoggedIn": true,
                "iframes": {
                    "additnow": {
                        "methods": ["launchurl"],
                        "url": "https://apis.google.com/additnow/additnow.html?bsv"
                    },
                    "recobox": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/recobox?bsv"
                    },
                    "plus_followers": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/_/im/_/widget/render/plus/followers?bsv"
                    },
                    "signin": {
                        "methods": ["onauth"],
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/signin?bsv"
                    },
                    "commentcount": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/commentcount?bsv"
                    },
                    "plus_circle": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/plus/circle?bsv"
                    },
                    "hangout": {
                        "url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget?bsv"
                    },
                    "evwidget": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/events/widget?bsv"
                    },
                    "zoomableimage": {
                        "url": "https://ssl.gstatic.com/microscope/embed/?bsv"
                    },
                    "card": {
                        "url": ":socialhost:/:session_prefix:_/hovercard/card?bsv"
                    },
                    "shortlists": {
                        "url": "?bsv"
                    },
                    "plus": {
                        "methods": ["onauth"],
                        "url": ":socialhost:/u/:session_index:/_/pages/badge?bsv"
                    },
                    ":socialhost:": "https://apis.google.com",
                    "rbr_t": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/recobartray?bsv"
                    },
                    "autocomplete": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete?bsv"
                    },
                    "plus_share": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/+1/sharebutton?plusShare\u003dtrue\u0026bsv"
                    },
                    "rbr_i": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/recobarinvitation?bsv"
                    },
                    "panoembed": {
                        "url": "https://ssl.gstatic.com/pano/embed/?bsv"
                    },
                    "savetowallet": {
                        "url": "https://clients5.google.com/s2w/o/savetowallet?bsv"
                    },
                    "appcirclepicker": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker?bsv"
                    },
                    "savetodrive": {
                        "methods": ["save"],
                        "url": "https://drive.google.com/savetodrivebutton?usegapi\u003d1\u0026bsv"
                    },
                    ":signuphost:": "https://plus.google.com",
                    "plusone": {
                        "preloadUrl": ["https://ssl.gstatic.com/s2/oz/images/stars/po/Publisher/sprite4-a67f741843ffc4220554c34bd01bb0bb.png"],
                        "params": {
                            "count": "",
                            "size": "",
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/+1/fastbutton?bsv"
                    },
                    "comments": {
                        "methods": ["scroll", "openwindow"],
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/comments?bsv"
                    },
                    "ytsubscribe": {
                        "url": "https://www.youtube.com/subscribe_embed?bsv\u0026usegapi\u003d1"
                    }
                },
                "isPlusUser": true,
                "debug": {
                    "host": "https://plusone.google.com",
                    "reportExceptionRate": 0.05,
                    "rethrowException": true
                },
                "deviceType": "desktop",
                "inline": {
                    "css": 1
                },
                "lexps": [102, 103, 100, 71, 96, 97, 79, 109, 107, 105, 45, 17, 86, 81, 112, 61, 30],
                "oauth-flow": {
                    "disableOpt": true,
                    "authUrl": "https://accounts.google.com/o/oauth2/auth",
                    "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
                    "persist": true,
                    "toastCfg": "1000:3000:1000"
                },
                "report": {
                    "host": "https://apis.google.com"
                },
                "csi": {
                    "rate": 0.01
                },
                "googleapis.config": {
                    "mobilesignupurl": "https://m.google.com/app/plus/oob?"
                }
            },
            "h": "m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.Hm9QrP5wPuw.O/m\u003d__features__/am\u003dEQ/rt\u003dj/d\u003d1/rs\u003dAItRSTOJmMfO7AjAhJbN5yM-BshnzKg53Q",
            "u": "https://apis.google.com/js/api.js",
            "hee": true,
            "fp": "260561431f0c54368b1e7bb78748a59b881b7978",
            "dpo": false
        },
        "fp": "260561431f0c54368b1e7bb78748a59b881b7978",
        "annotation": ["interactivepost", "recobar", "autocomplete", "profile"],
        "bimodal": ["signin"]
    }
});