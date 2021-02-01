$(function () {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,    // layui弹出层的类型
            area: ['500px', '250px'],    // layui弹出层的尺寸
            title: '添加文章分类',        // layui弹出层的头部
            content: $('#dialog-add').html()      
        });
    })


    // 通过代理的形式，为form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                    
                }
                initArtCateList()
                layer.msg('新增分类成功！')

                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
})