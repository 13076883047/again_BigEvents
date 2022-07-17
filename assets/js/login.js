// 实现 登录-注册页面的切换
// 默认显示的是登录页面
$(function () {
    $('#link_reg').on('click', function () {
        $('#login-box').hide()
        $('#reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('#reg-box').hide()
        $('#login-box').show()
    })

    // 通过layui给表单添加验证规则
    const form = layui.form

    form.verify({
        // 定义密码的规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value) {
            // 通过value拿到 确认密码框的 内容
            // 通过ajax 拿到 密码框的 内容
            // 比较两次内容
            var pwd = $('#reg-form [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致,请再次输入!'
            }

            console.log('两次密码一致!')
        }
    })


    // 提交表单到后台
    const layer = layui.layer
    // 注册表单
    $('#reg-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            method: 'post',
            data: {
                username: $('#reg-form [name=username]').val(),
                password: $('#reg-form [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // 注册失败,返回失败原因
                    console.log(res.message)
                    return layer.msg(res.message)
                }
                // 注册成功
                layer.msg(res.message)
                // 模拟点击行为 跳到 登录页面
                $('#link_login').click()
            }
        })

    })

    // 登录表单
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg('登录成功，即将跳转页面!')

                // 将服务器返回的token存到本地
                localStorage.setItem('token', res.token)

                // 1秒后跳转到 index页面
                setTimeout(function () {
                    location.href = '/index.html'
                }, 1000)
            }
        })
    })
})