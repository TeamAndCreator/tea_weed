$(document).ready(function () {
    var permissions;
//获取本体系人员名单
    $.ajax({
        crossDomain: true,
        url: ipValue + "/permission/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {

            console.log(result);
            permissions = result.data;
            console.log(permissions)
        }
    });
//设置表格标题
    $('#permissions').bootstrapTable({
        idField: 'id',
        data: permissions,
        columns: [{
            checkbox: true
        }, {
            field: 'permissionName',
            align: 'center',
            title: '权限',
            sortable: 'true'
        },{
            field: 'description',
            align: 'center',
            title: '说明',
            sortable: 'true',
        }

        ]
    });

    //发送注册请求
    $('#add_btn').click(function () {

            var role = {
                "permissionName": $("#permissionName").val(),
                "description": $("#description").val()
            };
            var roleIdList = [2];
            permission["roleIdList"] = roleIdList;
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + "/permission/save",
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
            permission = result.data ;
            console.log(result)
        }
    });
    for (var i = 0; i < permission.length; i++) {
        html2 += "<option value=" + permission[i].id + ">" + permission[i].description + "</option>"
    }
    $('#description').text("权限选择");
    $('#checkbox').html(html2)

});
