import React from 'react';
import Moment from 'moment';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import path from 'path'

import ModalCircuit from '../results/ModalCircuit';
import { FormValues } from './FormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { addCircuit, changeCircuitSelection, clearCircuits, deleteCircuit } from '../../store/md-circuits/actions';

import { Layout, Breadcrumb, Form, Input, Button, List, Col, DatePicker, Row, Tooltip } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DatabaseFilled, CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';

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
  circuitsHistory: state.circuits.circuitsHistory
});

const mapDispatch = {
  addCircuit: addCircuit,
  deleteCircuit: deleteCircuit,
  clearCircuits: clearCircuits,
  changeCircuitSelection: changeCircuitSelection
};

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>

//
// Component
//
class AddCircuit extends React.Component<PropsFromRedux, { displayResults: boolean }> {

formRef = React.createRef<FormInstance>();

  constructor(props: PropsFromRedux){
    super(props);
    this.state = {
      displayResults: false
    };
  }

  onFinish = (values: FormValues) => {
    this.props.addCircuit({ ...values 
                          , ID: this.generateID()
                          , distributionTime: Moment(values.distributionTime).format('YYYY-MM-DD HH:mm:ss')
                          });

    this.formRef.current?.resetFields();
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
            <Form.Item label="circuit_shortname" 
                   name="circuitShortname"
                   hasFeedback
                   rules={[{ required: true, type: 'string' }]}
        >
                <Input placeholder="circuit_shortname" style={{width: "calc(70%)" }}/>
            </Form.Item>
            <Form.Item label="circuit_longname" 
                      name="circuitLongname"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
              <Input placeholder="circuit_longname" style={{width: "calc(100%)" }}/>
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
                <Input placeholder="tree_id" style={{width: "calc(20%)" }} />
            </Form.Item>
            <Form.Item label="calendar" 
                      name="calendar"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input placeholder="calendar" style={{width: "calc(20%)" }}/>
            </Form.Item>
            <Form.Item label="product" 
                      name="product"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input placeholder="product" style={{width: "calc(100%)" }}/>
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
                <Input placeholder="0" style={{width: "calc(20%)" }}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary"  htmlType="submit" >Add Query</Button>
              { this.props.circuitsHistory.length > 0 ? <Button htmlType="button" onClick={() => this.showModal()} >Generate SQL</Button> 
                                                      : <Button htmlType="button" disabled>Add a query first</Button> 
              }
            </Form.Item>
            <Form.Item label="Query List"
                shouldUpdate={(prevValues, curValues) => prevValues.history !== curValues.history}
              >
                <Row>
                  <Col span={22}>
                    <List
                      itemLayout="horizontal"
                      dataSource={this.props.circuitsHistory}
                      bordered
                      split
                      size="small"
                      rowKey={(e) => e.circuitShortname}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Button shape="circle" icon={<DatabaseFilled />} />}
                            title={<Link to={path.join('circuits', `${index}`)} onClick={() => this.props.changeCircuitSelection(index)}>{"Query " + index + ": " + item.circuitShortname}</Link> }
                            description={`circuit_shortname: ${item.circuitShortname}, circuit_longname: ${item.circuitLongname}, calendar:${item.calendar}, distribution_time: ${item.distributionTime}, tree_id: ${item.treeID}, group_id: ${item.groupID}, product: ${item.product}`}
                          />
                          <CloseCircleFilled className="removeQuery" onClick={() => this.props.deleteCircuit(item.ID)} />
                        </List.Item>
                      )}
                    >
                    </List>
                  </Col>

                  <div style={{ marginLeft:10, float: 'right', display: 'flex', alignItems: "flex-end" }}>
                    <Col span={2} >
                      {this.props.circuitsHistory.length > 0 ?
                        <Tooltip title="Clear queue">
                          <Button danger type="primary" icon={<DeleteOutlined />} onClick={this.props.clearCircuits} />
                        </Tooltip> : ""
                      }
                    </Col>
                  </div>
                </Row>
              </Form.Item>
          </Form>

          <ModalCircuit visible={this.state.displayResults} 
                        handleOk= {(e: any) => this.handleOk(e)} 
                        handleCancel= {(e: any) => this.handleCancel(e)} 
                        queries={this.props.circuitsHistory.map((e) => this.createFormatedQuery(e))}
                        unformattedQueries={this.props.circuitsHistory.map((e) => this.createUnformattedQuery(e))}/>
          </Content>
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

  generateID = () => {
    return this.props.circuitsHistory.sort((a, b) => (a.ID - b.ID))
                                     .reduce((acc, curr) => (acc === curr.ID ? acc+1 : acc), 0)
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

export default connector(AddCircuit)    //El AddCircuit que se exporta es igual pero diferente