

$(function() {
    var stock;
    var AttrJson= {};

    // 初始化数据;
    var isLoadDetail = false;
    var id  = $('#detailId').val(); //获取商品id
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/api/v1/shop/Detail/'+id
    }).done(function(r) {
        isLoadDetail = true;
        if(r.errmsg){
           let data = r.data;
           // 渲染轮播图Start
           let bannerStr='';
           for(let i=0; i<data.bannerList.length; i++){
                bannerStr+=`<div class="swiper-slide"><img src="${data.bannerList[i].url}" width="100%"></div>`
           }
           $('.top-swper-box .swiper-wrapper').html(bannerStr);
           // 渲染轮播图End

           //swper
            var mySwiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: {
                delay: 3000
                },
                // 分页器
                pagination: {
                el: '.swiper-pagination',
                clickable: true
                }
            });

            // 文字描述
            $('.weui-media-box__title').html(data.goods_name);
            $('.price').html('¥'+data.price/100);
            if(data.stock === 0){
                $('.stock-box').html('0');
                $('#isAttr').val(false);
            } else if(!data.stock) {
                //有属性
                $('#isAttr').val(true);
                let n=0;
                let json = {};
                for(let i=0; i<data.attrs.length; i++){
                    n+=data.attrs[i].stock;
                    json[data.attrs[i].attr_type] = [] ;
                }
                for(let i=0; i<data.attrs.length; i++){
                    json[data.attrs[i].attr_type].push(data.attrs[i]) ;
                }
                // 拼接属性
                let html ='';
                for(var i in json) {
                    html+=`<div class="weui-media-box_appmsg">
                                <div class="weui-media-box__hd proinfo-txt-l" style="line-height: 0px;margin-top: 11px;" data-attrtype="${json[i][0].attr_type}">
                                    <span class="promotion-label-tit">${json[i][0].attr_name}</span>
                                </div>
                                <div class="weui-media-box__bd">
                                    <div class="promotion-sku clear">
                                        <ul class="gavUl">`
                    for(let j=0; j<json[i].length; j++){
                        html+=  `<li class="colour"  disableFlag="${json[i][j].stock_name}" data-id="${json[i][j].id}"  data-stock="${json[i][j].stock}" data-attrtype="${json[i][0].attr_type}">
                                    <a href="javascript:;">${json[i][j].stock_name}</a>
                                </li>`
                    }
                    html+=  `</ul>
                        </div>
                    </div>
                </div>`
                }
                $('.weui-media-box_text').html(html);
                $('.stock-box').html(n);

            } else {
                $('.stock-box').html(data.stock);
                $('#isAttr').val(false);
            }
            Spinner( $('.stock-box').html());
        }

       
        
        //属性切换
        $('.weui-media-box_appmsg').on('click','.colour',function(){
            $('.colour').removeClass('active');
            $(this).addClass('active');
            let stock = $(this).attr('data-stock')
            $('.stock-box').html(stock);
            Spinner(stock);
            $('#isAttr').val(true);
            $('#Attr').val('');
            AttrJson[$(this).attr('data-attrtype')] = $(this).attr('data-id');
        })

       console.log(r);
    }).fail(function(jqXHR, textStatus) {
        $("#detailDiv-loading").hide();
        $("#detailDiv-reload").show();
    });

    // 顶部tab 切换
    $(".wy-header-titlebut").click(function() {
        var currentId = $(this).attr("id");
        $(".wy-product-content").hide();
        $("#" + currentId + "Div").show();

        $(".wy-header-titlebut").removeClass("wy-header-titlebut-active");
        $(this).addClass('wy-header-titlebut-active');

        if (currentId == "detail" && !isLoadDetail) {
            
        }
    });

     // 数量设置 
    function Spinner(stock) {
         var max = stock;
         var min = 1;
         if (stock < max) {
             max = stock;
         }
         if (stock < min) {
             min = stock;
         }
         $("#pcs").html('');
         $('#pstock').val(stock);
         $("#pcs").Spinner({ value: min, len: 3, max: max });
    }

    $("#detailDiv-reload").click(function() {
        loadDetail();
    });

    function loadDetail() {
        $("#detailDiv-reload").hide();
        $("#detailDiv-loading").show();

        $.ajax({
            type: 'get',
            dataType: 'html',
            url: $("#detailHtmlUrl").val()
        }).done(function(r) {
            isLoadDetail = true;
            $("#detailDiv").html(r);
        }).fail(function(jqXHR, textStatus) {
            $("#detailDiv-loading").hide();
            $("#detailDiv-reload").show();
        });
    }

    //判断是否为空json
    function isEmptyObject(e) {  
        var t;  
        for (t in e)  
            return !1;  
        return !0  
    }  

    $("#addCart").click(function() {
        if (disableAddCart) {
            return;
        }
        if (stock <= 0) {
            publicTip.showAlert("库存为空");
            return;
        }
        publicTip.showLoadingToast(true, "加入中");
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/zshop/userapi/addCartProd',
            data: {
                pid: $("#pid").val(),
                pcount: $("#pcs").find("input").val()
            }
        }).done(function(r) {
            //console.log(JSON.stringify(r));
            publicTip.showLoadingToast(false);
            publicTip.showToast("已加入");
            //var cardProdNum = parseInt($("#cardProdNum").html());
            //cardProdNum = cardProdNum + 1;
            $("#cardProdNum").html(r.cartSize);
            $("#cardProdNum").show();
        }).fail(function(jqXHR, textStatus) {
            publicTip.showLoadingToast(false);
            publicTip.showTip(jqXHR.responseJSON);
        });
    });

    $("#buyNowBtn").click(function() {
      
        let Amount = $('#pcs .Amount').val(); //当前选中的数量
        $('#Nstock').val(Amount);

        if ($('#pstock').val() <= 0 ) {
            publicTip.showAlert("库存为空");
            return;
        }
       
        if($('#isAttr').val() == 'true' && isEmptyObject(AttrJson)){
            publicTip.showAlert("请选择属性");
            return;
        }
        
        publicTip.showLoadingToast(true, "操作中");

        // $.ajax({
        //     type: 'post',
        //     dataType: 'json',
        //     url: '/zshop/userapi/buyNow',
        //     data: {
        //         pid: $("#pid").val(),
        //         pcount: $("#pcs").find("input").val()
        //     }
        // }).done(function(r) {
        //     window.location.href = "/zshop/user/settlement/" + r.orderId;
        // }).fail(function(jqXHR, textStatus) {
        //     publicTip.showLoadingToast(false);
        //     publicTip.showTip(jqXHR.responseJSON);
        // });
    });

    $("#collectionHref").click(function() {
        var id = $("#collectionId").val();
        var msg = '取消收藏';
        if (id.trim() == '') msg = '收藏';
        publicTip.showLoadingToast(true, msg + "中");
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/zshop/userapi/collection/act',
            data: {
                id: id,
                pid: $("#pid").val()
            }
        }).done(function(r) {
            $("#collectionId").val(r.id);
            if (r.id) {
                $("#collectionHref").find("div").addClass('promotion-foot-menu-collection-on');
                $("#collectionHref").find("div").removeClass('promotion-foot-menu-collection');
                //$("#collectionHref").find("p").html('取消收藏');
                $("#collectionHref").find("p").css("color", "green");
            } else {
                $("#collectionHref").find("div").addClass('promotion-foot-menu-collection');
                $("#collectionHref").find("div").removeClass('promotion-foot-menu-collection-on');
                //$("#collectionHref").find("p").html('收藏');
                $("#collectionHref").find("p").css("color", "gray");
            }
            publicTip.showLoadingToast(false);
            publicTip.showToast("已" + msg);
        }).fail(function(jqXHR, textStatus) {
            publicTip.showLoadingToast(false);
            publicTip.showTip(jqXHR.responseJSON);
        });
    });

    var $iosActionsheet = $('#iosActionsheet');
    var $iosMask = $('#iosMask');

    function hideActionSheet() {
        $iosActionsheet.removeClass('weui-actionsheet_toggle');
        $iosMask.fadeOut(200);
    }

    $iosMask.on('click', hideActionSheet);
    $('#iosActionsheetCancel').on('click', hideActionSheet);
    $("#kefuHref").on("click", function() {
        $iosActionsheet.addClass('weui-actionsheet_toggle');
        $iosMask.fadeIn(200);
    });

    $("#callKfNumD").on("click", function() {
        document.getElementById("callKfNumA").click();
        hideActionSheet();
    });
});

