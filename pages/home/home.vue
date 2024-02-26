<template>
	<view class="bodybackground">
		<!-- TitleBar -->
		<view class="" v-if="current==0">
			<view :style="{paddingTop: vuex_custom_bar_height + 'px'}" @click="tn('')">
				<view class="tn-flex tn-flex-row-between tn-round tn-padding-xs tn-margin"
					style="border: 1rpx solid #D6D1F0;background: linear-gradient(-160deg, #F1F7FF, #DEE6FF, #F3F8FF, #D0DBFF);">
					<view class="justify-content-item tn-text-center tn-flex" style="padding: 25rpx 30rpx">
						<text class="tn-icon-pyramid tn-text-xl">赛博神庙</text>
					</view>
					<view class="justify-content-item tn-padding-top-xs">
						<view class="tn-text-bold">
							机械神降
						</view>
						<view class="tn-text-xs tn-color-gray--dark tn-padding-top-xs">
							加入光荣的进化！
						</view>
					</view>
					<view class="justify-content-item tn-text-right tn-margin-right tn-padding-top-lg">
						<!-- <text class="tn-icon-right tn-color-gray--dark"></text> -->
					</view>
				</view>
			</view>
		</view>

		<view class='tn-tabbar-height'>
			<view class='nav-list'>
				<block v-for="(item, item_index) in itemList" :key="item_index">
					<navigator open-type="navigate" hover-class='none' :url="'/pages/genPage/genPage' + '?id=' + item.id"
						class="nav-list-item tn-shadow-blur tn-cool-bg-image tn-flex tn-flex-col-center tn-flex-row-between"
						:class="item.color">
						<view class="nav-link tn-flex-1">
							<view class='title'>{{ item.name }}</view>
						</view>
						<view class="icon">
							<view class="tn-text-bold">{{ item.icon }}</view>
						</view>
					</navigator>
				</block>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TCircle',
		data() {
			return {
				itemList: [{
					id: 0,
					name: '赛博佛祖',
					url: '/pages/genPage/genPage',
					icon: "悟",
					color: "tn-main-gradient-purplered",
				}, {
					id: 1,
					name: '机械财神',
					url: 'https://tnuiimage.tnkjapp.com/simple/image3.jpg',
					icon: "财",
					color: "tn-main-gradient-yellow",
				}, {
					id: 2,
					name: '文曲星君',
					url: 'https://tnuiimage.tnkjapp.com/simple/image0.jpg',
					icon: "法",
					color: "tn-main-gradient-blue--reverse",
				}, {
					id: 3,
					name: '硬核月老',
					url: 'https://tnuiimage.tnkjapp.com/simple/banner2.jpg',
					icon: "侣",
					color: "tn-main-gradient-teal--single",
				}],
				current: 0,
			}
		},
		onLoad() {},
		onReady() {},
		methods: {
			// 跳转
		}
	}
</script>

<style lang="scss" scoped>
	/* 背景图 */
	.bodybackground {
		max-height: 100vh;
		padding-top: 0;
		background: url(https://img.zzs7.top/img/%E8%B5%9B%E5%8D%9A%E6%9C%8B%E5%85%8B%20%20%E7%A5%9E%E5%BA%99%20%20%E8%AE%BE%E8%AE%A1UI%20%20%E9%80%82%E9%85%8D%E6%89%8B%E6%9C%BA%E7%AB%AF.png);
		background-size: auto 100%;
		background-position: center center;
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 1130rpx;
		height: calc(96rpx + env(safe-area-inset-bottom) / 2);
		height: calc(96rpx + constant(safe-area-inset-bottom));
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
	}

	/* 组件导航列表 start*/
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 650rpx 14rpx 0rpx;
		justify-content: space-between;

		/* 列表元素 start */
		.nav-list-item {
			padding: 30rpx 30rpx 20rpx 30rpx;
			border-radius: 12rpx;
			width: 45%;
			margin: 0 18rpx 40rpx;
			background-size: cover;
			background-position: 50%;
			position: relative;
			z-index: 99;

			/* 元素标题 start */
			.nav-link {
				font-size: 32rpx;
				line-height: 1.2;
				text-transform: capitalize;
				padding: 0rpx 10rpx 0rpx 0;
				position: relative;

				.title {
					color: #FFFFFF;
					text-align: left;
				}
			}

			/* 元素标题 end */

			/* 元素图标 start */
			.icon {
				font-variant: small-caps;
				width: 70rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				justify-content: center;
				vertical-align: middle;
				font-size: 45rpx;
				color: #FFFFFF;
				white-space: nowrap;
				opacity: 0.9;
				background-color: rgba(0, 0, 0, 0.05);
				background-size: cover;
				background-position: 50%;
				border-radius: 5000rpx;
			}

			/* 元素图标 end */
		}

		/* 列表元素 end */
	}

	/* 组件导航列表 end*/
</style>
