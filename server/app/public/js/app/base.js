$(function () {
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
  

  //懒加载
  dmgload.lazyload({
    selector: ".lazyload",
    offset: 200,  //偏移量，在距离视口多远的时候就开始加载
    debounce_time: 300, //防抖时间，在该时间内时是不会重复触发了。
    throttle_time: 800,  //节流时间，在超过该时间之后一定要触发的。
    default_img: 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAABFCAYAAAAB8xWyAAAACXBIWXMAAAsSAAALEgHS3X78AAAAJUlEQVRoge3BMQEAAADCoPVP7WMMoAAAAAAAAAAAAAAAAAAA4AY6fQABFpNNRwAAAABJRU5ErkJggg==' // 在图片失效的时候使用的默认替代图片
  });


})