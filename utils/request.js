function request(url, service, method, params, header) {
  let pullUrl = url + service
  header = header || {}

  let accessToken = wx.getStorageSync('accessToken')
  if (accessToken) {
    header['Authorization'] = `Bearer ${accessToken}`
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: pullUrl,
      data: params || {},
      method: method || 'get',
      header: header,
      success: (res) => {
        if (res.statusCode == 200 && method == 'get') {
          resolve(res.data)
        }
        if (res.statusCode == 200 && method == 'post' || res.statusCode == 201 && method == 'post') {
          resolve(res.data)
        }
        if (res.statusCode == 200 && method == 'put' || res.statusCode == 201 && method == 'put') {
          resolve(res.data)
        }
        if (res.statusCode == 204 && method == 'delete') {
          resolve(res.data)
        }
        if (res.statusCode == 409 || 500) {
          reject(res.data)
        }
        if (res.statusCode == 401) {
          wx.showModal({
            content: '登录失效',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#14C978',
            success(res) {
              if (res.confirm) {
                console.log('登录逻辑')
              }
            }
          })
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const wxRequest = {
  get: (url, service, params) => {
    return request(url, service, 'get', params, {
      'content-type': 'application/x-www-form-urlencoded',
    })
  },
  post: (url, service, params) => {
    return request(url, service, 'post', params, {
      'content-type': 'application/json'
    })
  },
  put: (url, service, params) => {
    return request(url, service, 'put', params, {
      'content-type': 'application/json'
    })
  },
  delete: (url, service, params) => {
    return request(url, service, 'delete', params, {
      'content-type': 'application/json'
    })
  }
}

export default wxRequest