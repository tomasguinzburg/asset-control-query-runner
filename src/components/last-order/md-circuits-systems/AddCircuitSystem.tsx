import { Breadcrumb, Card, Input, Select } from 'antd';
import Form, { FormInstance } from 'antd/lib/form';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { CircuitSystemFormValues } from './CircuitSystemFormValues';
import { createFormatedQuery, createUnformatedQuery } from './ParseCircuitSystem';
import { PlusCircleFilled } from '@ant-design/icons'
import { addCircuitSystem } from '../../../store/last-order/md-circuits-systems/actions';

const mapState = (state: RootState) => ({ circuitsHistory: state.circuits.circuitsHistory
                                        , circuitsSystemsHistory: state.circuitsSystems.circuitsSystemsHistory
                                        });

const mapDispatch = {
  addCircuitSystem: addCircuitSystem,
};


const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


class AddCircuitSystem extends React.Component<PropsFromRedux> {
  
  formRef = React.createRef<FormInstance>();

  onFinish = (values: CircuitSystemFormValues) => {
    let ID = this.generateID()
    this.props.addCircuitSystem({
      ...values
      , ID: ID
      , name: () => ""
      , description: () => JSON.stringify(values, null, 1)
      , tag: () => "MD_CIRCUITS_SYSTEMS -" 
      , createFormatedQuery: () => createFormatedQuery(values)
      , createUnformatedQuery: () => createUnformatedQuery(values)
      , path: () => `/last-order/circuits-systems/${ID}`
      , type: () => "circuit-system"
    });

    this.formRef.current?.resetFields();
  }

  generateID = () => this.props.circuitsSystemsHistory.sort((a, b) => (a.ID - b.ID))
                                                      .reduce((acc, curr) => (acc === curr.ID ? acc + 1 : acc), 0)

    render() {
    return (
      <div style={{marginTop: 10}}>
        <Card title="Add MD_CIRCUITS_SYSTEMS"
          bordered={true}
          size="small"
          style={{ width: "calc(100%)",}}
          actions={[
            <PlusCircleFilled onClick={() => this.formRef.current?.submit()} className="ant-btn-piola" style={{ fontSize: "32px"}}/>
          ]}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Add MD_CIRCUITS_SYSTEMS</Breadcrumb.Item>
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
              
              <Select style={{width: "calc(25%)"}} disabled={this.props.circuitsHistory.length === 0}>
                { this.props.circuitsHistory.map(circuit => <Select.Option value={circuit.name()}>{circuit.name()}</Select.Option>) }
              </Select>
            </Form.Item>
            <Form.Item label="system_shortname"
              name="systemShortname"
              hasFeedback
              rules={[{ required: true, type: 'string' }]}
            >
              <Input placeholder="system_shortname" style={{ width: "calc(25%)" }} />
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connector(AddCircuitSystem)