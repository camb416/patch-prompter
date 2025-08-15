import React, { useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

function AddNode({ data, isConnectable }) {
  const buildConcatenatedOutput = useCallback(() => {
    const inputs = [];
    
    // Collect all available inputs
    if (data.input1) inputs.push(data.input1);
    if (data.input2) inputs.push(data.input2);
    if (data.input3) inputs.push(data.input3);
    
    // Join with spaces
    const output = inputs.join(' ');
    data.concatenatedOutput = output;
    data.text = output; // Also set as text for chaining
    
    return output;
  }, [data]);

  // Update output when inputs change
  useEffect(() => {
    buildConcatenatedOutput();
  }, [buildConcatenatedOutput]);

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: 'white', minWidth: '120px' }}>
      <div style={{ marginBottom: '5px', fontSize: '12px', fontWeight: 'bold' }}>
        ➕ ADD
      </div>
      
      <div style={{ fontSize: '10px', color: '#666', marginBottom: '5px' }}>
        Concatenates inputs with spaces
      </div>
      
      {/* Show preview of current inputs */}
      {(data.input1 || data.input2 || data.input3) && (
        <div style={{ fontSize: '9px', color: '#888', background: '#f5f5f5', padding: '3px', borderRadius: '2px' }}>
          {data.input1 && <div>A: {data.input1.substring(0, 15)}...</div>}
          {data.input2 && <div>B: {data.input2.substring(0, 15)}...</div>}
          {data.input3 && <div>C: {data.input3.substring(0, 15)}...</div>}
        </div>
      )}

      {/* Input handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="input1"
        isConnectable={isConnectable}
        style={{ top: '30%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input2"
        isConnectable={isConnectable}
        style={{ top: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input3"
        isConnectable={isConnectable}
        style={{ top: '70%' }}
      />
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="text-output"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default AddNode;