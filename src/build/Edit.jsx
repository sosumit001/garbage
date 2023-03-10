import './Edit.css'
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import LinkField from './buildComponent/LinkField';


const Edit = () => {
    const {user,error} = useContext(AuthContext)
    

    return ( 
        <div id="Editor">
            <div className="editor-features">
                <div className="editor-features-link-field">
                    <LinkField user_id={user.user_id} />
                </div>
            </div>
            <div className="editor-preview">
                <div className='preview-container'>
                    <iframe style={{height:'100%', width: '100%', overflowX:'hidden'}} src={'/' + user.username} frameBorder="0"></iframe>
                </div>
            </div>
            <span className='preview-btn disable-preview-btn'>preview</span>
        </div>
    )
}

export default Edit