function fnReady() {

    fnReadyKeyback();
    fnReadyOpenWin();
    fnReadyHeader();
    fnReadyNav();
    fnReadyFooter();
};


function setStorage(name,data) {
    $api.setStorage(name,data);
}

function getStorage(name) {
    return  $api.getStorage(name);
}

function getSocket(host,port) {
    if(host && port){
        return  io.connect('http://'+host+':'+port)
    }else{
        return  io.connect('http://shujunode.mumuim.cn:9216')
    }
}

function  checkLogin() {
    var users = $api.getStorage("users");
    if(!users){
        api.openWin({
            name: 'login',
            url: '../login_frame.html',
            pageParam: {
                name: 'test'
            }
        });
    }
}

function userLogout() {
    $api.rmStorage("users");
}

function timest() {
    var tmp = Date.parse( new Date() ).toString();
    tmp = tmp.substr(0,10);
    return tmp;
}



function  getTimestamp(time) {
    var stringTime = time;
    var tmp = Date.parse(new Date(stringTime));
    tmp = tmp / 1000;
    return tmp;
}

function dateStartStamp(advice) {
    if(advice=='ios'){
        var myDate = new Date();//获取系统当前时间
        var moths = myDate.getMonth()+1
        var moth = moths < 10 ? '0'+moths : moths;
        var day = myDate.getDate()<10 ? '0'+myDate.getDate():myDate.getDate();
        var DateTime = myDate.getFullYear()+'/'+moth+'/'+day;
        var dates= DateTime  +' 00:00:00';
        var tmp = Date.parse(dates).toString();
        tmp = tmp.substr(0,10);
        return tmp;
    }else{
        var myDate = new Date();//获取系统当前时间
        var moths = myDate.getMonth()+1
        var moth = moths < 10 ? '0'+moths : moths;
        var day = myDate.getDate()<10 ? '0'+myDate.getDate():myDate.getDate();
        var DateTime = myDate.getFullYear()+'-'+moth+'-'+day;
        var dates= DateTime  +' 00:00:00';
        var tmp = Date.parse(dates).toString();
        tmp = tmp.substr(0,10);
        return tmp;
    }
}

function dateNowStamp(advice) {
    if(advice=='ios'){
        var myDate = new Date();//获取系统当前时间
        var moths = myDate.getMonth()+1
        var moth = moths < 10 ? '0'+moths : moths;
        var day = myDate.getDate()<10 ? '0'+myDate.getDate():myDate.getDate();
        var DateTime = myDate.getFullYear()+'/'+moth+'/'+day;
    }else{
        var myDate = new Date();//获取系统当前时间
        var moths = myDate.getMonth()+1
        var moth = moths < 10 ? '0'+moths : moths;
        var day = myDate.getDate()<10 ? '0'+myDate.getDate():myDate.getDate();
        var DateTime = myDate.getFullYear()+'-'+moth+'-'+day;
    }
    var h = (myDate.getHours()<10?'0'+myDate.getHours():myDate.getHours());
    var m = (myDate.getMinutes()<10?'0'+myDate.getMinutes():myDate.getMinutes());
    var s = (myDate.getSeconds()<10?'0'+myDate.getSeconds():myDate.getSeconds());

    var dates= DateTime  +' '+h+':'+m+':'+s;
    var tmp = Date.parse(dates).toString();
    tmp = tmp.substr(0,10);
    return tmp;
}

function lastStartStamp(advice) {
    if(advice=='ios'){
        var today = new Date();
        var oneday = 1000 * 60 * 60 * 24;
        var myDate = new Date(today - oneday);
        var moths = myDate.getMonth()+1
        var moth = moths < 10 ? '0'+moths : moths;
        var day = myDate.getDate()<10 ? '0'+myDate.getDate():myDate.getDate();
        var DateTime = myDate.getFullYear()+'/'+moth+'/'+day+' 23:59:59';
        var tmp = Date.parse(DateTime).toString();
        tmp = tmp.substr(0,10);
        return tmp;
    }else{
        var today = new Date();
        var oneday = 1000 * 60 * 60 * 24;
        var myDate = new Date(today - oneday);
        var moths = myDate.getMonth()+1
        var moth = moths < 10 ? '0'+moths : moths;
        var day = myDate.getDate()<10 ? '0'+myDate.getDate():myDate.getDate();
        var DateTime = myDate.getFullYear()+'-'+moth+'-'+day+' 23:59:59';
        var tmp = Date.parse(DateTime).toString();
        tmp = tmp.substr(0,10);
        return tmp;
    }

}

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ';
    var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
    var m =  (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())+ ':';
    var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
    return Y+M+D+h+m+s;
}

function oauthEndTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    // var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ';
    var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
    var m =  (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
    // var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
    return M+D+h+m;
}

function timestamToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ';
    var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
    var m =  (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())+ ':';
    var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
    return Y+M+D+h+m+s;
}

