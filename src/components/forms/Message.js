import { Link } from "react-router-dom"

export const Message = ({ message, fosterParents, currentUser, getAllMessages }) => {
    
    // Find the assigned foster parent to the current message
    let assignedFosterParent = null

    if (message.fosterParentMessages.length > 0) {
        const msgFosterParentRelationship = message?.fosterParentMessages[0]
        assignedFosterParent = fosterParents?.find(fosterParent => fosterParent?.id === msgFosterParentRelationship?.fosterParentId)
    }

    // Find the foster parent profile for the current user
    const userFosterParent = fosterParents.find(fosterParent => fosterParent.userId === currentUser.id)

    //Function that determines if the current user can delete the message
    const canDelete = () => {
        if (userFosterParent?.id === assignedFosterParent?.id) {
            return fetch(`http://localhost:8088/messages/${message.id}`, {
                        method: "DELETE",
                    })
                        .then(() => {
                             getAllMessages()
                            }
                        )
            } 
        }

    return <div className="message" key={message.id}>
            <center><br></br>
                    
            <div className="message-details">
                <Link to={`/mailbox/${message.id}`}><u>Message #{message.id}</u></Link>
            </div>        

            <div className="message-details">
                <b>From:</b> {message.name}<br></br>
                <b>Email:</b> {message.email}<br></br>
            </div>
                    
            <footer>
                {
                    message.fosterParentMessages.length
                        ? `${assignedFosterParent !== null ? assignedFosterParent?.user?.fullName : ""} has accepted this message.`
                        : <button
                            onClick={() => {
                                fetch(`http://localhost:8088/fosterParentMessages`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        fosterParentId: userFosterParent.id,
                                        messageId: message.id
                                    })
                                })
                                    .then(response => response.json())
                                    .then(() => {
                                        //Get messages state from API again
                                        getAllMessages()
                                    })
                            }}
                            >Reply</button>
                }
                {
                     <button 
                     className="btn-delete"
                     onClick={() => {
                         canDelete()
                        }}
                    >
                    Delete
                    </button>
                }

            </footer>
         </center>
     </div>
}