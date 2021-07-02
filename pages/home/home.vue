<template>
	<view class="box_BottomOut">

		<u-top-tips ref="uTips"></u-top-tips>
		
		<u-subsection class='subsection' :list="list" :current="state" @change='GetSRClocks'  active-color="#ff9900" ></u-subsection>
		
		<view class="Kong"  @tap='Konginit()'>
			<view style="width:90%;float: left;">使用空工单打卡 </view>
			<u-icon  style="margin-top: 15px;" size='50' name="plus-circle"></u-icon>
		</view>
		
		<view class="card"  v-for='(item,index) in Data' :key='index'  @tap='ClickCard(item)'   >
			<view class="cardTop">
				<view class="Top_left24211886">{{item.CusFullName}}</view>
				<view class="Top_Right2435464">{{item.XCallID}}</view>
			</view>
			
			<view class="cardCon">
				<text><span style='width:100px;float: left;display: block;'>{{item.Contact}}</span>{{item.Phone}}</text>
				<br>
				<text><span style='width:100px;float: left;display: block;'>{{'SN:'+ item.SN}}</span></text>
				<br>
				<text>{{'Model:' + item.Model}}</text>
			</view>
			
			<view class="cardTop">
				<view class="Top_Right2435464 STR"  :style="{color:(item.StateStr != '未开启'? '#1e6fff' :'' )}">{{item.StateStr}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '全部'
					},
					{
						name: '未启动'
					},
					{
						name: '正在执行'
					},
					{
						name: '工单完成'
					}
				],
				state: 0,
				pageNum: 1,
				numPerPage: 10,
				Data: [],
				footStyle: {
					'text-align': 'right',
				},
				httpState:-1,

			};
		},
		onShow() {
			this.Data = []
			this.pageNum = 1
			this.ready()
		},
		onReachBottom() {
			console.log('00000000')
			this.pageNum += 1
			this.ready()
		},
		methods: {
			ready: function() {
				console.log(this.httpState)
				var obj = {
					url: 'SRClock/GetSRClocks',
					method: 'get',
					data: {
						pageNum: this.pageNum,
						numPerPage: this.numPerPage,
						orderField: '',
						orderDirection: '',
						search: '',
						state: this.httpState,
					},
				}

				this.$http(obj)
					.then((res) => {
						if (this.Data.length == 0) {
							this.Data = res.Data.Dtos
						} else {
							this.Data = this.Data.concat(res.Data.Dtos)
						}
					})
					.catch((res) => {})
			},
			// Tab切换
			GetSRClocks: function(index) {
				if (index == 0) {
					this.httpState = -1
				} else {
					this.httpState = index
				}
				this.pageNum = 1
				this.Data = []
				this.ready()

			},
			// 进入详细页
			ClickCard: function(item) {
				console.log(item)
				
				this.$store.state.SRCId = item.SRCId
				
				
				if(item.State == 4){
					uni.navigateTo({
						url: './orderDetails/OKorder'
					});
				}else if(item.State == 2  || item.State == 1 || item.State == 3){
					uni.navigateTo({
						url: '../ing/ing'
					});
				}else{
					uni.navigateTo({
						url: './orderDetails/orderDetails'
					});
				}
				
			},
			Konginit: function() {
				if(this.Data.length  == 0){
					uni.navigateTo({
						url: './orderDetails/KongbiaDingDan'
					});
					return false
				}
				
				var obj = {
					url: 'SRClock/GetSRClock',
					method: 'get',
					data: {
						srcid: this.Data[0].SRCId
					},
				}

				this.$http(obj)
					.then((res) => {
						this.HaveInProgress = res.Data.HaveInProgress
						if (this.HaveInProgress) {
							this.$refs.uTips.show({
								title: '当前已有正在执行的订单',
								type: 'warning',
								duration: '2300'
							})
						} else {
							uni.navigateTo({
								url: './orderDetails/KongbiaDingDan'
							});
						}
					})
					.catch((res) => {
						console.log(res)
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box_BottomOut {
		width: 100%;
		padding-top: 40px;
		background-color: #f6f6f6;

		.subsection {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 100;
		}
		
		.Kong{
			border: 0.2px solid #ccc;
			min-height: 50px;
			line-height: 50px;
			background-color: #FFFFFF;
			width: 95%;
			margin: 10px auto;
			padding-left: 20px;
			font-weight: bold;
			border-radius: 10px;
			overflow: hidden;
			-webkit-box-shadow: 9px 9px 6px #d9e7f1;
			-moz-box-shadow: 9px 9px 6px #d9e7f1;
			box-shadow: 3px 3px 6px #d9e7f1;
		}
		
		.card{
			border: 0.2px solid #ccc;
			min-height: 50px;
			background-color: #FFFFFF;
			width: 95%;
			margin: 10px auto;
			border-radius: 10px;
			overflow: hidden;
			-webkit-box-shadow: 9px 9px 6px #d9e7f1;
			-moz-box-shadow: 9px 9px 6px #d9e7f1;
			box-shadow: 3px 3px 6px #d9e7f1;
			.cardTop{
				width: 100%;
				height: 30px;
				line-height: 30px;
				font-size: 12px;
				font-weight: bold;
				.Top_left24211886{
					width: 80%;
					height: 100%;
					float: left;
					padding-left: 10px;
					box-sizing: border-box;
					overflow: hidden;/*超出部分隐藏*/
					white-space: nowrap;/*不换行*/
					text-overflow:ellipsis;/*超出部分文字以...显示*/
				}
				.Top_Right2435464{
					width: 20%;
					height: 100%;
					float: left;
				}
				.STR{
					width: 100%;
					text-align: right;
					padding-right: 10px;
				}
			}
			.cardCon{
				width: 100%;
				min-height: 60px;
				border-top: 0.2px solid #ccc;
				border-bottom: 0.2px solid #ccc;
				line-height: 30px;
				padding-left: 20px;
				box-sizing: border-box;
				font-size: 12px;
			}
		}
	}
</style>
