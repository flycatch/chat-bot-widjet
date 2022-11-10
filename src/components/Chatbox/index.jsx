
import React, { useEffect, useState } from 'react';
import { ChatBotConstants } from '../../constants';
import { post } from '../../service/apiServices';
import './index.css'

const Chatbox = ({setActive}) => {
  const [chat, setChatData] = useState('');
  const [arrayChat, setArrayChat] = useState([{
    sender:ChatBotConstants.BOT,
    message:ChatBotConstants.EMAIL_REQUEST
    },]);
const [apiData, setApiData] = useState([{
  email:'',
  title:'',
  description:''
},])



const handlesubmit=()=>{ 
const arr=arrayChat
arr.push({
  sender:ChatBotConstants.RECEIVER,
  message:chat
})
switch(arr.length) {
  case 2:
    arr.push({
      sender:ChatBotConstants.BOT,
      message:ChatBotConstants.TITLE_REQUEST
    }
   )
    break;
  case 4:
    arr.push({
      sender:ChatBotConstants.BOT,
      message:ChatBotConstants.DESCRIPTION_REQUEST
    }
   )
    break;
  default:

}
setArrayChat(arr)
setChatData('')

arr.length >=5 &&
setApiData(
  {
    email:arrayChat[1].message,
  title:arrayChat[3].message,
  description:arrayChat[5].message 
  }
)
}


useEffect(() => {
  if(arrayChat.length>=5){
    const postData=async()=>{
  try{
    const ticketApi=await post("http://192.168.1.41:80/api/v1/ticket/generic-ticket",apiData)
    const array=arrayChat
    array.push(
      {
        sender:ChatBotConstants.BOT,
        message:`${ChatBotConstants.TICKET_NUMBER_RESPONSE} ${ticketApi.ticket_number}`
      }
    )
    setArrayChat(
     [ ...array]
    
    )
  return(ticketApi)
  }
  catch (err) {
    return (err.response);
  }

}
postData()
  }
},[apiData,arrayChat]);



  return (
    <div className='main-div'>
      <div className='minimise-box'>
        <div className='chat-text'>{ChatBotConstants.CHAT}</div>
        <div>
          <img className='close-button' src='/assets/close-button.svg' alt='' onClick={()=>{
            setActive(false)
          }}></img>
        </div>

      </div>
      <div className='chat-area' id='scrollTop'>
        {arrayChat?.map((i,index)=>

       i.sender==='bot'?
        <div key={index} className='text'>
          
          {i.message}
          
          </div>:
          <div className='receiver-div'>
          <div className='chat-area-receiver'>{i.message}</div>
          </div>
        )}
        </div>
        
<form onSubmit={(e)=>{
  e.preventDefault()
}}>
        <div className='type-area'>
          <input className='input' placeholder='Type a message '  value={chat} name='chat' type={'text'}  onChange={(e)=>{
           setChatData(e.target.value)
          }} ></input>
          <button className='button' type='submit' name='primary'   onClick={()=>{  
            handlesubmit()
          }}>
          <img src='/assets/send-icon.svg' alt='' className='sent-img' ></img>
          </button>
          
        </div>
        </form>
    </div>
    
    
  )
}

export default Chatbox;
