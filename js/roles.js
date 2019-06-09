$(document).ready(function () {
    var roles;
//获取本体系人员名单
    $.ajax({
        crossDomain: true,
        url: ipValue + "/role/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {

            console.log(result);
            roles = result.data;
            console.log(roles)
        }
    });
//设置表格标题
    $('#roles').bootstrapTable({
        idField: 'id',
        data: roles,
        columns: [{
            checkbox: true
        }, {
            field: '',//数据列
            title: '操作',//数据列名称
            width: '90px',
            align: 'center',//水平居中
            valign: 'middle',//垂直居中
            formatter: function (value, row, index) {//格式化，自定义内容
                var _html = '';


                _html += '<button  onclick="check(' + row.id + ')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" title="查看"><i class="fa fa-search"></i></button>'

                return _html;
            },
            cellStyle: function (value, row, index, field) {
                return {css: {'min-width': '100px'}};
            }
        }, {
            field: 'roleName',
            align: 'center',
            title: '角色名',
            sortable: 'true'
        }, {
            field: 'description',
            align: 'center',
            title: '说明',
            sortable: 'true',
        }

        ]
    });
var r=0;
    //发送注册请求
    $('#add_btn').click(function () {

            var role = {
                "roleName": $("#roleName").val(),
                "description": $("#description").val(),
                "permissions.id":$("#checkbox input:checked").val()
                 //"permissions.id":$("input[name='fruit']:checked")
                //"permission[i].id": $("#select option:selected").val(),

            };

            var roleIdList = [2];
            role["id_list"] = roleIdList;
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + "/role/save",
                data: role,
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload()
                }
            });

        }
    )

    //写入父任务
    var permission;
    var html2 = '';
    $.ajax({
        crossDomain: true,
        url: ipValue + "/permission/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {
            permission = result.data;
            console.log(result)
        }
    });
    for (var i = 0; i < permission.length; i++) {
        html2 += "<div class=\"col-sm-3\">\n" + "权限"+
            " <input type=\"checkbox\" name=\"fruit\" value=\"\" />" + permission[i].description + "\n" + " </div>"
    }
    $('#descriptions').text("权限选择");
    $('#checkbox').html(html2)

   /* for (var i = 0; i < permission.length; i++) {
        html2 += "<option value=" + permission[i].id + ">" + permission[i].description + "</option>"
    }
    $('#descriptions').text("权限选择");
    $('#select').html(html2)
*/
});

//查看详情
function check(id) {
    var i;
    init_info();
    $.ajax({
        url: ipValue + '/role/findById/',		//请求路径
        type: 'GET',			                    //请求方式
        dataType: "JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        data: {"id": id},
        success: function (res) {	                //请求成功回调函数
            if (res.code === 200) {
                $('#roleName-info').html(res.data.roleName);
                $('#description-info').html(res.data.description);
                if (res.data.permissions[0].description != null) {
                    // $('#permission-info1').empty();
                    // $('#permission-info2').empty();
                    // if (res.data.id != 1) {
                    //     $('#permission-info1').html(res.data.permissions[0].description);
                    //
                    // } else {
                    //     $('#permission-info1').html(res.data.permissions[0].description);
                    //     $('#permission-info2').html(res.data.permissions[1].description);
                    // }
                    var str = "";
                    for (var i =0 ; i<res.data.permissions.length;i++){
                        if (i != res.data.permissions.length-1){
                            str += res.data.permissions[i].description+",";
                        } else {
                            str += res.data.permissions[i].description;
                        }

                    }
                    $('#permission-info1').html(str);
                }

                $('#exampleModal-info').modal('show');

            } else if (res.code == 404) {
                window.location.href = '../../page-404.html';
            } else if (res.code == 505) {
                window.location.href = '../../page-500.html';
            } else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: res.msg,
                    container: 'floating',
                    timer: 2000
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数
        }
    });
}

//初始化详情元素值
function init_info() {
    $('#roleName-info').val("").attr('data-original-title', "");
    $('#description-info').val("").attr('data-original-title', "");
    $('#descriptions-info').val("").attr('data-original-title', "");

}
