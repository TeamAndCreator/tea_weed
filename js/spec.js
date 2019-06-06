$(document).ready(function () {
    var specs;
    //打开弹出框，去掉验证信息显示
    $('#exampleModal-info').on('shown.bs.modal',function () {

    });
    $.ajax({
        crossDomain: true,
        url: ipValue + "/spec/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {

            console.log(result);
            specs = result.data;
            console.log(specs)
        }
    });
    //设置表格标题
    $('#specs').bootstrapTable({
        idField: 'id',
        data: specs,
        columns: [{
            checkbox: true
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
            },{
            field:'genus',//数据列
            title:'属名',//数据列名称
            sortable:true,//可排序
            align:'center',//水平居中
            valign:'middle',//垂直居中
            cellStyle:function(value,row,index,field) {
                return {css: {'min-width': '80px'}};
            },
            formatter:function(value,row,index){
                //return row.genus.genusNameCh;
                return row.genus == null ? '' : row.genus.genusNameCh;
            }
        },{
            field: 'specNameCh',
            align: 'center',
            title: '中文名',
            sortable: 'true'
        }, {
            field: 'specNameEn',
            align: 'center',
            title: '英文名',
            sortable: 'true'
        }, {
            field: 'specNameLd',
            align: 'center',
            title: '拉丁文名',
            sortable: 'true'
        }, {
            field: 'specNameOth',
            align: 'center',
            title: '别名',
            sortable: 'true'
        }


        ]
    })
    //发送注册请求
    $('#add_btn').click(function () {
            var specNameCh = $("#specNameCh").val();
            var specNameEn = $("#specNameEn").val();
            var specNameLd = $("#specNameLd").val();
            var specNameOth = $("#specNameOth").val();
            var genusNameCh = $("#genusNameCh").val();
            if (specNameCh.length == 0) {
                alert("中文名不能为空")
            } else if (specNameEn.length == 0) {
                alert("英文名不能为空")
            }  else {
                var spec= {
                    "specNameCh": $("#specNameCh").val(),
                    "specNameEn": $("#specNameEn").val(),
                    "specNameLd": $("#specNameLd").val(),
                    "specNameOth": $("#specNameOth").val(),
                    "genus.id": $("#select option:selected").val(),
                    "specDesc":$("#demo-summernote").summernote('code'),
                };
                console.log(spec);
                $.ajax({
                    type: 'post',
                    dataType: 'JSON',
                    url: ipValue + "/spec/save",
                    data: spec,
                    async:true,
                    traditional: true,
                    success: function () {
                        window.location.reload()
                    }
                });
            }
        }
    )
    /*//发送删除数据
    $('#demo-dt-delete-btn').click(function () {
        var a = $("#specs").bootstrapTable('getSelections');
        var spec = [];
        for (var i = 0; i < a.length; i++) {
            spec[i] = a[i].id;
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/spec/deleteById',
            data: {_method: "DELETE", "id": spec[0]},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })


    });*/
    //批量删除
    $('#demo-dt-delete-btn').click(function () {

        var a = $("#specs").bootstrapTable('getSelections');
        var spec = [];
        for (var i = 0; i < a.length; i++) {
            spec[i] = a[i].id
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/spec/deleteByIds',
            data: {_method: "DELETE", "ids": spec},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })


    })
    //写入父任务
    var genus;
    var html2 = '';
    $.ajax({
        crossDomain: true,
        url: ipValue + "/genus/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {
            genus = result.data ;
        }
    });
    for (var i = 0; i < genus.length; i++) {
        html2 += "<option value=" + genus[i].id + ">" + genus[i].genusNameCh + "</option>"
    }
    $('#genusNameCh').text("属名");
    $('#select').html(html2)




});
//查看详情
function check(id) {
    init_info();
    $.ajax({
        url:ipValue+'/spec/findById/',		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        data: {"id":id},
        success:function(res){	                //请求成功回调函数
            if(res.code===200){
                $('#specNameCh-info').html(res.data.specNameCh).attr('data-original-title',res.data.specNameCh);
                $('#specNameEn-info').html(res.data.specNameEn).attr('data-original-title',res.data.specNameEn);
                $('#specNameLd-info').html(res.data.specNameLd).attr('data-original-title',res.data.specNameLd);
                $('#specNameOth-info').html(res.data.specNameOth).attr('data-original-title',res.data.specNameOth);

                _html='';



                $('#specDesc-info').html(res.data.specDesc);
                if(res.data.genus.genusNameCh!=null){
                    $('#genus-info').html(res.data.genus.genusNameCh).attr('data-original-title',res.data.genus.genusNameCh);
                }
                $('#exampleModal-info').modal('show');
            }else if(res.code == 404){
                window.location.href='../../page-404.html';
            }
            else if(res.code == 505){
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
//初始化详情元素值
function init_info(){
    $('#specNameCh-info').val("").attr('data-original-title',"");
    $('#specNameEn-info').val("").attr('data-original-title',"");
    $('#specNameLd-info').val("").attr('data-original-title',"");
    $('#specNameOth-info').val("").attr('data-original-title',"");
    $('#specDesc-info').val("").attr('data-original-title',"");
    $('#genus-info').val("").attr('data-original-title',"");
    // $('#specSortNum').val("").attr('data-original-title',"");
    // $('#registrationForm').data('bootstrapValidator').resetForm();
}

