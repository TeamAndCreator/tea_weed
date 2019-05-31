$(document).ready(function () {
    // new Page({
    //     id: 'pagination',
    //     pageTotal: 12, //必填,总页数
    //     pageAmount: 4,  //每页多少条
    //     dataTotal: 47, //总共多少条数据
    //     curPage: 1, //初始页码,不填默认为1
    //     pageSize: 5, //分页个数,不填默认为5
    //     showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
    //     // showSkipInputFlag: true, //是否支持跳转,不填默认不显示
    //     getPage: function (page) {
    //         //获取当前页数
    //         console.log(page);
    //     }
    // })

    $.ajax({
        url: ipValue + "File_databaseService/page",
        dataType: "json",
        type: "GET",
        data: {
            "pageSize": 4,
            "start": 3
        },
        success: function (result) {

            jQuery('.input_result').each(function(key,value){
                if (result.data[key] != null) {
                    $(this).val(result.data[key].input_result);
                    $(this).attr("name",result.data[key].id);
                }
            });
            jQuery('.img-responsive').each(function(key,value){
                if (result.data[key] != null) {
                    $(this).attr("src", vr_path+result.data[key].path+"/"+result.data[key].uuid_name);
                }
            });
        }
    })


});
