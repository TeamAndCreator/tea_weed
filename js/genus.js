$(document).ready(function () {
    var genus;

    $.ajax({
        crossDomain: true,
        url: ipValue + "/genus/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {

            console.log(result);
            genus = result.data;
            console.log(genus)
        }
    });
    //设置表格标题
    $('#genuses').bootstrapTable({
        idField: 'id',
        data: genus,
        columns: [{
            checkbox: true
        }, {
            field: 'genusNameCh',
            align: 'center',
            title: '中文名',
            sortable: 'true'
        }, {
            field: 'genusNameEn',
            align: 'center',
            title: '英文名',
            sortable: 'true'
        }, {
            field: 'genusNameLd',
            align: 'center',
            title: '拉丁文名',
            sortable: 'true'
        }, {
            field: 'genusNameOth',
            align: 'center',
            title: '别名',
            sortable: 'true'
        }, {
            field: 'genusDesc',
            align: 'center',
            title: '描述',
            sortable: 'true',
            valign:'middle',//垂直居中
            cellStyle:function(value,row,index,field){
                return{css:{'min-width':'80px','max-width':'150px','word-break': 'break-all'}};
            }
        }


        ]
    });
    //发送注册请求
    $('#add_btn').click(function () {
            var genusNameCh = $("#genusNameCh").val();
            var genusNameEn = $("#genusNameEn").val();
        var genusNameLd = $("#genusNameLd").val();
        var genusNameOth = $("#genusNameOth").val();
            if (genusNameCh.length == 0) {
                alert("中文名不能为空")
            } else if (genusNameEn.length == 0) {
                alert("英文名不能为空")
            }  else {
                var genus= {
                    "genusNameCh": $("#genusNameCh").val(),
                    "genusNameEn": $("#genusNameEn").val(),
                    "genusNameLd": $("#genusNameLd").val(),
                    "genusNameOth": $("#genusNameOth").val()
                    var content = $('#demo-summernote').summernote('code');
                };

                $.ajax({
                    type: 'post',
                    dataType: 'JSON',
                    url: ipValue + "/genus/save",
                    data: genus,
                    async:true,
                    traditional: true,
                    success: function () {
                        window.location.reload()
                    }
                });
            }
        }
    )
    //发送删除数据
    $('#demo-dt-delete-btn').click(function () {
        var a = $("#genuses").bootstrapTable('getSelections');
        var genus = [];
        for (var i = 0; i < a.length; i++) {
            genus[i] = a[i].id;
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/genus/deleteById',
            data: {_method: "DELETE", "id": genus[0]},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })


    })
    //查看详情
    function check(id) {
        init_info();
        $.ajax({
            url:baseUrl+'/genus/findById/',		//请求路径
            type:'GET',			                    //请求方式
            dataType:"JSON",		                //返回数据类型
            contentType: 'application/json',        //数据类型
            success:function(res){	                //请求成功回调函数
                if(res.code===200){
                    $('#genusNameCh').html(res.data.genusNameCh).attr('data-original-title',res.data.genusNameCh);
                    $('#genusNameEn').html(res.data.genusNameEn).attr('data-original-title',res.data.genusNameEn);
                    $('#genusNameLd').html(res.data.genusNameLd).attr('data-original-title',res.data.genusNameLd);
                    $('#genusNameOth').html(res.data.genusNameOth).attr('data-original-title',res.data.genusNameOth);
                    //$('#specDesc-info').html(res.data.spec.specDesc).attr('data-original-title',res.data.specDesc);
                    //$('#demo-summernote').summernote('code',res.data.specDesc).attr('data-original-title',res.data.specDesc);
                    //$('#demo-summernote-info').summernote('code',res.data.genusDesc);
                    $('#genusDesc').html(res.data);
                    //$('#genus-info').html(res.data.genus.genusNameCh).attr('data-original-title',res.data.genusNameCh);
                    $('#exampleModal-info').modal('show');
                }else if(res.code === 404){
                    window.location.href='../../page-404.html';
                }
                else if(res.code === 505){
                    window.location.href='../../page-500.html';
                }
                else{
                    $.niftyNoty({
                        type: 'danger',
                        icon: 'pli-cross icon-2x',
                        message: res.msg,
                        container: 'floating',
                        timer: 2000
                    });
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数

            }
        });
    }




});