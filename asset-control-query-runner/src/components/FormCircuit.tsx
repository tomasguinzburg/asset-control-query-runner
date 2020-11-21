import React from 'react';
import { Layout, Breadcrumb, Form,
  Input,
  Button } from 'antd';
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

let queries: FormCircuitForm[] = [];


const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

class FormCircuit extends React.Component {
   formRef = React.createRef<FormInstance>();
   
   onFinish = (values: any) => {
    const queries2 = queries.concat([circuitForm]);
    console.log(insertQuery+param1+param2+param3+param4+param5+param6+param7+param8+param9);
    this.formRef.current?.resetFields();
    console.log(queries2);
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
        onFinish={this.onFinish}
      >
        <Form.Item label="Circuit Shortname" name="circuitShortname">
          <Input onChange={ (e) => circuitForm.formCircuitShortname = e.target.value} placeholder="Circuit Shortname" />
        </Form.Item>
        <Form.Item label="Circuit Longname" name="circuitLongname">
          <Input onChange={ (e) => circuitForm.formCircuitLongName = e.target.value} placeholder="Circuit Longname" />
        </Form.Item>
        <Form.Item label="Distribution Time" name="distributionTime">
          <Input onChange={ (e) => circuitForm.formDistributionTime = e.target.value} placeholder="Distribution Time" />
        </Form.Item>
        <Form.Item label="Tree id" name="treeId">
          <Input onChange={ (e) => circuitForm.formTreeId = e.target.value} placeholder="Tree id" />
        </Form.Item>
        <Form.Item label="Calendar" name="calendar">
          <Input onChange={ (e) => circuitForm.formCalendar = e.target.value} placeholder="Calendar" />
        </Form.Item>
        <Form.Item label="Product" name="product">
          <Input onChange={ (e) => circuitForm.formProduct = e.target.value} placeholder="Product" />
        </Form.Item>
        <Form.Item label="Group Id" name="groupId">
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