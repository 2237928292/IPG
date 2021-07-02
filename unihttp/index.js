const http = (obj) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中'
		});

		console.log(obj)
		// 获取本地的用户ID 判断用户是否存在
		uni.getStorage({
			key: 'Token',
			// 用户存在 调用接口
			success: function(res) {
				console.log('获取身份ID成功:' + res.data);
				// 在请求内加入用户ID
				obj.data.userId = res.data
				// 发起请求
				uni.request({
					url: 'https://fast.ipgbeijing.com/actionapi/' + obj.url,
					method: obj.method,
					data: obj.data,
					// 请求成功 处理参数
					success: (res) => {
						console.log(obj.url +  '----------------------------------------------' )
						console.log(obj)
						console.log(res)
						if (JSON.parse(res.data).Code != 0) {
							uni.showToast({
								title: JSON.parse(res.data).Msg,
								icon: "none"
							})
							return false
						}
						resolve(JSON.parse(res.data))
					},
					// 请求失败 探索失败原因
					fail: (err) => {
						// 检查网络
						uni.getNetworkType({
							success: function(res) {
								console.log(res.networkType)
								// 判断网络状态
								if (res.networkType == 'none') {
									uni.showToast({
										title: '失去网络',
										icon: 'none',
										duration: 3000
									});
								} else {
									uni.showToast({
										title: '请求超时',
										icon: 'none',
										duration: 3000
									});
								}

							},
							// 获取网络信息失败
							fail: function(res) {
								uni.showToast({
									title: '请求超时',
									icon: 'none',
									duration: 3000
								});
							}
						});
						console.log('接口失败')
						reject(err)
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 100);
					}
				})
			},
			// 用户不存在 提示后返回登录页
			fail: function(res) {
				console.log('获取身份ID失败');

				uni.showToast({
					title: '身份过期，需要重新登录',
					icon: 'none',
					duration: 3000
				});

				setTimeout(function() {
					uni.hideLoading();
				}, 100);

				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
		});
	})
}

export default http
