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
                </Row>

                <Row>
                    <Col span="8">
                      <FormItem label="手机号">
                        <Input v-model="formTop.phone" placeholder="请输入手机号"></Input>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="面试时间">
                        <div class="cl">
                            <div class="fl" style="width:46%">
                                <DatePicker v-model="formTop.InterviewTimer_Start" @on-change="changStartTimer" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                </DatePicker>
                            </div>
                            <span class="fl" style="text-align: center;width: 8%;color: #999;"> 一 </span>
                            <div class="fr" style="width:46%">
                                <DatePicker v-model="formTop.InterviewTimer_End" @on-change="changEndTimer" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                </DatePicker>
                            </div>
                        </div>
                      </FormItem>
                    </Col>
                    <Col span="8">
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
                    </Col>
                </Row>
                 <Row>
                   <Col span="8">
                      <FormItem label="职位">
                        <Select v-model="formTop.jobPosition" placeholder="职位">
                          <Option :value="'0'">web前端工程师</Option>
                          <Option :value="'1'">java工程师</Option>
                          <Option :value="'2'">测试工程师</Option>
                          <Option :value="'3'">产品经理</Option>
                          <Option :value="'4'">设计师</Option>
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
                    <Col span="8">
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

        <!--新增-->
        <Modal
            v-model="modal1"
            title="新增"
            width="800"
            @on-ok="ADDok"
            @on-cancel="ADDcancel">
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
                          <Option :value="'1'">是</Option>
                          <Option :value="'0'">否</Option>
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
                            <DatePicker v-model="addFrom.InterviewTimer" @on-change="changStartTimer" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                            </DatePicker>
                        </div>
                      </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="入职时间">
                          <div class="cl">
                                <DatePicker v-model="addFrom.EntryTimer" @on-change="changStartTimer" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" style="width: 100%">
                                </DatePicker>
                            </div>
                        </FormItem>
                    </Col>
                   <Col span="8">
                      <FormItem label="职位">
                        <Select v-model="addFrom.jobPosition" placeholder="职位">
                          <Option :value="'0'">web前端工程师</Option>
                          <Option :value="'1'">java工程师</Option>
                          <Option :value="'2'">测试工程师</Option>
                          <Option :value="'3'">产品经理</Option>
                          <Option :value="'4'">设计师</Option>
                        </Select>
                      </FormItem>
                    </Col> 
                    <Col span="8">
                      <FormItem label="是否转正">
                        <Select v-model="addFrom.isBecome" placeholder="是否转正">
                          <Option :value="'1'">是</Option>
                          <Option :value="'0'">否</Option>
                        </Select>
                      </FormItem>
                    </Col> 
                  </Row>
            </Form>
        </Modal>


        <!--详情-->
        <Modal
            v-model="modal2"
            title="详情"
            @on-ok="dataok"
            @on-cancel="cancel">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>

