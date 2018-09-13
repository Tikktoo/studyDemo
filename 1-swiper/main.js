let n;
初始化();
setInterval(()=>{
    makeImgLeft(getImgN(n))
        .one('transitionend',(e)=>{
            makeImgRight($(e.currentTarget));//当前元素
        });

    makeImgMid(getImgN(n+1));
    n+=1;
},1000);
function in123(n) {
    if(n>3){
        n%=3;
        if(n===0){
            n=3;//n123
        }
    }
    return n;
}

function 初始化() {
    n = 1;
    $(`.images>img:nth-child(${n})`).addClass('imgmid').siblings().addClass('imgright');//让第1个在中间,其余的在右边等待进入
}
function makeImgLeft($node) {//切换状态函数
    $node.addClass('imgleft').removeClass('imgmid imgright');
    return $node;
}
function makeImgRight($node) {
    $node.addClass('imgright').removeClass('imgmid imgleft');
    return $node;
}
function makeImgMid($node) {
    $node.addClass('imgmid').removeClass('imgright imgleft');
    return $node;
}
function getImgN(n){
    return $(`.images>img:nth-child(${in123(n)})`)
}