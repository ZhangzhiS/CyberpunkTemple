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
		<image @click="handle" :class="status === 1?'wooden_fish_act':''" class="wooden_fish"
			src="@/static/img/muyu.png" mode="">
		</image>

		<!-- 功德计数 -->
		<view class="auto">
			<text style="color: white;text-align: center; font-size:21pt">本次功德：{{num}}</text>
		</view>

	</view>
</template>

<script>
	import _ from '../../common/lodash.js'
	export default {
		name: "Merits",
		props: {
			uploadStatus: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				audio: require("@/static/audio/muyu.mp3"),
				list: [],
				status: 0, //状态
				show: false,
				text: "功德 +1",
				num: 0,
			}
		},
		watch: {
			uploadStatus(value) {
				console.log("父组件的status", value)
				if (value){
					this.num = 0
					this.list = []
				}
			}
		},
		methods: {
			handle: _.throttle(function(){
				this.woodFishHandle()
			}, 1000),
			
			woodFishHandle() {
				this.list.push(this.text)
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.audio;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				this.num++
				this.uploadMerits(this.num)
			},
			uploadMerits() {
				this.$emit("uploadMerits", this.num)
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

/* 	content {
		background-color: #202020;
	} */

	.content {
		position: relative;
		height: 100vh;
		background-color: #202020;
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
