import { useState,useRef } from "react"
import './LinkField.css'
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client"
import LinkList from "./LinkList"

const FormComponent = ({userId}) => {

    const [linkTitle,setLinkTitle] = useState('')
    const [linkValue,setLinkValue] = useState('')

    const [addLink, {loading}] = useMutation(CREATE_LINK)


    const [frame,setFrame] = useState(true)
    const linkFrame = useRef()
    const titleFrame = useRef()

    const handleFrame = () => {

       if(frame) {
        if(linkValue){
            linkFrame.current.style = "top:-100%; transform:scale(0.9);"
            titleFrame.current.style = "top:0%; transform:scale(1);"
            setFrame(false)
        }
       } else {
        linkFrame.current.style = "top:0%; transform:scale(1);"
        titleFrame.current.style = "top:100%; transform:scale(0.9);"
        setFrame(true)
       }
    }

    const handleInputLinkAndTitle = async () => {
        try{
            if(linkTitle) {
                await addLink({
                    variables:{inputValue:{linkTitle,linkValue},userId}
                })
                handleFrame()
                setLinkTitle('')
                setLinkValue('')
                window.open('/edit','_self')
            }
        } catch (err) {
            throw new Error(err)
        }
    }
    const handleLinkChange = (event) => {
        setLinkValue(event.target.value)
    }
    const handleTitleChange = (event) => {
        setLinkTitle(event.target.value)
    }
    
    const removeSpaces = (event) =>  {
        event.target.value = event.target.value.replace(/\s/g, '');
      }
   
    return (
    <div className="form-group">
        <div ref={linkFrame} className="addlink-frame-one">
        <div className="linkInputFieldCover">
        <span>https://</span>
        <input onChange={handleLinkChange} onInput={removeSpaces} value = {linkValue} className="form-field" type="text" name="link-field" placeholder="domain.tld" />
        <div onClick={handleFrame} className="next-button">Next</div>
        </div>
      
        </div>

        <div ref={titleFrame} className="addlink-frame-two">

        <div className="linkInputFieldCover">
        <input onChange={handleTitleChange} className="form-field" type="text" value={linkTitle} name="title-field" placeholder="title" />
        <div onClick={handleFrame} className="addlink-back next-button">Back</div>
        <div onClick={handleInputLinkAndTitle} className="next-button">Add</div>
        </div>
        </div>
    </div>
    )

}

const LinkField = ({user_id}) => {
    return (
        <div id ='addlinkfield'>
            <div className='addlinkfield-header'>
                add links
            </div>
            <div className='addlinkfield-collections'>
                <FormComponent userId = {user_id} />
            </div>
            <div>
                <LinkList edit_mode={true} user_id={user_id} />
            </div>
           
        </div>
    )
}

const CREATE_LINK = gql`
    mutation CreateLink($inputValue: LinkInput!, $userId: ID!){
    createLink(inputValue: $inputValue, userId: $userId) {
      linkTitle
      linkValue
    }
  }`

export default LinkField


