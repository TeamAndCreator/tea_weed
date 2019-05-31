$(document).ready(function () {
    var genus;
    //打开弹出框，去掉验证信息显示
    $('#exampleModal-info').on('shown.bs.modal',function () {

    });

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
            checkbox: true,
        },
            {
                field:'',//数据列
                title:'操作',//数据列名称
                width:'90px',
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function(value,row,index){//格式化，自定义内容
                    var _html='';


                    _html += '<button  onclick="check('+row.id+')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" title="查看"><i class="fa fa-search"></i></button>'

                    return _html;
                },
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'100px'}};
                }
            },
   {
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
        }


        ]
    });
    //发送注册请求
    $('#add_btn').click(function () {
            var genusNameCh = $("#genusNameCh").val();
            var genusNameEn = $("#genusNameEn").val();
        var genusNameLd = $("#genusNameLd").val();
        var genusNameOth = $("#genusNameOth").val();
        var genusDesc = $('#demo-summernote').summernote('code');

            if (genusNameCh.length == 0) {
                alert("中文名不能为空")
            } else if (genusNameEn.length == 0) {
                alert("英文名不能为空")
            }  else {
                var genus= {
                    "genusNameCh": $("#genusNameCh").val(),
                    "genusNameEn": $("#genusNameEn").val(),
                    "genusNameLd": $("#genusNameLd").val(),
                    "genusNameOth": $("#genusNameOth").val(),
                    "genusDesc": $("#demo-summernote").summernote('code'),


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
    /*$('#demo-dt-delete-btn').click(function () {
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


    })*/
    //批量删除
    $('#demo-dt-delete-btn').click(function () {

            var a = $("#genuses").bootstrapTable('getSelections');
            var genus = [];
            for (var i = 0; i < a.length; i++) {
                genus[i] = a[i].id
            }
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/genus/deleteByIds',
                data: {_method: "DELETE", "ids": genus},
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload()
                }
            })


    })

});
//查看详情
function check(id) {
    init_info();
    $.ajax({
        url:ipValue + '/genus/findById',		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        data: {"id":id},
        success:function(res){	                //请求成功回调函数
            console.log(res)
            if(res.code===200){
                $('#genusNameCh-info').html(res.data.genusNameCh).attr('data-original-title',res.data.genusNameCh);
                $('#genusNameEn-info').html(res.data.genusNameEn).attr('data-original-title',res.data.genusNameEn);
                $('#genusNameLd-info').html(res.data.genusNameLd).attr('data-original-title',res.data.genusNameLd);
                $('#genusNameOth-info').html(res.data.genusNameOth).attr('data-original-title',res.data.genusNameOth);
                //$('#specDesc-info').html(res.data.spec.specDesc).attr('data-original-title',res.data.specDesc);
                //$('#demo-summernote').summernote('code',res.data.specDesc).attr('data-original-title',res.data.specDesc);
                //$('#demo-summernote-info').summernote('code',res.data.genusDesc);
                $('#genusDesc-info').html(res.data.genusDesc);
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
function init_info(){

    $('#genusId').val("").attr('data-original-title',"");
    $('#genusNameCh-info').val("").attr('data-original-title',"");
    $('#genusNameEn-info').val("").attr('data-original-title',"");
    $('#genusNameLd-info').val("").attr('data-original-title',"");
    $('#genusNameOth-info').val("").attr('data-original-title',"");
    $('#genusDesc-info').val("").attr('data-original-title',"");

}




