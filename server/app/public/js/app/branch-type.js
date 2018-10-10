$(function(){
  // iscroll初始化
  var myScrollLeft = new IScroll('#branchLeft', {
      //scrollbars: true,
      mouseWheel: false,
      interactiveScrollbars: true,
      shrinkScrollbars: 'scale',
      fadeScrollbars: true,
      scrollY: true,
      probeType: 2,
      bindToWrapper: true,
      click: true,
      taps:true,
      preventDefault: false
  });

  var myScrollRight = new IScroll('#branchRight', {
      //scrollbars: true,
      mouseWheel: false,
      interactiveScrollbars: true,
      shrinkScrollbars: 'scale',
      fadeScrollbars: true,
      scrollY: true,
      probeType: 2,
      bindToWrapper: true,
      click: true,
      taps:true,
      preventDefault: false
  });


  // 初始化数据;
  var isLoadDetail = false;
  var id  = $('#detailId').val(); //获取商品id
  $.ajax({
      type: 'get',
      dataType: 'json',
      url: '/api/v1/shop/BranchType'
  }).done(function(r) {
    console.log(r);
    if(r.errmsg){
      let data = r.data;
      let strLeft='';
      for(let i=0; i<data.length;i++){
        if(i == 0){
          strLeft+=`<li class="active" data-id="${data[i].event_type}">${data[i].type_name}</li>`;
        }else{
          strLeft+=`<li data-id="${data[i].event_type}">${data[i].type_name}</li>`;
        }
      }
      $('#branchLeft ul').html(strLeft);

      getRightList(data[0].event_type);
    }

  }).fail(function(jqXHR, textStatus) {
      $("#detailDiv-loading").hide();
      $("#detailDiv-reload").show();
  });
function getRightList(type,index,rows){
  $.ajax({
    type: 'get',
    dataType: 'json',
    data:{
      event_type: type,
      index: index || 1,
      rows: rows || 10
    },
    url: 'api/v1/shop/BranchTypeDetail'
  }).done(function(r) {
    if(r.errmsg){
      let strRight = '';
      for(let i=0; i <r.data.rows.length; i++){
        strRight+=`<li>
                      <a href="/prodDetail/${r.data.rows[i].goods_id}">
                        <img src="${r.data.rows[i].thumb_url}">
                        <p>${r.data.rows[i].short_name}</p>
                      </a>
                    </li>`
      }
      $('#branchRight ul').html(strRight)
    };

  }).fail(function(jqXHR, textStatus) {
    $("#detailDiv-loading").hide();
    $("#detailDiv-reload").show();
  });
}

  
  $("#branchLeft").on("click","li",function(){
    $("#branchLeft li").removeClass("active");
    $(this).addClass("active");
    publicTip.showLoadingToast(true);
    setTimeout(function(){
      publicTip.showLoadingToast(false);
    },500)
  });

})