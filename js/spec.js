$(document).ready(function () {
    var specs;

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
        },  {
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
    //发送删除数据
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


    });
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
    //(子任务)获取并发送添加表单
    $('#add_btn').click(function () {
        var formData = new FormData();
        var title = $('input[name="title"]').val();
        var genusNameCh = $("#select option:selected").val();

        formData.append("title", title);
        formData.append("genusNameCh", genusNameCh);
        //将文件数组添加进来
        var multipartFiles = myDropzone.files;
        for (var i = 0; i < multipartFiles.length; i++) {
            formData.append("multipartFiles", myDropzone.files[i]);
        }

        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: ipValue + '/subTask/save',
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                window.location.reload();
            }
        });


    });




});

