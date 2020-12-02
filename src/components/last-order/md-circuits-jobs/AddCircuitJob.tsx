import { Breadcrumb, Card, Input, Select } from 'antd';
import Form, { FormInstance } from 'antd/lib/form';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addCircuitJob } from '../../../store/last-order/md-circuits-jobs/actions';
import { RootState } from '../../../store/root-reducer';
import { CircuitJobFormValues } from './CircuitJobFormValues';
import { createFormatedQuery, createUnformatedQuery } from './ParseCircuitJob';
import { PlusCircleFilled } from '@ant-design/icons'

const mapState = (state: RootState) => ({ circuitsHistory: state.circuits.circuitsHistory
                                        , jobsHistory: state.jobs.jobsHistory
                                        , circuitsJobsHistory: state.circuitsJobs.circuitsJobsHistory
                                        });

const mapDispatch = {
  addCircuitJob: addCircuitJob,
};


const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


class AddCircuitJob extends React.Component<PropsFromRedux> {
  
  formRef = React.createRef<FormInstance>();

  onFinish = (values: CircuitJobFormValues) => {
    let ID = this.generateID()
    this.props.addCircuitJob({
      ...values
      , ID: ID
      , name: () => ""
      , description: () => JSON.stringify(values, null, 1)
      , tag: () => "MD_CIRCUITS_JOBS -" 
      , createFormatedQuery: () => createFormatedQuery(values)
      , createUnformatedQuery: () => createUnformatedQuery(values)
      , path: () => `/last-order/circuits-jobs/${ID}`
      , type: () => "circuit-job"
    });

    this.formRef.current?.resetFields();
  }

  generateID = () => this.props.circuitsJobsHistory.sort((a, b) => (a.ID - b.ID))
                                                   .reduce((acc, curr) => (acc === curr.ID ? acc + 1 : acc), 0)

    render() {
    return (
      <div style={{marginTop: 10}}>
        <Card title="Add MD_CIRCUITS_JOBS"
          bordered={true}
          size="small"
          style={{ width: "calc(100%)",}}
          actions={[
            <PlusCircleFilled onClick={() => this.formRef.current?.submit()} className="ant-btn-piola" style={{ fontSize: "32px"}}/>
          ]}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Add MD_CIRCUITS_JOBS</Breadcrumb.Item>
          </Breadcrumb>
          <Form
            name="control-ref"
            ref={this.formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            onFinish={this.onFinish}
            size="small"
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
    );
  }
}

export default connector(AddCircuitJob)