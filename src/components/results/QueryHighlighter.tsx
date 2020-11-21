import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class QueryHighlighter extends React.Component<{queries: string[]}> {
  handleFocus = (event: any) => {
    event.target.select();
  }

  render() {
    return (
      <div onFocus={this.handleFocus}>
      <SyntaxHighlighter 
        language="sql" 
        style={a11yDark}
      >
        {this.props.queries.reduce((acc, e) => acc + '\n' + e, "")}
      </SyntaxHighlighter>
      </div>
    );
  }
}

export default QueryHighlighter