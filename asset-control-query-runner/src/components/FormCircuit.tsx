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
import { FormInstance } from 'antd/lib/form';

const {Content} = Layout;

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


const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

class FormCircuit extends React.Component {
   formRef = React.createRef<FormInstance>();
   
   onFinish = (values: any) => {
    createQuery();
    console.log(insertQuery+param1+param2+param3+param4+param5+param6+param7+param8+param9);
  }
   
   render() {

     return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Query Runner</Breadcrumb.Item>
          <Breadcrumb.Item>New Circuit</Breadcrumb.Item>
        </Breadcrumb>
        <Form
        name="control-ref"
        ref={this.formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={this.onFinish}
      >
        <Form.Item label="Circuit Shortname">
          <Input onChange={ (e) => circuitForm.formCircuitShortname = e.target.value} placeholder="Circuit Shortname" />
        </Form.Item>
        <Form.Item label="Circuit Longname">
          <Input onChange={ (e) => circuitForm.formCircuitLongName = e.target.value} placeholder="Circuit Longname" />
        </Form.Item>
        <Form.Item label="Distribution Time">
          <Input onChange={ (e) => circuitForm.formDistributionTime = e.target.value} placeholder="Distribution Time" />
        </Form.Item>
        <Form.Item label="Tree id">
          <Input onChange={ (e) => circuitForm.formTreeId = e.target.value} placeholder="Tree id" />
        </Form.Item>
        <Form.Item label="Calendar">
          <Input onChange={ (e) => circuitForm.formCalendar = e.target.value} placeholder="Calendar" />
        </Form.Item>
        <Form.Item label="Product">
          <Input onChange={ (e) => circuitForm.formProduct = e.target.value} placeholder="Product" />
        </Form.Item>
        <Form.Item label="Group Id">
          <Input onChange={ (e) => circuitForm.formGroupId = e.target.value} placeholder="group id"/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary"  htmlType="submit" >Generate Query</Button>
        </Form.Item>
      </Form>
      </Content>
     );
   }
}

export default FormCircuit;