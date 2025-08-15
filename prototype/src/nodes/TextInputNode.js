import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

function TextInputNode({ data, isConnectable }) {
  const [text, setText] = useState(data.text || '');

  const onChange = useCallback((evt) => {
    setText(evt.target.value);
    data.text = evt.target.value;
  }, [data]);

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: 'white' }}>
      <div style={{ marginBottom: '5px', fontSize: '12px', fontWeight: 'bold' }}>
        Text Input
      </div>
      <textarea
        value={text}
        onChange={onChange}
        placeholder="Enter your text prompt..."
        rows={3}
        style={{
          width: '200px',
          border: '1px solid #ccc',
          borderRadius: '3px',
          padding: '5px',
          fontSize: '12px',
          resize: 'none'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="text-output"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextInputNode;