import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Socket } from "socket.io-client";
import Peer from "peerjs";
import { v4 as UUID } from "uuid";
import UserFeed from "../calls/UserFeed";
import { MdCallEnd } from "react-icons/md";
import { BsMicMuteFill } from "react-icons/bs";
// import { IoMdVideocam } from "react-icons/io";

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
  const [video, setVideo] = useState<boolean>(false)
  const [audio, setAudio] = useState<boolean>(true)

  console.log(stream)

  const { roomId, hostByUser, defaultScreen } = useAppSelector(state => state.room)

  function fetchParticipants(room: ParticipantType) {
    console.log("room: ", room)
  }

  function endCall() {

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

  const data: any[] = []

  if (roomId) {
    return (
      <div className='z-10 lg:rounded-3xl rounded-none fixed overflow-auto top-0 left-0 right-0 bottom-0 bg-[#000] text-[white]'>
        {
          data.length === 0 ? (
            <div className="relative sm:p-5 p-2 w-full h-full flex justify-center items-center">
              <div className="absolute w-max sm:top-10 top-8 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-2xl font-bold">{defaultScreen?.name}</p>
                <p className="text-center opacity-40">Calling..</p>
              </div>
              <img src={defaultScreen?.image} className="sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] object-contain rounded-full" />
            </div>
          ) : (
            <div className="sm:p-5 p-2 w-full h-full overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {
                data.map((ele, index) => {
                  return <UserFeed stream={ele} key={index} />
                })
              }
            </div>
          )
        }
        <div className="flex justify-center items-center absolute bottom-2 left-0 right-0">
          <div className="flex justify-around items-center sm:gap-y-8 gap-y-5 gap-x-2 p-2 border w-[80%] rounded-3xl bg-opacity-10 backdrop-blur-sm">
            <button onClick={() => setVideo((prev) => !prev)}>
              video
            </button>
            <button onClick={() => setAudio((prev) => !prev)}>
              <BsMicMuteFill />
            </button>
            <button className="bg-[crimson] sm:p-5 p-2 rounded-full" onClick={endCall}>
              <MdCallEnd className="sm:text-xl"/>
            </button>
          </div>
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
