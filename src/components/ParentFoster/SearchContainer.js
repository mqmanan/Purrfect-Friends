import { useState } from "react"
import { ParentSearch } from "./ParentSearch"
import { FoundParents } from "./FoundParent"

export const SearchContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <>
        <ParentSearch 
            setterFunction={setSearchTerms} 
        />
        <FoundParents 
            searchTermState={searchTerms} 
        />  
    </>
}