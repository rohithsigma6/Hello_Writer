import React, { useMemo, useState, useEffect } from "react";
import ReactFlow, {
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  getBezierPath,
} from "reactflow";
import "reactflow/dist/style.css";
import AddRelationshipModal from "./add-relationship-modal";
import { useAddCharacterRelationship, useCharacterRelationship, useUpdateCharacterRelationshipPosition } from "../api/relationship-add";
import { useLocation, useParams } from "react-router";
import { enqueueSnackbar } from "notistack";
import userImage from "@/assets/default-user.png"

async function filterConnections(data) {
  const filtered = [];
  const seenConnections = new Set();

  // Using a for...of loop to await asynchronous actions (if needed)
  for (const connection of data) {
    const { source, target, id } = connection;

    // Skip self-loops
    if (source === target) continue;

    // Create a unique key for bidirectional connections
    const connectionKey = [source, target].sort().join('-');

    // Ensure no duplicate connections regardless of direction
    if (!seenConnections.has(connectionKey)) {
      seenConnections.add(connectionKey);
      filtered.push(connection);
    }
  }

  console.log(filtered);
  return filtered;
}


// Main Component
const CharacterRelationship = () => {
  const updatePositionMutation = useUpdateCharacterRelationshipPosition();
  const { fileId } = useParams<{ fileId?: string; }>();
  const { data, isLoading, error } = useCharacterRelationship({ fileId });
console.log(data)
  const [addModal, setAddModal] = useState(false);
  const [currentData, setCurrentData] = useState({})
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const charId = queryParams.get("charId");
  const handleClosePopup4 = () => {
    setAddModal(false);
  };

  // Random position generator for nodes
  const getRandomPosition = (index) => ({
    x: Math.random() * 400 + index * 150,
    y: Math.random() * 300 + index * 100,
  });

  const addRelationshipMutation = useAddCharacterRelationship();
    const addRelationship = (id) => {
      addRelationshipMutation.mutate(
        { fileId: fileId, characterId: id, connections: [] },
        {
          onSuccess: () => {
            enqueueSnackbar('Relationship added successfully!');
          },
          onError: (error) => {
            console.error('Error adding relationship:', error);
          },
        },
      );
    }
  // Effect to process data and create nodes & edges
  useEffect(() => {
    if (data) {
      console.log(data);
      if(data?.relationships.length < 1){
        if(charId){
          addRelationship(charId);
        }
      }
      
      // Create new nodes
      const newNodes = data?.relationships?.map((item, index) => ({
        id: item.characterId?._id,
        type: "custom",
        data: {
          name: item?.characterId?.allTemplate?.characterBuilder
            ?.basicInfo?.name ||
            item?.characterId?.allTemplate?.characterBlueprint
              ?.characterName ||
            item?.characterId?.allTemplate?.freeform
              ?.characterName ||
            'test',
          role: item.characterId.allTemplate.characterBuilder?.characterStory?.roleInScreenPlay || "Unknown",
          connections: item.connections.length,
          image:  item?.characterId?.allTemplate?.characterBuilder
          ?.basicInfo?.photo ||
        item?.characterId?.allTemplate?.characterBlueprint
          ?.photo ||
        item?.characterId?.allTemplate?.freeform?.photo ||
        null ,
          allData:item
        },
        position: item?.position || getRandomPosition(index),
        draggable: true,
      }));
      
      // Create new edges and clear old ones
      const newEdges = data?.relationships?.flatMap((item) => {
        const id = item?.characterId?._id;
        const seenEdges = new Set();  // To track edge IDs as unique, irrespective of direction (source-target)
      
        return item?.connections?.map((conn) => {
          const sourceId = id;
          const targetId = conn?.id?._id;
          
          // Create the edge ID as a string formatted as 'e{sourceId}-{targetId}' and its reverse 'e{targetId}-{sourceId}'
          const edgeId1 = `e${sourceId}-${targetId}`;
          const edgeId2 = `e${targetId}-${sourceId}`;
          
          // If the edgeId1 or edgeId2 has already been seen, it's a duplicate
          if (seenEdges.has(edgeId1) || seenEdges.has(edgeId2)) {
            return null;  // Exclude this edge (it's a duplicate)
          }
      
          // Otherwise, add the edge IDs to the seenEdges set
          seenEdges.add(edgeId1);
          seenEdges.add(edgeId2);
          
          // Return the edge if it's unique
          return {
            id: edgeId1,
            source: sourceId,
            target: targetId,
            type: "straight",
            style: { stroke: "#653EFF" },
            label: conn?.relationship,
          };
        }).filter((edge) => edge !== null);  // Remove null (duplicate) edges
      });
      
      
  
      if(!addModal){

        // Filter out duplicate connections
        filterConnections(newEdges).then((res)=>{
          console.log("sasassssssssssssss",res);
          
          setEdges(res);
        })
        
        // Set the new edges and nodes
        setNodes(newNodes); 
      }
    }
  }, [data, addModal]);
  

  // Custom Node for React Flow
  const CustomNode = ({ data, position, isDraggable, onToggleDrag }) => (
    <div style={nodeCardStyle} className="react-flow__node-default">
      {data.image ?<img src={data.image||userImage} alt="avatar" style={avatarStyle} className="mx-auto" />:<></>}
      <div style={{ textAlign: "center" }}>
        <strong>{data.name}</strong>
        <p style={{ fontSize: "12px", color: "#777" }}>{data.role}</p>

        <button   className=" font-poppins  rounded-lg  bg-[#653EFF] px-2 py-1 text-white" onClick={() =>{setAddModal(true); setCurrentData(data?.allData)}}>
          Add Connection
        </button>

        <p style={{ fontSize: "12px", marginTop: "5px", color: "#653EFF" }} className="text-['#653EFF'] underline font-medium">
          {data.connections} Connections
        </p>
      </div>

      <Handle
  type="source"
  position={Position.Bottom}
  style={{ bottom: 0, right: 0, background: 'transparent' }} // For the connection from the top-right
/>
<Handle
  type="target"
  position={Position.Top}
  style={{ top: 0, right: 0, background: 'transparent' }} // Optional: for the target handle
/>

    </div>
  );

  const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, label }) => {
    const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });
  
    // Position adjustments for label
    const labelX = (sourceX + targetX) / 2;
    const labelY = (sourceY + targetY) / 2 - 10; // Above the edge
  
    return (
      <>
        <path
          id={id}
          d={edgePath}
          stroke="#653EFF"
          fill="#aaa"
          strokeWidth={2}
        />
  
        {/* Background Rectangle */}
        <rect
          x={labelX - 30}   // Adjust width
          y={labelY - 12}   // Adjust height
          width={60}        // Width of the background
          height={20}       // Height of the background
          rx={5}            // Rounded corners
          ry={5}
          fill="rgba(101, 62, 255, 0.8) " // Background color (with some transparency)
        />
  
        {/* Label Text */}
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fill="#aaa"           // Text color (white for contrast)
          fontSize="12px"
          fontWeight="bold"
        >
          {label}
        </text>
      </>
    );
  };

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const handleToggleDrag = (nodeId) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, draggable: !node.draggable } : node
      )
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading relationships.</p>;

  return (
    <div className="types-wrapper w-[100%] h-[100vh] bg-slate-100 overflow-y-scroll">
      <div className="mt-[32px] ml-[40px] mr-[40px] overflow-x-hidden">
        <div className="bg-white rounded-[24px] px-[32px] pt-[40px] font-poppins">
          <div style={{ width: "100%", height: "650px" }}>
<ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  fitView
  nodeTypes={nodeTypes}
  edgeTypes={{ custom: CustomEdge }}  // Register custom edge={nodeTypes}
  panOnDrag
  onNodeDragStop={(event, node) => {     
    // Log new node position (optional)
    console.log(`Node moved to position: x=${node.position.x}, y=${node.position.y}`);
    
    // Update the position of the node in your local state or backend
    updatePositionMutation.mutate(
      { 
        relationshipId: node?.data?.allData?._id, 
        position: { x: node.position.x, y: node.position.y } 
      },
      {
        onSuccess: () => {
          // Handle any UI changes if needed after successful position update
        },
        onError: (error) => {
          console.error('Error updating position:', error);
        },
      }
    );

    // Update edges accordingly
    const updatedEdges = edges.map((edge) => {
      // Check if the moved node is part of the edge
      if (edge.source === node.id || edge.target === node.id) {
        // Update edge position if necessary (though React Flow will typically manage edge rerouting)
        // Optional: Logic can be added to specifically update edge positions based on the moved node
      }
      return edge;
    });

    setEdges(updatedEdges); // Update state with modified edges if necessary
  }}
>
  <Controls />
</ReactFlow>

          </div>
        </div>
      </div>
     {addModal && <AddRelationshipModal isOpen={addModal} onClose={handleClosePopup4}  currentData={currentData}/>}
    </div>
  );
};

export default CharacterRelationship;

// Custom Styles
const nodeCardStyle = {
  width: 180,
  padding: 15,
  borderRadius: "12px",
  background: "#fff",
  // boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  border: "1px solid #ddd",
  cursor: "grab",
  userSelect: "none",
};

const avatarStyle = {
  width: 50,
  height: 50,
  borderRadius: "50%",
  marginBottom: 5,
};


