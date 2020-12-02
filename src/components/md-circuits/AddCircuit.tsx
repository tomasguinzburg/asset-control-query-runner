import React from 'react';
import Moment from 'moment';

import { CircuitFormValues } from './CircuitFormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { addCircuit } from '../../store/md-circuits/actions';

import { Breadcrumb, Form, Input, DatePicker, Card, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { PlusCircleFilled } from '@ant-design/icons'

import {createFormatedQuery, createUnformatedQuery } from './ParseCircuit'


const mapState = (state: RootState) => ({
  circuitsHistory: state.circuits.circuitsHistory
});

const mapDispatch = {
  addCircuit: addCircuit,
};

const { Option } = Select;

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


class AddCircuit extends React.Component<PropsFromRedux> {

  formRef = React.createRef<FormInstance>();

  onFinish = (values: CircuitFormValues) => {
    let ID = this.generateID() 
    this.props.addCircuit({
      ...values
      , ID: ID
      , distributionTime: Moment(values.distributionTime).format('YYYY-MM-DD HH:mm:ss')
      , name: () =>values.circuitShortname
      , description: () => values.circuitLongname + ", " + values.distributionTime + ", " + values.treeID + ", " + values.calendar + ", " + values.product + ", " + values.groupID + ", " + values.typeShortname
      , tag: () => "MD_CIRCUITS -" 
      , createFormatedQuery: () => createFormatedQuery(values)
      , createUnformatedQuery: () => createUnformatedQuery(values)
      , path: () => `/circuits/${ID}`
      , type: () => "circuit"
    });

    this.formRef.current?.resetFields();
  }

  generateID = () => this.props.circuitsHistory.sort((a, b) => (a.ID - b.ID))
    .reduce((acc, curr) => (acc === curr.ID ? acc + 1 : acc), 0)

  render() {
    return (
      <div style={{marginTop: 10}}>
        <Card title="Add MD_CIRCUITS"
          bordered={true}
          size="small"
          style={{ width: "calc(100%)",}}
          actions={[
            <PlusCircleFilled onClick={() => this.formRef.current?.submit()} className="ant-btn-piola" style={{ fontSize: "32px"}}/>
          ]}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Add MD_CIRCUITS</Breadcrumb.Item>
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
              <Input placeholder="circuit_shortname" style={{ width: "calc(25%)" }} />
            </Form.Item>
            <Form.Item label="circuit_longname"
              name="circuitLongname"
              hasFeedback
              rules={[{ required: true, type: 'string' }]}
            >
              <Input placeholder="circuit_longname" style={{ width: "calc(40%)" }} />
            </Form.Item>
            <Form.Item label="distribution_time"
              name="distributionTime"
              hasFeedback
              rules={[{ required: true, message: 'Please select time!' }]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item label="tree_id"
              name="treeID"
              hasFeedback
              rules={[{ required: true, type: 'string' }]}
            >
              <Input placeholder="tree_id" style={{ width: "calc(10%)" }} />
            </Form.Item>
            <Form.Item label="calendar"
              name="calendar"
              hasFeedback
              rules={[{ required: false, type: 'string' }]}
              initialValue=""
            >
              <Input placeholder="calendar" style={{ width: "calc(10%)" }} />
            </Form.Item>
            <Form.Item label="product"
              name="product"
              hasFeedback
              rules={[{ required: true, type: 'string' }]}
            >
              <Input placeholder="product" style={{ width: "calc(40%)" }} />
            </Form.Item>
            <Form.Item label="group_id"
              name="groupID"
              hasFeedback
              rules={[{ required: true, type: 'string' }
                , ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!isNaN(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('group_id should be numeric');
                  }
                })
              ]}
            >
              <Input placeholder="0" style={{ width: "calc(10%)" }} />
            </Form.Item>
            <Form.Item label="type_shortname"
              name="typeShortname"
              rules={[{required: true, type: 'string'}]}>
              <Select style={{width: "calc(10%)"}} >
                <Option value="REV">REV</Option>
                <Option value="MD">MD</Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connector(AddCircuit)