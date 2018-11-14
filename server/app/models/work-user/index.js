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

    let where = {}
  
    // if (InterviewTimer_Start && InterviewTimer_End) {
    //   let start = `${InterviewTimer_Start} 00:00:00`
    //   let end = `${InterviewTimer_End} 23:59:59`
    //   where = {
    //       'InterviewTimer': {
    //           $gte: start,
    //           $lte: end,
    //        }
    //    }
    // }
    // if (EntryTimer_Start && EntryTimer_End) {
    //     where.EntryTimer = { $between: [new Date(EntryTimer_Start), new Date(EntryTimer_End)] }
    // }

    // sequelize.query(`select * from word_user where InterviewTimer between '2018-10-10' and '2018-12-12'`, { type: Sequelize.QueryTypes.SELECT}).then(users => {
    //     console.log(users);
    // })
    // sequelize.query(`select count(*) as wx_mall FROM word_user where InterviewTimer between '2018-11-10' and '2018-11-12'`, { type: Sequelize.QueryTypes.SELECT}).then(users => {
    //     console.log(users);
    // })
    if (userName) {
        where.userName = userName
    }
    if (phone) {
        where.phone = phone
    }
    if (isThrough) {
        where.isThrough = isThrough
    }
    if (isJob) {
        where.isJob = isJob
    }
    if (isBecome) {
        where.isBecome = isBecome
    }
    if (jobPosition) {
        where.jobPosition = jobPosition
    }
    console.log(where)
    let data = await this._schema.findAndCountAll({
            where,
            order:  [['sort','DESC']],
            limit: size,
            offset: (pageIndex - 1) * size,
        });
  
        data.limit = rows;
        data.offset = index;
  
    return data;
  }
}

export default Model