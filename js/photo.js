$(document).ready(function () {
    // new Page({
    //     id: 'pagination',
    //     pageTotal: 50, //必填,总页数
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
        url: ipValue + "File_databaseService/findCount",
        dataType: "json",
        type: "GET",
        success: function (result) {
            // console.log(result);
            var dataTotal=result.data;
            var pageTotal;
            if (result.data%4 === 0) {
                pageTotal = parseInt(dataTotal/4);
            }else {
                pageTotal = parseInt(dataTotal/4)+1;
            }
            new Page({
                id: 'pagination',
                pageTotal: pageTotal, //必填,总页数
                pageAmount: 4,  //每页多少条
                dataTotal: dataTotal, //总共多少条数据
                curPage: 1, //初始页码,不填默认为1
                pageSize: 5, //分页个数,不填默认为5
                showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
                // showSkipInputFlag: true, //是否支持跳转,不填默认不显示
                getPage: function (page) {
                    //获取当前页数
                    // console.log(page-1);
                    $.ajax({
                        url: ipValue + "File_databaseService/page",
                        dataType: "json",
                        type: "GET",
                        data: {
                            "pageSize": 4,
                            "start": page-1
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
                }
            });
            $.ajax({
                url: ipValue + "File_databaseService/page",
                dataType: "json",
                type: "GET",
                data: {
                    "pageSize": 4,
                    "start": 0
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
        }
    });


    $("button[type='submit']").click(function () {
        var input = $(this).prev();
        var id = input.attr("name");
        var input_result = input.val();

        $.ajax({
            url: ipValue + "file/update_input_result",
            dataType: "json",
            type: "POST",
            data: {
                "_method":"PUT",
                "id":id,
                "input_result":input_result
            },
            success: function (result) {
                alert(result.msg);
            }
        })

    })

});
