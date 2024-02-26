<template>
	<view class="template-edit tn-safe-area-inset-bottom">

		<view class="tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top tn-margin">
				<view class="tn-flex justify-content-item">
					<view class="tn-bg-black tn-color-white tn-text-center"
						style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
						<text class="tn-icon-ninja" style="font-size: 30rpx;"></text>
					</view>
					<view class="tn-text-lg tn-padding-right-xs tn-text-bold">
						{{current.tags}}
						<text class="tn-color-purplered tn-padding-left-xs">*</text>
					</view>
				</view>
				<view class="justify-content-item tn-text-df tn-color-grey">
					<text class="tn-icon-keyboard-circle"></text>
				</view>
			</view>

			<view class="tn-margin tn-bg-gray--light tn-padding" style="border-radius: 10rpx;">
				<textarea maxlength="100" :placeholder="placeholder" placeholder-style="color:#AAAAAA" v-model="question"></textarea>
			</view>

			<view class="tn-padding-sm tn-text-center" shadow>
				<text class="tn-color-gray tn-padding-right-xs tn-padding-left-xs">
					请不要输入个人信息。
				</text>

			</view>
			<view class="tn-padding-sm tn-text-center" shadow>
				<text class="tn-color-gray tn-padding-right-xs tn-padding-left-xs">
					此外，如果有关于回答的的任何不准确之处
				</text>
			</view>
			<view class="tn-padding-sm tn-text-center" shadow>
				<text class="tn-color-gray tn-padding-right-xs tn-padding-left-xs">
					请宽容地接受
				</text>
			</view>
			
			<view class="tn-margin tn-bg-gray--light tn-padding" style="border-radius: 10rpx;" :style="{display: showResult ? '' : 'none'}">
				<textarea maxlength="100" :placeholder="result" placeholder-style="color:#000000"></textarea>
			</view>
			<!-- 按钮-->
			
			<view class="tn-flex tn-footerfixed">
				<view class="tn-flex-3 justify-content-item tn-margin-sm tn-text-center">
					<tn-button backgroundColor="#3668FC" padding="40rpx 0" width="60%" shadow fontBold @click="upload">
						<text class="tn-color-white">{{current.buttonName}}</text>
					</tn-button>
				</view>
				<view class="tn-flex-3 justify-content-item tn-margin-sm tn-text-center">
					<tn-button backgroundColor="#3668FC" padding="40rpx 0" width="60%" shadow fontBold @tap="goBack">
						<text class="tn-color-white">回到首页</text>
					</tn-button>
				</view>
			</view>

		</view>

		<view class='tn-tabbar-height'></view>

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	const baseUrl = "http://127.0.0.1:8081"
	export default {
		name: 'TemplateEdit',
		mixins: [template_page_mixin],
		data() {
			return {
				infoMap: {
					0: {
						name: "赛博佛祖",
						tags: "赛博佛祖会回答你的问题",
						tmpPlaceholders: [
							"到了人生低谷，却发现自己还有很大的下降空间",
							"为什么我这么穷",
							"我最近睡眠不好，经常做梦，醒来很累，应该如何改善？",
							"人活着到底是过程重要还是结果重要？",
							"负面情绪从哪里产生的",
							"我对未来感到迷茫 应该怎么办",
						],
						buttonName: "资询佛祖",
					},
					1: {
						name: "机械财神",
						tags: "机械财神能听到你的祈祷",
						tmpPlaceholders: [
							"我还想赚到100万啊",
							"我什么时候会发财呢？",
							"我能不能当一个富二代"
						],
						buttonName: "资讯财神",
					},
					2: {
						name: "文曲星号",
						tags: "希望你是为自己而努力",
						tmpPlaceholders: [
							"希望我儿子能考上大学",
							"希望我闺女考上市里最好的高中",
							"儿子不努力学习应该怎么办？"
						],
						buttonName: "咨询文曲星",
					},
					3: {
						name: "硬核月老",
						tags: "呦，让我听听你喜欢谁？",
						tmpPlaceholders: [
							"我和女朋友什么时候结婚",
							"婚姻给双方带来了什么",
							"结婚重要吗？",
						],
						buttonName: "咨询月老",
					},
				},
				current: {
					name: "赛博佛祖",
					tags: "赛博佛祖会回答你的问题",
					tmpPlaceholders: [
						"到了人生低谷，却发现自己还有很大的下降空间",
						"为什么我这么穷",
						"我最近睡眠不好，经常做梦，醒来很累，应该如何改善？",
						"人活着到底是过程重要还是结果重要？",
						"负面情绪从哪里产生的",
						"我对未来感到迷茫 应该怎么办",
					],
					buttonName: "资询佛祖",
				},
				placeholder: "说说心里话也行",
				result: "",
				showResult: false,
				question: "",
			}
		},
		onLoad(option) {
			console.log("option", option)
			this.current = this.infoMap[option.id]
			this.placeholder = this.randomPlaceholder(this.current.tmpPlaceholders)
		},
		methods: {
			randomPlaceholder(placeholders) {
				return placeholders[Math.floor(Math.random() * placeholders.length)]
			},
			upload() {
				if (this.question) {
					uni.request({
						
						url: baseUrl + "/api/v1/question",
						method: "POST",
						data: {
							question: this.question
						},
						success: (res) => {
							if (res.statusCode == 200) {
								if (res.data.code == 20000) {
									this.result = res.data.data.result
									this.showResult = true
								}
							} else {
								uni.showToast({
									title: res.data.detail,
									icon: "none"
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: "请输入你的问题",
						icon:'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.template-edit {}

	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 100rpx;
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(30rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

	}

	/* 底部悬浮按钮 end*/
</style>
