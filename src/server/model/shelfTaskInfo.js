const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;

const SHELF_TASK_STATUS = {
  PREPARE: '0', // 待认领
  DOING: '1', // 处理中
  SUBMITTED: '2', // 已提交(待上架)
  DELETE: '3', // 已删除
  ONLINE: '4', // 已上架
  OFFLINE: '5', // 已下架
};

const SHELF_TASK_FILE_TYPE = {
  SUBTITLE: 11, // 字幕
  HIGH_VIDEO: 5, // 高清视频
  LOW_CODE_VIDEO: 2, // 低码流视音频
  VIDEO_SERVER: 3, // 视频服务器
  LITI_VOICE: 6, // 立体声音频
  DAN_VOICE: 1, // 单声道音频
  KEY_FRAME: 4, // 关键帧
  BIAO_QING: 0, // 标清视频
  FU_JIAN: 100, // 附件
  TU_WEN: 7, // 图文
  HEAD_PHOTO: 10, // 肖像
};

const SHELF_TASK_PACKAGE_STATUS = {
  PREPARE: '0', // 待处理
  DEALING: '1', // 处理中
  COMPLETED: '2', // 已完成
  ERROR: '3', // 出错
};

const SHELF_TASK_IS_DIRECT = {
  YES: '1',
  NO: '0',
};

const ShelfTaskInfoSchema = new Schema({
  _id: { type: String, default: uuid.v1() },
  name: { type: String, required: true },
  programNO: { type: String, required: true }, // 节目编号
  objectId: { type: String, required: true },
  assignee: { type: Object, default: { _id: '', name: '' } }, // 派发人
  dealer: { type: Object, default: { _id: '', name: '' } }, // 处理人
  creator: { type: Object, default: { _id: '', name: '' } }, // 创建人
  department: { type: Object, default: { _id: '', name: '' } }, // 部门
  lastSendBacker: { type: Object, default: { _id: '', name: '' } }, // 退回者
  lastSubmitter: { type: Object, default: { _id: '', name: '' } }, // 最后提交人
  lastDeleter: { type: Object, default: { _id: '', name: '' } }, // 最后删除人
  lastOnliner: { type: Object, default: { _id: '', name: '' } }, // 最后上架人
  lastOffliner: { type: Object, default: { _id: '', name: '' } }, // 最后下架人
  lastEditAgainer: { type: Object, default: { _id: '', name: '' } }, // 最后点击再编辑人
  status: { type: String, required: true, default: SHELF_TASK_STATUS.PREPARE },
  operationTime: { type: Date }, // 派发或认领的时间
  createdTime: { type: Date, required: true },
  lastModifyTime: { type: Date, required: true },
  description: { type: String },
  details: { type: Object },
  files: { type: Array },
  full_text: { type: String },
  full_time: { type: Date },
  editorInfo: { type: Object,
    default: {
      name: '', // 节目名称
      fileName: '', // 文件名
      subscribeType: [],
      source: '',
      limit: '',
      cover: '',
      airTime: '',
    } },
  fromWhere: {
    type: String,
    default: 'MAM',
  },
  isDirect: { // 直接上架还是通过java的上架流程上架的
    type: String,
    default: SHELF_TASK_IS_DIRECT.YES,
  },
  packageStatus: {
    type: String,
    default: SHELF_TASK_PACKAGE_STATUS.COMPLETED,
  },
}, { collection: 'ShelfTaskInfo' });

const ShelfTaskInfo = mongoose.model('ShelfTaskInfo', ShelfTaskInfoSchema);

ShelfTaskInfo.STATUS = SHELF_TASK_STATUS;

ShelfTaskInfo.DEAL_STATUS = [
  ShelfTaskInfo.STATUS.PREPARE,
  ShelfTaskInfo.STATUS.DOING,
  ShelfTaskInfo.STATUS.SUBMITTED,
  ShelfTaskInfo.STATUS.DELETE,
];

ShelfTaskInfo.LINE_STATUS = [
  ShelfTaskInfo.STATUS.SUBMITTED,
  ShelfTaskInfo.STATUS.ONLINE,
  ShelfTaskInfo.STATUS.OFFLINE,
];

ShelfTaskInfo.FILE_TYPE = SHELF_TASK_FILE_TYPE;

ShelfTaskInfo.PACKAGE_STATUS = SHELF_TASK_PACKAGE_STATUS;

ShelfTaskInfo.IS_DIRECT = SHELF_TASK_IS_DIRECT;

module.exports = ShelfTaskInfo;
