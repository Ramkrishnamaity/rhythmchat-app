import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Socket } from "socket.io-client";
import Peer from "peerjs";
import { v4 as UUID } from "uuid";
import UserFeed from "../calls/UserFeed";

interface PropsType {
  socket: Socket | null
}

type ParticipantType = {
  roomId: string,
  users: {
    peerId: string,
    userId: string
  }
  hostId: string
}[]

const Calls: React.FC<PropsType> = ({ socket }) => {

  const [peer] = useState<Peer>(new Peer(UUID()))
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [video, setVideo] = useState<boolean>(true)
  const [audio, setAudio] = useState<boolean>(true)


  const { roomId, hostByUser } = useAppSelector(state => state.room)

  function fetchParticipants(room: ParticipantType) {
    console.log("room: ", room)
  }

  async function getUserFeed() {
    const stream = await navigator.mediaDevices.getUserMedia({ video, audio })
    setStream(stream)
  }

  useEffect(() => {
    if (roomId && hostByUser && peer) socket?.emit("room-join", { roomId, peerId: peer.id });
    socket?.on("get-room-members", fetchParticipants)
  }, [socket])

  useEffect(() => {
    getUserFeed()
  }, [audio, video])


  if (roomId) {
    return (
      <div className='z-10 lg:rounded-3xl rounded-none fixed overflow-auto top-0 left-0 right-0 bottom-0 bg-black text-[white]'>
        <h2>Room: {roomId}</h2>
        <div>
          {
            stream && <UserFeed stream={stream} />
          }
        </div>
        <div className="flex justify-between items-center">
          <button onClick={() => setVideo((prev) => !prev)}>
            video
          </button>
          <button onClick={() => setAudio((prev) => !prev)}>
            mute
          </button>
          <button>
            end
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='bg-[white] hide-scrollbar overflow-x-hidden overflow-y-auto text-black text-sm md:space-y-5 space-y-3 sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] md:p-5 p-3 w-full h-full xs:rounded-xl'>
        Calls
      </div>
    )
  }
};

export default Calls;
