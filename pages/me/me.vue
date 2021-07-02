<template>
	<view class="box">
		
		
		<u-cell-group>
				<u-cell-item  icon="setting-fill" title="系统设置" :arrow='false' ></u-cell-item>
		</u-cell-group>
		
		<u-button  class='but' type="error" @tap='TClogin()'>退出登录</u-button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			TClogin:function(){
				uni.navigateTo({
					url:"../login/login"
				})	
			}
		}
	}
</script>

<style lang="scss">
.box{
	position: relative;
	.but{
		width: 80%;
		position: fixed;
		bottom: 50px;
		right: 0;
		left: 0;
		margin: auto;
	}
}
</style>
