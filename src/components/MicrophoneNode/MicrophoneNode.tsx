import { useRef, useState } from 'react';
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { BaseNode } from "../BaseNode/BaseNode";

export const MicrophoneNode: React.FC<NodeProps<{}>> = (props) => {
	const [isMicrophoneOn, setisMicrophoneOn] = useState(false);

	const microphoneSteram = useRef<MediaStream>();
	const onToggleMicrophone = async () => {
		if (!isMicrophoneOn) {
			await startMicrophone();
		} else {
			stopMicrophone();
		}

		setisMicrophoneOn(!isMicrophoneOn);
	}

	const stopMicrophone = () => {
		if (microphoneSteram.current) {
			microphoneSteram.current.getTracks().forEach(track => track.stop());
		}
	}

	const startMicrophone =  async () => {
		const constraints = {audio: true};
		microphoneSteram.current = await navigator.mediaDevices.getUserMedia(constraints);
	}

  return (
    <>
      <Handle position={Position.Right} type="source" />
      <BaseNode>
	  <h3>Microphone node</h3>
	  <button onClick={onToggleMicrophone}>{isMicrophoneOn ? 'Turn Off' : 'Turn On'}</button>
	  </BaseNode>
    </>
  );
};
