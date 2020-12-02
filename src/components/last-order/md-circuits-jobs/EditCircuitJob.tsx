import { Breadcrumb, Card, Input, PageHeader, Select } from 'antd';
import Form, { FormInstance } from 'antd/lib/form';
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { editCircuitJob } from "../../../store/last-order/md-circuits-jobs/actions";
import { CircuitJob } from "../../../store/last-order/md-circuits-jobs/types";
import { RootState } from "../../../store/root-reducer";
import { CircuitJobFormValues } from './CircuitJobFormValues';
import { createFormatedQuery, createUnformatedQuery } from './ParseCircuitJob';

import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

const mapState = (state: RootState) => ({
  circuitJob: state.circuitsJobs.circuitsJobsHistory[state.circuitsJobs.selected] as CircuitJob,
  circuitsHistory: state.circuits.circuitsHistory,
  jobsHistory: state.jobs.jobsHistory
});

const mapDispatch = {
  editCircuitJob: editCircuitJob,
};

interface OwnProps {
  history: string[],
}

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>

class EditCircuitJob extends React.Component<PropsFromRedux & OwnProps> {

  formRef = React.createRef<FormInstance>();

    
  componentDidUpdate(){
    this.formRef.current?.resetFields();
  }
  
  onFinish = (values: CircuitJobFormValues) => {
    this.props.editCircuitJob({
      ...values
      , ID: this.props.circuitJob.ID
      , name: () => "{circuitShortname:" + values.circuitShortname + ", jobShortname: " + values.jobShortname + "}"
      , description: () => JSON.stringify(values, null, 1)
      , tag: () => "MD_CIRCUITS_JOBS -" 
      , createFormatedQuery: () => createFormatedQuery(values)
      , createUnformatedQuery: () => createUnformatedQuery(values)
      , path: () => `/last-order/circuits-jobs/${this.props.circuitJob.ID}`
      , type: () => "circuit-job"
    });

    this.formRef.current?.resetFields();
    this.props.history.push('/last-order/circuits-jobs')
  }
  render() {
    if (this.props.circuitJob !== undefined)
    return (
      <PageHeader title="Edit"
        onBack={() => this.props.history.push('/last-order/circuits-jobs')}>
      <div style={{marginTop: 10}}>
        <Card title="Edit MD_CIRCUITS_JOBS"
          bordered={true}
          size="small"
          style={{ width: "calc(100%)",}}
          actions={[
            <CheckCircleFilled onClick={() => this.formRef.current?.submit()} className="ant-btn-piola" style={{ fontSize: "32px"}}/>
          ]}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Edit MD_CIRCUITS_JOBS</Breadcrumb.Item>
          </Breadcrumb>
          <Form
            name="control-ref"
            ref={this.formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            onFinish={this.onFinish}
            size="small"
            initialValues={{
              circuitShortname: this.props.circuitJob.circuitShortname,
              jobShortname: this.props.circuitJob.jobShortname,
              order: this.props.circuitJob.order
            }}
          >
            <Form.Item label="circuit_shortname"
              name="circuitShortname"
              hasFeedback
              rules={[{ required: true, type: 'string' }]}
            >
              {/* <Input placeholder="circuit_shortname" style={{ width: "calc(25%)" }} /> */}
              <Select style={{width: "calc(25%)"}} disabled={this.props.circuitsHistory.length === 0}>
                { this.props.circuitsHistory.map(circuit => <Select.Option value={circuit.name()}>{circuit.name()}</Select.Option>) }
              </Select>
            </Form.Item>
            <Form.Item label="job_shortname"
              name="jobShortname"
              hasFeedback
              rules={[{ required: true, type: 'string' }]}
            >
              <Select style={{width: "calc(25%)"}} disabled={this.props.jobsHistory.length === 0}>
                { this.props.jobsHistory.map(job => <Select.Option value={job.name()}>{job.name()}</Select.Option>) }
              </Select>
            </Form.Item>
            <Form.Item label="order"
              name="order"
              hasFeedback
              rules={[{ required: true, type: 'string' }
                , ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!isNaN(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('order should be numeric');
                  }
                })
              ]}
            >
              <Input placeholder="0" style={{ width: "calc(10%)" }} />
            </Form.Item>
          </Form>
        </Card>
      </div>
      </PageHeader>
    );

    this.props.history.push('/')
    return (<div>Esto nunca se dibuja</div>);
  }
}

export default connector(EditCircuitJob)