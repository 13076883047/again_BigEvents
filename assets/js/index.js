$(function () {
    var layer = layui.layer

    getUserinfo()

    // 实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出用户?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空token
            localStorage.removeItem('token')
            // 2. 跳转到 登录页面   
            location.href = '/login.html'

            layer.close(index);
        });
    })
})


// 1. 获取用户信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res)
            // 1.1 获取信息失败
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }

            // 1.2 获取信息成功,调用 renderAvatar渲染用户头像区域
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像区域
function renderAvatar(user) {
    // 渲染用户的名字
    // 1. 若有 nickname 优先使用，没有则使用 username
    var name = user.nickname || user.username
    console.log(name)
    // 2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3. 渲染用户的头像
    if (user.user_pic !== null) {
        // 如果用户有图片头像，则优先设置
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 用户没有图片图像，则设置为文字头像
        $('.layui-nav-img').hide()
        var textAvatar = user.username[0].toUpperCase()
        // console.log(textAvatar)
        $('.text-avatar').html(textAvatar).show()
    }
}