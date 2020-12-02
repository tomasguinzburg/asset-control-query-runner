import { CircuitSystemFormValues } from "./CircuitSystemFormValues";

export const createFormatedQuery = (form: CircuitSystemFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS_SYSTEMS ( CIRCUIT_ID
                                              , SYSTEM_ID
                                              )
                                       values ( (select circuit_id from san_ac_mr_pro.md_circuits where circuit_shortname=${form.circuitShortname})
                                              , (select system_id from san_ac_mr_pro.md_systems where system_shortname=${form.systemShortname})
                                              );`;
}

export const createUnformatedQuery = (form: CircuitSystemFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS_SYSTEMS ( CIRCUIT_ID, SYSTEM_ID ) values ( (select circuit_id from san_ac_mr_pro.md_circuits where circuit_shortname=${form.circuitShortname}), (select system_id from san_ac_mr_pro.md_systems where system_shortname=${form.systemShortname}));`;
}