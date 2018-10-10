$(function () {

  //获取用户信息
  $.ajax({
    type: 'get',
    dataType: 'json',
    contentType: 'application/json',
    url: '/api/v1/user?t='+ new Date().getTime(),
  }).done(function (r) {
    if (r.errno == 0) {
      var data = r.data;
      let src = $('#userHeadImage').attr('data-src') + data.pic;
      $('#userHeadImage').attr('src', src);
      $('#userName').html(data.userName);
      $('#userId').html(data.phone);
    } else {
      $("#hideHref").attr('href','/login?t='+ new Date().getTime());
      setTimeout(function(){
        $("#hideHref")[0].click();
      },0)
    }
  })

  // 退出登录
  $('#signoutHref').on('click',function(){
    $.ajax({
      type: 'get',
      dataType: 'json',
      contentType: 'application/json',
      url: '/api/v1/user/signOut?t='+ new Date().getTime(),
    }).done(function (r) {
      if (r.errno == 0) {
        
        $("#hideHref").attr('href','/login?t='+ new Date().getTime());
        setTimeout(function(){
          $("#hideHref")[0].click();
        },0)
        //微信不兼容这种跳转 window.location.href = '/login?t='+new Date().getTime()
      }
      
    })
  })


})