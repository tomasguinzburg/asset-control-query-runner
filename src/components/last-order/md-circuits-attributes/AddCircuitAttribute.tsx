import { Breadcrumb, Card, Input, Select } from 'antd';
import Form, { FormInstance } from 'antd/lib/form';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addCircuitAttribute } from '../../../store/last-order/md-circuits-attributes/actions';
import { RootState } from '../../../store/root-reducer';
import { CircuitAttributeFormValues } from './CircuitAttributeFormValues';
import { createFormatedQuery, createUnformatedQuery } from './ParseCircuitAttribute';
import { PlusCircleFilled } from '@ant-design/icons'

const mapState = (state: RootState) => ({ circuitsHistory: state.circuits.circuitsHistory
                                        , jobsHistory: state.jobs.jobsHistory
                                        , circuitsAttributesHistory: state.circuitsAttributes.circuitsAttributesHistory
                                        });

const mapDispatch = {
  addCircuitAttribute: addCircuitAttribute,
};


const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


class AddCircuitAttribute extends React.Component<PropsFromRedux> {
  
  formRef = React.createRef<FormInstance>();

  onFinish = (values: CircuitAttributeFormValues) => {
    let ID = this.generateID()
    this.props.addCircuitAttribute({
      ...values
      , ID: ID
      , name: () => "{circuitShortname:" + values.circuitShortname + ", attributeName: " + values.attributeName + "}"
      , description: () => JSON.stringify(values,null,1)
      , tag: () => "MD_CIRCUITS_ATTRIBUTES -" 
      , createFormatedQuery: () => createFormatedQuery(values)
      , createUnformatedQuery: () => createUnformatedQuery(values)
      , path: () => `/last-order/circuits-attributes/${ID}`
      , type: () => "circuit-attribute"
    });

    this.formRef.current?.resetFields();
  }

  generateID = () => this.props.circuitsAttributesHistory.sort((a, b) => (a.ID - b.ID))
                                                   .reduce((acc, curr) => (acc === curr.ID ? acc + 1 : acc), 0)

    render() {
    return (
      <div style={{marginTop: 10}}>
        <Card title="Add MD_CIRCUITS_ATTRIBUTES"
          bordered={true}
          size="small"
          style={{ width: "calc(100%)",}}
          actions={[
            <PlusCircleFilled onClick={() => this.formRef.current?.submit()} className="ant-btn-piola" style={{ fontSize: "32px"}}/>
          ]}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Add MD_CIRCUITS_ATTRIBUTES</Breadcrumb.Item>
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
    );
  }
}

export default connector(AddCircuitAttribute)