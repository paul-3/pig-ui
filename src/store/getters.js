const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  productStatusNum: state => state.app.productStatusNum,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  idTypeOptions: state => state.dictionary.idTypeOptions,
  marriageStatusOptions: state => state.dictionary.marriageStatusOptions,
  productStatus: state => state.dictionary.productStatus,
  certificationStatus: state => state.dictionary.certificationStatus,
  certificationType: state => state.dictionary.certificationType,
  genderType: state => state.dictionary.genderType,
  educationType: state => state.dictionary.educationType,
  productRiskLevel: state => state.dictionary.productRiskLevel,
  // delFlagOptions: state => state.dictionary.delFlag,
  nationality: state => state.dictionary.nationality,
  customerRiskLevel: state => state.dictionary.riskLevel,
  realnameStatus: state => state.dictionary.realnameStatus,
  clientClass: state => state.dictionary.clientClass,
  workStatus: state => state.dictionary.status,
  clientType: state => state.dictionary.clientType,
  clientFrom: state => state.dictionary.clientFrom,
  authStatus: state => state.dictionary.authStatus,
  appointmentStatus: state => state.dictionary.appointmentStatus,
  appointStatus: state => state.dictionary.appointStatus,
  paymentStatus: state => state.dictionary.paymentStatus,
  contractStatus: state => state.dictionary.contractStatus,
  transcStatus: state => state.dictionary.transcStatus,
  refundStatus: state => state.dictionary.refundStatus,
  expressType: state => state.dictionary.expressType,
  investHorizonUnit: state => state.dictionary.investHorizonUnit,
  interestPayment: state => state.dictionary.interestPayment,
  buyingCrowds: state => state.dictionary.buyingCrowds,
  dimissionReason: state => state.dictionary.dimissionReason,
  lockStatus: state => state.dictionary.lockStatus,
  preserveExpired: state => state.dictionary.preserveExpired,
  maskCode: state => state.dictionary.maskCode,
  dataScope: state => state.dictionary.dataScope
}
export default getters
