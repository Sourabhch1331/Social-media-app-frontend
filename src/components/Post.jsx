/* eslint-disable no-unused-vars */
import style from '../css-modules/Post.module.css';
import {UserContext} from '../contexts/UserContextProvide';
import {useContext, useEffect, useRef, useState } from 'react';
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

    const commentRef=useRef(null);
    const {user} = useContext(UserContext);

    const [comments,setComments]=useState(props.comments);
    


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(commentRef.current.value === "") return;

        const curr={
            user:{
                photo:user.photo,
                username:user.username,
            },
            _id:Date.now(),
            comment: commentRef.current.value
        }

        const url=`https://socionet.onrender.com/api/v1/post/comment/${props._id}`;
			
        fetch(url, {
            method: 'POST',
            credentials:'include',
            body: JSON.stringify({comment:commentRef.current.value}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res => res.json())
        .then(res =>{
            setComments(prev => [curr,...prev]);
        })
        .catch(error=>{
            console.log("error 💥",error);
        });
    }

    const AllComments=comments.map(curr => {
        return <Comment 
                    photo = {curr.user.photo} 
                    comment={curr.comment} 
                    key={curr._id}
                    username={curr.user.username}
                />
    });

    return (
        <>
            <div className={style.commentWrapper}>
                {AllComments.length ? AllComments:<span style={{marginLeft:'15px'}}>No comments yet!</span>}
            </div>
            {user &&
                <form className={style.commentForm} onSubmit={handleSubmit}>
                    <input ref={commentRef} type="text"/>
                    <button className={style.btn} type="submit">comment</button>
                </form>
            }
        </>
    )
}

const Comment = (props) => {
    return (
        <div className={style.comment}>
            <div>
                <img src={props.photo} alt="" />
                <span>{props.username}</span>
            </div>
            <span>{props.comment}</span>
        </div>
    )
}


export default Post;