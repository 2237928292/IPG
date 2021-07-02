<template>
	<view class="box">
		<image class="logo" src="../../static/image/logo.png" mode=""></image>


		<u-field style='width: 80%;margin: auto;' v-model="User.UserName" label="手机号" placeholder="请填写手机号"
			:error-message="errorMessage">
		</u-field>
		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>

		<u-field style='width: 80%;margin: auto;' v-model="User.Password" label="验证码" placeholder="请填写验证码">
			<u-button size="mini" slot="right" type="success" @click="getCode">{{CodeState}}</u-button>
		</u-field>



		<!-- <view class="User">
			<image src="../../static/image/iphone.png" mode=""></image>
			<u-input class='input' v-model="User.UserName" :border="false" placeholder='请输入手机号或邮箱' />
		</view>

		<view class="User">
			<image src="../../static/image/padd.png" mode=""></image>
			<u-input class='input' v-model="User.Password" :border="false" type='password' placeholder='请输入密码' />
		</view> -->

		<u-button class='butDL' @tap='LoginIPGX()' type="primary">登录</u-button>


		<view class="BotmText">阿帕奇(北京)光纤激光技术有限公司</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				CodeState: '获取验证码',
				errorMessage: '',
				User: {
					UserName: '',
					Password: '',
					Login: true,
				}

			}
		},
		methods: {
			codeChange(text) {
				this.CodeState = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 判断手机号正确性
					var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
					if (!myreg.test(this.User.UserName)) {
						this.errorMessage = '手机号格式不正确'
						return false
					}
					// 手机号正确去除警告
					this.errorMessage = ''
					// 向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					var obj = {
						url: 'Common/SentVerificationCode',
						method: 'get',
						data: {
							mobile: this.User.UserName,
							type: 2,
						},
					}
					this.$uniwebno(obj)
						.then((res) => {
							console.log(res)
							// 等待六十秒刷新
							setTimeout(() => {
								uni.hideLoading();
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 1000);
						})
						.catch((res) => {
							console.log(res)
						})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			LoginIPGX: function() {
				var obj = {
					url: 'SRClock/LoginIPGX',
					method: 'post',
					data: this.User,
				}

				this.$uniwebno(obj)
					.then((res) => {
						console.log(res.Data)
						uni.setStorage({ //将token存储在本地
							key: 'Token',
							data: res.Data,
							success: function() {
								uni.switchTab({ //跳转至主页
									url: '/pages/home/home'
								})
							}
						});
					})
					.catch((res) => {
						console.log(res)
					})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		// background-color: #C0C0C0;
		padding-top: 100px;
		box-sizing: border-box;
		background-color: #ffffff;

		.logo {
			width: 220px;
			height: 60px;
			display: block;
			margin: 0 auto 50px;

		}

		.User {
			width: 80%;
			height: 40px;
			border-bottom: 1px solid #C0C0C0;
			margin: auto;

			image {
				width: 30px;
				height: 30px;
				display: block;
				margin-top: 5px;
				float: left;
			}

			.input {
				width: calc(100% - 40px);
				height: 80%;
				margin-top: 2px;
				float: left;
				padding-left: 50px;
				box-sizing: border-box;
			}

		}

		.butDL {
			width: 80%;
			margin-top: 80px;
		}

		.BotmText {
			position: fixed;
			bottom: 50px;
			left: 0;
			right: 0;
			margin: auto;
			text-align: center;
			font-size: 12px;
		}
	}
</style>
