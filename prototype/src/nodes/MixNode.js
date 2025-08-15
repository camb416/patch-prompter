import React, { useState, useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

function MixNode({ data, isConnectable }) {
  const [mixPercentage, setMixPercentage] = useState(data.mixPercentage || 50);

  const buildMixedOutput = useCallback(() => {
    if (data.input1 && data.input2) {
      const percentA = mixPercentage;
      const percentB = 100 - mixPercentage;
      const output = `${data.input1} (${percentA}%) ${data.input2} (${percentB}%)`;
      data.mixedOutput = output;
      data.text = output;
      return output;
    }
    return '';
  }, [data, mixPercentage]);

  const handleMixChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    setMixPercentage(value);
    data.mixPercentage = value;
    buildMixedOutput();
  }, [data, buildMixedOutput]);

  useEffect(() => {
    buildMixedOutput();
  }, [buildMixedOutput]);

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: 'white', minWidth: '200px' }}>
      <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold' }}>
        🎛️ Mix
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
          <strong>A:</strong> {data.input1 ? data.input1.substring(0, 25) + '...' : 'No input'}
        </div>
        <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px' }}>
          <strong>B:</strong> {data.input2 ? data.input2.substring(0, 25) + '...' : 'No input'}
        </div>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '10px', display: 'block', marginBottom: '4px' }}>
          Mix Ratio: {mixPercentage}% A / {100 - mixPercentage}% B
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={mixPercentage}
          onChange={handleMixChange}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{ width: '100%' }}
        />
      </div>
      
      {data.mixedOutput && (
        <div style={{ 
          fontSize: '9px', 
          color: '#333', 
          background: '#f5f5f5', 
          padding: '5px', 
          borderRadius: '3px',
          marginBottom: '5px'
        }}>
          <strong>Output:</strong> {data.mixedOutput.substring(0, 40)}...
        </div>
      )}

      <Handle type="target" position={Position.Left} id="input1" isConnectable={isConnectable} style={{ top: '30%' }} />
      <Handle type="target" position={Position.Left} id="input2" isConnectable={isConnectable} style={{ top: '70%' }} />
      <Handle type="source" position={Position.Right} id="text-output" isConnectable={isConnectable} />
    </div>
  );
}

export default MixNode;