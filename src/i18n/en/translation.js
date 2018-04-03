module.exports = {
  typeError: {
    code: '-10001',
    message: '{{field}} 输入类型错误',
  },
  requireError: {
    code: '-10002',
    message: '必须填写 {{field}}',
  },
  validationError: {
    code: '-10003',
    message: '{{field}} 不符合验证规则',
  },
  fieldIsNotExistError: {
    code: '-10004',
    message: '{{field}} 字段不在实体类中，无法进行存取操作',
  },
  cannotFindFile: {
    code: '-20001',
    message: '找不到文件',
  },
  requestCallApiError: {
    code: '-90000',
    message: '{{error}}',
  },
  requestCallApiFailed: {
    code: '-90001',
    message: 'api请求超时',
  },
};
