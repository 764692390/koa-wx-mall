<template>
    <div class="ivu-card">
        <div class="top">
            <Form :model="formTop" ref="formTop" label-position="top">
                 <Row>
                    <Col span="8">
                      <FormItem label="姓名">
                        <Input v-model="formTop.userName" placeholder="请输入姓名"></Input>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="手机号">
                        <Input v-model="formTop.phone" placeholder="请输入手机号"></Input>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="是否面试通过">
                        <Select v-model="formTop.isThrough" placeholder="是否面试通过">
                          <Option :value="'1'">是</Option>
                          <Option :value="'0'">否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="是否在职">
                        <Select v-model="formTop.isJob" placeholder="是否在职">
                          <Option :value="1">在职</Option>
                          <Option :value="0">离职</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="面试时间">
                        <div class="cl">
                            <div class="fl" style="width:46%">
                                <DatePicker v-model="formTop.InterviewTimer_Start" @on-change="InterviewTimerStart" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                </DatePicker>
                            </div>
                            <span class="fl" style="text-align: center;width: 8%;color: #999;"> 一 </span>
                            <div class="fr" style="width:46%">
                                <DatePicker v-model="formTop.InterviewTimer_End" @on-change="InterviewTimerEnd" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                </DatePicker>
                            </div>
                        </div>
                      </FormItem>
                    </Col>
                    <!-- <Col span="8">
                        <FormItem label="入职时间">
                          <div class="cl">
                                <div class="fl" style="width:46%">
                                    <DatePicker v-model="formTop.EntryTimer_Start" @on-change="changStartTimer" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                    </DatePicker>
                                </div>
                                <span class="fl" style="text-align: center;width: 8%;color: #999;"> 一 </span>
                                <div class="fr" style="width:46%">
                                    <DatePicker v-model="formTop.EntryTimer_End" @on-change="changEndTimer" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                    </DatePicker>
                                </div>
                            </div>
                        </FormItem>
                    </Col> -->
                   <Col span="8">
                      <FormItem label="职位">
                        <Select v-model="formTop.jobPosition" placeholder="职位">
                          <Option :value="'0'">web前端工程师</Option>
                          <Option :value="'1'">java工程师</Option>
                          <Option :value="'2'">测试工程师</Option>
                          <Option :value="'3'">产品经理</Option>
                          <Option :value="'4'">设计师</Option>
                          <Option :value="'5'">西安web前端工程师</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="是否转正">
                        <Select v-model="formTop.isBecome" placeholder="是否转正">
                          <Option :value="'1'">是</Option>
                          <Option :value="'0'">否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8"  style="float: right;">
                        <FormItem label="" style="text-align: right; margin-top:23px;" >
                            <Button type="primary" @click="openModel1">新增人员</Button>
                            <Button class="mar-l-10"  type="primary" @click="getList">查询</Button>
                            <Button class="mar-l-10" type="default" @click="resetBtn">重置</Button>
                        </FormItem>
                    </Col>
                  </Row>
            </Form>
        </div>

        <div class="bottom">
            <div class="fulal">
                <div>
                    <Table :loading="loading" ref="selection" :columns="columns1" :data="list" @on-sort-change="sortChange"></Table>
                </div>
                <div class="page">
                    <Page :total="Math.floor(totals)" :current="Math.floor(pageNum)" :page-size="Math.floor(pageSize)" show-elevator show-sizer class="pageCou" @on-change="getpage" @on-page-size-change="getpagesize" />
                </div>
            </div>
        </div>

        <!--新增 和 修改-->
        <Modal
            v-model="modal1"
            className="vertical-center-model"
            :title="TitleText"
            :mask-closable="false"
            width="800">
            <Form :model="addFrom" ref="addFrom" label-position="top" style="padding-left: 3%; padding-top: 1%;">
                 <Row>
                    <Col span="8">
                      <FormItem label="姓名">
                        <Input v-model="addFrom.userName" placeholder="请输入姓名"></Input>
                      </FormItem>

                    </Col>
                    <Col span="8">
                      <FormItem label="是否面试通过">
                        <Select v-model="addFrom.isThrough" placeholder="是否面试通过">
                          <Option :value="1">是</Option>
                          <Option :value="0">否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="是否在职">
                        <Select v-model="addFrom.isJob" placeholder="是否在职">
                          <Option :value="1">在职</Option>
                          <Option :value="0">离职</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="手机号">
                        <Input v-model="addFrom.phone" placeholder="请输入手机号"></Input>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="期望薪资">
                        <Input v-model="addFrom.Expect_salary" placeholder="期望薪资"></Input>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="薪资">
                        <Input v-model="addFrom.salary" placeholder="薪资"></Input>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="面试时间">
                        <div class="cl">
                            <DatePicker v-model="addFrom.InterviewTimer" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                            </DatePicker>
                        </div>
                      </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="入职时间">
                          <div class="cl">
                                <DatePicker v-model="addFrom.EntryTimer"  format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                </DatePicker>
                            </div>
                        </FormItem>
                    </Col>
                   <Col span="8">
                      <FormItem label="职位">
                        <Select v-model="addFrom.jobPosition" placeholder="职位">
                          <Option :value="0">web前端工程师</Option>
                          <Option :value="1">java工程师</Option>
                          <Option :value="2">测试工程师</Option>
                          <Option :value="3">产品经理</Option>
                          <Option :value="4">设计师</Option>
                          <Option :value="5">西安web前端工程师</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="是否转正">
                        <Select v-model="addFrom.isBecome" placeholder="是否转正">
                          <Option :value="1">是</Option>
                          <Option :value="0">否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="24">
                      <FormItem label="备注">
                        <Input v-model="addFrom.Remarks" type="textarea" :rows="3" placeholder="请输入备注"></Input>
                      </FormItem>
                    </Col>
                  </Row>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="ADDcancel">取消</Button>
                <Button type="primary" size="large" @click="ADDok">确定</Button>
            </div>
        </Modal>

        <!--详情-->
        <Modal
            v-model="modal2"
            title="详情"
            width="800"
            :mask-closable="false"
            >
            <Row v-if="modal2" class="datail-box">
                    <Col span="8">
                        <i>姓名：</i>
                        <span>{{detailModelData.userName}}</span>
                    </Col>
                    <Col span="8">
                        <i>是否面试通过：</i>
                        <span>{{detailModelData.isThrough == 1 ? '是' : '否' }}</span>
                    </Col>
                    <Col span="8">
                        <i>是否在职：</i>
                        <span>{{detailModelData.isJob == 1 ? '在职' : '否' }}</span>
                    </Col>
                    <Col span="8">
                        <i>手机号：</i>
                        <span>{{detailModelData.phone}}</span>
                    </Col>
                    <Col span="8">
                        <i>期望薪资：</i>
                        <span>{{detailModelData.Expect_salary}}</span>
                    </Col>
                    <Col span="8">
                        <i>薪资：</i>
                        <span>{{detailModelData.salary}}</span>
                    </Col>
                    <Col span="8">
                        <i>面试时间：</i>
                        <span>{{getDateToHtml(detailModelData.InterviewTimer).split(' ')[0]}}</span>
                    </Col>
                    <Col span="8">
                        <i>入职时间：</i>
                        <span>{{getDateToHtml(detailModelData.EntryTimer).split(' ')[0]}}</span>
                    </Col>
                   <Col span="8">
                        <i>职位：</i>
                        <span>
                            {{
                                detailModelData.jobPosition == 0 ?
                                    'web前端工程师'
                                : detailModelData.jobPosition == 1 ?
                                    'java工程师'
                                : detailModelData.jobPosition == 2 ?
                                    '测试工程师'
                                : detailModelData.jobPosition == 3 ?
                                    '产品经理'
                                : detailModelData.jobPosition == 4 ?
                                    '设计师' : '西安web前端工程师'
                             }}
                        </span>
                    </Col>
                    <Col span="8">
                        <i>是否转正：</i>
                        <span>{{detailModelData.isBecome == 1 ? '是' : '否'}}</span>
                    </Col>
                    <Col span="24">
                        <i>备注：</i>
                        <span>{{detailModelData.Remarks}}</span>
                    </Col>
                  </Row>
        </Modal>
    </div>
