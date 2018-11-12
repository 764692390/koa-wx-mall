import Sequelize from 'sequelize'
import { createSchema } from '../../db'
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
      console.log(ctx.query)
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

    let where = { 

    }
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

    if (InterviewTimer_Start && InterviewTimer_End) {
      where.createdAt = { $between: [new Date(+InterviewTimer_Start), new Date(+InterviewTimer_End)] }
    }
    if (EntryTimer_Start && EntryTimer_End) {
        where.createdAt = { $between: [new Date(+EntryTimer_Start), new Date(+EntryTimer_End)] }
    }
  
    let data = await this._schema.findAndCountAll({
      where, 
      order:  [['sort','DESC']],
      limit: size,
      offset: (pageIndex - 1) * size,
    });

    data.limit = size;
    data.offset = pageIndex;
    
    return data;
  }
}

export default Model