"use client";

import { useEffect, useRef, useState } from 'react';

interface Node {
  id: string;
  name: string;
  type: 'spirit' | 'agent' | 'trainer' | 'collector';
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: string[];
}

interface Edge {
  source: string;
  target: string;
  type: 'ownership' | 'training' | 'collection';
  strength: number;
}

export default function AgentNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<'ecosystem' | 'ownership' | 'relationships'>('ecosystem');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create nodes
    const nodes: Node[] = [
      // Central SPIRIT node
      { id: 'spirit', name: '$SPIRIT', type: 'spirit', x: canvas.width / 2, y: canvas.height / 2, vx: 0, vy: 0, connections: [] },
      
      // Agent nodes
      { id: 'abraham', name: 'ABRAHAM', type: 'agent', x: 0, y: 0, vx: 0, vy: 0, connections: ['spirit', 'gene'] },
      { id: 'solienne', name: 'SOLIENNE', type: 'agent', x: 0, y: 0, vx: 0, vy: 0, connections: ['spirit', 'seth'] },
      { id: 'koru', name: 'KORU', type: 'agent', x: 0, y: 0, vx: 0, vy: 0, connections: ['spirit', 'ryan'] },
      { id: 'geppetto', name: 'GEPPETTO', type: 'agent', x: 0, y: 0, vx: 0, vy: 0, connections: ['spirit', 'shane'] },
      { id: 'miyomi', name: 'MIYOMI', type: 'agent', x: 0, y: 0, vx: 0, vy: 0, connections: ['spirit', 'alex'] },
      
      // Trainer nodes
      { id: 'gene', name: 'GENE', type: 'trainer', x: 0, y: 0, vx: 0, vy: 0, connections: ['abraham'] },
      { id: 'seth', name: 'SETH', type: 'trainer', x: 0, y: 0, vx: 0, vy: 0, connections: ['solienne'] },
      { id: 'ryan', name: 'RYAN', type: 'trainer', x: 0, y: 0, vx: 0, vy: 0, connections: ['koru'] },
      { id: 'shane', name: 'SHANE', type: 'trainer', x: 0, y: 0, vx: 0, vy: 0, connections: ['geppetto'] },
      { id: 'alex', name: 'ALEX', type: 'trainer', x: 0, y: 0, vx: 0, vy: 0, connections: ['miyomi'] },
      
      // Major collector nodes
      { id: 'collector1', name: 'WHALE.ETH', type: 'collector', x: 0, y: 0, vx: 0, vy: 0, connections: ['spirit', 'abraham', 'solienne'] },
      { id: 'collector2', name: 'PATRON.ETH', type: 'collector', x: 0, y: 0, vx: 0, vy: 0, connections: ['spirit', 'koru'] },
      { id: 'collector3', name: 'STEWARD.ETH', type: 'collector', x: 0, y: 0, vx: 0, vy: 0, connections: ['geppetto', 'miyomi'] },
    ];

    // Position nodes in initial formation
    const agentNodes = nodes.filter(n => n.type === 'agent');
    const trainerNodes = nodes.filter(n => n.type === 'trainer');
    const collectorNodes = nodes.filter(n => n.type === 'collector');

    // Position agents in circle around SPIRIT
    agentNodes.forEach((node, i) => {
      const angle = (i / agentNodes.length) * Math.PI * 2;
      const radius = 150;
      node.x = canvas.width / 2 + Math.cos(angle) * radius;
      node.y = canvas.height / 2 + Math.sin(angle) * radius;
    });

    // Position trainers outside agents
    trainerNodes.forEach((node, i) => {
      const angle = (i / trainerNodes.length) * Math.PI * 2;
      const radius = 250;
      node.x = canvas.width / 2 + Math.cos(angle) * radius;
      node.y = canvas.height / 2 + Math.sin(angle) * radius;
    });

    // Position collectors at edges
    collectorNodes.forEach((node, i) => {
      const angle = (i / collectorNodes.length) * Math.PI * 2 + Math.PI / 6;
      const radius = 320;
      node.x = canvas.width / 2 + Math.cos(angle) * radius;
      node.y = canvas.height / 2 + Math.sin(angle) * radius;
    });

    // Create edges based on view
    const edges: Edge[] = [];
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        if (selectedView === 'ecosystem' || 
            (selectedView === 'ownership' && (node.type === 'spirit' || node.type === 'collector')) ||
            (selectedView === 'relationships' && (node.type === 'agent' || node.type === 'trainer'))) {
          edges.push({
            source: node.id,
            target: targetId,
            type: node.type === 'trainer' ? 'training' : node.type === 'collector' ? 'collection' : 'ownership',
            strength: node.type === 'spirit' ? 1 : 0.5
          });
        }
      });
    });

    // Physics simulation
    const simulate = () => {
      // Apply forces
      nodes.forEach(node => {
        if (node.type === 'spirit') return; // Keep SPIRIT fixed

        // Attraction to connected nodes
        node.connections.forEach(targetId => {
          const target = nodes.find(n => n.id === targetId);
          if (target) {
            const dx = target.x - node.x;
            const dy = target.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
              const force = 0.01;
              node.vx += (dx / distance) * force;
              node.vy += (dy / distance) * force;
            }
          }
        });

        // Repulsion from all nodes
        nodes.forEach(other => {
          if (other.id === node.id) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < 100) {
            const force = 50 / (distance * distance);
            node.vx -= (dx / distance) * force;
            node.vy -= (dy / distance) * force;
          }
        });

        // Damping
        node.vx *= 0.9;
        node.vy *= 0.9;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Keep within bounds
        node.x = Math.max(50, Math.min(canvas.width - 50, node.x));
        node.y = Math.max(50, Math.min(canvas.height - 50, node.y));
      });
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simulate physics
      simulate();

      // Draw edges
      edges.forEach(edge => {
        const source = nodes.find(n => n.id === edge.source);
        const target = nodes.find(n => n.id === edge.target);
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = edge.type === 'ownership' ? '#ffffff40' : 
                           edge.type === 'training' ? '#ffffff20' : '#ffffff10';
          ctx.lineWidth = edge.strength * 2;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const isHovered = node.id === hoveredNode;
        const radius = node.type === 'spirit' ? 30 : 
                       node.type === 'agent' ? 20 : 
                       node.type === 'trainer' ? 15 : 12;

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'spirit' ? '#fff' : 
                        node.type === 'agent' ? '#ccc' : 
                        node.type === 'trainer' ? '#999' : '#666';
        ctx.fill();
        
        if (isHovered) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Node label
        ctx.fillStyle = node.type === 'spirit' ? '#000' : '#fff';
        ctx.font = node.type === 'spirit' ? 'bold 12px monospace' : '10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const hoveredNode = nodes.find(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        const radius = node.type === 'spirit' ? 30 : 
                       node.type === 'agent' ? 20 : 15;
        return Math.sqrt(dx * dx + dy * dy) < radius;
      });

      setHoveredNode(hoveredNode?.id || null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [selectedView, hoveredNode]);

  return (
    <div className="border border-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl">AGENT NETWORK</h2>
          <p className="text-sm opacity-60 mt-1">
            {selectedView === 'ecosystem' ? 'Complete ecosystem relationships' :
             selectedView === 'ownership' ? '$SPIRIT token ownership structure' :
             'Agent-trainer relationships'}
          </p>
        </div>
        
        <div className="flex border border-white/30">
          <button
            onClick={() => setSelectedView('ecosystem')}
            className={`px-3 py-1 text-xs ${selectedView === 'ecosystem' ? 'bg-white text-black' : ''}`}
          >
            ECOSYSTEM
          </button>
          <button
            onClick={() => setSelectedView('ownership')}
            className={`px-3 py-1 text-xs ${selectedView === 'ownership' ? 'bg-white text-black' : ''}`}
          >
            OWNERSHIP
          </button>
          <button
            onClick={() => setSelectedView('relationships')}
            className={`px-3 py-1 text-xs ${selectedView === 'relationships' ? 'bg-white text-black' : ''}`}
          >
            RELATIONSHIPS
          </button>
        </div>
      </div>

      <canvas 
        ref={canvasRef}
        className="w-full h-[500px] border border-white/30"
        style={{ imageRendering: 'crisp-edges' }}
      />

      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white"></div>
          <span>$SPIRIT TOKEN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300"></div>
          <span>AGENTS</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500"></div>
          <span>TRAINERS</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700"></div>
          <span>COLLECTORS</span>
        </div>
      </div>

      {hoveredNode && (
        <div className="mt-4 p-4 border border-white/30 bg-black">
          <p className="text-sm">
            <span className="opacity-60">SELECTED:</span> {hoveredNode.toUpperCase()}
          </p>
          {hoveredNode === 'spirit' && (
            <p className="text-xs opacity-60 mt-1">Portfolio token - 25% ownership of all agent tokens</p>
          )}
          {['abraham', 'solienne', 'koru', 'geppetto', 'miyomi'].includes(hoveredNode) && (
            <p className="text-xs opacity-60 mt-1">AI agent earning revenue from creations</p>
          )}
          {['gene', 'seth', 'ryan', 'shane', 'alex'].includes(hoveredNode) && (
            <p className="text-xs opacity-60 mt-1">Human trainer - 25% revenue share</p>
          )}
        </div>
      )}
    </div>
  );
}