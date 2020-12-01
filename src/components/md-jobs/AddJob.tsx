import React from 'react';

import { JobFormValues } from './JobFormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { addJob } from '../../store/md-jobs/actions';
import { Breadcrumb, Form, Input, Card, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { PlusCircleFilled } from '@ant-design/icons'
import { createFormatedQuery, createUnformatedQuery } from './ParseJob';

const {Option} = Select;

const mapState = (state: RootState) => ({
  jobsHistory: state.jobs.jobsHistory
});

const mapDispatch = {
  addJob: addJob,
};

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


class AddJob extends React.Component<PropsFromRedux, { displayResults: boolean }> {

  formRef = React.createRef<FormInstance>();

  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      displayResults: false
    };
  }

  onFinish = (values: JobFormValues) => {
    let ID = this.generateID();
    this.props.addJob({ ...values
                      , ID: ID
                      , name: () => values.jobShortname
                      , description: () => values.jobLongname + ", " + values.jobHandling + ", " + values.configADO + ", " 
                      + values.listID + ", " + values.templateID + ", " + values.sourceShortname 
                      + ", " + values.uproc + ", " + values.calendar
                      , tag: () => "MD_JOBS -" 
                      , createFormatedQuery: () => createFormatedQuery(values)
                      , createUnformatedQuery: () => createUnformatedQuery(values)
                      , path: () => `/jobs/${ID}`
                      , type: () => "job"
                      });

    this.formRef.current?.resetFields();
  }

  generateID = () => this.props.jobsHistory.sort((a, b) => (a.ID - b.ID))
    .reduce((acc, curr) => (acc === curr.ID ? acc + 1 : acc), 0)

  showModal = () => {
    this.setState({
      displayResults: true,
    });
  };

  handleOk = (e: any) => {
    this.setState({
      displayResults: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      displayResults: false,
    });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <Card title="Add MD_JOBS"
          bordered={true}
          size="small"
          style={{ width: "calc(100%)"}}
          actions={[
            <PlusCircleFilled onClick={() => this.formRef.current?.submit()} className="ant-btn-piola" style={{ fontSize: "32px" }} />
          ]}
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
    );
  }
}

export default connector(AddJob)