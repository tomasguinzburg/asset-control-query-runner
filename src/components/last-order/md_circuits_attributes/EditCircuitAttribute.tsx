import { Breadcrumb, Card, Input, PageHeader, Select } from 'antd';
import Form, { FormInstance } from 'antd/lib/form';
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { editCircuitAttribute } from "../../../store/last-order/md-circuits-attributes/actions";
import { CircuitAttribute } from "../../../store/last-order/md-circuits-attributes/types";
import { RootState } from "../../../store/root-reducer";
import { CircuitAttributeFormValues } from './CircuitAttributeFormValues';
import { createFormatedQuery, createUnformatedQuery } from './ParseCircuitAttribute';

import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

const mapState = (state: RootState) => ({
  circuitAttribute: state.circuitsAttributes.circuitsAttributesHistory[state.circuitsAttributes.selected] as CircuitAttribute,
  circuitsHistory: state.circuits.circuitsHistory,
  jobsHistory: state.jobs.jobsHistory
});

const mapDispatch = {
  editCircuitAttribute: editCircuitAttribute,
};

interface OwnProps {
  history: string[],
}

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>

class EditCircuitAttribute extends React.Component<PropsFromRedux & OwnProps> {

  formRef = React.createRef<FormInstance>();

    
  componentDidUpdate(){
    this.formRef.current?.resetFields();
  }
  
  onFinish = (values: CircuitAttributeFormValues) => {
    this.props.editCircuitAttribute({
      ...values
      , ID: this.props.circuitAttribute.ID
      , name: () => "{circuitShortname:" + values.circuitShortname + ", attributeName: " + values.attributeName + "}"
      , description: () => JSON.stringify(values, null, 1)
      , tag: () => "MD_CIRCUITS_ATTRIBUTES -" 
      , createFormatedQuery: () => createFormatedQuery(values)
      , createUnformatedQuery: () => createUnformatedQuery(values)
      , path: () => `/last-order/circuits-attributes/${this.props.circuitAttribute.ID}`
      , type: () => "circuit-attribut"
    });

    this.formRef.current?.resetFields();
    this.props.history.push('/last-order/circuits-attributes')
  }
  render() {
    if (this.props.circuitAttribute !== undefined)
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
              circuitShortname: this.props.circuitAttribute.circuitShortname,
              attributeName: this.props.circuitAttribute.attributeName
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
            <Form.Item label="attribute_name"
              name="attributeName"
              hasFeedback
              rules={[{ required: true, type: 'string' }]}
            >
              <Input placeholder="attribute_name" style={{ width: "calc(25%)" }} />
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

export default connector(EditCircuitAttribute)