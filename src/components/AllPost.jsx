/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Post from './Post';
import {UserContext} from '../contexts/UserContextProvide'
import { useContext, useState, useEffect} from 'react';
import style from '../css-modules/Post.module.css'
import Loading from './Loading';


const AllPost = ()=> {

    const [isPending,setIsPending] = useState(true);
    const [posts,setPosts] = useState([]);
    
    const {user,isLogedIn} = useContext(UserContext);


    useEffect(()=>{
		const controller = new AbortController();
		const signal = controller.signal;

		const getPost= ()=>{
            const endPoint= isLogedIn ? 'getAllPost':'getSamplePost';
			const url=`https://socionet.onrender.com/api/v1/post/${endPoint}`;
			
			fetch(url, {
				method: 'GET',
				credentials:'include',
				signal
			})
			.then(res => res.json())
			.then(res =>{
				res.data.posts.sort((a,b) =>  b.createdAt>a.createdAt);
                setPosts(posts => res.data.posts);
			})
			.catch(error=>{
				console.log("error 💥",error);
			});
			setIsPending(isPending => false);
		}
		
		getPost();

		return ()=>{
			controller.abort();
		}

	},[isLogedIn]);

	

    const allPost=posts.map(post =>{
        const prop={key:post._id,...post};
        return <Post {...prop}/>
    });
    
    return (
        <>
			{isPending ? <Loading/>: <div className={style.postWrapper}>{allPost}</div>}
		</>
    )
}

export default AllPost;