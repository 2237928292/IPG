const http = (obj) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中'
		});

		
		// 获取本地的用户ID 判断用户是否存在
		// 发起请求
		uni.request({
			url: 'https://fast.ipgbeijing.com/actionapi/' + obj.url,
			method: obj.method,
			data: obj.data,
			// 请求成功 处理参数
			success: (res) => {
				console.log(obj.url)
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
	})
}

export default http
