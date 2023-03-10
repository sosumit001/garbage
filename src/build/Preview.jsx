import {useQuery,gql} from '@apollo/client'
import { useState } from 'react'


import './Preview.css'

import LinkList from './buildComponent/LinkList'

const Preview = ({user_id}) => {

  const [currentBannerClass,setCurrentBannerClass] = useState('bg-img-2')
  
    const {loading, error, data} = useQuery(GET_USER_DATA,{
        variables:{id:user_id}
    })


    

    function getDaysFromNow(inputDate) {
        const today = new Date();
        const input = new Date(inputDate);
        const diffTime = input.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
        if (diffDays === 0) {
          return "Joined Today";
        } else if (diffDays === 1) {
          return "Joined Yesterday";
        } else if (diffDays < 31) {
          return "Joined "+Math.abs(diffDays) + "days ago";
        } else if (diffDays < 365) {
          const diffMonths = Math.floor(diffDays / 30);
          return "Joined" + diffMonths + " month" + (diffMonths > 1 ? "s ago" : "ago");
        } else {
          const diffYears = Math.floor(diffDays / 365);
          return "Joined " +diffYears + " year" + (diffYears > 1 ? "s" : "");
        }
      }
    
    

    if(loading) return <div>Loading...</div>
    if(error) return <div>
      click
    </div>
    return (
        <div id="previewTemplate">
            <span></span>
            <div className={"preview-template-banner " + currentBannerClass}>
                <div className='preview-template-banner-username'>
                    {loading?"loading...":data.getUser.username}
                </div>

                <div className="preview-template-banner-profile">
                    {data.getUser.fullname[0].toUpperCase()}
                </div>

                <div className="preview-template-banner-joinedOn">
                    {getDaysFromNow(data.getUser.createdAt.substring(0,10))}
                </div>
                <h2 style={{color:'white', fontFamily:'Tilt Warp'}} className='preview-template-banner-fullname' >{data.getUser.fullname}</h2>
            </div>
            <div className="preview-links">
              <LinkList user_id={user_id} />
            </div>
            
        </div>
    )
}

const GET_USER_DATA = gql`
    query Getuser($id:ID!) {
    getUser(id:$id) {
      username
      createdAt
      fullname
    }
  }
`

export default Preview;