/**
 *  Created by boyuan on 8/29/16.
 */

define(['jquery', 'funcTpl', 'api/api.config', 'js.cookie', 'jquery.md5', 'Juicer'], function ($, funtpl, API, Cookies) {
    var index = {
        init: function () {
            index.toptipsControl.init();
            index.followControl.init();
            index.loginControl.init();
            index.carousel();
            index.getCourseCard(1, 20, 10);
            index.courseTabSwitch();
            index.getHottestCourse();
            index.getIntroVideo();
        },
        //缓存部分dom提高性能
        dom: {
            $login: $('#J_popup-login'),
            $submit: $('#J_submit'),
            $popupWrap: $('#J_popup-wrap'),
            $fans_count: $('#J_fans'),
            $followBtn: $('#J_header-left-follow-btn'),
            $unfollowBtn: $('#J_unfollowBtn')
        },
        //顶栏"不再提示"功能
        toptipsControl: {
            init: function () {
                // Cookies.remove('toptipDismissed', {path: '/'});  //FIXME:测试用
                var $toptips = $('#J_top-tips');

                if (Cookies.get('toptipDismissed', {path: '/'}) !== 'true') {
                    $toptips.fadeIn();
                }
                $('#J_top-tips-dismiss').on('click', function () {
                    Cookies.set('toptipDismissed', 'true', {expires: 7, path: '/'});
                    $toptips.fadeOut();
                });
            }
        },

        //登录
        loginControl: {
            init: function () {
                var self = this,
                    dom = index.dom;

                dom.$submit.on('click', self._login);
                document.onkeydown = function (keyEvent) {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue === 13) {
                        self._login();
                    }
                };
                $('#J_close-popup-login').on('click', function () {
                    dom.$popupWrap.hide();
                    dom.$login.hide();
                });
            },
            //登录
            _login: function () {
                var dom = index.dom,
                    param = {
                        userName: '',
                        password: ''
                    };

                param.userName = $('#J_uid').val().trim();
                param.password = $.md5($('#J_pwd').val());
                if (param.userName && param.password) {
                    dom.$submit.html('正在登录..').attr('disabled', 'true');
                    $.get(API.login, param, function (rsp) {
                        if (rsp == 0) {//FIXME:此处接口有问题,使用所提供的账号密码无法登陆,顾设置返回0时为登录成功
                            Cookies.set('loginSuc', 'true', {path: '/'}); //设置登录成功 cookie,
                            dom.$submit.html('登录成功');
                            index.followControl._follow();  //登录成功后关注
                        } else {
                            alert('用户密码错误,请重新输入');
                            dom.$submit.html('登录').removeAttr('disabled');
                        }
                    });
                }
            }
        },

        //关注
        followControl: {
            init: function () {
                var self = this,
                    dom = index.dom;

                if (Cookies.get('followSuc', {path: '/'}) === 'true') {
                    dom.$followBtn.hide();
                    dom.$followBtn.next().show();
                }

                dom.$followBtn.on('click', function () {
                    // Cookies.remove('loginSuc', {path: '/'}); //FIXME:测试用
                    //点击关注,如果未登录,则显示登录窗口
                    if (Cookies.get('loginSuc', {path: '/'}) !== 'true') {
                        dom.$popupWrap.show();
                        dom.$login.show().css('top', '+=30').animate({top: '-=30px', opacity: '1'}, 500);
                    } else {
                        self._follow();
                    }
                });

                dom.$unfollowBtn.on('click', function () {
                    self._unfollow();
                });
            },
            _follow: function () {
                var dom = index.dom;

                $.get(API.changeFollowState, function (rsp) {
                    if (rsp == 1) {
                        Cookies.set('followSuc', 'true', {path: '/'}); //设置关注成功的 cookie(followSuc),

                        dom.$login.hide();
                        dom.$popupWrap.hide();

                        dom.$followBtn.hide();
                        dom.$followBtn.next().show();

                        var fans = parseInt(dom.$fans_count.html());
                        dom.$fans_count.html(fans + 1);
                        $('#J_popUpTips').html('关注成功').fadeIn().fadeOut();
                    }
                });
            },
            _unfollow: function () {
                var dom = index.dom;
                //TODO:此处应有ajax告诉服务器此用户已取消关注
                Cookies.remove('followSuc', {path: '/'});
                //...
                dom.$followBtn.show();
                dom.$followBtn.next().hide();
                var fans = parseInt(dom.$fans_count.html());
                dom.$fans_count.html(fans - 1);
                $('#J_popUpTips').html('您已取消关注').fadeIn().fadeOut();
            }
        },

        //轮播
        carousel: function () {
            var $banner = $('#J_banner'),
                $imgs = $('.J_carousel-imgs'),
                $dots = $('#J_banner-dots span'),
                bindex = 1,
                timer = null;

            $banner.on('mouseover', function () {
                clearInterval(timer);
            });
            $banner.on('mouseout', function () {
                autoPlay();
            });
            $dots.on('click', function () {
                var _index = $(this).attr('data-id');
                _turnToBanner(_index);
            });

            function autoPlay() {
                timer = setInterval(function () {
                    _turnToBanner(bindex);
                    bindex++;
                    if (bindex > 2) {
                        bindex = 0;
                    }
                }, 5000);
            }

            function _turnToBanner(index) {
                $imgs.fadeOut();
                $imgs.eq(index).fadeIn();
                $dots.removeClass('on');
                $dots.eq(index).addClass('on');
            }

            autoPlay();
        },

        //课程tab切换
        courseTabSwitch: function () {
            var $btn1 = $('#J_course-selectTab a:first'),
                $btn2 = $btn1.next();

            $btn1.on('click', function () {
                var dtd = $.Deferred(); //新建异步对象dtd
                $.when(index.getCourseCard(0, 20, $btn1.attr('data-type'), dtd)).done(function () {
                    $btn2.removeClass('selected');
                    $btn1.addClass('selected');
                });
            });
            $btn2.on('click', function () {
                var dtd = $.Deferred();
                $.when(index.getCourseCard(0, 20, $btn2.attr('data-type'), dtd)).done(function () {
                    $btn1.removeClass('selected');
                    $btn2.addClass('selected');
                });
            });
        },

        /**
         * 获取课程卡片
         * @param pageNo    页码
         * @param psize     每页个数
         * @param type      分类
         * @param dtd       异步对象
         */
        getCourseCard: function (pageNo, psize, type, dtd) {
            if ($(window).width() < 1206) {
                psize = 15;
            }
            var param = {
                    pageNo: pageNo,
                    psize: psize,
                    type: type
                },
                $showWrap = $('#J_course-list');

            $showWrap.html('课程列表加载中...');
            $.get(API.getCoures, param, function (rsp) {
                var tpldata = {};

                rsp = JSON.parse(rsp);
                tpldata.list = rsp.list;
                $showWrap.html('');
                //WARN:用functpl处理注释的模板代码在压缩代码时会出问题,遂将模板插入到html中script标签内
                // var tpl = juicer(funtpl(index._courseTpl), tpldata);
                var tpl = juicer($('#courseTpl').html(), tpldata);
                $showWrap.html(tpl);

                index.paginate(rsp.pagination); //分页
                if (dtd) {
                    dtd.resolve();
                }
            });
            return dtd;
        },

        paginate: function (data) {
            _draw();

            var $next = $('#J_paging-next'),
                $prev = $('#J_paging-prev'),
                $numBtn = $('.course-paging-num');

            $numBtn.on('click', function () {
                _turnToPage($(this).html());
            });
            $next.on('click', function () {
                $('.course-paging-num.on').next().trigger('click');
            });
            $prev.on('click', function () {
                $('.course-paging-num.on').prev().trigger('click');
            });

            //根据页数动态渲染数字
            function _draw() {
                var wrap = $('#J_numWrap'),
                    tpl;

                try {
                    wrap.html('');
                    for (var i = 1; i <= data.totlePageCount; i++) {
                        tpl = wrap.html() + '\<a href="javascript:;" class="course-paging-num">' + i + '\</a>';
                        wrap.html(tpl);
                    }
                    wrap.html(tpl);

                    var $numBtn = $('.course-paging-num');
                    $numBtn.removeClass('on');
                    $numBtn.eq(data.pageIndex - 1).addClass('on');
                } catch (e) {
                    throw new Error(e.message + '   可能的原因:data.totlePageCount不存在,请检查json返回数据。');
                }
            }

            //此处经验证是后台接口有问题,超过第四页以后返回的数据都是相同的,但页码永远停留在第4页
            function _turnToPage(pageNum) {
                var type = $('#J_course-selectTab a.selected').attr('data-type');

                if (pageNum > 4) {//FIXME:此处后台接口有问题,超过第四页以后返回的数据都是相同的,但页码永远停留在第4页
                    console.error('此处后台接口有问题,超过第四页以后返回的数据都是相同的,但页码永远停留在第4页');
                }
                index.getCourseCard(pageNum, data.pageSize, type);
            }
        },
        //分页
        pagination: function () {
            var $numBtn = $('.course-paging-num'),
                $next = $('#J_paging-next'),
                $prev = $('#J_paging-prev');

            $numBtn.on('click', function () {
                turnToPage($(this).html());
            });
            $next.on('click', function () {
                $('.course-paging-num.on').next().trigger('click');
            });
            $prev.on('click', function () {
                $('.course-paging-num.on').prev().trigger('click');
            });

            function turnToPage(_index) {
                var type = $('#J_course-selectTab a.selected').attr('data-type');

                var dtd = $.Deferred();
                $.when(index._getCourseCard(_index, 20, type, dtd)).done(function () {
                    $numBtn.removeClass('on');
                    $numBtn.eq(_index - 1).addClass('on');
                });
            }

        },

        //侧栏
        getHottestCourse: function () {
            $.get(API.getHotcoures, function (rsp) {
                var tpldata = {},
                    $showWrap = $('#juicer-hottest-wrapper');

                rsp = JSON.parse(rsp);
                tpldata.list = rsp;
                $showWrap.html('');
                // var tpl = juicer(funtpl(index._sidebarTpl), tpldata);
                var tpl = juicer($('#sidebarTpl').html(), tpldata);
                $showWrap.html(tpl);

                //循环轮播
                var originTop = $showWrap.offset().top,
                    offsetTop = originTop;

                var timer = setInterval(function () {
                    $showWrap.animate({top: '-=71px'}, 500);
                    offsetTop = offsetTop - 71;

                    if (originTop - offsetTop > 639) {
                        $showWrap.animate({top: 0}, 1500);
                        offsetTop = originTop;
                    }


                }, 5000);


                $showWrap.on('mouseover', function () {
                    clearInterval(timer);
                });
                $showWrap.on('mouseout', function () {
                    timer = setInterval(function () {
                        $showWrap.animate({top: '-=71px'}, 500);
                        offsetTop = offsetTop - 71;

                        if (originTop - offsetTop > 639) {
                            $showWrap.animate({top: 0}, 1500);
                            offsetTop = originTop;
                        }
                    }, 5000);
                });
            });
        },

        //视频
        getIntroVideo: function () {
            var $preview = $('#J_sidebar-org-video'),
                $popupVideo = $('#J_popup-video'),
                $video = $popupVideo.find('video'),
                $popupWrap = $('#J_popup-wrap');

            $preview.on('click', function () {
                $popupVideo.fadeIn(1000);
                $video.attr('src', 'http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4');
                $popupWrap.show();

            });

            $('#J_close-popup-video').on('click', function () {
                $video.attr('src', '');
                $popupVideo.hide();
                $popupWrap.hide();
            });
        }
    };
    index.init();
});
