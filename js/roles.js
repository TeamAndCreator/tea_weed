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
            field: 'roleName',
            align: 'center',
            title: '角色名',
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
                    "roleName": $("#roleName").val(),
                    "description": $("#description").val()
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
    //发送删除数据
    $('#demo-dt-delete-btn').click(function () {
        var a = $("#roles").bootstrapTable('getSelections');
        var role = [];
        for (var i = 0; i < a.length; i++) {
            role[i] = a[i].id;
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/role/deleteById',
            data: {_method: "DELETE", "id": role[0]},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })


    })
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
        html2 += "<div class=\"col-sm-3\">\n" +
            " <input type=\"checkbox\" name=\"fruit\" value=\"1\" />"+permission[i].description+"\n" + " </div>"
    }
    $('#descriptions').text("权限选择");
    $('#checkbox').html(html2)

});
