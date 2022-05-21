import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Handle,
  Position,
  NodeProps
} from "react-flow-renderer";
import logo from "./logo.svg";
import "./App.css";
import { BaseNode } from './components/BaseNode/BaseNode';
import { MicrophoneNode } from './components/MicrophoneNode/MicrophoneNode';

const initialNodes: Node[] = [
  {
    id: "1",
    type: "microphoneNode",
    data: {},
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];
function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({microphoneNode: MicrophoneNode }), []);

  return (
    <div className="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
		  nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
		  onConnect={onConnect}
		  fitView
        />
      </div>
    </div>
  );
}

export default App;