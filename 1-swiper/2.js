let $pointBtns = $("#pointBtns>div");
let $slides = $("#slides");
let current = 0;//当前图片元素的index值
let $imgs = $slides.children("img");

makeFakeImg();//克隆假的图片,并放到应有的位置上
$slides.css({transform:"translateX(-400px)",})//初始化第一张图片的位置
binEvent();//绑定按钮的监听事件

//绑定上一张下一张按钮监听事件
$("#prevBtn").on("click",function () {
    goToslides(current-1);
})
$("#nextBtn").on("click",function () {
    goToslides(current+1);
})

//定时轮播
let timer = setInterval(function () {
    goToslides(current+1);
},1000)
$(".container").on("mouseenter",function () {
    window.clearInterval(timer);
})
$(".container").on("mouseleave",function () {
    timer = setInterval(function () {
        goToslides(current+1);
    },1000)
})

//barBtn的显示与消失
$(".window").on("mouseenter",function () {
    $(".barBtn").addClass("active");
})
$(".window").on("mouseleave",function () {
    $(".barBtn").removeClass("active");
})



function binEvent() {//绑定按钮的监听事件
    $pointBtns.on("click",function (e) {
        let index = $(this).index();
        goToslides(index);//传入要进入的下一个图片的index,然后执行图片转换工作
    })
}
function makeFakeImg(){//克隆假的图片,并放到应有的位置上
    // 闭包:函数和这个函数用到的作用于之外的变量.js函数不用传参进来,可以直接对作用域外的变量进行作用
    let $firstImg = $imgs.eq(0).clone(true);
    let $lastImg = $imgs.eq($imgs.length-1).clone(true);
    /*
    * console.log($firstImg[0].outerHTML);
    console.log($lastImg[0].outerHTML);//在jquery中如果对jquery元素写$lastImg[0]这样就是原来的元素,可以用原来的方法
    * */
//添加克隆的图片
    $slides.append($firstImg);
    $slides.prepend($lastImg);
}

function goToslides(index) {//传入要进入的下一个图片的index,然后执行图片转换工作

    //在这里判断上一张下一张传进来的index越界问题
    if (index > $imgs.length-1){
        index = 0;
    } else if (index < 0){
        index = $imgs.length - 1;
    }

    //给下标为index的圆点按钮添加变成orange的代码
    $pointBtns.eq(index).addClass("active").siblings().removeClass("active");

    if (current ===($imgs.length-1) && index===0){//如果他是从最后一张图来到第一张图
        $slides.css({
            transform:`translateX(-${($imgs.length+1)*400}px)`,
        }).one("transitionend",function () {//待过渡结束后,再转到真正的位置
            $slides.hide().offset();
            $slides.css({
                transform:`translateX(-400px)`,
            }).show()
        })
    }else if (current ===0 && index===($imgs.length-1)) {//如果他是从第一张图来到最后一张图
        $slides.css({
            transform:`translateX(0px)`,
        }).one("transitionend",function () {
            $slides.hide().offset();
            $slides.css({
                transform:`translateX(-${($imgs.length)*400}px)`,
            }).show()
        })
    }else {//其余的直接转变
        $slides.css({
            transform:`translateX(-${(index+1)*400}px)`,
        });
    }
    current=index;
}
