import { Breadcrumb, Card, Input, PageHeader, Select } from 'antd';
import Form, { FormInstance } from 'antd/lib/form';
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { editCircuitSystem } from "../../../store/last-order/md-circuits-systems/actions";
import { CircuitSystem } from "../../../store/last-order/md-circuits-systems/types";
import { RootState } from "../../../store/root-reducer";
import { CircuitSystemFormValues } from './CircuitSystemFormValues';
import { createFormatedQuery, createUnformatedQuery } from './ParseCircuitSystem';

import { CheckCircleFilled } from '@ant-design/icons'

const mapState = (state: RootState) => ({
  circuitSystem: state.circuitsSystems.circuitsSystemsHistory[state.circuitsSystems.selected] as CircuitSystem,
  circuitsHistory: state.circuits.circuitsHistory
});

const mapDispatch = {
  editCircuitSystem: editCircuitSystem,
};

interface OwnProps {
  history: string[],
}

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>

class EditCircuitSystem extends React.Component<PropsFromRedux & OwnProps> {

  formRef = React.createRef<FormInstance>();
    
  componentDidUpdate(){
    this.formRef.current?.resetFields();
  }
  
  onFinish = (values: CircuitSystemFormValues) => {
    this.props.editCircuitSystem({
      ...values
      , ID: this.props.circuitSystem.ID
      , name: () => ""
      , description: () => JSON.stringify(values, null, 1)
      , tag: () => "MD_CIRCUITS_SYSTEMS -" 
      , createFormatedQuery: () => createFormatedQuery(values)
      , createUnformatedQuery: () => createUnformatedQuery(values)
      , path: () => `/last-order/circuits-systems/${this.props.circuitSystem.ID}`
      , type: () => "circuit-system"
    });

    this.formRef.current?.resetFields();
    this.props.history.push('/last-order/circuits-attributes')
  }
  render() {
    if (this.props.circuitSystem !== undefined)
    return (
      <PageHeader title="Edit"
        onBack={() => this.props.history.push('/last-order/circuits-attributes')}>
      <div style={{marginTop: 10}}>
        <Card title="Edit MD_CIRCUITS_ATTRIBUTES"
          bordered={true}
          size="small"
          style={{ width: "calc(100%)",}}
          actions={[
            <CheckCircleFilled onClick={() => this.formRef.current?.submit()} className="ant-btn-piola" style={{ fontSize: "32px"}}/>
          ]}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Edit MD_CIRCUITS_ATTRIBUTES</Breadcrumb.Item>
          </Breadcrumb>
          <Form
            name="control-ref"
            ref={this.formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            onFinish={this.onFinish}
            size="small"
            initialValues={{
              circuitShortname: this.props.circuitSystem.circuitShortname,
              systemShortname: this.props.circuitSystem.systemShortname
            }}
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
      </PageHeader>
    );

    this.props.history.push('/')
    return (<div>Esto nunca se dibuja</div>);
  }
}

export default connector(EditCircuitSystem)