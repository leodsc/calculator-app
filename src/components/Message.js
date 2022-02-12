import { useEffect } from "react";

const Message = ({ message, setMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000)
  })

  return (
    <div class="app__error-message">
      <p>{message}</p>
    </div>
  )
}

export default Message;