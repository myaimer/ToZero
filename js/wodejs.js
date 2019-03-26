$(function(){
    // 1.鼠标移入移除隐藏的功能
showhide()
hoverSubMenu()
search()
share()
address()
changeTabs()
hoverMiniCart()
clickProductTabs()
moveMiniImg() 
changePic()
bigImg()
            // 11.放大镜效果
            function  bigImg () {
                let $mediumImg = $('#mediumImg')
                let $mask = $('#mask')  //小黄快
                let $maskTop = $('#maskTop')
                let $largeImgContainer = $('#largeImgContainer')
                let $loading = $('#loading')
                let $largeImg = $('#largeImg')
                let maskWidth =  $mask.width()
                let maskheight =  $mask.height()
                let maskTopWidth = $maskTop.width()
                let maskTopHeight = $maskTop.height()
                $maskTop.hover(function(event){
                    $mask.show()
                    var src = $mediumImg.attr('src').replace('-m.','-l.')
                    // var src = $mediumImg.attr('src').replace('-m.', '-l.')

                    console.log(src);
                    
                    $largeImg.attr('src',src)
                    $largeImgContainer.show()
                    $largeImg.on('load',function () {
                        
                        
                        var largeWidth = $largeImg.width()
                        var largeHeight = $largeImg.height()
                        $largeImgContainer.css({
                            width: largeWidth/2,
                            height: largeHeight/2
                        })
                        $largeImg.show()
                        $loading.hide()
                       

                        //$maskTop.mousemove  是为了移动小黄快
                        $maskTop.mousemove(function (event) {
                            var left = 0
                            var top = 0
                            var eventleft = event.offsetX  
                            var eventtop = event.offsetY
                               //  上面的2个是时间的坐标
                            left = eventleft -maskWidth/2
                            top = eventtop -maskheight/2
                            if(top<0){
                                top = 0
                            }else if (top > maskTopHeight -maskheight)  (
                                top = maskTopHeight -maskheight
                            )
                            if(left<0){
                               left= 0
                            }else if( left >maskTopWidth - maskWidth){
                                left  =maskTopWidth - maskWidth
                            }
                            //上面是小黄块的位置
                            $mask.css({
                                left: left,
                                top: top
                            })

                           
                            
                            //得到大图坐标
                            left = - left * largeWidth /maskTopWidth
                            top = - top * largeHeight/maskTopHeight
                           
                            $largeImg.css({
                                left: left,
                                top: top
                            })
                            
                          })
 
                      })


                    
                },function () {
                    $mask.hide()
                    $largeImgContainer.hide()
                  })
              }

        // 10.悬停在小图上 ，显示对应的中图
        function changePic() {
            // let $lis = $('#icon_list>li')
            $('#icon_list>li').hover(function () {
                let $img = $(this).children()
                // this.children()[0].className = 'hoveredThumb' //原生js方法
                $img.addClass('hoveredThumb')
                // 显示对应的中图
                let src = $img.attr('src').replace('.jpg','-m.jpg')
                $('#mediumImg').attr('src',src)

              },function () {
                $(this).children().removeClass('hoveredThumb')
                })
          }
    //  9 点击左右，移动展示商品的小图片
    function moveMiniImg() {
         let $as =  $('#preview>h1>a')
         let $backWard = $as.first()
         let $forward = $as.last()
         let $ul = $('#icon_list')
         let SHOW_COUNT = 5
        //  let imgCount = $ul.children('li').leghth
        let imgCount = $ul.children('li').length
         
         var moveCount = 0 //移动的次数，向右为+ 向左为-
         let liWidth = $ul.children(':first').width()
         if(imgCount>SHOW_COUNT){
            // $forward[0].className = 'forward'
            $forward.attr('class','forward')
         }
         $forward.click(function () {
            //  判断是否可以移动，不需要直接结束
            // alert(imgCount)
            if(moveCount===imgCount-SHOW_COUNT){
                return
            }
            moveCount++
            // 更新向左的按钮
            $backWard.attr('class','backward')
            // 更新向右的按钮
            if(moveCount === imgCount - SHOW_COUNT){
                $forward.attr('class','forward_disabled')

            }
            $ul.css({
                left: -moveCount*liWidth
            })
           })



           $backWard.click(function () {
            if(moveCount === 0){
                return
            }
            moveCount--
            // 更新向左的按钮
            // $backrward.attr('class','forward')
            $forward.attr('class', 'forward')
            // 更新向右的按钮
            if(moveCount === 0){
                $backWard.attr('class','backward_disabled')

            }
            $ul.css({
                left: -moveCount*liWidth
            })
             })
      }
   
    //    8.点击切换产品介绍
        function clickProductTabs(){
            let $lis =  $('#product_detail>ul>li')
            var $contents = $('#product_detail>div:gt(0)')

            $lis.click(function () {
                $lis.removeClass('current')
                this.className = 'current'
                $contents.hide()
                let index = $(this).index()
                // alert(index)
                // // $contents.eq(index).show()
                $contents[index].style.display = 'block'
           })
        }

//    7.鼠标移入时显示迷你购物车
      function hoverMiniCart () {
          $('#minicart').hover(function () {
            this.classname = 'mincart'
            $(this).children(':last').show()
            },function () {
                $(this).children(':last').hide()
              })
      }
    // 6.点击切换TABE
    function  changeTabs() { 
        let $store_tabs = $('#store_tabs')
        $('#store_tabs>li').click(function () {
            // alert(this)
            $('#store_tabs>li').removeClass('hover')
            //   this.attr('hover')
            $(this).addClass('hover')
            // this.className = 'hover'
          })
     }
    // 5.鼠标移入切换地址的显示隐藏
    function address(){
       let $store_select = $('#store_select')
       $store_select.hover(function () {
        $(this).children(':gt(0)').show()
          },function () 
          { $(this).children(':gt(0)').hide() })
          .children(':last')
          .click(function () {
            $store_select.children(':gt(0)').hide()
            })
      }


// 4.点击显示或者隐藏更多的分享图标
function share() {
    let isClose = false //标识当前的状态
    var $shareMore =  $('#shareMore')
    var $parent = $shareMore.parent()
    let $as = $shareMore.prevAll('a:lt(2)')
    let $b = $shareMore.children()
    $('#shareMore').click(function () {
        if(isClose ){
            $parent.css('width',155)   
            $as.hide()                            //去关闭
            $b.removeClass('backword')
        }else{
            $parent.css('width',200)  
            $as.show() 
            $b.addClass('backword')
        }
        isClose =!isClose
      })
  }
//   function share () {
//     var isOpen = false //标识当前的状态(初始为关闭)
//     var $shareMore = $('#shareMore')
//     var $parent = $shareMore.parent()
//     var $as = $shareMore.prevAll('a:lt(2)')
//     var $b = $shareMore.children()

//     $shareMore.click(function () {

//       if(isOpen) { // 去关闭
//         isOpen = false
//         $parent.css('width', 155)
//         $as.hide()
//         $b.removeClass('backword')
//       } else { // 去打开
//         isOpen = true
//         $parent.css('width', 200)
//         $as.show()
//         $b.addClass('backword')
//       }

//       // isOpen = !isOpen
//     })
//   }
// 3.输入关键字，弹出提示框
function search() {
    $('#txtSearch')
    .on('keyup focus' , function () {
        //如果输入框有文本输入 才提示
          let txt = this.value.trim()
          if(txt){
              $('#search_helper').show()
          }
      })
      .blur(function () { 
        $('#search_helper').hide() 
    })
}

function showhide(){
    $('[name = show_hide]').hover(function () {
      let id =  this.id + '_items'
      $('#'+ id).show()
    //   显示
     }
    ,function() {  
        let id =  this.id + '_items'
        $('#'+ id).hide()
        // 隐藏
    })
}
// 2.鼠标移动切换二级导航菜单的切换显示和隐藏
function hoverSubMenu() {
   $('#category_items>div').hover(function(){
        $(this).children(':last').show()
   },function(){
    $(this).children(':last').hide()
   })
  }


})

