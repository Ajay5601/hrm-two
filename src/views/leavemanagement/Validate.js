import * as yup from 'yup';

export const validateSchema = yup.object().shape({
  employeeId: yup.string().required('Employee ID is required'),
  employeeName: yup.string().required('Employee Name is required'),
  leaveType: yup.string().required('Leave Type is required'),
  startDate: yup.date().required('Start Date is required'),
  endDate: yup
    .date()
    .required('End Date is required')
    .min(yup.ref('startDate'), 'End Date must be after or equal to Start Date'),
  numberOfDays: yup
    .number()
    .required('Number of Days is required')
    .positive('Number of Days must be positive')
    .integer('Number of Days must be an integer'),
  attachments: yup.array().of(yup.string()),
  reason: yup.string().required('Reason is required'),
});

