import React from 'react';

import { JobFormValues } from './JobFormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { editJob } from '../../store/md-jobs/actions';

import { Breadcrumb, Form, Input, Card, Select, PageHeader } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { createFormatedQuery, createUnformatedQuery } from './ParseJob';
import { Job } from '../../store/md-jobs/types';

const {Option} = Select;

//
// Redux+Typescript boilerplate
//
const mapState = (state: RootState) => ({
  job: state.jobs.jobsHistory[state.jobs.selected] as Job
});

const mapDispatch = {
  editJob: editJob,
};

interface OwnProps {
  history: string[],
}

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>

//
// Component
//
class EditJob extends React.Component<PropsFromRedux & OwnProps> {

  formRef = React.createRef<FormInstance>();
  
  componentDidUpdate(){
    this.formRef.current?.resetFields();
  }

  onFinish = (values: JobFormValues) => {
    this.props.editJob({ ...values 
                       , ID: this.props.job.ID
                       , name: () => values.jobShortname
                       , description: () => JSON.stringify(values, null, 1)
                       , tag: () => "MD_JOBS -" 
                       , createFormatedQuery: () => createFormatedQuery(values)
                       , createUnformatedQuery: () => createUnformatedQuery(values)
                       , path: () => `/jobs/${this.props.job.ID}`
                       , type: () => "job"
                       });
    this.formRef.current?.resetFields();
    this.props.history.push('/jobs')
  }

  render() {
    if (this.props.job !== undefined)
      return (
        <PageHeader title="Edit"
        onBack={() => this.props.history.push('/jobs')}>
        <div style={{ marginTop: 10 }}>
          <Card title="Edit MD_JOB"
            bordered={true}
            size="small"
            style={{ width: "calc(100%)" }}
            actions={[
              <CheckCircleFilled onClick={() => this.formRef.current?.submit()} className="checkMark"style={{fontSize: "32px"}}/> ]}
          >
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Edit MD_JOBS - {this.props.job.ID}</Breadcrumb.Item>
            </Breadcrumb>
            <Form
              name="control-ref"
              ref={this.formRef}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              onFinish={this.onFinish}
              size="small"
              initialValues={{
                jobShortname: this.props.job.jobShortname,
                jobLongname: this.props.job.jobLongname,
                jobHandling: this.props.job.jobHandling,
                configADO: this.props.job.configADO,
                typeShortname: this.props.job.typeShortname,
                listID: this.props.job.listID,
                templateID: this.props.job.templateID,  
                sourceShortname: this.props.job.sourceShortname,
                uproc: this.props.job.uproc,
                calendar: this.props.job.calendar
              }}
            >
              <Form.Item label="job_shortname"
                name="jobShortname"
                hasFeedback
                rules={[{ required: true, type: 'string' }]}
              >
                <Input placeholder="job_shortname" style={{ width: "calc(25%)" }} />
              </Form.Item>
              <Form.Item label="job_longname"
                name="jobLongname"
                hasFeedback
                rules={[{ required: true, type: 'string' }]}
              >
                <Input placeholder="job_longname" style={{ width: "calc(40%)" }} />
              </Form.Item>
              <Form.Item label="job_handling"
                name="jobHandling"
                hasFeedback
                rules={[{ required: true, type: 'string' }]}
              >
                <Input placeholder="job_handling" style={{ width: "calc(10%)" }} />
              </Form.Item>
              <Form.Item label="config_ado"
                name="configADO"
                hasFeedback
                initialValue=""
                rules={[{ required: false, type: 'string' }]}
              >
                <Input placeholder="config_ado" style={{ width: "calc(25%)" }} />
              </Form.Item>
              <Form.Item label="type_shortname"
              name="typeShortname"
              rules={[{required: true, type: 'string'}]}>
              <Select style={{width: "calc(10%)"}} > 
                <Option value="CONS">CONS</Option>
                <Option value="CERT">CERT</Option>
                <Option value="DIST">DIST</Option>
                <Option value="CAPT">CAPT</Option>
              </Select>
            </Form.Item>
              <Form.Item label="list_id"
                name="listID"
                hasFeedback
                rules={[{ required: true, type: 'string' }]}
              >
                <Input placeholder="list_id" style={{ width: "calc(20%)" }} />
              </Form.Item>
              <Form.Item label="template_id"
                name="templateID"
                hasFeedback
                initialValue=""
                rules={[{ required: false, type: 'string' }]}
              >
                <Input placeholder="product" style={{ width: "calc(25%)" }} />
              </Form.Item>
              <Form.Item label="source_shortname"
                name="sourceShortname"
                hasFeedback
                initialValue=""
                rules={[{ required: false, type: 'string' }]}
              >
                <Input placeholder="source_shortname" style={{ width: "calc(25%)" }} />
              </Form.Item>
              <Form.Item label="uproc"
                name="uproc"
                hasFeedback
                rules={[{ required: true, type: 'string' }]}
              >
                <Input placeholder="uproc" style={{ width: "calc(25%)" }} />
              </Form.Item>
              <Form.Item label="calendar"
                name="calendar"
                hasFeedback
                initialValue=""
                rules={[{ required: false, type: 'string' }]}
              >
                <Input placeholder="calendar" style={{ width: "calc(10%)" }} />
              </Form.Item>
            </Form>
          </Card>
        </div>
        </PageHeader>
      );
    else
    this.props.history.push('/')
    return (<div>Esto nunca se dibuja</div>)  
  }


}

export default connector(EditJob);
