import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

function MyStyleNode({ data, isConnectable }) {
  const [customStyle, setCustomStyle] = useState(data.customStyle || {
    title: '',
    materials: [{ type: '', description: '' }],
    lighting: { intensity: '', source: '', effects: '' },
    colorPalette: { primary: '#000000', secondary: '#ffffff' },
    background: { type: '', mood: '' },
    moodKeywords: []
  });
  const [currentKeyword, setCurrentKeyword] = useState('');

  const updateStyle = useCallback((field, value) => {
    const newStyle = { ...customStyle, [field]: value };
    setCustomStyle(newStyle);
    data.customStyle = newStyle;
  }, [customStyle, data]);

  const updateMaterial = useCallback((index, field, value) => {
    const newMaterials = [...(customStyle.materials || [])];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    const newStyle = { ...customStyle, materials: newMaterials };
    setCustomStyle(newStyle);
    data.customStyle = newStyle;
  }, [customStyle, data]);

  const addMaterial = useCallback(() => {
    const newMaterials = [...(customStyle.materials || []), { type: '', description: '' }];
    const newStyle = { ...customStyle, materials: newMaterials };
    setCustomStyle(newStyle);
    data.customStyle = newStyle;
  }, [customStyle, data]);

  const removeMaterial = useCallback((index) => {
    const newMaterials = (customStyle.materials || []).filter((_, i) => i !== index);
    const newStyle = { ...customStyle, materials: newMaterials };
    setCustomStyle(newStyle);
    data.customStyle = newStyle;
  }, [customStyle, data]);

  const updateColorPalette = useCallback((field, value) => {
    const newColorPalette = { ...(customStyle.colorPalette || {}), [field]: value };
    const newStyle = { ...customStyle, colorPalette: newColorPalette };
    setCustomStyle(newStyle);
    data.customStyle = newStyle;
  }, [customStyle, data]);

  const addKeyword = useCallback(() => {
    if (currentKeyword.trim()) {
      const newKeywords = [...(customStyle.moodKeywords || []), currentKeyword.trim()];
      const newStyle = { ...customStyle, moodKeywords: newKeywords };
      setCustomStyle(newStyle);
      data.customStyle = newStyle;
      setCurrentKeyword('');
    }
  }, [currentKeyword, customStyle, data]);

  const removeKeyword = useCallback((index) => {
    const newKeywords = (customStyle.moodKeywords || []).filter((_, i) => i !== index);
    const newStyle = { ...customStyle, moodKeywords: newKeywords };
    setCustomStyle(newStyle);
    data.customStyle = newStyle;
  }, [customStyle, data]);

  const generateStyleDescription = useCallback(() => {
    let description = '';
    
    if (customStyle.title) {
      description += `${customStyle.title} style. `;
    }
    
    if (customStyle.materials && customStyle.materials.length > 0) {
      const materialDescriptions = customStyle.materials
        .filter(m => m.type || m.description)
        .map(m => `${m.type} ${m.description}`.trim())
        .join(', ');
      if (materialDescriptions) {
        description += `Materials: ${materialDescriptions}. `;
      }
    }
    
    if (customStyle.moodKeywords && customStyle.moodKeywords.length > 0) {
      description += `Mood: ${customStyle.moodKeywords.join(', ')}. `;
    }
    
    return description.trim();
  }, [customStyle]);

  const updateStyledOutput = useCallback(() => {
    const styleDescription = generateStyleDescription();
    if (styleDescription && data.textInput) {
      const styledOutput = `${data.textInput}, ${styleDescription}`;
      data.styledOutput = styledOutput;
      data.text = styledOutput;
    } else if (styleDescription) {
      data.styledOutput = styleDescription;
      data.text = styleDescription;
    }
  }, [generateStyleDescription, data]);

  useEffect(() => {
    updateStyledOutput();
  }, [customStyle, data.textInput, updateStyledOutput]);

  return (
    <div style={{ 
      padding: '10px', 
      border: '1px solid #ddd', 
      borderRadius: '5px', 
      background: 'white', 
      minWidth: '250px',
      maxWidth: '300px'
    }}>
      <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold' }}>
        ✨ Custom Style
      </div>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>Title:</label>
          <input
            type="text"
            value={customStyle.title || ''}
            onChange={(e) => updateStyle('title', e.target.value)}
            placeholder="Style name"
            style={{ width: '100%', padding: '3px', fontSize: '10px', border: '1px solid #ccc', borderRadius: '2px' }}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>Materials:</label>
          {(customStyle.materials || []).map((material, index) => (
            <div key={index} style={{ display: 'flex', gap: '4px', marginBottom: '4px', alignItems: 'center' }}>
              <select
                value={material.type || ''}
                onChange={(e) => updateMaterial(index, 'type', e.target.value)}
                style={{ flex: '0 0 80px', padding: '2px', fontSize: '9px', border: '1px solid #ccc', borderRadius: '2px' }}
              >
                <option value="">Material...</option>
                <option value="metal">Metal</option>
                <option value="wood">Wood</option>
                <option value="fabric">Fabric</option>
                <option value="glass">Glass</option>
                <option value="plastic">Plastic</option>
                <option value="stone">Stone</option>
                <option value="ceramic">Ceramic</option>
                <option value="leather">Leather</option>
              </select>
              <input
                type="text"
                value={material.description || ''}
                onChange={(e) => updateMaterial(index, 'description', e.target.value)}
                placeholder="Description"
                style={{ flex: 1, padding: '2px', fontSize: '9px', border: '1px solid #ccc', borderRadius: '2px' }}
              />
              <button 
                onClick={() => removeMaterial(index)}
                style={{ padding: '2px 6px', fontSize: '10px', border: 'none', background: '#ff4444', color: 'white', borderRadius: '2px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
          ))}
          <button 
            onClick={addMaterial}
            style={{ fontSize: '9px', padding: '3px 6px', border: '1px solid #007bff', background: 'white', color: '#007bff', borderRadius: '2px', cursor: 'pointer' }}
          >
            + Add Material
          </button>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>Colors:</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '9px', display: 'block' }}>Primary:</label>
              <input
                type="color"
                value={customStyle.colorPalette?.primary || '#000000'}
                onChange={(e) => updateColorPalette('primary', e.target.value)}
                style={{ width: '100%', height: '20px', border: '1px solid #ccc', borderRadius: '2px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '9px', display: 'block' }}>Secondary:</label>
              <input
                type="color"
                value={customStyle.colorPalette?.secondary || '#ffffff'}
                onChange={(e) => updateColorPalette('secondary', e.target.value)}
                style={{ width: '100%', height: '20px', border: '1px solid #ccc', borderRadius: '2px' }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>Mood Keywords:</label>
          <div style={{ marginBottom: '4px' }}>
            {(customStyle.moodKeywords || []).map((keyword, index) => (
              <span key={index} style={{
                display: 'inline-block',
                background: '#e7f3ff',
                padding: '2px 6px',
                margin: '2px',
                fontSize: '9px',
                borderRadius: '10px',
                border: '1px solid #b3d9ff'
              }}>
                {keyword}
                <button 
                  onClick={() => removeKeyword(index)}
                  style={{ marginLeft: '4px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '10px' }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <input
              type="text"
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              placeholder="Add keyword"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addKeyword();
                }
              }}
              style={{ flex: 1, padding: '3px', fontSize: '9px', border: '1px solid #ccc', borderRadius: '2px' }}
            />
            <button 
              onClick={addKeyword}
              style={{ fontSize: '9px', padding: '3px 6px', border: '1px solid #007bff', background: 'white', color: '#007bff', borderRadius: '2px', cursor: 'pointer' }}
            >
              +
            </button>
          </div>
        </div>
      </div>

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

export default MyStyleNode;