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
                        method: "DELETE"
                    })
                        .then(() => {
                             getAllMessages()
                            }
                        )
            } 
        }

    return <>
    
        <div className="flex flex-wrap place-content-center px-20" >
                    
            <div className="p-6 border-4 border-double border-purple-300 rounded-3xl mb-6">

                <Link to={`/mailbox/${message.id}`} className="font-amatic text-3xl font-bold hover:tracking-widest hover:text-violet-600">
                    Message #{message.id}</Link>
                <span className="block font-biz tracking-wider">
                    <b>From</b>: {message.name}</span>
                <span className="block font-biz tracking-wider mb-5">
                    <b>Subject</b>: {message.subject}</span> 
                    
            <footer className="font-amatic text-2xl text-violet-600 
                    tracking-wider font-extrabold">
                {
                    message.fosterParentMessages.length
                        ? `${assignedFosterParent !== null ? assignedFosterParent?.user?.fullName : ""} is replying. `
                        : <button
                            className="bg-violet-300 rounded-xl px-3 py-1 font-amatic
                                        tracking-widest text-xl font-bold hover:bg-emerald-600 hover:text-white"
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
                        className="bg-violet-300 text-violet-900 rounded-xl px-3 py-1 font-amatic ml-3
                                    tracking-wider text-xl font-extrabold hover:bg-red-600 hover:text-white"
                        onClick={() => {
                            canDelete()
                        }}
                    >
                    Delete
                    </button>
                }

            </footer>
            </div>
        </div>
     </>
}