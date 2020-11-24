import React from 'react';
import Moment from 'moment';

import { JobFormValues } from './JobFormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { editJob } from '../../store/md-jobs/actions';

import { Breadcrumb, Form, Input, Button, Col, DatePicker, Row, Card } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

//
// Styles
//
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

//
// Redux+Typescript boilerplate
//
const mapState = (state: RootState) => ({
  job: state.jobs.jobsHistory[state.jobs.selected]
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


  onFinish = (values: JobFormValues) => {
    this.props.editJob({ ...values 
                          , ID: this.props.job.ID
                          });
    this.formRef.current?.resetFields();
    this.props.history.push('/jobs')
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <Card title="Add MD_JOBS"
          bordered={true}
          style={{ width: "calc(100%)" }}
          actions={[
            <CloseCircleFilled onClick={() => this.props.history.push('/jobs')} className="closeCircle" style={{fontSize: "32px"}}/>,
            <CheckCircleFilled onClick={() => this.formRef.current?.submit()} className="checkMark"style={{fontSize: "32px"}}/>          ]}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Add MD_JOBS</Breadcrumb.Item>
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
    );
  }


}

export default connector(EditJob);
