$(function () {
  // 点击'去注册账号' 跳往的界面
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击'去登录' 跳往的界面
  $('#lonk_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify()函数自定义效验规则
  form.verify({
    // 自定义一个叫 pwd 效验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 效验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1. 阻止表单的默认提交行为
    e.preventDefault()
    // 2. 发起ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(), 
      password: $('#form_reg [name=password]').val() 
    }
    $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg('注册成功');

      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'http://ajax.frontend.itheima.net/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status !== 0){
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // console.log(res.token);
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token',res.token)
        // 挑战到后台主页
        location.href = '/index.html'
      }
    })
  })
})