/* eslint-disable no-unused-vars */
import style from '../css-modules/Post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as dark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';


const Post=(props)=>{
    const [active,setActive]= useState(false);

    return (
        <div className={style.postContainer}>
            <div className={style.postHeader}>
                <img className={style.imgg} src={props.user.photo} alt="" />
                <div>{props.user.username}</div>
            </div>
            <img src={props.photo} alt="img" />
            <div className={style.caption}>{props.caption}</div>
            <div className={style.likeCommentWrapper}>
                <Like {...props} />
                <div className={style.commentIcon} onClick={()=> setActive(prev => !prev)}></div>
            </div>
            {active && <Comments {...props}/>}
        </div>   
    )
};


const Like =(props)=>{
    const [liked,setLiked]= useState(false);
    const [likeCnt,setLikeCnt]= useState(props.likes);

    const handleLike =()=>{
        const postId=props._id;
        const url=`https://socionet.onrender.com/api/v1/post/likePost/${postId}`;
        
        if(!liked){
            setLikeCnt(prev => prev+1);
            setLiked(prev => !prev);
            fetch(url, {
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res => res.json())
            .then(res=>{
    
                if(!res.status || res.status !== "success"){
                    setLiked(prev => false);
                    setLikeCnt(prev => prev-1);
                    swal(res.message);
                }
    
            });
        }
        
    }

    return (
        <>
        <div 
            className={liked ? style.likeIcon:style.unlikeIcon}
            onClick={handleLike}
        >
        </div>
        <span>{likeCnt}</span>
        </>
    )
}


const Comments = (props) => {

    const AllComments=props.comments.map(curr => {
        return <Comment comment={curr.comment} key={curr._id}/>
    })

    return (
        <>
            <div className={style.commentWrapper}>
                {AllComments}
            </div>
            <form >
                <input type="text"/>
                <button type="submit">comment</button>
            </form>
        </>
    )
}

const Comment = (props) => {
    return (
        <div className={style.comment}>
            <span>{props.comment}</span>
        </div>
    )
}


export default Post;