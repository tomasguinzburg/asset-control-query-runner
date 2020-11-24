import React from 'react';
import { Modal, message, Button } from 'antd';
import QueryHighlighter from './QueryHighlighter';

interface ModalCircuitOwnProps {
  visible: boolean,
  handleOk: (e: any) => void;
  prettySql: string[];
  tinySql: string[];
}


class ModalCircuit extends React.Component<ModalCircuitOwnProps> {

  toClipboard = (event: any) => {
    navigator.clipboard.writeText(this.props.tinySql.reduce((acc, e) => acc + '\n' + e, "").substring(1));
    message.info('Queries copied to clipboard');
    this.props.handleOk(event);
  }

  toACLClipboard = (event: any) => {
    navigator.clipboard.writeText(this.props.tinySql.reduce((acc, e) => acc + '\n' + "SQL "+ e, "").substring(1));
    message.info('Queries copied to clipboard');
    this.props.handleOk(event);
  }
  
  render() {
    return (
      <Modal
        title="Generated queries"
        centered
        visible={this.props.visible}
        onCancel={(e) => this.props.handleOk(e)}
        cancelText="Close"
        width={1280}
        className="modal"
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Button type="primary" onClick={this.toClipboard}> Copy SQL </Button>
        <Button onClick={this.toACLClipboard}> Copy ACL </Button>  
        <QueryHighlighter queries={this.props.prettySql}/>
      </Modal>
    );

  }

}

export default ModalCircuit;