<script>
import { workUserAdd, workUserGetList } from '@/api/data.js'
export default {
  name: "lawperson",
  components: {},
  data() {
    return {
      loading: true,
      pageNum: 1, // 当前页面
      pageSize: 10, // 每页显示条数
      totals: "", // 总数
      data: [],
      formTop: {
        userName: null, // 姓名
        phone: null, // 手机号
        isThrough: null,// 面试是否通过
        isJob: null, // 是否在职
        InterviewTimer_Start: null, // 面试时间-开始
        InterviewTimer_End: null, // 面试结束-时间
        EntryTimer_Start: null, // 入职时间-开始时间
        EntryTimer_End: null , // 入职结束时间
        isBecome: null, // 是否转正
        jobPosition: null, // 工作职位
      },
      // 新增对象
      addFrom:{
          userName: null, // 姓名
          phone: null, // 手机号
          isThrough: null,// 面试是否通过
          isJob: null, // 是否在职
          InterviewTimer: null, // 面试时间
          EntryTimer: null, // 入职时间
          isBecome: null, // 是否转正
          jobPosition: null, // 工作职位
          salary: null, // 薪资
          Expect_salary: null, // 期望薪资
      },
      list: [], //修改
      columns1: [
         {
          title: "姓名",
          align: "left",
          key: "userName",
        },
         {
          title: "手机号",
          align: "left",
          key:'phone',
        },
        {
          title: "职位",
          align: "left",
          render: (h, params) => {
            if (params.row.jobPosition === 0) {
              return h("div", {}, "web前端工程师");
            } else if (params.row.jobPosition == 1) {
              return h("div", {}, "java工程师");
            }else if (params.row.jobPosition == 2){
              return h("div", {}, "测试工程师");
            }else if (params.row.jobPosition == 3) {
              return h("div", {}, "产品经理");
            }else if (params.row.jobPosition == 4){
              return h("div", {}, "设计师");
            }
          }
        },
        {
          title: "面试时间",
          align: "left",
          key: "InterviewTimer",
        },
         {
          title: "是否通过",
          align: "left",
          key: "isThrough",
          render: (h, params) => {
              if (params.row.isThrough === 0) {
                return h("div", {}, "面试不通过");
              } else {
                return h("div", {}, "通过");  
              }
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              // h('Icon',{
              //     attrs:{
              //         type:'ios-create-outline',
              //         style:'font-size:22px;cursor: pointer;'
              //     }
              // }),
              h("Icon", {
                attrs: {
                  type: "ios-eye-outline",
                  style: "font-size:26px;cursor: pointer; margin-left:8px"
                },
                on: {
                  click: () => {
                    this.detailModelOpen();
                    this.detailModelData = params.row;
                  }
                }
              })
            ]);
          }
        }
      ],
      detailModel: false,
      detailModelData: null,
      modal1: false,
      modal2: false,
    };
  },
  created() {
    // 初始化
    this.init();
  },
  mounted() {},
  computed: {
    formatData() {
      return this.detailModelData
        ? JSON.parse(this.detailModelData.data)
        : false;
    }
  },
  methods: {
    //重置
    resetBtn() {
      this.formTop =  {
        userName: null, // 姓名
        phone: null, // 手机号
        isThrough: null,// 面试是否通过
        isJob: null, // 是否在职
        InterviewTimer_Start: null, // 面试时间-开始
        InterviewTimer_End: null, // 面试结束-时间
        EntryTimer_Start: null, // 入职时间-开始时间
        EntryTimer_End: null , // 入职结束时间
        isBecome: null, // 是否转正
        jobPosition: null, // 工作职位
      }
    },
    // 获取分页
    getList() {
      let data = {
        index: this.pageNum,
        rows: this.pageSize,
        ...this.formTop
      };
      this.loading = true;
      workUserGetList(data).then(res => {
           let data = res.data;
           if(data.errno === '0'){
               this.list = data.data.rows;
               this.totals = data.data.count;
               this.pageNum = data.data.offset;
            }
           setTimeout( () => {
              this.loading = false;
           },500)
      })
    },
    // 初始化
    init() {
      this.getList();
    },
    // 分页切换
    getpage(ev) {
      this.pageNum = ev;
      this.getList();
    },
    getpagesize(ev) {
      this.pageSize = ev;
      this.getList();
    },
    sortChange() {},
    //  开始时间
    changStartTimer(ev) {
      this.$set(this.formTop, "startCreateTime", ev);
    },
    //  开始时间
    changEndTimer(ev) {
      this.$set(this.formTop, "endCreateTime", ev);
    },
    //查看
    detailModelOpen() {
      this.detailModel = true;
    },
    // 打开新增
    openModel1(){
        this.modal1=true;
    },
    // 新增确定
    ADDok(ev) {
        workUserAdd(this.addFrom).then( res => {
           this.init();
        })
    },
    // 新增关闭
    ADDcancel(ev){
    },
    detailSubmit() {},
    handleReset() {}
  }
};
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
</style>


