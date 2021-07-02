<template>
	<view class="box">


		<!-- 工单信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				工单信息
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.FieldServiceRecordID)">
				<view class="Mini_list_left">
					工单号
				</view>
				<view class="Mini_list_right">
					{{Data.FieldServiceRecordID}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.XCallID)">
				<view class="Mini_list_left">
					报修号
				</view>
				<view class="Mini_list_right">
					{{Data.XCallID}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.FaultInfo)">
				<view class="Mini_list_left">
					报修内容
				</view>
				<view class="Mini_list_right">
					{{Data.FaultInfo || ' - - '  }}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.Diagnose)">
				<view class="Mini_list_left">
					诊断内容
				</view>
				<view class="Mini_list_right">
					{{Data.Diagnose || ' - - '  }}
				</view>
			</view>
		</view>

		<!-- 客户信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				客户信息
			</view>
			
			<view class="Mini_list"   @longtap="CopyText(Data.CusFullName)">
				<view class="Mini_list_left">
					客户名称
				</view>
				<view class="Mini_list_right">
					{{Data.CusFullName}}
				</view>
			</view>
			
			
			<view class="Mini_list"   @longtap="CopyText(Data.EndUserName)">
				<view class="Mini_list_left">
					最终客户
				</view>
				<view class="Mini_list_right">
					{{ Data.EndUserName || ' - - '	}}
				</view>
			</view>
			
			
			<view class="Mini_list"   @longtap="CopyText(Data.AuthorizedCus)">
				<view class="Mini_list_left">
					授权报修人
				</view>
				<view class="Mini_list_right">
					{{ Data.AuthorizedCus || ' - - '	}}
				</view>
			</view>
			
			<view class="Mini_list"   @longtap="CopyText(Data.Contact)">
				<view class="Mini_list_left">
					联系人
				</view>
				<view class="Mini_list_right">
					{{Data.Contact}}
				</view>
			</view>
			<view class="Mini_list"   @longtap="CopyText(Data.Phone)">
				<view class="Mini_list_left">
					电话
				</view>
				<view class="Mini_list_right">
					{{Data.Phone}}
				</view>
			</view>
			
			<view class="Mini_list"  @longtap="CopyText(Data.OEMEngineerName)">
				<view class="Mini_list_left">
					OEM工程师姓名
				</view>
				<view class="Mini_list_right">
					{{ Data.OEMEngineerName || ' - - '	}}
				</view>
			</view>
			
			<view class="Mini_list"   @longtap="CopyText(Data.OEMEngineerMobile)">
				<view class="Mini_list_left">
					OEM工程师电话
				</view>
				<view class="Mini_list_right">
					{{ Data.OEMEngineerMobile || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list"   @longtap="CopyText(Data.SentCusName)">
				<view class="Mini_list_left">
					发货客户
				</view>
				<view class="Mini_list_right">
					{{ Data.SentCusName || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list"   @longtap="CopyText(Data.SentCusAddress)">
				<view class="Mini_list_left">
					发货地址
				</view>
				<view class="Mini_list_right">
					{{ Data.SentCusAddress || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list" >
				<view class="Mini_list_left">
					发货相关
				</view>
				<view class="Mini_list_right">
					<text v-for="(item,index) in Data.Logistics"   @longtap="CopyText(item.Track_ref + ':' + item.Notes )"   >{{(index + 1)+ '. '  +   item.Track_ref + ':' + item.Notes }}<br> </text>
				</view>
			</view>
		</view>
		
		
		


		<!-- 设备信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				设备信息
			</view>

			<view class="Mini_list"    @longtap="CopyText(Data.Model)">
				<view class="Mini_list_left">
					型号
				</view>
				<view class="Mini_list_right">
					{{Data.Model}}
				</view>
			</view>

			<view class="Mini_list"  @longtap="CopyText(Data.SN)">
				<view class="Mini_list_left">
					序列号
				</view>
				<view class="Mini_list_right">
					{{Data.SN}}
				</view>
			</view>
		</view>




		<!-- 派工信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				派工信息
			</view>

			<view class="Mini_list"     @longtap="CopyText(Data.DispatchDt)">
				<view class="Mini_list_left">
					派工时间
				</view>
				<view class="Mini_list_right">

					{{(Data.DispatchDt || "").split('T')[0] }}
				</view>
			</view>

			<view class="Mini_list"     @longtap="CopyText(Data.ArriveDt)">
				<view class="Mini_list_left">
					计划到达时间
				</view>
				<view class="Mini_list_right">
					{{(Data.ArriveDt || "").split('T')[0] }}
				</view>
			</view>

			<view class="Mini_list"     @longtap="CopyText(Data.CompleteDt)">
				<view class="Mini_list_left">
					计划完成时间
				</view>
				<view class="Mini_list_right">
					{{(Data.CompleteDt || "").split('T')[0] }}
				</view>
			</view>

			<view class="Mini_list"     @longtap="CopyText(Data.WorkHour)">
				<view class="Mini_list_left">
					常规工作时间
				</view>
				<view class="Mini_list_right">
					{{Data.WorkHour}}
				</view>
			</view>
		</view>
		
		
		
		
		

		<view v-if='!this.Data.HaveInProgress' class="Customer">
			<view class="Customer_Top">
				创建工单
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					是否报销里程
				</view>
				<view class="Mini_list_right">

					<u-switch size='40' style='margin-top: 5px;float: left;' v-model="checked" active-color='#19be6b'
						inactive-color='#fa3534'></u-switch>
				</view>
			</view>
			<u-input v-if='!checked' v-model="numberPlate" type="text" :border="true"
				style='width: 90%;display: block;margin: auto;' placeholder='如使用公司车辆，请输入车牌号' />
		</view>



		<view v-if='!this.Data.HaveInProgress' class="map">
			<view class="mapManual">
				<text>{{automatic_manual == true ? '(自动定位)' : '(选择定位)' }} 当前位置：{{address}}</text>
				<image class="image" src="../../../static/image/maps.png" mode="" @tap="ClickMap()"></image>
			</view>
		</view>

		<u-button v-if='!this.Data.HaveInProgress' size='medium' style='margin: 20px auto;display: block;width: 80%;'
			type="primary" @tap='OpenWorkOrder()'>开启工单</u-button>

		<u-divider v-if='this.Data.HaveInProgress' style='margin-bottom: 50px;'>当前已有正在执行的订单</u-divider>


	</view>
</template>
<script>
	export default {
		name: 'one',
		data() {
			return {
				Data: {},

				checked: false,
				numberPlate: '', // 车牌号
				automatic_manual: true,
				address: '',
				Copy: '',
			}
		},

		created() {
			// 获取地理位置
			this.getLocation()
			// init
			this.init()
		},
		methods: {
			CopyText: function(Data) {
				uni.setClipboardData({
					data: Data, //要被复制的内容
					success: (res) => { //复制成功的回调函数
						console.log(res)
						uni.showToast({ //提示
							title: '复制成功',
							icon:'none',
						})
					}
				});
			},
			init: function() {
				var obj = {
					url: 'SRClock/GetSRClock',
					method: 'get',
					data: {
						srcid: this.$store.state.SRCId
					},
				}

				this.$http(obj)
					.then((res) => {
						console.log(res.Data)
						this.Data = res.Data
					})
					.catch((res) => {
						console.log(res)
					})
			},

			// 打开地图选择位置
			ClickMap: function() {
				var My = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						My.address = res.address
						My.automatic_manual = false
						My.ZuoBiao =  res.latitude  + ',' +  res.longitude
					}
				});
			},

			// 获取地理位置
			getLocation: function() {
				var My = this
				uni.getLocation({
					type: 'wgs84',
					altitude: true,
					geocode: true,
					success: function(res) {
						var IP = res.address
						if (IP.province == IP.city) {
							IP.city = ''
						}
						My.address = IP.province + IP.city + IP.district + IP.street + IP.streetNum + IP
							.poiName
						My.automatic_manual = true
						My.ZuoBiao = res.latitude + ',' + res.longitude
						console.log(My.ZuoBiao)
					}
				});
			},
			OpenWorkOrder: function() {



				if (this.checked) {
					this.numberPlate = ''
				}
				var obj = {
					url: 'SRClock/OpenSRClock',
					method: 'post',
					data: {
						SRCId: this.$store.state.SRCId, // 如果是空工单则传空
						IPGPersonnelId: this.$store.state.userId, //当前登录人Id
						Reimbursement: this.checked, // 是否报销
						TicketNumber: this.numberPlate, // 车牌号 报销里程时传空
						Address: this.address, //地址
						Coordinate: this.ZuoBiao, //坐标
						Drag: !this.automatic_manual, //是否拖动了地图位置
					},
				}

				this.$http(obj)
					.then((res) => {
						uni.navigateTo({
							url: '/pages/ing/ing'
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
		width: 100%;
		height: 100%;
		font-size: 14px;
		box-sizing: border-box;

		// 搬运客户APP详情页
		.Customer {
			width: 100%;
			min-height: 50px;
			background-color: #FFFFFF;
			margin-top: 10px;
			margin-bottom: 10px;

			.Customer_Top {
				width: 100%;
				height: 40px;
				border-bottom: 1px solid #c3c3c3;
				line-height: 40px;
				padding-left: 20px;
				font-weight: bold;
				box-sizing: border-box;
			}

			.Mini_list {
				width: 100%;
				min-height: 30px;
				line-height: 30px;
				// padding-left: 25%;
				box-sizing: border-box;
				position: relative;

				.Mini_list_left {
					width: 30%;
					height: 100%;
					font-weight: bold;
					font-size: 12px;
					color: #555555;
					position: absolute;
					top: 0;
					left: 20px;
				}

				.Mini_list_right {
					width: 70%;
					min-height: 100%;
					color: #808080;
					padding-right: 20px;
					box-sizing: border-box;
					font-size: 12px;
					margin-left: 30%;
					word-wrap: break-word;
					word-break: break-all;
				}
			}
		}


		.map {
			width: 100%;
			min-height: 100px;
			background-color: #FFFFFF;
			padding: 10px;
			box-sizing: border-box;

			.mapManual {
				width: 100%;
				min-height: 80px;
				border-radius: 10px;
				border: 0.1px solid #808080;
				-webkit-box-shadow: 9px 9px 6px #d9e7f1;
				-moz-box-shadow: 9px 9px 6px #d9e7f1;
				box-shadow: 3px 3px 6px #d9e7f1;
				position: relative;
				padding-left: 10px;
				padding-right: 100px;
				line-height: 25px;
				margin-bottom: 30px;

				.image {
					position: absolute;
					width: 80px;
					height: 80px;
					right: 10px;
					top: 0;
				}
			}

			.div {
				width: 100%;
				min-height: 30px;
				padding-left: 2px;
				margin-top: 10px;
				line-height: 30px;
				font-size: 13px;
			}
		}
	}
</style>
