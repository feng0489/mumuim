//搜索功能
function submitSearch(){
    var keywor = $('.keyword').val() ||'';
    if(keywor){
        indexShoping()
    }else{
        return;
    }

}
//回车搜索
document.onkeydown=keyDownSearch;

function keyDownSearch(e) {
    // 兼容FF和IE和Opera    
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        var keywor =  $('.keyword').val() || '';
        if(keywor){
            indexShoping();
        }
    }
}

//开始按
var shop_id,title,pic_url,real_price,shop_type,click_url,youhuijuan,leafCatId,saleCount,nick;
var users = getStorage("users");
function goSoping(obj) {
     shop_id = $(obj).data("id");
     title = $(obj).data("title");
     title = title.replace(/<.*?>/ig,"");//span标签替换为空
     pic_url = $(obj).data("img");
     real_price = $(obj).data("price");
     shop_type = $(obj).data("shoptype");
     click_url = $(obj).data("url");
     youhuijuan = $(obj).data("youhuijuan") || 0;
     leafCatId = $(obj).data("sss") || '';
     saleCount = $(obj).data("saount");
     nick = $(obj).data("nick");
     click_url = 'https://uland.taobao.com/coupon/edetail?e=activityId='+leafCatId+'&pid='+users.pid+'&itemId='+shop_id+'&src=cd_cdll';
     //console.log("click_url:"+click_url);
     if(!shop_id){
         return;
     }
     if(parseInt(users.is_special)===0){
         Dialog.init('<img src="'+pic_url+'" width="100%">',{
             title : title,
             button : {
                 购买宝贝 : function(){
                     $.showLoading();
                     api.ajax({
                         url: 'https://shuju.mumuim.cn/index.php?m=default&c=phone&a=request',
                         method: 'post',
                         data: {
                             values: {
                                 "ac": "doQuan",
                                 "uid": users.user_id,
                                 "shop_id": shop_id,
                                 "title": title,
                                 "pic_url": pic_url,
                                 "real_price": real_price,
                                 "shop_type": shop_type,
                                 "pid": users.pid,
                             },
                         }
                     }, function (ret, err) {
                         if(!err){
                             $.hideLoading();
                             if(parseInt(ret.code) == 200){
                                 var data=ret.data;
                                 if(data){//高佣
                                     var link=data.tbk_privilege_get_response.result.data.coupon_click_url;
                                     api.openWin({
                                         name: 'lingquan',
                                         url: 'lingquan.html',
                                         pageParam: {
                                             url:link,
                                         }
                                     });
                                 }else{
                                     api.openWin({
                                         name: 'lingquan',
                                         url: 'lingquan.html',
                                         pageParam: {
                                             url:click_url,
                                         }
                                     });
                                 }

                             }else{
                                 api.toast({
                                     msg: ret.msg,
                                     duration: ret.code,
                                     location: 'bottom'
                                 });
                             }
                         }else{
                             api.toast({
                                 msg: '网络异常，请重新请求!',
                                 duration: 3000,
                                 location: 'bottom'
                             });
                         }
                     });
                     Dialog.close(this);

                 },
                 分享赚钱 : function(){
                     fnOpenShareFrame();
                     Dialog.close(this);
                 },
             }
         });
     }else{
        return;
     }
}

var shareStatus = false;

function fnOpenShareFrame() {
    shareStatus = !shareStatus;
    if (shareStatus) {
        api.openFrame({
            name: 'share_frame',
            url: './share_frame.html',
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam: {
                "uid": users.user_id,
                "shop_id": shop_id,
                "title": title,
                "pic_url": pic_url,
                "real_price": real_price,
                "shop_type": shop_type,
                "youhuijuan": youhuijuan,
                "saleCount":saleCount,
                "nick": nick,
                "leafCatId": leafCatId,
            }
        });
        shareStatus=false;
    } else {
        api.closeFrame({
            name: 'share_frame'
        });
    }
};


