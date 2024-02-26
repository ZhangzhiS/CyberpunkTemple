import instance from "request"
import ajax from '../uni_modules/u-ajax'
// 获取结果
export const loginWx = (params, config = {}) => {
	return instance.get({
		method: "GET",
		url: '/api/v1/user/code2Session',
		params: params,
		config,
	})
}

export const getTags = () => {
	return instance({
		method: "GET",
		url: "/api/v1/user/pyq-tags",
	})
}
