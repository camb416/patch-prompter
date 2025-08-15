import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { loadStylePresets } from '../utils/styleLoader';
import { generateSyntheticStyles } from '../utils/syntheticStyles';

function StyleNode({ data, isConnectable }) {
  const [selectedStyle, setSelectedStyle] = useState(data.selectedStyle || '');
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [styleData, setStyleData] = useState(null);

  useEffect(() => {
    const loadStyles = async () => {
      try {
        const presets = await loadStylePresets();
        const syntheticStyles = await generateSyntheticStyles();
        const allStyles = [...presets, ...syntheticStyles];
        setStyles(allStyles);
      } catch (error) {
        console.error('Error loading styles:', error);
        setStyles([]);
      } finally {
        setLoading(false);
      }
    };
    loadStyles();
  }, []);

  const updateStyledOutput = useCallback(() => {
    if (styleData && data.textInput) {
      const styledOutput = `${data.textInput}, ${styleData.description}`;
      data.styledOutput = styledOutput;
      data.text = styledOutput;
    } else if (styleData) {
      data.styledOutput = styleData.description;
      data.text = styleData.description;
    }
  }, [styleData, data]);

  const handleStyleChange = useCallback((styleId) => {
    setSelectedStyle(styleId);
    data.selectedStyle = styleId;
    
    if (styleId) {
      const style = styles.find(s => s.id === styleId);
      setStyleData(style);
      data.styleData = style;
    } else {
      setStyleData(null);
      data.styleData = null;
    }
  }, [styles, data]);

  useEffect(() => {
    updateStyledOutput();
  }, [data.textInput, updateStyledOutput]);

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: 'white', minWidth: '180px' }}>
      <div style={{ marginBottom: '5px', fontSize: '12px', fontWeight: 'bold' }}>
        🎨 Style Preset
      </div>
      
      {loading ? (
        <div style={{ fontSize: '10px', color: '#666' }}>Loading styles...</div>
      ) : (
        <>
          <select
            value={selectedStyle}
            onChange={(e) => handleStyleChange(e.target.value)}
            style={{
              width: '100%',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '12px',
              marginBottom: '5px'
            }}
          >
            <option value="">Select a style...</option>
            {styles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.title}
              </option>
            ))}
          </select>
          
          {selectedStyle && styleData && (
            <div style={{
              fontSize: '10px',
              color: '#666',
              background: '#f5f5f5',
              padding: '5px',
              borderRadius: '3px',
              marginBottom: '5px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{styleData.title}</div>
              <div>{styleData.description.substring(0, 50)}...</div>
            </div>
          )}
        </>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="text-input"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="style-output"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default StyleNode;