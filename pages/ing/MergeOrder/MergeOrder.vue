<template>
	<view class="box_4515451545">
		
		
		<view class="card"  v-for='(item,index) in Data' :key='index'   >
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
				<view class="Top_Right2435464 STR"  style="color:#1e6fff" @tap="show = true,Row = item"  >点击合并</view>
			</view>
		</view>
		<u-modal v-model="show" :show-cancel-button	='true' @confirm='AssNullSR()' content="是否将空订单合并此订单"></u-modal>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:1,
				numPerPage:10,
				Data:[],
				show:false,
				Row:{}
			};
		},
		onReachBottom() {
			console.log('00000000')
			this.pageNum += 1
			this.ready()
		},
		created() {
			this.ready()
		},
		methods:{
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
						state: 1,
					},
				}
			
				this.$http(obj)
					.then((res) => {
						if (this.Data.length == 0) {
							this.Data = res.Data.Dtos
						} else {
							this.Data = this.Data.concat(res.Data.Dtos)
						}
						console.log(this.Data)
					})
					.catch((res) => {})
			},
			// 合并
			AssNullSR:function(){
				console.log(this.Row)
				var obj = {
					url: 'SRClock/AssNullSR',
					method: 'post',
					data: {
						SRCId:this.$store.state.BDSoid,
						AssSRCId: this.Row.SRCId,
					},
				}
							
				this.$http(obj)
					.then((res) => {
						uni.switchTab({
							url:'../ing'
						})
					})
					.catch((res) => {})
				
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.box_4515451545{
	width: 100%;
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
