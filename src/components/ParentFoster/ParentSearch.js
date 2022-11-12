export const ParentSearch = ({ setterFunction }) => {

    return (

        <center>

            <div className="w-1/2 rounded-lg font-biz text-sm tracking-wide 
                    font-bold py-11">
                        <input
                            onChange= {
                                (changeEvent) => {
                                    setterFunction(changeEvent.target.value)
                                }
                            } 
                            type="text" 
                            placeholder="Purrfect Friends' Network of Foster Parents -- Enter Name" 
                            className="w-full rounded-full focus:outline-none focus:bg-purple-100 border-purple-200 focus:text-indigo-600"/>
            </div>

        </center>
      
    )
 
}