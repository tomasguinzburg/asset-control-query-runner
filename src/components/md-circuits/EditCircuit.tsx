import React from 'react';
import Moment from 'moment';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import ModalCircuit from '../results/ModalCircuit';
import { FormValues } from './FormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { editCircuit } from '../../store/md-circuits/actions';

import { Layout, Breadcrumb, Form, Input, Button, List, Col, DatePicker } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DatabaseFilled, CloseCircleFilled } from '@ant-design/icons';
import { circuitsReducer } from '../../store/md-circuits/reducer';

//
// Styles
//
const {Content} = Layout;
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

//
// Redux+Typescript boilerplate
//
const mapState = (state: RootState) => ({
  circuit: state.circuits.circuitsHistory[state.circuits.selected]
});

const mapDispatch = {
  editCircuit: editCircuit,
};

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>

//
// Component
//
class EditCircuit extends React.Component<PropsFromRedux, { displayResults: boolean }> {

formRef = React.createRef<FormInstance>();

  constructor(props: PropsFromRedux){
    super(props);
    this.state = {
      displayResults: false
    };
  }

  onFinish = (values: FormValues) => {
    this.props.editCircuit({ ...values 
                          , ID: this.props.circuit.ID
                          , distributionTime: Moment(values.distributionTime).format('YYYY-MM-DD HH:mm:ss')
                          });

    this.formRef.current?.resetFields();
  }
  
  render() {
    return (
      <Switch>
        <Route exact path="/circuits">
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
            <Form.Item label="circuit_shortname" 
                   name="circuitShortname"
                   hasFeedback
                   rules={[{ required: true, type: 'string' }]}
        >
              <Col span={6}>
                <Input placeholder="circuit_shortname" />
              </Col>
            </Form.Item>
            <Form.Item label="circuit_longname" 
                      name="circuitLongname"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
              <Col span={10}>
              <Input placeholder="circuit_longname" />
              </Col>
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
              <Col span={4}>
                <Input placeholder="tree_id" />
              </Col>
            </Form.Item>
            <Form.Item label="calendar" 
                      name="calendar"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
              <Col span={4}>
                <Input placeholder="calendar" />
              </Col>
            </Form.Item>
            <Form.Item label="product" 
                      name="product"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >

              <Col span={10}>
                <Input placeholder="product" />
              </Col>
            </Form.Item>
            <Form.Item label="group_id" 
                      name="groupID"
                      hasFeedback
                      rules={[{ required: true, type: 'string'}
                              ,  ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!isNaN(value)) {
                                          return Promise.resolve();
                                        }
                                    return Promise.reject('group_id should be numeric');
                                    }
                                })
                              ]}
            >
              <Col span={3}>
                <Input placeholder="0"/>
              </Col>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary"  htmlType="submit" >Add Query</Button>
            </Form.Item>
          </Form>
          </Content>
        </Route>
        {/* <Route path={`/circuits/:circuit_id`}>
          <EditCircuit query={this.props.circuitsHistory[0]} onFinish={this.onEdit} index={0}/>
        </Route> */}
      </Switch>
     );
   }


  createFormatedQuery = (form: FormValues): string => {
    return `insert into SAN_AC_MR_PRO.MD_CIRCUITS ( CIRCUIT_ID
                                      , CIRCUIT_SHORTNAME
                                      , CIRCUIT_LONGNAME
                                      , DISTRIBUTION_TIME
                                      , TIME_ZONE_ID
                                      , TREE_ID
                                      , CALENDAR
                                      , PRODUCT
                                      , GROUP_ID
                                      , TYPE_ID
                                      )
                               values ( SAN_AC_MR_PRO.CIRCUIT_SEQ.NEXTVAL
                                      , '${form.circuitShortname}'
                                      , '${form.circuitLongname}'
                                      , to_timestamp('${form.distributionTime}', 'yyyy/mm/dd HH24:mi:ss)'
                                      , '${form.treeID}'
                                      , '${form.calendar}'
                                      , '${form.product}'
                                      , ${form.groupID}
                                      , (select TYPE_ID from SAN_AC_MR_PRO.MD_TYPES where TYPE_SHORTNAME = 'MD')
                                      );`;
  }

  createUnformattedQuery = (form: FormValues): string => {
    return `insert into SAN_AC_MR_PRO.MD_CIRCUITS ( CIRCUIT_ID, CIRCUIT_SHORTNAME, CIRCUIT_LONGNAME, DISTRIBUTION_TIME, TIME_ZONE_ID, TREE_ID, CALENDAR, PRODUCT, GROUP_ID, TYPE_ID) values ( SAN_AC_MR_PRO.CIRCUIT_SEQ.NEXTVAL, '${form.circuitShortname}', '${form.circuitLongname}', to_timestamp('${form.distributionTime}', 'yyyy/mm/dd HH24:mi:ss)', '${form.treeID}', '${form.calendar}', '${form.product}', ${form.groupID}, (select TYPE_ID from SAN_AC_MR_PRO.MD_TYPES where TYPE_SHORTNAME = 'MD'));`;
  }

  onEdit = (index: number = 0, form : FormValues) => {
    // const queryHistory = this.state.circuits.slice(0, index).concat(form).concat(this.state.circuits.slice(index+1))
    // this.setState({circuitsHistory: queryHistory}); 
  }

  showModal = () => {
    this.setState({
      displayResults: true,
    });
  };

  handleOk = (e: any) => {
    this.setState({     
      displayResults: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      displayResults: false,
    });
  };

  isNumeric = (s: string) => {
    return !isNaN(parseInt(s));
  }
}

export default connector(EditCircuit)    //El AddCircuit que se exporta es igual pero diferente