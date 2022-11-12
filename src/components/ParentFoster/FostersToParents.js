export const FosterstoParent = ({ fosterParentUserDetails, fosters, currentUser }) => {

    // Find the assigned foster parent to the current foster
    let assignedParentToFoster = null

    fosters.map(
        (message) => {
            if (fosterParentUserDetails?.user?.id === fosters.fosterParentId) {
                const parentFosterRelationship = fosters?.fosterParentId
                assignedParentToFoster = fosterParentUserDetails.find(fosterParentUserDetail =>
                    fosterParentUserDetail?.user?.id === parentFosterRelationship?.id)
            }
        }
    )
        
    //     message.fosterParentMessages.length > 0) {
    //     const msgFosterParentRelationship = message?.fosterParentMessages[0]
    //     assignedFosterParent = fosterParents?.find(fosterParent => 
    //         fosterParent?.id === msgFosterParentRelationship?.fosterParentId)
    // }

    // Function that determines which fosters belongs to which parent
    // const fostersToParentFilter = () => {
    //     const results = fosterParentUserDetails.filter((parentToFoster) => { 
    //         if (parentToFoster.fosterParentId === userFosterParent.id)
    //         return parentToFoster.name
    //     })
    //     setParentsToFosters(results)
    //     console.log(results)
    // }

    return(

        <div className="flex flex-wrap place-content-center px-20" >
                    
            <div className="p-6 border-4 border-double border-purple-300 rounded-3xl">

                <span className="block font-biz tracking-wider">
                    <b>Caretaker</b>: {assignedParentToFoster?.user?.fullName}</span>
                <span className="block font-biz tracking-wider mb-5">
                    {fosters.name}</span> 
                    
            </div>
            
        </div>

    )

}