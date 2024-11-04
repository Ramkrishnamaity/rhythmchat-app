import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FriendsResponseType, MembersResponseType } from "../../lib/types/Profile";
import MemberCard from "../card/MemberCard";
import { CommonResponseType } from "../../lib/types";
import { toast } from "react-toastify";
import { endpoints } from "../../lib/utils/Endpoint";
import { getRequest, postRequest } from "../../lib/utils/HttpsClient";
import Skeleton from "../common/Skeleton";
import GroupDefaultImage from "../../assets/group.png";
import { LuUpload } from "react-icons/lu";
import { IoMdAddCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FileUploadResponce } from "../../lib/types/Upload";
import { useAppDispatch } from "../../redux/hooks";
import { addConversation } from "../../redux/slices/Conversations";
import { ConversationsType } from "../../lib/types/Conversation";
import { setConversationId, setConversationProfile, setProfileChange } from "../../redux/slices/Conversation";

interface ModalPropsType {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setRight: React.Dispatch<React.SetStateAction<string>>
  sendRequest(data: { senderId: string; receiverId: string; }): void
}

const NewChatModal: React.FC<ModalPropsType> = ({ setOpenModal, sendRequest, setRight }) => {

  interface GroupRequestdata {
    name: string,
    description: string,
    member: string[]
  }

  const dispatch = useAppDispatch();
  const [searchStr, setSearchStr] = useState<string>("");
  const imageRef = useRef<null | HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  const [members, setMembers] = useState<MembersResponseType[]>([]);
  const [groupMembers, setGroupMembers] = useState<FriendsResponseType[]>([]);
  const [friends, setFriends] = useState<FriendsResponseType[]>([]);
  const [tab, setTab] = useState<string>("member");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [groupData, setGroupData] = useState<GroupRequestdata>({
    name: "", description: "", member: []
  });

  async function fetchMember(str: string) {
    try {
      if (str === "") {
        return;
      }
      if (page > maxPage) return;
      setLoading(true);
      const response: CommonResponseType<MembersResponseType[]> = await getRequest(`${endpoints.getMemebers}?str=${str}&page=${page}`);
      if (response.status) {
        setLoading(false);
        setMembers(prev => [...prev, ...response.data ?? []]);
        response.totalPage && setMaxPage(response.totalPage);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function fetchFriends() {
    try {
      // if(friends.length !== 0) return
      const response: CommonResponseType<FriendsResponseType[]> = await getRequest(endpoints.getFriends);
      if (response.status) {
        setFriends(response.data ?? []);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setPage(1);
    setSearchStr(e.target.value);
    setMembers([]);
    await fetchMember(e.target.value);
  }

  function groupDataChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setGroupData((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  }

  function setMemberHandler(friend: FriendsResponseType) {
    if (disable) return;
    setGroupData((prev) => (
      {
        ...prev,
        member: [...prev.member, friend._id]
      }
    ));
    setGroupMembers(prev => ([...prev, friend]));
    setFriends((prev) => (
      prev.filter((ele) => ele._id !== friend._id)
    ));
  }

  function removeMemberHandler(friend: FriendsResponseType) {
    if (disable) return;
    setGroupData((prev) => (
      {
        ...prev,
        member: prev.member.filter((id) => id !== friend._id)
      }
    ));
    setGroupMembers(prev => (prev.filter((ele) => ele._id !== friend._id)));
    setFriends((prev) => (
      [...prev, friend]
    ));
  }

  function resetMemberHandler() {
    setGroupData({
      name: "", description: "", member: []
    });
    setImage(null);
    setGroupMembers([]);
    setFriends((prev) => (
      [...prev, ...groupMembers]
    ));
  }

  function ChangeTab() {
    fetchFriends();
    setTab("group");
    setPage(1);
    setSearchStr("");
    setMembers([]);
  }

  const handleScroll = async () => {
    const viewWindow = scrollableRef.current?.clientHeight;
    const viewHeight = scrollableRef.current?.scrollHeight;
    const scrollTop = scrollableRef.current?.scrollTop;
    if (viewHeight && viewWindow && scrollTop) {
      if (scrollTop + viewWindow + 1 >= viewHeight) {
        setPage(prev => prev + 1);
      }
    }
  };

  function pickImageHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }

  function AddImage() {
    if (imageRef.current) imageRef.current.click();
  }

  function goToChat(data: ConversationsType) {
    dispatch(addConversation(data));
    dispatch(setConversationId(data._id));
    dispatch(setProfileChange(true));
    const profileData = {
      _id: data._id,
      isGroup: true,
      name: data.name ?? "",
      image: data.image ?? ""
    };
    dispatch(setConversationProfile(profileData));
    setOpenModal(false);
    setRight("Chats");
  }

  async function CreateGroup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (groupData.member.length !== 0) {
      if (!image) {
        toast.error("Group image is not set!");
      } else {
        setDisable(true);
        const formData = new FormData();
        formData.append("file", image);
        const response: CommonResponseType<FileUploadResponce> = await postRequest(endpoints.fileUpload, formData);
        if (response.status) {
          setImage(null);
          const imageUrl = response.data?.url ?? "";
          const group = {
            groupData: {
              name: groupData.name,
              description: groupData.description,
              image: imageUrl
            },
            members: groupData.member
          };
          const response2: CommonResponseType<ConversationsType> = await postRequest(endpoints.createGroup, group);
          if (response2.status) {
            response2.data && goToChat(response2.data);
            setDisable(false);
            resetMemberHandler();
            toast.success(response2.message);
          } else {
            setDisable(false);
            resetMemberHandler();
            toast.error(response2.message);
          }
        } else {
          setDisable(false);
          resetMemberHandler();
          toast.error(response.message);
        }
      }
    } else {
      toast.error("Group must have minimum one member!");
    }
  }

  useEffect(() => {
    fetchMember(searchStr);
  }, [page]);

  useEffect(() => {
    setTimeout(() => {
      scrollableRef.current?.addEventListener("scroll", handleScroll);
    }, 500);
  }, []);

  return (
    <div className='z-10 lg:rounded-3xl rounded-none fixed overflow-auto top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-10 backdrop-blur-sm'>
      <div className='sm:h-[calc(100%-35px)] h-full w-full rounded-sm sm:w-[400px] bg-wrapper'>
        <div className={`space-y-2 ${tab === "group" ? "sm:h-[60px] h-[40px]" : "sm:h-[100px] h-[80px]"}`}>
          <div className='bg-[white] text-xl flex justify-start items-center gap-5 sm:px-4 px-2 sm:py-3 py-1'>
            <RxCross2 className='cursor-pointer' onClick={() => setOpenModal(false)} />
            <div className='border border-wrapper text-center flex items-center justify-around w-full rounded-sm cursor-pointer'>
              <p className={`text-sm py-[3px] w-full ${tab === "member" && "bg-wrapper"}`} onClick={() => setTab("member")}
              >Member</p>
              <p className={`text-sm py-[3px] w-full ${tab === "group" && "bg-wrapper"}`} onClick={ChangeTab}
              >Group</p>
            </div>
          </div>
          {
            tab === "member" && (
              <div className='w-[95%] mx-auto text-xs'>
                <input type='text' placeholder='Search' value={searchStr} onChange={changeHandler}
                  className='bg-[white] w-full p-1 px-2 sm:h-[30px] h-[27px] rounded-lg outline-none text-lowBlack' />
              </div>
            )
          }
        </div>
        {
          tab === "member" ? (
            <div ref={scrollableRef} className='sm:p-2 p-1 hide-scrollbar sm:h-[calc(100%-100px)] h-[calc(100%-80px)] overflow-y-auto' >
              {
                members.length === 0 && !loading ? (
                  <div className='text-center text-sm flex items-center justify-center w-full sm:h-[calc(100%-100px)] h-[calc(100%-80px)]'>
                    Not Found
                  </div>
                ) : (
                  <>{
                    members.map((member, index) => {
                      return (<MemberCard setRight={setRight} setOpenModal={setOpenModal} setMembers={setMembers} sendRequest={sendRequest} key={index} data={member} />);
                    })
                  }
                    {
                      loading && <Skeleton color='[white]' />
                    }
                  </>
                )
              }
            </div>
          ) : (
            <div className='px-2 py-5 hide-scrollbar sm:h-[calc(100%-60px)] h-[calc(100%-40px)] overflow-y-auto'>
              <form className='space-y-10' onSubmit={CreateGroup}>
                <div className='flex items-center justify-start xs:gap-5 gap-2'>
                  <div className='sm:w-[80px] w-[70px] h-[70px] sm:h-[80px] bg-[white] p-2 rounded-full cursor-pointer'>
                    {
                      !image ? (<img src={GroupDefaultImage} className='w-full h-full object-contain rounded-full' />) :
                        (<img src={URL.createObjectURL(image)} className='w-full h-full object-contain rounded-full' />)
                    }
                  </div>
                  <input type='file' accept='image/*' multiple={false} ref={imageRef} onChange={pickImageHandler} className='hidden' disabled={disable} />
                  <div onClick={AddImage}
                    className='flex items-center border border-[white] rounded-sm justify-center cursor-pointer'>
                    <p className='bg-[white] xs:text-sm text-xs rounded-l-sm px-2 py-2'>Group Image</p>
                    <span className='p-2 text-lg'><LuUpload /></span>
                  </div>
                </div>
                <div className='space-y-5'>
                  <div className='relative w-full'>
                    <input type='text' name='name' required={true} value={groupData.name} onChange={groupDataChangeHandler} disabled={disable}
                      className='px-2 pt-2 pb-1 text-xs tracking-widest outline-none border text-black border-[white] bg-wrapper rounded-sm w-full md:h-[35px] h-[30px]' />
                    <p className='text-[10px] absolute md:bottom-[26px] bottom-[21px] px-1 bg-wrapper left-2'>Group Name</p>
                  </div>
                  <div className='relative w-full'>
                    <input type='text' name='description' required={true} value={groupData.description} onChange={groupDataChangeHandler} disabled={disable}
                      className='px-2 pt-2 pb-1 text-xs tracking-widest outline-none border text-black border-[white] bg-wrapper rounded-sm w-full md:h-[35px] h-[30px]' />
                    <p className='text-[10px] absolute md:bottom-[26px] bottom-[21px] px-1 bg-wrapper left-2'>Group Description</p>
                  </div>
                  <div className='w-full p-2 flex flex-wrap items-center justify-start gap-2 text-xs tracking-widest border border-[white] bg-wrapper rounded-sm h-max md:min-h-[35px] min-h-[30px]'>
                    {
                      groupMembers.length === 0 && "Group Members.."
                    }
                    {
                      groupMembers.map((member, index) => {
                        return (
                          <div key={index} className='relative bg-[white] px-2 py-1'>
                            <p >{member.firstName} {member.lastName}</p>
                            <p className='absolute bottom-[18px] left-[92px] cursor-pointer' onClick={() => removeMemberHandler(member)}>
                              <FaPlus className='rotate-45 text-black text-md' />
                            </p>
                          </div>
                        );
                      })
                    }
                  </div>
                  <div className='px-2 py-1 border border-[white] mx-auto w-full xxs:w-[250px] h-[120px] hide-scrollbar overflow-y-auto'>
                    {
                      friends.length === 0 && "Friends List.."
                    }
                    {
                      friends.map((friend, index) => {
                        return (
                          <div className='py-1 flex items-center justify-evenly gap-2' key={index}>
                            <div className='flex items-center justify-start gap-2'>
                              <img src={friend.image} className='w-8 h-8 object-contain rounded-full' />
                              <div className='flex items-center justify-center gap-1 text-xs'>
                                <p>{friend.firstName}</p>
                                <p>{friend.lastName}</p>
                              </div>
                            </div>
                            <IoMdAddCircle className='text-xl text-black cursor-pointer' onClick={() => setMemberHandler(friend)} />
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <button type='submit' className='text-center bg-black text-[white] text-sm px-3 py-2 rounded-lg' disabled={disable}>
                    Create
                  </button>
                </div>
              </form>
            </div>
          )
        }

      </div>
    </div >
  );
};

export default NewChatModal;
