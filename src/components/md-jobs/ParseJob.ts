import { JobFormValues } from "./JobFormValues";

export const createFormatedQuery = (form: JobFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_JOBS ( JOB_ID
                                    , JOB_SHORTNAME
                                    , JOB_LONGNAME
                                    , JOB_HANDLING
                                    , CONFIG_ADO
                                    , TYPE_ID
                                    , LIST_ID
                                    , TEMPLATE_ID
                                    , SOURCE_SHORTNAME
                                    , UPROC
                                    , CALENDAR
                                    )
                             values ( SAN_AC_MR_PRO.JOBS_SEQ.NextVal
                                    , '${form.jobShortname}'
                                    , '${form.jobLongname}'
                                    , '${form.jobHandling}'
                                    , '${form.configADO}'
                                    , (SELECT TYPE_ID FROM SAN_AC_MR_PRO.MD_TYPES WHERE TYPE_SHORTNAME='CAPT')
                                    , '${form.listID}'
                                    , '${form.templateID}'
                                    , '${form.sourceShortname}'
                                    , '${form.uproc}'
                                    , '${form.calendar}'
                                    );`;
}

export const createUnformattedQuery = (form: JobFormValues): string => {
  return `insert into SAN_AC_MR_PRO.MD_JOBS ( JOB_ID, JOB_SHORTNAME, JOB_LONGNAME, JOB_HANDLING, CONFIG_ADO, TYPE_ID, LIST_ID, TEMPLATE_ID, SOURCE_SHORTNAME, UPROC, CALENDAR) values ( SAN_AC_MR_PRO.JOBS_SEQ.NextVal, '${form.jobShortname}', '${form.jobLongname}', '${form.jobHandling}', '${form.configADO}', (SELECT TYPE_ID FROM SAN_AC_MR_PRO.MD_TYPES WHERE TYPE_SHORTNAME='CAPT'), '${form.listID}', '${form.templateID}', '${form.sourceShortname}', '${form.uproc}', '${form.calendar}');`;
}