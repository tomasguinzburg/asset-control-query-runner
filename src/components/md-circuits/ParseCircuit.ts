import { CircuitFormValues } from "./CircuitFormValues";

export const createFormatedQuery = (form: CircuitFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS ( CIRCUIT_ID
                                    , CIRCUIT_SHORTNAME
                                    , CIRCUIT_LONGNAME
                                    , DISTRIBUTION_TIME
                                    , TIME_ZONE_ID
                                    , TREE_ID
                                    , CALENDAR
                                    , PRODUCT
                                    , GROUP_ID
                                    , TYPE_ID
                                    )
                             values ( SAN_AC_MR_PRO.CIRCUIT_SEQ.NEXTVAL
                                    , '${form.circuitShortname}'
                                    , '${form.circuitLongname}'
                                    , to_timestamp('${form.distributionTime}', 'yyyy/mm/dd HH24:mi:ss')
                                    , '${form.treeID}'
                                    , '${form.calendar}'
                                    , '${form.product}'
                                    , ${form.groupID}
                                    , (select TYPE_ID from SAN_AC_MR_PRO.MD_TYPES where TYPE_SHORTNAME = '${form.typeShortname}')
                                    );`;
}

export const createUnformatedQuery = (form: CircuitFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_CIRCUITS ( CIRCUIT_ID, CIRCUIT_SHORTNAME, CIRCUIT_LONGNAME, DISTRIBUTION_TIME, TIME_ZONE_ID, TREE_ID, CALENDAR, PRODUCT, GROUP_ID, TYPE_ID) values ( SAN_AC_MR_PRO.CIRCUIT_SEQ.NEXTVAL, '${form.circuitShortname}', '${form.circuitLongname}', to_timestamp('${form.distributionTime}', 'yyyy/mm/dd HH24:mi:ss)', '${form.treeID}', '${form.calendar}', '${form.product}', ${form.groupID}, (select TYPE_ID from SAN_AC_MR_PRO.MD_TYPES where TYPE_SHORTNAME = '${form.typeShortname}'));`;
}