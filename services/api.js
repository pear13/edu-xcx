const R = require('./req.js');

/**
const getElectTicket = (data) =>
  R(url, data, options) 
@参数：
    url：'/fuli/fuliDetail' 接口地址
    data：{}                请求参数
    options: {}             请求设置
    options={
      method:'POST'         请求方式，默认POST
      loading：false        是否显示加载提示，默认false
      loadingText： '加载中...' 加载提示内容，默认为： '加载中...'
      error：['请求失败',]    请求错误提示，对应接口文档中statusCode状态码，0为成功，
                            排除。其余按顺序写进error列表中,默认值为'请求失败'
      例：0-成功 1-手机号格式错误 2-注册失败
      error:['手机号格式错误','注册失败']
    }
 */


const router = {
      // 平台管理
      platform(data) {
        return R('/platform/', data, {
            error: [],
        })
    },  
    // 登陆
    Login(data) {
        return R('/login/', data, {
            error: ["登陆失败"],
        })
    },    
    // 登陆
    ready(data) {
        return R('/ready/', data, {
            error: ["登陆失败"],
        })
    },

    // 获取手机号
    Phone(data) {
        return R('/phone/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },

    //  获取分类，及banner
    Home(data) {
        return R('/home/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    //  获取分类，拼课页面
    Sort(data) {
        return R('/sort/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    //  获取课程列表
    SubList(data) {
        return R('/sub_list/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 获取课程详情
    SubDetail(data) {
        return R('/sub_detail/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    // 保存微信用户信息
    Land(data) {
        return R('/land/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },
    // 请求用户信息
    GetUser(data) {
        return R('/UserInfo/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    // 保存用户信息
    PostUser(data) {
        return R('/UserInfo/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },
    // 获取七牛云token（图片上传用））
    QnToken(data) {
        return R('/qiniu_token/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    // 请求行业列表
    Industry(data) {
        return R('/industry/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 请求会员卡
    Card(data) {
        return R('/card/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    // 获取支付参数
    Pay(data) {
        return R('/pay/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },

    // 改变订单状态
    PutOrder(data) {
        return R('/put_order/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },


    // 我的会员
    MyCard(data) {
        return R('/mycard/', data, {
            error: [],
            method: "GET"
        })
    },

    // 我的学习
    MyStudy(data) {
        return R('/my_study/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 学习搭档
    Partner(data) {
        return R('/partner/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    // 申请成为教师
    Apply(data) {
        return R('/apply/', data, {
            error: ["申请失败"],
            method: "POST"
        })
    },
    // 教师申请结果
    apply_record(data) {
        return R('/apply_record/', data, {
            error: ["申请失败"],
            method: "GET"
        })
    },
    // 上课时间设置
    SubTime(data) {
        return R('/sub_time/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 保存上课时间
    PostTime(data) {
        return R('/post_time/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },

    // 教师列表
    TchTime(data) {
        return R('/tch_time/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 查询下单前
    GetSubOrder(data) {
        return R('/suborder/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    // 课程下单
    PostSubOrder(data) {
        return R('/suborder/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },

    // 拼课列表
    Order(data) {
        return R('/order/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 拼课详情
    OrderDetail(data) {
        return R('/order_detail/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 立即组队
    AddTeam(data) {
        return R('/add_team/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 最近在学
    last_learn(data) {
        return R('/last_learn/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    
    // 最近在学
    drop(data) {
        return R('/drop/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },

    // 存formid
    formid(data){
        return R('/formid/', data, {
            error: [],
            method: "POST"
        })
    },
    // classin
    classin(data) {
        return R('/classin/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 投诉
    complain(data) {
        return R('/complain/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },

    // 确认上课
    classok(data) {
        return R('/classok/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    },
    // 拼课记录
    team_record(data) {
        return R('/team_record/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    // 报名记录
    sign_record(data){
        return R('/sign_record/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },

    // 用户列表
    user_list(data) {
        return R('/user_list/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 

    // 课时余额查询
    balance(data) {
        return R('/balance/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    // 检测是否满足拼课条件
    check(data) {
        return R('/check/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    // 发出邀请
    seed(data) {
        return R('/seed/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    // 评价
    comment(data) {
        return R('/comment/', data, {
            error: ["请求失败"],
            method: "POST"
        })
    }, 
    // 申请成为好友
    addfriend(data) {
        return R('/addfriend/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    // 用户关系绑定
    // 获取userid
    get_uid(data) {
        return R('/get_uid/', data, {
            error: [],
            method: "GET"
        })
    }, 
    // 绑定用户关系
    invite(data) {
        return R('/invite/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    // 领取礼包
    getgift(data) {
        return R('/getgift/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 

    // 教师课程列表
    tch_sub(data) {
        return R('/tch_sub/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 

    // 教师端申请提现
    tch_cashout(data) {
        return R('/tch_cashout/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    // 教师端申请提现
    beout(data) {
        return R('/beout/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    // 教师端提现列表
    cashout(data) {
        return R('/cashout/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    }, 
    //视频
    video(data) {
        return R('/video/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    //视频
    share(data) {
        return R('/share/', data, {
            error: ["请求失败"],
            method: "GET"
        })
    },
    //用户可提现金额
    user_money(data) {
        return R('/user_money/', data, {
            error: ["提现功能暂未开发，敬请谅解！"],
            method: "GET"
        })
    },

    //用户提现
    user_cashout(data) {
        return R('/user_cashout/', data, {
            error: ["提现功能暂未开发，敬请谅解！"],
            method: "POST"
        })
    },
        //用户提现
        mytch(data) {
            return R('/mytch/', data, {
                error: ["失败"],
                method: "GET"
            })
        },
    
}


module.exports = router;