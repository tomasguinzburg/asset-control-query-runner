import React, { useState } from 'react';
import FormFile from 'react-bootstrap/FormFile';
import ReactDOM from 'react-dom';
import { Layout, Menu,  Breadcrumb,   Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch, } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

let insertQuery: string;
let param1: string;
let param2: string ; 
let param3: string ;
let param4: string ;
let param5: string ;
let param6: string ;
let param7: string ;
let param8: string ;
let param9: string ;

type FormCircuitForm = {
  formCircuitShortname: string
  formCircuitLongName: string
  formDistributionTime: string
  formTreeId: string
  formCalendar: string
  formProduct: string
  formGroupId: string
}

const circuitForm: FormCircuitForm = {
  formCircuitShortname: '',
  formCircuitLongName: '',
  formDistributionTime: '',
  formTreeId: '',
  formCalendar: '',
  formProduct: '',
  formGroupId: ''
};


const handleSubmit = (event: any) => {
  event.preventDefault();
  createQuery();
  console.log(insertQuery+param1+param2+param3+param4+param5+param6+param7+param8+param9);
}

function createQuery() {
  insertQuery = 'insert into SAN_AC_MR_PRO.MD_CIRCUITS (CIRCUIT_ID, CIRCUIT_SHORTNAME, CIRCUIT_LONGNAME, DISTRIBUTION_TIME, TIME_ZONE_ID, TREE_ID, CALENDAR, PRODUCT, GROUP_ID, TYPE_ID) values (';
  param1 = 'SAN_AC_MR_PRO.CIRCUIT_SEQ.NextVal,';
  param2 = '\''+circuitForm.formCircuitShortname+'\',';
  param3 = '\''+circuitForm.formCircuitLongName+'\',';
  param4 = 'to_timestamp(\''+circuitForm.formDistributionTime+'\', \'yyyy/mm/dd HH24:mi:ss\'),';
  param5 = '\''+circuitForm.formTreeId+'\',';
  param6 = '\''+circuitForm.formCalendar+'\',';
  param7 = '\''+circuitForm.formProduct+'\',';
  param8 = circuitForm.formGroupId+',';
  param9 = '(select type_id from SAN_AC_MR_PRO.MD_TYPES where type_shortname =\'MD\'));';
}

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};


class FormCircuit extends React.Component {

   render() {

     return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>New Circuit</Breadcrumb.Item>
        </Breadcrumb>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="Circuit Shortname">
          <Input />
        </Form.Item>
        <Form.Item label="Circuit Longname">
          <Input />
        </Form.Item>
        <Form.Item label="Distribution Time">
          <Input />
        </Form.Item>
        <Form.Item label="Tree id">
          <Input />
        </Form.Item>
        <Form.Item label="Calendar">
          <Input />
        </Form.Item>
        <Form.Item label="Product">
          <Input />
        </Form.Item>
        <Form.Item label="Group Id">
          <Input />
        </Form.Item>
        <Form.Item label= " ">
          <Button type="primary" block>Generate Query</Button>
        </Form.Item>
      </Form>
      </Content>
     );
   }
}

export default FormCircuit;