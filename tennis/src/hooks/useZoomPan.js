import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to handle image zooming and panning functionality
 * @returns {Object} State and handlers for zoom and pan
 */
const useZoomPan = () => {
  // State for zoom and pan
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);

  // Handle zooming with mouse wheel
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.5, scale + delta), 5); // Limit zoom between 0.5x and 5x
    setScale(newScale);
  };
  
  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };
  
  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (dragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };
  
  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };
  
  // Reset zoom and position on double click or double tap
  const handleDoubleClick = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  // Handle touch events for mobile devices
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const lastDistanceRef = useRef(null);
  
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Single touch - prepare for panning
      setDragging(true);
      const touch = e.touches[0];
      lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
      setDragStart({ 
        x: touch.clientX - position.x, 
        y: touch.clientY - position.y 
      });
    } else if (e.touches.length === 2) {
      // Two finger touch - prepare for pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      lastDistanceRef.current = distance;
    }
  };
  
  const handleTouchMove = (e) => {
    // Prevent default to avoid scrolling while interacting with the image
    e.preventDefault();
    
    if (e.touches.length === 1 && scale > 1) {
      // Single touch - panning
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    } else if (e.touches.length === 2 && lastDistanceRef.current !== null) {
      // Two finger touch - pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      // Calculate the new distance between two fingers
      const newDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      // Calculate scale change
      const delta = newDistance / lastDistanceRef.current;
      if (delta !== 0) {
        const newScale = Math.min(Math.max(0.5, scale * delta), 5);
        setScale(newScale);
        lastDistanceRef.current = newDistance;
      }
    }
  };
  
  const handleTouchEnd = () => {
    setDragging(false);
    lastDistanceRef.current = null;
  };

  // Add event listeners for both mouse and touch events
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Mouse events
      container.addEventListener('wheel', handleWheel);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);
      
      // Touch events
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
      container.addEventListener('touchcancel', handleTouchEnd);
    }
    
    return () => {
      if (container) {
        // Clean up mouse events
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
        
        // Clean up touch events
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchcancel', handleTouchEnd);
      }
    };
  }, [dragging, dragStart, scale, position]);

  return {
    scale,
    position,
    dragging,
    containerRef,
    handleMouseDown,
    handleDoubleClick,
    setScale
  };
};

export default useZoomPan;
