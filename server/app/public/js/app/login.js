
$(function () {
    $("#loginBtn").click(function () {
        var mobile = $("#mobile").val();
        var password = $("#password").val();
        var code = $("#code").val();

        if (mobile.trim() == '' || password.trim() == '') {
            publicTip.showTipForStr("手机号和密码必填");
            return;
        }
        if (!/^1\d{10}$/.test(mobile)) {
            publicTip.showTipForStr("手机号格式不正确");
            return;
        }
        if(code.length !== 4){
            publicTip.showTipForStr("验证码格式不正确");
            return;
        }
        
        if ($("#loginBtn").hasClass('weui-btn_loading')) {
            return;
        }

        var userReq = {
            phone: mobile,
            password,
            code
        };

        $("#loginBtn").addClass('weui-btn_loading');
        $("#loginLoading").addClass('weui-loading');
        $.ajax({
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            url: '/api/v1/user/signIn',
            data: JSON.stringify(userReq)
        }).done(function (r) {
            if(r.errno === 0) {
                setTimeout(function(){
                    $("#hideHref").attr('href','/my');
                    $("#loginBtn").removeClass('weui-btn_loading');
                    $("#loginLoading").removeClass('weui-loading');
                    $("#hideHref")[0].click();
                },1000)
            }else{
                publicTip.showTip(r.errmsg);
                $("#loginBtn").removeClass('weui-btn_loading');
                $("#loginLoading").removeClass('weui-loading');   
            }
        }).fail(function (jqXHR, textStatus) { // Not 200
            publicTip.showTip(jqXHR.responseJSON);
            $("#loginBtn").removeClass('weui-btn_loading');
            $("#loginLoading").removeClass('weui-loading');
        });

    });


    //刷新验证码

     //刷新验证码
    $('.weui-cell__ft').on('click','.btnCode', function () {
        $(this).attr('src', '/api/v1/user/code?t=' + new Date().getTime());
    })

});

