<script>
	export default {
		onLaunch: function() {
			var My = this
			uni.getStorage({
					key: 'Token',
					success: function(res) {
						console.log('获取身份ID成功:' + res.data);
						My.$store.state.userId = res.data
						console.log(res.data)
					},
					// 用户不存在 提示后返回登录页
					fail: function(res) {
						
					},
				});
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	html,
	body,
	uni-page-body,
	uni-page-refresh {
		width: 100%;
		height: 100%;
		background: #f6f6f6;
		font-size: 14px;
	}
	
	.box {
		width: 100%;
		height: 100%;
		background: #f6f6f6;
		overflow: auto;
		
	}
	/*每个页面公共css */
</style>
