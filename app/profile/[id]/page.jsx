'use client'
import { useSession } from 'next-auth/react'
import { useRouter,useSearchParams } from 'next/navigation'
 import {useState, useEffect} from 'react'
 import Profile from '@components/Profile'
 
 const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
   
    const [userPosts,setUserPosts] = useState([])

	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch(`/api/users/${params?.id}/posts`);
			const data = await response.json();
			setUserPosts(data);
		};
		if(params?.id) fetchPrompts();
	}, []);

   return (
     <Profile name={userName} desc={`Welcome to ${userName}'s personal profile. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`} data={userPosts}/>
   )
 }
 
 export default UserProfile