function getDateDiff(dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    //若你得到的时间格式不是时间戳，可以使用下面的JavaScript函数把字符串转换为时间戳, 本函数的功能相当于JS版的strtotime1：
    var idata = Date.parse(dateTimeStamp.replace(/-/gi,"/"));  //js函数代码：字符串转换为时间
    var now = new Date().getTime();
    var diffValue = now - idata;
    if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "个月前";
    }
    else if (weekC >= 1) {

        result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}


function imlastTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = (date.getDate()<10?'0'+date.getDate():date.getDate());
    var h = (date.getHours()<10?'0'+date.getHours():date.getHours());
    var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
    var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
    return Y+"年"+M+"月"+D+"日"+" "+h+"时"+m+"分"+s+"秒";
}

function yundongTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() ;
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    return Y+"年"+M+"月"+D+"日";
}

function fnReadyKeyback() {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function() {
            api.closeWin();
        };
    }

    api.parseTapmode();
};

function descSort(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
function ascSort(key) {
    return function(a,b){
        var value1 = a[key];
        var value2 = b[key];
        return value1 - value2;
    }
}

function fnReadyOpenWin() {
    var buttons = $api.domAll('.open-win');
    for (var i = 0; i < buttons.length; i++) {
        $api.attr(buttons[i], 'tapmode', 'highlight');
        buttons[i].onclick = function() {
            var target = $api.closest(event.target, '.open-win');
            var winName = $api.attr(target, 'win'),
                isNeedLogin = $api.attr(target, 'login'),
                param = $api.attr(target, 'param');

            if (isNeedLogin && !getStorage('accessToken')) {
                winName = 'login';
            }

            if (param) {
                param = JSON.parse(param);
            }
            api.openWin({
                name: winName.replace('html/', ''),
                url: './' + winName + '.html',
                pageParam: param
            });
        };
    }
    api.parseTapmode();
};

var header, headerHeight = 0;

function fnReadyHeader() {
    header = $api.byId('header');
    if (header) {
        $api.fixIos7Bar(header);
        headerHeight = $api.offset(header).h;
    }
};

var nav, navHeight = 0;

function fnReadyNav() {
    nav = $api.byId('nav');
    if (nav) {
        navHeight = $api.offset(nav).h;
    }
};

var footer, footerHeight = 0;

function fnReadyFooter() {
    footer = $api.byId('footer');
    if (footer) {
        footerHeight = $api.offset(footer).h;
    }
};

function fnReadyFrame() {
    var frameName = api.winName + '_frame';
    var marginBottom = 0;
    if(frameName === "im_frame"){
        marginBottom = 50;
    }
    api.openFrame({
        allowEdit:true,
        name: frameName,
        url: './' + frameName + '.html',
        bounces:  false,

        bgColor: '#f0f0f0',
        rect: {
            x: 0,
            y: 80,
            w: 'auto',
            h: 'auto',
            marginBottom:marginBottom,
        },
        pageParam: api.pageParam
    });
};


//数据操作

/**
 *初始化db
 * @param db
 */
function openDb(db) {
    db.openDatabase({
        name: "mylocaldb"
    }, function(ret, err){
        if( ret.status ){
            console.log("openret:"+JSON.stringify(ret))
        }else{
            console.log("openerr"+JSON.stringify(err))
        }
    });
}

/**
 * 关闭数据库
 */

function closedb() {
    db.closeDatabase({
        name: 'mylocaldb'
    }, function(ret, err){
        if( ret.status ){
            alert('关闭成功');
        }else{
            alert( JSON.stringify( err ) );
        }
    });
}

/**
 * 删除表格
 * @param db
 * @param table
 */

function deltable(db,table) {
    db.executeSql({
        name: "mylocaldb",
        sql: 'drop table '+table
    }, function(ret, err) {
        if (ret.status) {
            console.log("删除表"+table+"成功:"+JSON.stringify(ret))
        } else {
            console.log("droperr"+JSON.stringify(err))
        }
    });
}
//方法二：使用字符unicode判断：方法如下：
function getByteLen(val) {
    var len = 0;
    for (var i=0; i<val.length; i++) {
        var c = val.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            len++;
        }
        else {
            len+=2;
        }
    }
    return len;
}



/**
 * 清空表
 * @param db
 * @param table
 */
function deletefromtable(db,table) {
    db.executeSql({
        name: "mylocaldb",
        sql: 'delete from   '+table
    }, function(ret, err) {
        if (ret.status) {
            console.log("清空表"+table+"成功:"+JSON.stringify(ret))
        } else {
            console.log("droperr"+JSON.stringify(err))
        }
    });
}


document.onkeydown=keyDownSearch;

function keyDownSearch() {
    // 兼容FF和IE和Opera    
    var theEvent =  window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        var keywor = $('.keyword').val() ||'';
        if(keywor){
            indexShoping()
        }
    }

}









