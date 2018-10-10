$(function() {

    // 注册
    $("#confirmBtn").click(function() {
        var mobile = $("#mobile").val();
        var password = $("#password").val();
        var passwordConfirm = $("#passwordConfirm").val();
        var code = $("#code").val();

        if (mobile.trim() == '' || password.trim() == '' || passwordConfirm.trim() == '') {
            publicTip.showTipForStr("手机号，密码和确认密码必填");
            return;
        }
        if (!/^1\d{10}$/.test(mobile)) {
            publicTip.showTipForStr("手机号格式不正确");
            return;
        }
        if (password != passwordConfirm) {
            publicTip.showTipForStr("密码和确认密码不一致");
            return;
        }

        if (!code.length) {
            publicTip.showTipForStr("验证码不能为空");
            return;
        }

        if ($("#confirmBtn").hasClass('weui-btn_loading')) {
            return;
        }

        var userReq = {
            phone: mobile,
            password,
            passwordConfirm,
            code
        };
        
        $("#confirmBtn").addClass('weui-btn_loading');
        $("#confirmLoading").addClass('weui-loading');
        $.ajax({
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            url: '/api/v1/user/register',
            data: JSON.stringify(userReq)
        }).done(function(r) {
            if(r.errno === "0") {
                setTimeout(function(){
                    window.location.href = '/login';
                    $("#confirmBtn").removeClass('weui-btn_loading');
                $("#confirmLoading").removeClass('weui-loading');
                },1000)
            }else{
                publicTip.showTip(r.errmsg);
                $("#confirmBtn").removeClass('weui-btn_loading');
                $("#confirmLoading").removeClass('weui-loading');   
            }
        }).fail(function(jqXHR, textStatus) { // Not 200
            publicTip.showTip(jqXHR.responseJSON);
            $("#confirmBtn").removeClass('weui-btn_loading');
            $("#confirmLoading").removeClass('weui-loading');
        });

    });
});