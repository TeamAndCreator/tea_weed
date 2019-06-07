$(document).ready(function () {
    var users;
//获取本体系人员名单
    $.ajax({
        crossDomain: true,
        url: ipValue + "/user/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {

            console.log(result);
            users = result.data;
            console.log(users)
        }
    });
//设置表格标题
    $('#users').bootstrapTable({
        idField: 'id',
        data: users,
        columns: [{
            checkbox: true
        }, {
            field: 'phoneNumber',
            align: 'center',
            title: '电话',
            sortable: 'true'
        }, {
            field: 'createTime',
            align: 'center',
            title: '创建时间',
            sortable: 'true'
        }, {
            field: 'active',
            align: 'center',
            title: '状态',
            sortable: 'true'
        },{
            field: 'roles',
            align: 'center',
            title: '岗位',
            sortable: 'true',
            formatter: 'roles'
        }

        ]
    });
    //密码二次输入验证
    $("#password_confirm").blur(function () {
        var password = $("#password").val();
        var confirm_password = $("#password_confirm").val();
        if (confirm_password == password) {
            if (password.length != 0) {
                $("#tip").html("<font color=\"#87b87f\" size=\"2\"> 合格 </font>");
            } else {
                $("#tip").html("<font color=\"red\" size=\"2\"> 密码不能为空 </font>");
            }
        } else {
            $("#tip").html("<font color=\"red\" size=\"2\"> 两次输入密码不一致 </font>")
        }
    });
    $("#password").blur(function () {
        var password = $("#password").val();
        var confirm_password = $("#password_confirm").val();
        if (confirm_password == password) {
            if (password.length != 0)
                $("#tip").html("<font color=\"#87b87f\" size=\"2\"> 合格 </font>");
            else
                $("#tip").html("<font color=\"red\" size=\"2\"> 密码不能为空 </font>");
        } else
            $("#tip").html("<font color=\"red\" size=\"2\"> 两次输入密码不一致 </font>")

    });
    //发送注册请求
    $('#add_btn').click(function () {
            var password = $("#password").val();
            var confirm_password = $("#password_confirm").val();
            var account = $("#account").val();
            if (account.length == 0) {
                alert("账号不能为空")
            } else if (password.length == 0) {
                alert("密码不能为空")
            } else if (confirm_password != password) {
                alert("两次密码输入不一致")
            } else {
                var user = {
                    "username": $("#username").val(),
                    "account": $("#account").val(),
                    "phoneNumber": $("#phoneNumber").val(),
                    "role.id": $("#select option:selected").val(),
                    "password": $("#password").val()
                };
                var roleIdList = [2];
                user["roleIdList"] = roleIdList;
                $.ajax({
                    type: 'post',
                    dataType: 'JSON',
                    url: ipValue + "/user/save",
                    data: user,
                    async: false,
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
        var a = $("#users").bootstrapTable('getSelections');
        var user = [];
        for (var i = 0; i < a.length; i++) {
           user[i] = a[i].id;
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/user/deleteById',
            data: {_method: "DELETE", "id": user[0]},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })


    })
    //写入父任务
    var role;
    var html2 = '';
    $.ajax({
        crossDomain: true,
        url: ipValue + "/role/findAll",
        dataType: "json",
        type: "GET",
        async: false,
        success: function (result) {
            role = result.data ;
            console.log(result)
        }
    });
    for (var i = 0; i < role.length; i++) {
        html2 += "<option value=" + role[i].id + ">" + role[i].description + "</option>"
    }
    $('#description').text("权限");
    $('#select').html(html2)
});
//设置岗位列
function roles(value, row) {
    var i;
    var str = "";
    for (i = 0; i < value.length; i++) {
        if (i != (value.length - 1)) {
            str += value[i].description + ","
        } else {
            str += value[i].description;
        }
    }
    return str;
}