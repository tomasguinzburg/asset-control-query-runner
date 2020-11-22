import React from 'react';
import { Modal, message } from 'antd';
import QueryHighlighter from './QueryHighlighter';

interface ModalCircuitOwnProps {
  visible: boolean,
  handleOk: (e: any) => void;
  handleCancel: (e: any) => void;
  queries: string[];
}


class ModalCircuit extends React.Component<ModalCircuitOwnProps> {

  toClipboard = (event: any) => {
    navigator.clipboard.writeText(this.props.queries.reduce((acc, e) => acc + '\n' + e, "").substring(1));
    message.info('Queries copiadas al portapapeles');
    this.props.handleOk(event);
  }
  
  render() {
    return (
      <Modal
        title="Generated queries"
        centered
        visible={this.props.visible}
        onOk={(e) => this.toClipboard(e)}
        onCancel={(e) => this.props.handleCancel(e)}
        cancelText="Keep editing"
        okText="Copy to clipboard and clean queue"
        width={1280}
        className="modal"
      >
        <QueryHighlighter queries={this.props.queries}/>
      </Modal>
    );

  }

}

export default ModalCircuit;