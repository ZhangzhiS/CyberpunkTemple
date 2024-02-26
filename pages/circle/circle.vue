<template>
	<view class="content">
		<!-- 功德动画 -->
		<view style="height: 300rpx;" class=""></view>

		<view class="list">
			<view v-for="(item,index) of list" :key="index" class="list-item">
				{{item}}
			</view>
		</view>

		<!-- 敲击木鱼 -->
		<image @click="woodFishHandle" :class="status === 1?'wooden_fish_act':''" class="wooden_fish"
			src="@/static/img/muyu.png" mode="">
		</image>

		<!-- 功德计数 -->
		<view class="auto">
			<text style="color: white;text-align: center; font-size:21pt">本次功德：{{num}}</text>
		</view>

	</view>
</template>

<script>
	export default {
		name: "Merits",
		props: {
			num: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				audio: require("@/static/audio/muyu.mp3"),
				list: [],
				status: 0, //状态
				show: false,
				text: "功德 +1",
			}
		},
		// watch: {
		// 	show(value) {
		// 		if (value) {
		// 			console.log('组件显示')
		// 			// 处理显示的逻辑
		// 		} else {
		// 			console.log('组件隐藏')
		// 			// 处理隐藏的逻辑
		// 		}
		// 	}
		// },
		destroyed() {
			console.log("c destroyed")
		},
		mounted() {
			this.$watch('showChildComponent', (newValue, oldValue) => {
				if (newValue === true && oldValue === false) {
					console.log('组件显示')
					// 处理显示的生命周期
				} else if (newValue === false && oldValue === true) {
					console.log('组件隐藏')
					// 处理隐藏的生命周期
				}
			})
		},
		deactivated() {
			console.log("c deactivated")
		},
		unMounted() {
			console.log("c unmounted")
		},
		beforeDestroy() {
			this.$watch('showChildComponent', (newValue, oldValue) => {
				if (newValue === true && oldValue === false) {
					console.log('组件显示')
					// 处理显示的生命周期
				} else if (newValue === false && oldValue === true) {
					console.log('组件隐藏')
					// 处理隐藏的生命周期
				}
			})
		},
		onHide() {
			this.list = []
			this.num = 0
		},
		methods: {
			autoLogin() {
				uni.login({
					provider: 'weixin',
					success: (loginData) => {
						uni.request({
							url: "http://127.0.0.1:8081/api/v1/user/code2Session",
							method: 'POST',
							data: loginData,
							success: (res) => {
								if (res.statusCode === 200) {
									var data = res.data
									if (data.code == 20000) {
										var userid = data.data.user_id
										uni.setStorageSync("userID", userid)
										this.isLogin = true
										console.log(res)
										uni.showToast({
											title: "登录失败",
											icon: "error",
										})
									}
								}
							},
							fail: (res) => {
								console.log(res)
								uni.showToast({
									title: "登录失败",
									icon: "error",
								})
							}
						})
					},
				})
			},
			woodFishHandle() {
				// if (!this.isLogin) {
				// 	console.log("未登录状态，无法上传功德")
				// 	this.autologin()
				// } else {
				// 	this.list.push(this.text)
				// 	const innerAudioContext = uni.createInnerAudioContext();
				// 	innerAudioContext.autoplay = true;
				// 	innerAudioContext.src = this.audio;
				// 	innerAudioContext.onPlay(() => {
				// 		console.log('开始播放');
				// 	});
				// 	this.num++;
				// }
				this.list.push(this.text)
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.audio;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				this.num++;
			},
		}
	}
</script>

<style>
	/* 功德字符动画 */
	@keyframes text-animation {
		from {
			top: 0;
		}

		to {
			top: -300rpx;
			opacity: .0;
		}
	}

	/* 木鱼动画 */
	@keyframes fish-animation {
		from {
			transform: scale(1);
		}

		to {
			transform: scale(1.2);
		}
	}

	page {
		background-color: #202020;
	}

	.content {
		position: relative;
		height: 100vh;
	}

	/* 木鱼 start */
	.wooden_fish {
		width: 260rpx;
		height: 199rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -130rpx;
		margin-top: -99.5rpx;
	}

	.wooden_fish_act {
		animation: fish-animation linear .1s infinite alternate;
	}

	.wooden_fish:active {
		transform: scale(1.2);
	}

	/* 木鱼 end */

	/* 功德列表 start */
	.list {
		text-align: center;
		color: #fff;
		position: relative;
		display: flex;
		justify-content: center;

	}

	.list-item {
		position: absolute;
		animation: text-animation linear 1.5s forwards;
	}

	/* 功德列表 end */

	/* 功德计数 */
	.auto {
		position: fixed;
		bottom: 100rpx;
		width: 100%;
		padding-bottom: 200rpx;
		/* display: flex; */
		text-align: center;
	}
</style>
