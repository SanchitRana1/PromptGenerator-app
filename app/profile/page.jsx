 'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
 import {useState, useEffect} from 'react'
 import Profile from '@components/Profile'
 
 const MyProfile = () => {
    const {data:session} = useSession()
    const router = useRouter();
    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post?._id}`)
    }
    const handleDelete= async (post)=>{
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post?._id}`,{
                    method:'DELETE'
                })
                const filteredPosts = posts.filter(p=>p?._id !== post?._id)
                setPosts(filteredPosts)
            } catch (error) {
                
            }
        }

    }
    const [posts,setPosts] = useState([])

	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch(`/api/users/${session?.user?.id}/posts`);
			const data = await response.json();
			setPosts(data);
		};
		if(session?.user?.id) fetchPrompts();
	}, []);

   return (
     <Profile name={'My'} desc='Welcome to your personal profile' data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
   )
 }
 
 export default MyProfile