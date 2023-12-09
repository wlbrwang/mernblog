import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){
    const [username, setUsername] = useState(null);
    useEffect(()=>{
        fetch('http://localhost:4000/profile',{
            credentials:'include',
            //add axios here
        }).then(response=>{
            response.json().then(userInfo=>{
                setUsername(userInfo.username);
            });
        });
    },[]);

    function logout(){
        fetch('http://localhost:4000/logout',{
            credentials:'include',
            method:'POST',
        })
    }
    return(
        <header>
            <Link to ="/" className="logo">MyBlog</Link>
            <nav>
                {/* {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )} */}
<Link to="/login" >Login</Link>
<Link to="/register" >Register</Link>        

                {/* {!username && (
                    <>
                    </>
                )
                
            } */}
            </nav>
        </header>
    )
}