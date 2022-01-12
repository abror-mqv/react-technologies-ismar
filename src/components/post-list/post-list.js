import React from 'react';

import PostListItem from '../post-list-item';
import './post-list.scss';
import './post-list.css';
// import style from './app.module.css';


const PostList = ({posts, onDelete, onOpenWindow, onToggleImportant, onToggleLike}) => {
    React.useEffect(() => {
        const params = window.location.pathname
        let id = params.substring(1);
        if(id === ""){

        }else{
            onOpenWindow(id)
        }   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname])

    const elem = posts.map((item) => {   

        const {id, ...itemProps} = item;

        const redirectModal = (id) => {
            window.location.pathname = `/${id}`
        }

        return (
            <li key={id}>
                <PostListItem
                    {...itemProps}
                    onDelete={()=>onDelete(id)}
                    onToggleImportant={()=>onToggleImportant(id)}
                    onToggleLike={()=>onToggleLike(id)}
                    onOpenWindow={()=> {onOpenWindow(id); redirectModal(id)}}
                    /> 
            </li>
        );

    });

    return (
        <ul className="app-list list-group">
            {elem}
        </ul>
    )

}

export default PostList;