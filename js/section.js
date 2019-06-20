$(document).ready(function () {
    var sections;
    //打开弹出框，去掉验证信息显示
    $('#exampleModal-info').on('shown.bs.modal',function () {

    });

    $.ajax({
        crossDomain: true,
        url: ipValue + "/section/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {

            console.log(result);
            sections = result.data;
            console.log(sections)
        }
    });
    //设置表格标题
    $('#sections').bootstrapTable({
        idField: 'id',
        data: sections,
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
                field: 'sectionNameCh',
                align: 'center',
                title: '中文名',
                sortable: 'true'
            }, {
                field: 'sectionNameEn',
                align: 'center',
                title: '英文名',
                sortable: 'true'
            }, {
                field: 'sectionNameLd',
                align: 'center',
                title: '拉丁文名',
                sortable: 'true'
            }, {
                field: 'sectionNameOth',
                align: 'center',
                title: '别名',
                sortable: 'true'
            }


        ]
    });
    //发送注册请求
    $('#add_btn').click(function () {
            var sectionNameCh = $("#sectionNameCh").val();
            var sectionNameEn = $("#sectionNameEn").val();
            var sectionNameLd = $("#sectionNameLd").val();
            var sectionNameOth = $("#sectionNameOth").val();
            var sectionDesc = $('#demo-summernote').summernote('code');

            if (sectionNameCh.length == 0) {
                alert("中文名不能为空")
            } else if (sectionNameEn.length == 0) {
                alert("英文名不能为空")
            }  else {
                var section= {
                    "sectionNameCh": $("#sectionNameCh").val(),
                    "sectionNameEn": $("#sectionNameEn").val(),
                    "sectionNameLd": $("#sectionNameLd").val(),
                    "sectionNameOth": $("#sectionNameOth").val(),
                    "sectionDesc": $("#demo-summernote").summernote('code'),


                };


                $.ajax({
                    type: 'post',
                    dataType: 'JSON',
                    url: ipValue + "/section/save",
                    data: section,
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

        var a = $("#sections").bootstrapTable('getSelections');
        var section = [];
        for (var i = 0; i < a.length; i++) {
            section[i] = a[i].id
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/section/deleteByIds',
            data: {_method: "DELETE", "ids": section},
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
        url:ipValue + '/section/findById',		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        data: {"id":id},
        success:function(res){	                //请求成功回调函数
            console.log(res)
            if(res.code===200){
                $('#sectionNameCh-info').html(res.data.sectionNameCh).attr('data-original-title',res.data.sectionNameCh);
                $('#sectionNameEn-info').html(res.data.sectionNameEn).attr('data-original-title',res.data.sectionNameEn);
                $('#sectionNameLd-info').html(res.data.sectionNameLd).attr('data-original-title',res.data.sectionNameLd);
                $('#sectionNameOth-info').html(res.data.sectionNameOth).attr('data-original-title',res.data.sectionNameOth);
                //$('#specDesc-info').html(res.data.spec.specDesc).attr('data-original-title',res.data.specDesc);
                //$('#demo-summernote').summernote('code',res.data.specDesc).attr('data-original-title',res.data.specDesc);
                //$('#demo-summernote-info').summernote('code',res.data.genusDesc);
                $('#sectionDesc-info').html(res.data.sectionDesc);
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

    $('#sectionId').val("").attr('data-original-title',"");
    $('#sectionNameCh-info').val("").attr('data-original-title',"");
    $('#sectionNameEn-info').val("").attr('data-original-title',"");
    $('#sectionNameLd-info').val("").attr('data-original-title',"");
    $('#sectionNameOth-info').val("").attr('data-original-title',"");
    $('#sectionDesc-info').val("").attr('data-original-title',"");

}




