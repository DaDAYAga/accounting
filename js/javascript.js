$(function(){
    $('#sendRecord').click(function(e){
        var status = true;
        var name = $('#name').val(); // 名稱
        var price = $('#price').val(); // 價格
        var luxury = $('#luxury').val(); // 奢侈度
        var userName = $('#userName').val(); //用戶名
        var kind = $("#kind").val(); //種類

        if($(".price i.display").hasClass("nagative")) {
            price = price;
        }
        else if($(".price i.display").hasClass("positive")) {
            price = -price;
        }

        // 擋住不填資料邏輯
        if(name == '' || price == '' || luxury == '' || userName == '' || kind == ''){
            alert('全品項皆為必填！');
            status = false;
        }

        // 如果 必填欄位都過了 才會到這邊
        if(status){
            // 增加日期資料
            var currentdate = new Date();
            var filltime = currentdate.getFullYear() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getDate() + "  "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
            // 打包 要的資料
            var data = {
                'name' : name,
                'price': parseFloat(price),
                'time': filltime,
                'luxury': parseInt(luxury),
                'kind' : kind
            };
            // 呼叫 send ajax function
            send(data, currentdate);
        }
    });
});

function send(data, currentdate){
    var userName = $("#userName").val();
    var kindName = $("#kind").val();

    data.sheetName = currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + '月' + userName + '的' + kindName + '類花費';

    var monthSheetName = currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + '月' + userName + '的月度總計';
    data.monthSheetName = monthSheetName;
    
    var yearSheetName = currentdate.getFullYear() + '年' + userName + '的年度總計';
    data.yearSheetName = yearSheetName;

    $.ajax({
        // 這邊用get type
        type: "get",
        // api url - google appscript 產出的 url
        url: "https://script.google.com/macros/s/AKfycbwoJ-eG7QFS2d-jAfHRxtFKXEHPNKGn1UvrLy2iGZu_6nO3E1i0XDIoPiBdaSJzV1ZwQA/exec",
        // 剛剛整理好的資料帶入
        data: data,

        // 成功送出 會回頭觸發下面這塊感謝
        success: function (response) {
            if(response) {
                alert('紀錄成功！！');

                $("form label:not(.name) input").val("");

                $("form select").val("0");
                
                $(".price .nagative")
                .addClass("display")
                .siblings().removeClass("display");

                $(".btnBox .nagative")
                .addClass("active")
                .siblings().removeClass("active");
            }
            else {
                alert('紀錄失敗！！');
            }
        }
    });
}

$(function(){
    $("#kind").change(function(){
        var val = $("#kind").val();

        if(val == "食物") {
            $(".typeSelect.food")
            .addClass("display")
            .siblings().removeClass("display");
        }
        else if(val == "運動") {
            $(".typeSelect.sport")
            .addClass("display")
            .siblings().removeClass("display");
        }
        else if(val == "交通") {
            $(".typeSelect.transport")
            .addClass("display")
            .siblings().removeClass("display");
        }
        else if(val == "金融") {
            $(".typeSelect.money")
            .addClass("display")
            .siblings().removeClass("display");
        }
    })

    $(".typeSelect").change(function(){
        $("#name").val($(this).val());
    })

    $(".price i").click(function(){
        $(".price i")
        .toggleClass("display");

        $(".btnBox button")
        .toggleClass("active");
    })

    $(".btnBox button").click(function(){
        $(this)
        .addClass("active")
        .siblings().removeClass("active");

        if($(this).hasClass("nagative")) {
            $(".price i.nagative")
            .addClass("display")
            .siblings().removeClass("display");
        }
        else if($(this).hasClass("positive")) {
            $(".price i.positive")
            .addClass("display")
            .siblings().removeClass("display");
        }
    })
})