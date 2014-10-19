function sn_book(p, n, b) {
    var f = jQuery;
    var m = f(this);
    var i = f(".sn_list", b);
    b = b.parent();
    var k = f("<div>").addClass("sn_effect sn_book").css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        }).appendTo(b),
        e = p.duration,
        d = p.perspective || 0.4,
        g = p.shadow || 0.35,
        a = p.noCanvas || false,
        l = p.no3d || false;
    var o = {
        domPrefixes: " Webkit Moz ms O Khtml".split(" "),
        testDom: function(r) {
            var q = this.domPrefixes.length;
            while (q--) {
                if (typeof document.body.style[this.domPrefixes[q] + r] !== "undefined") {
                    return true
                }
            }
            return false
        },
        cssTransitions: function() {
            return this.testDom("Transition")
        },
        cssTransforms3d: function() {
            var r = (typeof document.body.style.perspectiveProperty !== "undefined") || this.testDom("Perspective");
            if (r && /AppleWebKit/.test(navigator.userAgent)) {
                var t = document.createElement("div"),
                    q = document.createElement("style"),
                    s = "Test3d" + Math.round(Math.random() * 99999);
                q.textContent = "@media (-webkit-transform-3d){#" + s + "{height:3px}}";
                document.getElementsByTagName("head")[0].appendChild(q);
                t.id = s;
                document.body.appendChild(t);
                r = t.offsetHeight === 3;
                q.parentNode.removeChild(q);
                t.parentNode.removeChild(t)
            }
            return r
        },
        canvas: function() {
            if (typeof document.createElement("canvas").getContext !== "undefined") {
                return true
            }
        }
    };
    if (!l) {
        l = o.cssTransitions() && o.cssTransforms3d()
    }
    if (!a) {
        a = o.canvas()
    }
    var j;
    this.go = function(r, q, E) {
        if (j) {
            return -1
        }
        var v = n.get(r),
            G = n.get(q);
        if (E == undefined) {
            E = (q == 0 && r != q + 1) || (r == q - 1)
        } else {
            E = !E
        }
        var s = f("<div>").appendTo(k);
        var t = f(v);
        t = {
            width: t.width(),
            height: t.height(),
            marginLeft: parseFloat(t.css("marginLeft")),
            marginTop: parseFloat(t.css("marginTop"))
        };
        if (l) {
            var y = {
                background: "#000",
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                zIndex: 3,
                outline: "1px solid transparent"
            };
            perspect = b.width() * (3 - d * 2);
            s.css(y).css({
                perspective: perspect,
                transform: "translate3d(0,0,0)"
            });
            var z = 90;
            var D = f("<div>").css(y).css({
                position: "relative",
                "float": "left",
                width: "50%",
                overflow: "hidden"
            }).append(f("<img>").attr("src", (E ? v : G).src).css(t)).appendTo(s);
            var C = f("<div>").css(y).css({
                position: "relative",
                "float": "left",
                width: "50%",
                overflow: "hidden"
            }).append(f("<img>").attr("src", (E ? G : v).src).css(t).css({
                marginLeft: -t.width / 2
            })).appendTo(s);
            var I = f("<div>").css(y).css({
                display: E ? "block" : "none",
                width: "50%",
                transform: "rotateY(" + (E ? 0.1 : z) + "deg)",
                transition: (E ? "ease-in " : "ease-out ") + e / 2000 + "s",
                transformOrigin: "right",
                overflow: "hidden"
            }).append(f("<img>").attr("src", (E ? G : v).src).css(t)).appendTo(s);
            var F = f("<div>").css(y).css({
                display: E ? "none" : "block",
                left: "50%",
                width: "50%",
                transform: "rotateY(-" + (E ? z : 0.1) + "deg)",
                transition: (E ? "ease-out " : "ease-in ") + e / 2000 + "s",
                transformOrigin: "left",
                overflow: "hidden"
            }).append(f("<img>").attr("src", (E ? v : G).src).css(t).css({
                marginLeft: -t.width / 2
            })).appendTo(s)
        } else {
            if (a) {
                var x = f("<div>").css({
                    position: "absolute",
                    top: 0,
                    left: E ? 0 : "50%",
                    width: "50%",
                    height: "100%",
                    overflow: "hidden",
                    zIndex: 6
                }).append(f(n.get(r)).clone().css({
                    position: "absolute",
                    height: "100%",
                    right: E ? "auto" : 0,
                    left: E ? 0 : "auto"
                })).appendTo(s).hide();
                var B = f("<div>").css({
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    zIndex: 8
                }).appendTo(s).hide();
                var H = f("<canvas>").css({
                    position: "absolute",
                    zIndex: 2,
                    left: 0,
                    top: -B.height() * d / 2
                }).attr({
                    width: B.width(),
                    height: B.height() * (d + 1)
                }).appendTo(B);
                var A = H.clone().css({
                    top: 0,
                    zIndex: 1
                }).attr({
                    width: B.width(),
                    height: B.height()
                }).appendTo(B);
                var w = H.get(0).getContext("2d");
                var u = A.get(0).getContext("2d")
            } else {
                i.stop(true).animate({
                    left: (r ? -r + "00%" : (/Safari/.test(navigator.userAgent) ? "0%" : 0))
                }, e, "easeInOutExpo")
            }
        }
        if (!l && a) {
            var D = w;
            var C = u;
            var I = G;
            var F = v
        }
        j = new h(E, z, D, C, I, F, B, H, A, x, t, function() {
            m.trigger("effectEnd");
            s.remove();
            j = 0
        })
    };

    function c(G, s, A, v, u, E, D, C, B, t, r) {
        numSlices = u / 2, widthScale = u / B, heightScale = (1 - E) / numSlices;
        G.clearRect(0, 0, r.width(), r.height());
        for (var q = 0; q < numSlices + widthScale; q++) {
            var z = (D ? q * p.width / u + p.width / 2 : (numSlices - q) * p.width / u);
            var H = A + (D ? 2 : -2) * q,
                F = v + t * heightScale * q / 2;
            if (z < 0) {
                z = 0
            }
            if (H < 0) {
                H = 0
            }
            if (F < 0) {
                F = 0
            }
            G.drawImage(s, z, 0, 2.5, p.height, H, F, 2, t * (1 - (heightScale * q)))
        }
        G.save();
        G.beginPath();
        G.moveTo(A, v);
        G.lineTo(A + (D ? 2 : -2) * (numSlices + widthScale), v + t * heightScale * (numSlices + widthScale) / 2);
        G.lineTo(A + (D ? 2 : -2) * (numSlices + widthScale), t * (1 - heightScale * (numSlices + widthScale)) + v + t * heightScale * (numSlices + widthScale) / 2);
        G.lineTo(A, v + t);
        G.closePath();
        G.clip();
        G.fillStyle = "rgba(0,0,0," + Math.round(C * 100) / 100 + ")";
        G.fillRect(0, 0, r.width(), r.height());
        G.restore()
    }

    function h(B, s, D, C, z, y, w, x, v, A, u, F) {
        if (l) {
            if (!B) {
                s *= -1;
                var E = C;
                C = D;
                D = E;
                E = y;
                y = z;
                z = E
            }
            setTimeout(function() {
                D.children("img").css("opacity", g).animate({
                    opacity: 1
                }, e / 2);
                z.css("transform", "rotateY(" + s + "deg)").children("img").css("opacity", 1).animate({
                    opacity: g
                }, e / 2, function() {
                    z.hide();
                    y.show().css("transform", "rotateY(0deg)").children("img").css("opacity", g).animate({
                        opacity: 1
                    }, e / 2);
                    C.children("img").css("opacity", 1).animate({
                        opacity: g
                    }, e / 2)
                })
            }, 0)
        } else {
            if (a) {
                w.show();
                var r = new Date;
                var t = true;
                var q = setInterval(function() {
                    var G = (new Date - r) / e;
                    if (G > 1) {
                        G = 1
                    }
                    var J = jQuery.easing.easeInOutQuint(1, G, 0, 1, 1),
                        I = jQuery.easing.easeInOutCubic(1, G, 0, 1, 1),
                        M = !B;
                    if (G < 0.5) {
                        J *= 2;
                        I *= 2;
                        var H = z
                    } else {
                        M = B;
                        J = (1 - J) * 2;
                        I = (1 - I) * 2;
                        var H = y
                    }
                    var K = w.height() * d / 2,
                        O = (1 - J) * w.width() / 2,
                        N = 1 + I * d,
                        L = w.width() / 2;
                    c(D, H, L, K, O, N, M, I * g, L, w.height(), x);
                    if (t) {
                        A.show();
                        t = false
                    }
                    C.clearRect(0, 0, v.width(), v.height());
                    C.fillStyle = "rgba(0,0,0," + (g - I * g) + ")";
                    C.fillRect(M ? L : 0, 0, v.width() / 2, v.height());
                    if (G == 1) {
                        clearInterval(q)
                    }
                }, 15)
            }
        }
        setTimeout(F, e)
    }
}
jQuery.extend(jQuery.easing, {
    easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },
    easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    }
}); // 

jQuery("#snbrowser-container1").snbrowser({
    effect: "book",
    prev: "",
    next: "",
    duration: 20 * 100,
    delay: 29 * 100,
    width: 830,
    height: 360,
    autoPlay: true,
    autoPlayVideo: false,
    playPause: true,
    stopOnHover: false,
    loop: false,
    bullets: 1,
    caption: true,
    captionEffect: "parallax",
    controls: true,
    responsive: 3,
    fullScreen: false,
    gestures: 2,
    onBeforeStep: 0,
    images: 0
});