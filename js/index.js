window.addEventListener('DOMContentLoaded', function () {
  //切换推荐栏

  var recommend = getTags('.left-title p');
  var recommendbox = getTags('.first,.second')

  recommend.forEach(function (item, index) {
    item.onclick = function () {
      recommend.forEach(function (i, j) {
        i.className = '';
        recommendbox[j].style.display = 'none'
      })
      item.className = 'active';
      recommendbox[index].style.display = 'block'
    }
  })
  //切换物品详情栏
  var detaile_title = getTags('.detaile-title li');
  var detaile_uls = getTags('.goods-detaile-right >ul');
  detaile_title.forEach(function (item, index) {
    item.onclick = function () {
      detaile_title.forEach(function (i, j) {
        i.className = '';
        detaile_uls[j].style.display = 'none';
      })
      item.className = 'abc';
      detaile_uls[index].style.display = 'block'
    }
  })

  //缩略图的轮播
  //1、动态添加图片
  var slideshow = getTag('.img-small ul');
  var arrowleft = getTag('.arrowleft');
  var arrowright = getTag('.arrowright');
  //从数据库中获取数据添加节点
  goodsData.imgsrc.forEach(function (item) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.src = item.s;
    li.appendChild(img);
    slideshow.appendChild(li);

  })

  //2、轮播图
  var imgwidth = parseInt(getTag('.img-small li').offsetWidth) + parseInt(getStyle(getTag('.img-small li'), 'margin-right'));
  var lis = getTags('.img-small ul li')
  lis[0].className = 'bcd';
  count = 0;
  var sum = lis.length - 5;
  //注册鼠标右移事件
  arrowright.onclick = function () {
    if ((sum - count) === 0) return;
    if ((sum - count) <= 2) count += 1;
    else count += 2;
    slideshow.style.transform = 'translateX(' + -imgwidth * count + 'px)';
  }
  //注册鼠标左移事件
  arrowleft.onclick = function () {
    if ((sum - count) === sum) return;
    if ((sum - count) < sum - 1) count -= 2;
    else count -= 1;
    slideshow.style.transform = 'translateX(' + -imgwidth * count + 'px)';
  }
  //点击选项卡可以改变图片
  var smallpic = getTag('.img img');
  var largestpic = getTag('.largestbox img');
  lis.forEach(function (item, index) {
    item.onclick = function () {
      //排他思想
      lis.forEach(function (i, j) {
        i.className = ' ';
      })
      item.className = 'bcd';
      smallpic.src = goodsData.imgsrc[index].b;
      largestpic.src = goodsData.imgsrc[index].b;
    }
  })
  var follow = getTag('.img');
  var shade = getTag('.shade');
  var largestbox = getTag('.largestbox');
  //注册鼠标移入事件
  follow.addEventListener('mouseenter', function () {
    shade.style.display = 'block';
    largestbox.style.display = 'block';
    //注册鼠标移动事件
    follow.addEventListener('mousemove', function (event) {
      //遮罩随着鼠标移动
      var cursorpositionX = event.clientX;
      var cursorpositionY = event.clientY;
      //从鼠标进入时（0，0）位置获取遮罩移动距离
      var shademoveX = cursorpositionX - follow.getBoundingClientRect().left - (shade.offsetWidth / 2);
      var shademoveY = cursorpositionY - follow.getBoundingClientRect().top - (shade.offsetHeight / 2);
      //设定遮罩界限
      if (shademoveX <= 0) shademoveX = 0;
      if (shademoveY <= 0) shademoveY = 0;
      var maxMoveX = follow.offsetWidth - shade.offsetWidth;
      var maxMoveY = follow.offsetHeight - shade.offsetHeight
      if (shademoveX >= maxMoveX) shademoveX = maxMoveX;
      if (shademoveY >= maxMoveY) shademoveY = maxMoveY;
      //遮罩移动
      shade.style.top = shademoveY + 'px';
      shade.style.left = shademoveX + 'px';
      //大图随着鼠标移动
      //大图移动距离=遮罩移动距离/遮罩移动最大距离*大图移动的最大距离（与遮罩做联动并限定大图界限）
      var bigmaxmoveX = largestpic.offsetWidth - largestbox.offsetWidth;
      var bigmaxmoveY = largestpic.offsetHeight - largestbox.offsetHeight;
      var bigmoveX = shademoveX / maxMoveX * bigmaxmoveX;
      var bigmoveY = shademoveY / maxMoveY * bigmaxmoveY;
      //大图移动
      largestpic.style.transform = 'translate(' + -bigmoveX + 'px,' + -bigmoveY + 'px)';
    })
  })
  //注册鼠标移出事件
  follow.addEventListener('mouseleave', function () {
    shade.style.display = 'none';
    largestbox.style.display = 'none';

  })


  //商品信息动态添加
  //防止报错
  var goodsInfo = goodsData.goodsDetail || {};

  //商品信息动态添加
  ; (function () {
    getTag('.good-parameter > h5').textContent = goodsInfo.title;
    getTag('.good-parameter .tips').textContent = goodsInfo.recommend;
    getTag('.good-parameter .redbox li:first-child strong').textContent = goodsInfo.price;
    getTag('.good-parameter .redbox li:last-child > p em').textContent = goodsInfo.promoteSales.type;
    getTag('.good-parameter .redbox li:last-child > p i').textContent = goodsInfo.promoteSales.content;
    getTag('.good-parameter .redbox li:last-child b').textContent = goodsInfo.evaluateNum;
    getTag('.good-parameter .adress strong:first-of-type').textContent = goodsInfo.support;
    getTag('.good-parameter .adress strong:last-of-type').textContent = goodsInfo.address;
  })()
  //choose数据动态展示
  var ul = getTag('.detaile-choose ');

  //动态数据获取
  goodsInfo.crumbData.forEach(function (item, index) {
    var li = creatsnodes('li');
    li.innerHTML = `<span>${item.title}</span>`;
    ul.appendChild(li);
    item.data.forEach(function (i) {
      var a = creatsnodes('a');
      a.innerHTML = `${i.type}`;
      li.appendChild(a);
      a.index = index;
      a.value = i;

    })

  })

   //绑定事件
//通过事件委派 给整个ul绑定事件
  var arry =[];
  var show = getTag('.show');
  ; (function () {
    ul.addEventListener('click', function (event) {
      //判断点击为a标签时才触发
      var target = event.target;
        if (target.nodeName === 'A') {
          //把点击的a标签中的value值存在数组中
          arry[target.index] = target.value;
          rednerTags(); 
          //第一次渲染
          renderPrice();
          // var str = '';
          // //把数组中每一项的type值添加到show盒子
          // for (var i = 0; i < arry.length; i++) {  
          //   if (!arry[i]) return target.remove();
          // var p = creatsnodes('p');
          // str += `<p>${arry[i].type}<button>x</button></p>`;
          // show.innerHTML = str;    
          // }
          // renderP()
          //点击高亮排他
          for (var k = 0; k < target.parentElement.children.length;k++) 
          {
            target.parentElement.children[k].className = '';
          
          }
         target.className = 'colors'       
      }
  
      //show区域的点击删除
      var btn = getTags('.show p>button');
      
      btn.forEach(function (item, index) {
   
        show.addEventListener('click', function (el) {
          if (el.target.nodeName === "BUTTON") {
            arry[el.target.dataset.index] = null;
            rednerTags();
            renderPrice();
            var ulBox = ul.children[el.target.dataset.index].querySelectorAll('a');
            ulBox.forEach(function (item) {
              item.removeAttribute('class');  
            })
           
          }
          //地下高亮消失
        
        })
      })

  })
  })()
  

  var count = 1 ;
  var obj = {
    initial_price: goodsInfo.price,
    get first () {
      var total = this.initial_price;
      arry.forEach(function (item) {
        if (!item) return;
        total += item.changePrice;
      })
      total =(total+this.finallyprice)* this.count;
      return total
},
count : 1,
    get seconds () {
      return this.count;
    },
    set seconds (n) {
      this.count = n;
      renderPrice();
  },
    finallyprice: 0,
    get thir () {
      return this.finallyprice;
    },
    set thir (b) {
      this.finallyprice += b;
      renderPrice()
    }
    
  }
  renderPrice()
  function renderPrice() {
    getTag('.good-parameter .redbox li:first-child strong').textContent = obj.first;
    getTag('.iphone>p em').textContent = obj.first;
    getTag('.result em').textContent = obj.first;
  }
//   function renderPricefinl () {
//     all = (obj.thir + obj.initial_price) * obj.seconds;
//     getTag('.good-parameter .redbox li:first-child strong').textContent = all;
//     getTag('.iphone>p em').textContent = all;
//     getTag('.result em').textContent = all;
// }


var btn1 = getTag('.payfor button:first-of-type');
var btn2 = getTag('.payfor button:last-of-type');
var input1 = getTag('.payfor input')

  btn1.onclick = function () {
 
    obj.seconds++;
  input1.value = obj.seconds; 
  console.log(obj.seconds);
 }
  btn2.onclick = function () {
    obj.seconds--;
    if (obj.seconds < 1) {
      return obj.seconds = 1;
    }
  input1.value = obj.seconds; 

 }
  input1.onblur = function () {
    obj.seconds = input1.value;
  }
  var checkboxs = getTags('.choose input');
  checkboxs.forEach(function (item) {
    item.addEventListener('click', function () {
      var price = item.parentElement.querySelector('label').textContent;
      if (item.checked) {
       
        obj.thir = price - 0;
        var all = 0;
        all = (obj.thir + obj.initial_price) * obj.seconds;
  }
  else {
        obj.thir = -price - 0;
        all = (obj.thir + obj.initial_price) * obj.seconds;
  }
    })
 })
 

  
 

  
// 封装一个渲染函数
 function rednerTags() {
            var str = '';
            arry.forEach(function (item, index) {
                if (!item) return
                // `<a href="javascript:;">金色 <i>x</i></a>`;
                str += `<p>${item.type}<button data-index=${index}>x</button></p>`;
            })
           show.innerHTML = str;
        }


})