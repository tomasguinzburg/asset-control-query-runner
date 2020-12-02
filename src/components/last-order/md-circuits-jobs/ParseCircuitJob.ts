import { CircuitJobFormValues } from "./CircuitJobFormValues";

export const createFormatedQuery = (form: CircuitJobFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS_JOBS ( CIRCUIT_ID
                                           , JOB_ID
                                           , ORDER_SERVICES_JOBS
                                           )
                                    values ( (select circuit_id from san_ac_mr_pro.md_circuits where circuit_shortname='${form.circuitShortname}')
                                           , (select job_id from san_ac_mr_pro.md_jobs where job_shortname='${form.jobShortname}')
                                           , ${form.order}
                                           );`;
}

export const createUnformatedQuery = (form: CircuitJobFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS_JOBS ( CIRCUIT_ID, JOB_ID, ORDER_SERVICES_JOBS) values ( (select circuit_id from san_ac_mr_pro.md_circuits where circuit_shortname='${form.circuitShortname}'), (select job_id from san_ac_mr_pro.md_jobs where job_shortname='${form.jobShortname}'), ${form.order});`;
}