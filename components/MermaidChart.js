import { useEffect, useRef, useState } from 'react';

export default function MermaidChart({ chart, className }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Only import and initialize mermaid on the client side
    const initializeMermaid = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        // Dynamically import mermaid only on client side
        const mermaid = (await import('mermaid')).default;
        
        // Reset previous initialization
        try {
          mermaid.reset();
        } catch (e) {
          // Ignore reset errors
        }
        
        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
          fontFamily: 'Bitter, Georgia, serif',
          fontSize: 16,
        });
        
        // Generate a unique ID for this chart
        const id = `mermaid-chart-${Math.random().toString(36).substring(2, 11)}`;
        
        // Clear previous content safely
        if (containerRef.current) {
          // Clear safely using innerHTML instead of DOM manipulation
          containerRef.current.innerHTML = '';
          
          // Create a new div for rendering
          const tempContainer = document.createElement('div');
          tempContainer.id = id;
          containerRef.current.appendChild(tempContainer);
          
          // Render after a small delay to ensure DOM is ready
          setTimeout(() => {
            try {
              mermaid.render(id, chart)
                .then(({ svg }) => {
                  if (containerRef.current) {
                    // Replace the temp container with SVG content
                    containerRef.current.innerHTML = svg;
                    setLoaded(true);
                  }
                })
                .catch(err => {
                  console.error('Mermaid rendering error:', err);
                  if (containerRef.current) {
                    containerRef.current.innerHTML = `<div style="color: #c75e17; padding: 20px; text-align: center; border: 1px dashed #c75e17; border-radius: 8px;">
                      Error rendering diagram: ${err.message || 'Unknown error'}
                    </div>`;
                  }
                });
            } catch (error) {
              console.error('Mermaid execution error:', error);
              if (containerRef.current) {
                containerRef.current.innerHTML = `<div style="color: #c75e17; padding: 20px; text-align: center; border: 1px dashed #c75e17; border-radius: 8px;">
                  Error rendering diagram: ${error.message || 'Unknown error'}
                </div>`;
              }
            }
          }, 100);
        }
      } catch (error) {
        console.error('Failed to load mermaid:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div style="color: #c75e17; padding: 20px; text-align: center; border: 1px dashed #c75e17; border-radius: 8px;">
            Failed to load diagram library: ${error.message || 'Unknown error'}
          </div>`;
        }
      }
    };
    
    initializeMermaid();
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        setLoaded(false);
        // Use innerHTML for safe cleanup without DOM node removal errors
        containerRef.current.innerHTML = '';
      }
    };
  }, [chart]);
  
  return (
    <div className={className} ref={containerRef}>
      {!loaded && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          color: '#8b5a2b',
          fontStyle: 'italic'
        }}>
          Loading diagram...
        </div>
      )}
    </div>
  );
} 