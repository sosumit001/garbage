import './LinkList.css'
import { gql,useQuery,useMutation } from '@apollo/client';


const Link =({ link,linkId,userId,editMode }) => {

  const [deleteLink,{loading}] = useMutation(DELETE_LINK)
  const handleDelete = async () => {
    deleteLink({
      variables: {linkId,userId}
    })
    setTimeout(() => {
      window.open('/edit','_self')
    }, 200);
  }

  const aTag = editMode?(
    <a target="_blank" rel="noreferrer">
    {link.linkTitle}
    <div onClick={handleDelete} className='remove-link-atag'>{loading?'...':'remove'}</div>
  </a>
  ):(
    <a href={`https://${link.linkValue}`}  target="_blank" rel="noreferrer">
    {link.linkTitle}
  </a>
  )
    return aTag
  }

const LinkList = ({user_id,edit_mode}) => {

  const {loading, error, data} = useQuery(GET_USER_LINKS,{
        variables:{userId:user_id}
    })



if(error) <div>something went wrong</div>


return (
    <div>
        {
            (loading)?  <div className='preview-linklist-container prelinkloading'>
            <ul>
               
                <li key={0}>
                    loading...
                </li>


            </ul>
        </div>:
            <div className='preview-linklist-container'>
                <ul>
                    {data.getUserLinks.map((link) => (

                    <li key={link.id}>
                        <Link userId = {user_id} linkId = {link.id} editMode={edit_mode} link={link} />
                    </li>

                    ))}
                </ul>
            </div>
        }
    </div>
)

  
}

const GET_USER_LINKS = gql`
  query GetUserLinks($userId: ID!) {
    getUserLinks(userId: $userId) {
      id
      linkTitle
      linkValue
    }
  }
`;

const DELETE_LINK = gql`
mutation DeleteLink($linkId: ID!, $userId: ID!) {
  deleteLink(linkId: $linkId, userId: $userId)
}
`

export default LinkList