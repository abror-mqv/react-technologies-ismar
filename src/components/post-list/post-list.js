import React from 'react';

import PostListItem from '../post-list-item';
import './post-list.scss';
import './post-list.css';
// import style from './app.module.css';


const PostList = ({posts, onDelete, onOpenWindow, onToggleImportant, onToggleLike}) => {

    const elem = posts.map((item) => {

        const {id, ...itemProps} = item;

        return (
            <li key={id}>
                <PostListItem
                    {...itemProps}
                    onDelete={()=>onDelete(id)}
                    onToggleImportant={()=>onToggleImportant(id)}
                    onToggleLike={()=>onToggleLike(id)}
                    onOpenWindow={()=>onOpenWindow(id)}
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