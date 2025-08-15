import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { generateImage } from '../utils/openaiApi';

function ImageNode({ data, isConnectable }) {
  const [isLoading, setIsLoading] = useState(false);

  const { image, textInput, styleInput, mixedOutput, styledOutput, concatenatedOutput } = data;

  // Build final prompt with priority: styledOutput > mixedOutput > concatenatedOutput > textInput
  const buildFinalPrompt = useCallback(() => {
    let connectedInput = '';
    
    // Priority order: styledOutput, mixedOutput, concatenatedOutput, then textInput
    if (styledOutput) {
      connectedInput = styledOutput;
    } else if (mixedOutput) {
      connectedInput = mixedOutput;
    } else if (concatenatedOutput) {
      connectedInput = concatenatedOutput;
    } else if (textInput) {
      connectedInput = textInput;
    }

    let finalPrompt = connectedInput;
    
    if (styleInput && styleInput.description) {
      if (finalPrompt) {
        finalPrompt += `, ${styleInput.description}`;
      } else {
        finalPrompt = styleInput.description;
      }
    }
    
    return finalPrompt;
  }, [textInput, styleInput, mixedOutput, styledOutput, concatenatedOutput]);

  const handleGenerate = async () => {
    const finalPrompt = buildFinalPrompt();
    if (!finalPrompt.trim()) {
      alert('Please connect some text input to generate an image.');
      return;
    }

    setIsLoading(true);
    try {
      const imageUrl = await generateImage(finalPrompt);
      data.image = imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: 'white', minWidth: '150px' }}>
      <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold' }}>
        Image Generator
      </div>
      
      <div style={{ marginBottom: '10px', minHeight: '100px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {image ? (
          <img src={image} alt="Generated" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
        ) : (
          <div style={{ textAlign: 'center', color: '#666' }}>
            <div>🖼️</div>
            <div style={{ fontSize: '10px' }}>No image</div>
          </div>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '5px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '12px'
        }}
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>

      {/* Input handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="text-input"
        isConnectable={isConnectable}
        style={{ top: '30%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="style-input"
        isConnectable={isConnectable}
        style={{ top: '70%' }}
      />
    </div>
  );
}

export default ImageNode;