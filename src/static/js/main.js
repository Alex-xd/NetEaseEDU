/**
 *  Created by boyuan on 8/29/16.
 */

require.config({
    paths: {
        jquery: 'lib/jquery-3.1.0.min',
        juicer: 'lib/juicer-min',
        funcTpl: 'util/funcTpl',
        API: 'api/api.config',
        jqcookie: 'lib/jqcookie'
    }
});

require(['jquery', 'funcTpl', 'API', 'jqcookie', 'juicer'], function ($, funtpl, API, Cookies) {
    var index = {
        init: function () {
            index.toptipsControl();
            index.loginControl();
            index.courseTabSwitch();
            index.pagination();
            index.getHottestCourse();
            index.getIntroVideo();
        },
        //顶栏"不再提示"功能
        toptipsControl: function () {
            Cookies.remove('toptipDismissed', {path: '/'});  //测试用
            var $toptips = $('#J_top-tips');

            if (Cookies.get('toptipDismissed', {path: '/'}) !== 'true') {
                $toptips.fadeIn();
            }
            $('#J_top-tips-dismiss').on('click', function () {
                Cookies.set('toptipDismissed', 'true', {expires: 7, path: '/'});
                $toptips.fadeOut();
            });
        },

        //登录
        loginControl: function () {
            var $followBtn = $('#J_header-left-follow-btn'),
                $login = $('#J_popup-login'),
                $submit = $('#J_submit'),
                $popupWrap = $('#J_popup-wrap'),
                param = {
                    userName: '',
                    password: ''
                };

            //点击关注,如果未登录,则显示登录窗口
            $followBtn.on('click', function () {
                Cookies.remove('loginSuc', {path: '/'});  //测试用
                if (Cookies.get('loginSuc', {path: '/'}) !== 'true') {
                    $popupWrap.show();
                    $login.show().css('top', '+=30').animate({top: '-=30px', opacity: '1'}, 500);
                }
            });

            //登录
            function login() {
                param.userName = $('#J_uid').val().trim();
                param.password = $('#J_pwd').val();
                if (param.userName && param.password) {
                    $submit.html('正在登录..').attr('disabled', 'true');
                    $.get(API.login, param, function (rsp) {
                        if (rsp == 0) {
                            Cookies.set('loginSuc', 'true', {path: '/'});  //设置登录成功 cookie,
                            $submit.html('登录成功');

                            //关注
                            var dtd = $.Deferred();
                            $.when(index._follow($followBtn, dtd)).done(function () {
                                $login.hide();
                                $popupWrap.hide();
                            });
                        }
                        else {
                            alert('用户密码错误,请重新输入');
                            $submit.html('登录').removeAttr('disabled');
                        }
                    });
                }
            }

            //绑定登录
            $submit.on('click', login);
            document.onkeydown = function (keyEvent) {
                keyEvent = keyEvent ? keyEvent : window.event;
                var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                if (keyvalue == 13)
                    login();
            };

            //登录窗口关闭
            $('#J_close').on('click', function () {
                $popupWrap.hide();
                $login.hide();
            });
        },

        //关注
        _follow: function ($followBtn, dtd) {
            var $fans_count = $('#J_fans');
            $.get(API.changeFollowState, function (rsp) {
                if (rsp == 1) {
                    Cookies.set('followSuc', 'true', {path: '/'});//设置关注成功的 cookie(followSuc),
                    //关注”按钮变成不可点的“已关注”状态。
                    $followBtn.hide();
                    $followBtn.next().show();
                    var fans = $fans_count.html();
                    fans++;
                    $fans_count.html(fans);
                    dtd.resolve();
                }
            });
        },

        //轮播
        Carousel: function () {

        },

        //课程tab切换
        courseTabSwitch: function () {
            var $btn1 = $('#J_course-selectTab a:first'),
                $btn2 = $btn1.next();

            $btn1.on('click', function () {
                var dtd = $.Deferred();//新建异步对象dtd
                $.when(index._getCourseCard(0, 20, $btn1.attr('data-type'), dtd)).done(function () {
                    $btn2.removeClass('selected');
                    $btn1.addClass('selected');
                });
            });
            $btn2.on('click', function () {
                var dtd = $.Deferred();//新建异步对象dtd
                $.when(index._getCourseCard(0, 20, $btn2.attr('data-type'), dtd)).done(function () {
                    $btn1.removeClass('selected');
                    $btn2.addClass('selected');
                });
            });

            $btn1.trigger('click');
        },

        /**
         * 获取课程卡片
         * @param pageNo    页码
         * @param psize     每页个数
         * @param type      分类
         * @param dtd       jquery异步对象
         */
        _getCourseCard: function (pageNo, psize, type, dtd) {
            var param = {
                pageNo: pageNo,
                psize: psize,
                type: type
            };

            $.get(API.getCoures, param, function (rsp) {
                var tpldata = {},
                    $showWrap = $('#J_course-list');

                rsp = JSON.parse(rsp);
                tpldata.list = rsp.list;
                $showWrap.html('');
                var tpl = juicer(funtpl(index._courseTpl), tpldata);
                $showWrap.html(tpl);

                dtd.resolve();
            });
        },

        //分页
        pagination: function () {
            var $numBtn = $('.course-paging-num'),
                $next = $('#J_paging-next'),
                $prev = $('#J_paging-prev');

            $numBtn.on('click', function () {
                var $this = $(this),
                    gotoPage = $this.html(),
                    type = $('#J_course-selectTab a.selected').attr('data-type');

                var dtd = $.Deferred();
                $.when(index._getCourseCard(gotoPage, 20, type, dtd)).done(function () {
                    for (var i = 0; i < 8; i++) {
                        $numBtn.eq(i).removeClass('on');
                        $this.addClass('on');
                    }
                    $('body').animate({scrollTop: "-=1500px"}, 800);
                });
            });

            $next.on('click', function () {
                $('.course-paging-num.on').next().trigger('click');
            });
            $prev.on('click', function () {
                $('.course-paging-num.on').prev().trigger('click');
            });

        },

        //侧栏
        getHottestCourse: function () {
            $.get(API.getHotcoures, function (rsp) {
                var tpldata = {},
                    $showWrap = $('#juicer-hottest-wrapper');

                rsp = JSON.parse(rsp);
                tpldata.list = rsp;
                $showWrap.html('');
                var tpl = juicer(funtpl(index._sidebarTpl), tpldata);
                $showWrap.html(tpl);

                //循环轮播
                var originTop = $showWrap.offset().top,
                    offsetTop = originTop;

                var timer = setInterval(function () {
                    $showWrap.animate({top: '-=71px'}, 500);
                    offsetTop = offsetTop - 71;
                    console.log(originTop - offsetTop);

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
                        console.log(originTop - offsetTop);

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
            var $Preview = $('#J_sidebar-org-video');
            
        },

        //课程模板
        _courseTpl: function () {
            /*
             {@each list as item}
             <section class="course-list-item">
             <img src="${item.middlePhotoUrl}" alt="" width="223" height="124">
             <h2 class="course-list-item-title">${item.name}</h2>
             <a href="" class="course-list-item-author">极客公园</a>
             <span class="course-list-item-people">465</span>
             <h3 class="course-list-item-price">¥59</h3>
             <!--详情-->
             <section class="course-list-item-details">
             <div class="course-list-item-details-header">
             <img src="img/course.jpg" alt="" width="223" height="124">
             <div class="course-list-item-details-header-info">
             <h3 class="course-list-item-details-header-info-title">如何低成本制作在线课程</h3>
             <div class="course-list-item-details-header-info-leaner">
             62211人在学
             </div>
             <div class="course-list-item-details-header-info-distor">
             发布者: <a href="" target="_blank">网易云课堂</a>
             </div>
             <div class="course-list-item-details-header-info-category">
             分类: 暂无
             </div>
             </div>
             </div>
             <div class="course-list-item-details-content">
             <p>制作在线课程，并不是将线下课程录像上网
             那么简单。好的在线课程，必须针对在线教
             育特点进行设计和制作。本课程总结了让课
             程更适合在线学习的若干要点，和多项制作
             经验，力图帮助您用最少的时间、最低的成
             本，制作出精彩的在线课程。课程本身就是
             这套制作方案最好的演示。共包括准备工作
             、录制课程和后期制作三个部分，持续更新
             中</p>
             </div>
             </section>
             </section>
             {@/each}
             */
        },

        //侧边栏内容模板
        _sidebarTpl: function () {
            /*
             {@each list as item}
             <div class="sidebar-hottest-item">
             <img src="${item.smallPhotoUrl}" alt="${item.name}">
             <h3>${item.name}</h3>
             <span>${item.learnerCount}</span>
             </div>
             {@/each}
             */
        }
    };
    index.init();
});
