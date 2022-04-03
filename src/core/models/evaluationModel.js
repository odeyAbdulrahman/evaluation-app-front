export const evaluationModel = {
    value: 0,
    phoneNumber: '',
    note: '',
    userId: '',
    departmentId: '',
    subDepartmentId: '',
}
export const clearEvaluationModel = () =>{
    evaluationModel.value = 0
    evaluationModel.phoneNumber = ''
    evaluationModel.note = ''
    evaluationModel.userId = ''
    evaluationModel.departmentId = ''
    evaluationModel.subDepartmentId = ''
};