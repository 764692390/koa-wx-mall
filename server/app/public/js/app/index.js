$(function () {


    var isGet = true;
    var mescroll = new MeScroll("index_content", {
        //第一个参数"mescroll"对应上面布局结构div的id
        //如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
        //解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
        down: {
            callback: downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
           
        },
        up: {
            callback: upCallback, //上拉加载的回调
            isBounce: false, //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
        }
    });

    function render(data,type) {
        let html = '';
        for (let i=0; i<data.length; i++) {
            html+=`<div class="item">
                        <a href="/prodDetail/${data[i].goods_id}" class="wy-links-iconlist-ex">
                            <div class="img"><img class="lazyload" data-src="${data[i].thumb_url}"></div>
                            <!--<p style="color:black;font-size:13px;">${data[i].goods_name}</p>-->
                            <p style="line-height:18px;width: 80%;margin-left: 10%;text-align: left;font-size:14px">${data[i].short_name}</p>
                            <p style="color:red;font-size:15px;font-weight: bold;">¥ ${data[i].price/100}</p>
                        </a>
                    </div>`;
        };
        if(type){
            $('#recommendBox').append(html);
        }else{
            $('#recommendBox').html('');
            $('#recommendBox').html(html);
        }
    }


    //下拉刷新的回调
    function downCallback() {
        var t = new Date().getTime();
        $.ajax({
            url: '/api/v1/shop/getlist?t=' + t,
            success: function (data) {
                //联网成功的回调,隐藏下拉刷新的状态;
                mescroll.endSuccess(); //无参
                //设置数据
                //setXxxx(data);//自行实现 TODO
                render(data.data.rows,false)
            },
            error: function (data) {
                //联网失败的回调,隐藏下拉刷新的状态
                mescroll.endErr();
            }
        });
    }

    //上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
    function upCallback(page) {
        var index = parseInt(page.num) + 1;
        var rows = parseInt(page.size);
        var t = new Date().getTime();
        if(typeof isGet === 'number' && isGet <= index){
            $('.mescroll-upwarp .mescroll-rotate').hide();
            $('.upwarp-tip').html('到底了！')
            return false;
        }
        $.ajax({
            url: '/api/v1/shop/getlist?index=' + index + "&rows=" + rows +"&t=" + t, //如何修改page.num从0开始 ?
            success: function (curPageData) {
                //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
                //列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)

                //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                //必传参数(当前页的数据个数, 总页数)
                isGet = Math.ceil(curPageData.data.count/curPageData.data.limit);
                mescroll.endByPage(curPageData.data.limit, curPageData.data.count);
                

                //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                //必传参数(当前页的数据个数, 总数据量)
                //mescroll.endBySize(curPageData.length, totalSize);

                //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                //必传参数(当前页的数据个数, 是否有下一页true/false)
                //mescroll.endSuccess(curPageData.length, hasNext);

                //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
                //如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
                //如果传了hasNext,则翻到第二页即可显示无更多数据.
                //mescroll.endSuccess(curPageData.length);

                //设置列表数据
                //setListData(curPageData);//自行实现 TODO
                render(curPageData.data.rows,true)
            },
            error: function (e) {
                //联网失败的回调,隐藏下拉刷新和上拉加载的状态
                mescroll.endErr();
            }
        });
    }


});