</template>

<script>
import { workUserAdd, workUserGetList, workUserUpdata } from '@/api/data.js'
import { getDateToHtml } from '@/libs/tools.js'
export default {
  name: 'lawperson',
  components: {},
  data () {
    return {
      getDateToHtml,
      TitleText: '新增',
      loading: true,
      pageNum: 1, // 当前页面
      pageSize: 10, // 每页显示条数
      totals: '', // 总数
      data: [],
      formTop: {
        userName: null, // 姓名
        phone: null, // 手机号
        isThrough: null, // 面试是否通过
        isJob: null, // 是否在职
        InterviewTimer_Start: null, // 面试时间-开始
        InterviewTimer_End: null, // 面试结束-时间
        EntryTimer_Start: null, // 入职时间-开始时间
        EntryTimer_End: null, // 入职结束时间
        isBecome: null, // 是否转正
        jobPosition: null // 工作职位
      },
      // 新增对象
      addFrom: {
        userName: null, // 姓名
        phone: null, // 手机号
        isThrough: null, // 面试是否通过
        isJob: null, // 是否在职
        InterviewTimer: null, // 面试时间
        EntryTimer: null, // 入职时间
        isBecome: null, // 是否转正
        jobPosition: null, // 工作职位
        salary: null, // 薪资
        Expect_salary: null, // 期望薪资
        Remarks: null // 备注
      },
      list: [], // 修改
      columns1: [
        {
          title: '姓名',
          align: 'center',
          key: 'userName'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '职位',
          align: 'center',
          render: (h, params) => {
            if (params.row.jobPosition === 0) {
              return h('div', {}, 'web前端工程师')
            } else if (params.row.jobPosition === 1) {
              return h('div', {}, 'java工程师')
            } else if (params.row.jobPosition === 2) {
              return h('div', {}, '测试工程师')
            } else if (params.row.jobPosition === 3) {
              return h('div', {}, '产品经理')
            } else if (params.row.jobPosition === 4) {
              return h('div', {}, '设计师')
            } else if (params.row.jobPosition === 5) {
              return h('div', {}, '西安web前端工程师')
            }
          }
        },
        {
          title: '面试时间',
          align: 'center',
          key: 'InterviewTimer',
          render: (h, params) => {
            return h('div', {}, getDateToHtml(params.row.InterviewTimer).split(' ')[0])
          }
        },
        {
          title: '是否通过',
          align: 'center',
          key: 'isThrough',
          render: (h, params) => {
            if (params.row.isThrough === 0) {
              return h('Tag', {props: {color: 'warning'}}, '面试不通过')
            } else {
              return h('Tag', {props: {color: 'success'}}, '通过')
            }
          }
        },
        {
          //
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                attrs: {
                  type: 'ios-eye-outline',
                  style: 'font-size:26px;cursor: pointer; margin-left:8px;margin-top: 4px;'
                },
                on: {
                  click: () => {
                    this.modal2 = true
                    this.detailModelData = {
                      ...params.row
                    }
                  }
                }
              }),
              h('Icon', {
                attrs: {
                  type: 'ios-create-outline',
                  style: 'font-size:22px;cursor: pointer; margin-left:8px'
                },
                on: {
                  click: () => {
                    this.TitleText = '编辑'
                    let {
                      id,
                      userName, // 姓名
                      phone, // 手机号
                      isThrough, // 面试是否通过
                      isJob, // 是否在职
                      InterviewTimer, // 面试时间
                      EntryTimer, // 入职时间
                      isBecome, // 是否转正
                      jobPosition, // 工作职位
                      salary, // 薪资
                      Expect_salary, // 期望薪资
                      Remarks // 备注
                    } = params.row

                    this.addFrom = {
                      id,
                      userName, // 姓名
                      phone, // 手机号
                      isThrough, // 面试是否通过
                      isJob, // 是否在职
                      InterviewTimer, // 面试时间
                      EntryTimer, // 入职时间
                      isBecome, // 是否转正
                      jobPosition, // 工作职位
                      salary, // 薪资
                      Expect_salary, // 期望薪资
                      Remarks // 备注
                    }

                    this.modal1 = true
                  }
                }
              })
            ])
          }
        }
      ],
      detailModel: false,
      detailModelData: null,
      modal1: false,
      modal2: false
    }
  },
  created () {
    // 初始化
    this.init()
  },
  mounted () {},
  computed: {

  },
  methods: {
    // 重置
    resetBtn () {
      this.formTop = {
        userName: null, // 姓名
        phone: null, // 手机号
        isThrough: null, // 面试是否通过
        isJob: null, // 是否在职
        InterviewTimer_Start: null, // 面试时间-开始
        InterviewTimer_End: null, // 面试结束-时间
        EntryTimer_Start: null, // 入职时间-开始时间
        EntryTimer_End: null, // 入职结束时间
        isBecome: null, // 是否转正
        jobPosition: null // 工作职位
      }
      this.pageNum = 1
    },
    // 获取分页
    getList () {
      let data = {
        index: this.pageNum,
        rows: this.pageSize,
        ...this.formTop
      }
      this.loading = true
      workUserGetList(data).then(res => {
        let data = res.data
        if (data.errno === '0') {
          this.list = data.data.rows
          this.totals = data.data.count
          this.pageNum = data.data.offset
        }
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    // 初始化
    init () {
      this.getList()
    },
    // 分页切换
    getpage (ev) {
      this.pageNum = ev
      this.getList()
    },
    getpagesize (ev) {
      this.pageSize = ev
      this.getList()
    },
    sortChange () {},
    //  开始时间
    InterviewTimerStart (ev) {
      this.$set(this.formTop, 'InterviewTimer_Start', ev)
    },
    //  结束时间
    InterviewTimerEnd (ev) {
      this.$set(this.formTop, 'InterviewTimer_End', ev)
    },
    // 查看
    detailModelOpen () {
      this.detailModel = true
    },
    // 打开新增
    openModel1 () {
      this.TitleText = '新增'
      this.addFrom = {
        userName: null, // 姓名
        phone: null, // 手机号
        isThrough: null, // 面试是否通过
        isJob: null, // 是否在职
        InterviewTimer: null, // 面试时间
        EntryTimer: null, // 入职时间
        isBecome: null, // 是否转正
        jobPosition: null, // 工作职位
        salary: null, // 薪资
        Expect_salary: null, // 期望薪资
        Remarks: null // 备注
      }
      this.modal1 = true
    },
    // 新增确定
    ADDok (ev) {
      if (this.addFrom.id) {
        workUserUpdata(this.addFrom).then(res => {
          if (res.data.errno === '0') {
            this.init()
            this.modal1 = false
          } else {
            this.$Message.warning('更新失败！')
          }
        })
      } else {
        workUserAdd(this.addFrom).then(res => {
          if (res.data.errno === '0') {
            this.init()
            this.modal1 = false
          } else {
            this.$Message.warning('添加成功！')
          }
        })
      }
    },
    // 新增关闭
    ADDcancel (ev) {
      this.modal1 = false
      this.formTop = {
        userName: null, // 姓名
        phone: null, // 手机号
        isThrough: null, // 面试是否通过
        isJob: null, // 是否在职
        InterviewTimer_Start: null, // 面试时间-开始
        InterviewTimer_End: null, // 面试结束-时间
        EntryTimer_Start: null, // 入职时间-开始时间
        EntryTimer_End: null, // 入职结束时间
        isBecome: null, // 是否转正
        jobPosition: null // 工作职位
      }
    },
    detailSubmit () {},
    handleReset () {}
  }
}
</script>
<style scoped lang='less'>
.ivu-card {
  border: 1px solid #e8eaec;
  padding: 16px;
  box-sizing: border-box;
  min-height: 100%;
}

.top {
  width: 100%;
}

.ivu-form-item {
  display: inline-block;
  width: 90%;
}

.page {
  margin-top: 16px;
}

.mar-l-10{
  margin-left: 10px;
}

.datail-box .ivu-col{
     margin-bottom: 20px;
}
.datail-box .ivu-col i{
    color: rgba(0,0,0,0.45);
}
.datail-box .ivu-col span{
    padding-left: 6px;
}
</style>
