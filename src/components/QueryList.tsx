import { Affix, Button, Card, Col, List, Modal, Row, Space, Tooltip } from "antd";
import React from "react"
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { changeCircuitSelection, clearQueries, deleteCircuit } from "../store/md-circuits/actions";
import { RootState } from "../store/root-reducer";
import { DatabaseFilled, CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';
import path from 'path'
import Title from "antd/lib/typography/Title";
import ModalCircuit from './results/ModalCircuit';
import { createFormatedQuery, createUnformattedQuery } from "./md-circuits/ParseCircuit";

const mapState = (state: RootState) => ({
  circuitsHistory: state.circuits.circuitsHistory,
});

const mapDispatch = {
  deleteCircuit: deleteCircuit,
  changeCircuitSelection: changeCircuitSelection,

  clearQueries: clearQueries,
};

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>


class QueryList extends React.Component<PropsFromRedux, { displayResults: boolean, displayDanger: boolean }> {

  constructor(props: PropsFromRedux){
    super(props);
    this.state = {
      displayResults: false,
      displayDanger: false,
    };
  }

  showDangerModal = () => {
    
  }


  showResultModal = () => {
    this.setState({
      displayResults: true,
    });
  };

  handleOkResultModal = (e: any) => {
    this.setState({     
      displayResults: false,
    });
  };

  render() {
    return (
      <div style={{marginTop: 10}}>
      <Card title="Query list">
      <Row>
        <Col span={4}/>
        <Col span={16}>
        {/* <div style={{maxHeight: "200px", overflowY: "scroll", border: "#fff"}}> */}
          <List
            itemLayout="horizontal"
            dataSource={this.props.circuitsHistory}
            bordered
            split
            size="small"
            rowKey={(e) => e.circuitShortname}
            style={{overflowY: "scroll", maxHeight: "200px"}}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Button shape="circle" icon={<DatabaseFilled />} />}
                  title={<Link to={path.join('circuits', `${index}`)} onClick={() => this.props.changeCircuitSelection(index)}>{"MD_CIRCUITS - " + index + ": " + item.circuitShortname}</Link> }
                  description={`circuit_shortname: ${item.circuitShortname}, circuit_longname: ${item.circuitLongname}, calendar:${item.calendar}, distribution_time: ${item.distributionTime}, tree_id: ${item.treeID}, group_id: ${item.groupID}, product: ${item.product}`}
                />
                <CloseCircleFilled className="removeQuery" onClick={() => this.props.deleteCircuit(item.ID)} />
              </List.Item>
            )}
          >
          </List>     
        </Col>
        <div style={{ marginRight:10, float: 'right', display: 'flex', alignItems: "flex-end"}}>
          <Col span={2} >
            {this.props.circuitsHistory.length > 0 ?
            <div>
              <Tooltip title="Show SQL">
                <Button htmlType="button" type="primary" icon={<DatabaseFilled/>} onClick={() => this.showResultModal()} ></Button>
              </Tooltip>
              <Tooltip title="Clear queue">
                <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => this.setState({displayDanger: true})} />
              </Tooltip>   
            </div>: "" 
            }
          </Col>
        </div>
      </Row>
      <ModalCircuit visible={this.state.displayResults} 
                    handleOk= {(e: any) => this.handleOkResultModal(e)} 
                    prettySql={this.props.circuitsHistory.map((e) => createFormatedQuery(e))}
                    tinySql={this.props.circuitsHistory.map((e) => createUnformattedQuery(e))}/>
      <Modal
        title="Are you sure you want to erase all queries?"
        centered
        visible={this.state.displayDanger}
        onCancel={(e) => this.setState({displayDanger: false})}
        cancelText="Cancel"
        onOk={() => {this.props.clearQueries(); this.setState({displayDanger: false})}}
        okText="Erase"
        width={512}
        className="modal"
        okButtonProps={{danger: true}}
      >
        This action cannot be undone
      </Modal>
      </Card>
      </div>
    )
  }
}

export default connector(QueryList)