<template>
	<view class="start-index">
		<view v-if="tabberPageLoadFlag[0]" :style="{display: currentIndex === 0 ? '' : 'none'}">
			<view class="custom-tabbar-page" enable-back-to-top>
				<Home ref="home"></Home>
			</view>
		</view>
		<view v-if="tabberPageLoadFlag[1]" :style="{display: currentIndex === 1 ? '' : 'none'}">
			<view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
				<Merits ref="merits" @uploadMerits="getMerits" :uploadStatus="uploadStatus"></Merits>
			</view>
		</view>
		<view v-if="tabberPageLoadFlag[2]" :style="{display: currentIndex === 2 ? '' : 'none'}">
			<view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
				<Mine ref="mine"></Mine>
			</view>
		</view>

		<tn-tabbar v-model="currentIndex" :list="tabbarList" activeColor="#838383" inactiveColor="#AAAAAA"
			activeIconColor="#3668FC" :animation="true" :safeAreaInsetBottom="true" @change="switchTabbar"
			:beforeSwitch="beforeSwitch" ></tn-tabbar>
	</view>
</template>

<script>
	import Home from './home/home.vue'
	// import TCircle from './circle/circle.vue'
	import Mine from './mine/mine.vue'
	import Merits from './merits/merits.vue'
	import Hashids from '../common/hashids.js'
	const baseUrl = "http://127.0.0.1:8081"

	export default {
		components: {
			Home,
			Merits,
			Mine,
		},
		data() {
			return {
				// 底部tabbar菜单数据
				tabbarList: [{
						title: '首页',
						activeIcon: 'home-smile-fill',
						inactiveIcon: 'home-smile'
					},
					{
						title: '功德',
						activeIcon: 'rocket',
						inactiveIcon: 'cube',
						activeIconColor: '#FFFFFF',
						inactiveIconColor: '#FFFFFF',
						iconSize: 50,
						out: true
					},
					{
						title: '我的',
						activeIcon: 'my-fill',
						inactiveIcon: 'my'
					}
				],
				// tabbar当前被选中的序号
				currentIndex: 0,
				// 自定义底栏对应页面的加载情况
				tabberPageLoadFlag: [],
				userid: "",
				isLogin: false,
				num: 0,
				uploadStatus: true,
				hashidsObj: null,
			}
		},
		watch: {
			currentIndex(value) {
				console.log(value)
			}
		},
		onLoad(options) {
			// console.log("onLoad")
			this.hashidsObj = new Hashids("ij1l5uogLPe7XBRXXZ3zdCSbFAi3MajG")
			const index = Number(options.index || 0)
			// 根据底部tabbar菜单列表设置对应页面的加载情况
			this.tabberPageLoadFlag = this.tabbarList.map((item, tabbar_index) => {
				return index === tabbar_index
			})
			console.log(this.tabberPageLoadFlag)
			this.switchTabbar(index)
			if (uni.getStorageSync("userID")) {
				this.isLogin = true
				this.userid = uni.getStorageSync("userID")
			}
		},
		methods: {
			// 切换导航
			beforeSwitch(index) {
				if (index != 0 && !this.isLogin) {
					uni.showToast({
						title: "需要登录",
					})
					this.autoLogin()
					return this.isLogin
				} else if (index != 1) {
					this.uploadMerits()
					return true
				}
				return true
			},
			switchTabbar(index) {
				console.log(1212, index, this.isLogin)
				if (index == 1) {
					this.uploadStatus = false
				}
				this._switchTabbarPage(index)
			},
			uploadMerits() {
				if (this.num == 0) {
					
				} else {
					var url = baseUrl + "/api/v1/merits"
					uni.request({
						url: url,
						method: "POST",
						data: {
							user_id: this.userid,
							m_type: 1,
							merits: this.hashidsObj.encode(this.num)
						},
						success: (res) => {
							console.log(res)
							if (res.data.code == 20000 ) {
								uni.showToast({
									title: "上报功德成功",
								})
								this.num = 0
								this.uploadStatus = true
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "error"
								})
							}
							
						},
						fail: (res) => {
							uni.showToast({
								title: res.errMsg,
								icon: "error"
							})
						}
					})	
				}
			},
			// 切换导航页面
			_switchTabbarPage(index) {
				const selectPageFlag = this.tabberPageLoadFlag[index]
				if (selectPageFlag === undefined) {
					return
				}
				if (selectPageFlag === false) {
					this.tabberPageLoadFlag[index] = true
				}
				this.currentIndex = index
			},
			getMerits(num) {
				this.num = num
			},
			// 登录，获取userid
			autoLogin() {
				uni.login({
					provider: 'weixin',
					success: (loginData) => {
						uni.request({
							url: baseUrl + "/api/v1/user/code2Session",
							method: 'POST',
							data: loginData,
							success: (res) => {
								if (res.statusCode === 200) {
									var data = res.data
									if (data.code == 20000) {
										var userid = data.data.user_id
										uni.setStorageSync("userID", userid)
										this.isLogin = true
										uni.showToast({
											title: "登录成功",
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
		}
	}
</script>

<style lang="scss" scoped>
</style>
