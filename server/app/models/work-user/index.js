import Sequelize from 'sequelize'
import { createSchema, sequelize } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('word_user', {
  userName: Sequelize.STRING,
  phone: Sequelize.STRING, 
  isThrough: Sequelize.INTEGER,
  isJob: Sequelize.INTEGER,
  InterviewTimer: Sequelize.DATE,
  EntryTimer: Sequelize.DATE ,
  isBecome: Sequelize.INTEGER,
  jobPosition: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
  sort: Sequelize.INTEGER,
  salary: Sequelize.STRING, 
  Expect_salary: Sequelize.STRING,
  Remarks: Sequelize.TEXT
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }

  /**
   * 分页 getList
   * @param 
   * @return 
   */
  getList = async ctx => {
    let {
        index,
        rows,
        userName,
        phone,
        isThrough,
        isJob,
        isBecome,
        jobPosition,
        InterviewTimer_Start,
        InterviewTimer_End,
        EntryTimer_Start,
        EntryTimer_End
    } = ctx.query;

    let pageIndex = Math.floor(index) || 1;
    let size = Math.floor(rows) || 10;

    let sql = `select * from word_user`
    let count =`select count(*) as wx_mall FROM word_user`

    let where = []
    if (EntryTimer_Start && EntryTimer_End) {
        where.push(`EntryTimer between '${EntryTimer_Start}' and '${EntryTimer_End}'`)
    }
    if (InterviewTimer_Start && InterviewTimer_End) {
        where.push(`InterviewTimer between '${InterviewTimer_Start}' and '${InterviewTimer_End}'`)
    }
    if (userName) {
        where.push(`userName='${userName}'`)
    }
    if (phone) {
        where.push(`phone='${phone}'`)
    }
    if (isThrough) {
        where.push(`isThrough='${isThrough}'`)
    }
    if (isJob) {
        where.push(`isJob='${isJob}'`)
    }
    if (isBecome) {
        where.push(`isBecome='${isBecome}'`)
    }
    if (jobPosition) {
        where.push(`jobPosition='${jobPosition}'`)
    }
    let whereToStr = ''
    for(var i=0; i< where.length; i++) {
        if(where.length > 0 && i === 0){
            whereToStr = ` where`
        }
        if(i+1 === where.length) {
            whereToStr += ` ${where[i]} `
        } else {
            whereToStr += ` ${where[i]} and `
        }
    }
    
    // sequelize.query(`select * from word_user where InterviewTimer between '2018-10-10' and '2018-12-12'`, { type: Sequelize.QueryTypes.SELECT}).then(users => {
    //     console.log(users);
    // })
    // sequelize.query(`select count(*) as wx_mall FROM word_user where InterviewTimer between '2018-11-10' and '2018-11-12'`, { type: Sequelize.QueryTypes.SELECT}).then(users => {
    //     console.log(users);
    // })
    let resData = {}
    let data = await this.Query(sql + whereToStr + ` order by InterviewTimer desc limit ${size} offset ${(pageIndex - 1)*size}`)
    let counts = await this.Query(count+ whereToStr)
    // let data = await this._schema.findAndCountAll({
    //         where:{
    //             'InterviewTimer': {
    //                 $between: ['2018-11-01', '2018-11-15']
    //             }
    //         },
    //         order:  [['InterviewTimer','DESC']],
    //         limit: size,
    //         offset: (pageIndex - 1) * size,
    //     });
    resData.rows = data;
    resData.limit = rows;
    resData.offset = index;
    resData.count = counts[0].wx_mall;
  
    return resData;
  }
}

export default Model