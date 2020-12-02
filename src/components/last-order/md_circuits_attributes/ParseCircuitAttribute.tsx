import { CircuitAttributeFormValues } from "./CircuitAttributeFormValues";

export const createFormatedQuery = (form: CircuitAttributeFormValues): string => {
  //TODO
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS_ATTRIBUTES (CIRCUIT_ID
                                                      , ATTRIBUTE_ID
                                                      )  
                                               values ((select circuit_id from san_ac_mr_pro.md_circuits where circuit_shortname='${form.circuitShortname}')
                                                      , (select attribute_id from san_ac_mr_pro.md_attributes where attribute_name='${form.attributeName}')
                                                      );`;
}

export const createUnformatedQuery = (form: CircuitAttributeFormValues): string => {
  //TODO
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS_ATTRIBUTES (CIRCUIT_ID, ATTRIBUTE_ID) values ((select circuit_id from san_ac_mr_pro.md_circuits where circuit_shortname='${form.circuitShortname}'), (select attribute_id from san_ac_mr_pro.md_attributes where attribute_name='${form.attributeName}'));`;
}