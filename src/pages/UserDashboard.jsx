import Footer from '../component/Footer'
import LogNavbar from '../component/LogNavbar'
import { ava1, ava2, ava3, ava4 } from '../assets/index.js'
import { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai'
import axios from 'axios'
import { Link as LinkRoute, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Spin } from 'antd';
import { NotesCard } from '../component';
import { Input, QRCode, Space } from 'antd';


const UserDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('');
  const [user, setUser] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate()
  const userAuthor = JSON.parse(localStorage.getItem('user')); 
  // const avatar = [ ava1, ava2, ava3, ava4 ]
  const token = localStorage.getItem('token')
  const {VITE_URL} = import.meta.env;



  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        };
        const resuser = await axios.get(`${VITE_URL}/user/user/${id}`,options)
        setUser(resuser.data.user)
      } catch (error) {
        alert(error.message)
        console.log(error.message)
      }
    }

    fetchUser()
  },[])



  useEffect(() => {

    const userNotes = async()=>{
      setLoading(true)
      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        };
          const res = await axios.get(`${VITE_URL}/post/notes/${id}`,options)

          setNotes(res?.data.posts)
          setLoading(false)
      } catch (error) {
        alert(error.message)
        console.log(error.message)
      }
    }
    userNotes()
  }, []);




  const handleLogout = async()=>{
    const res = await axios.get(`${VITE_URL}/user/logout`);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/welcome')
    return res;
  }


  return (
    <>
        <LogNavbar />
            <div className="userDashboard_container">
              <div className="usercard">
                <div className="img_user">
                  <img className="imge_user" src={ava1} alt={user?.name} />
                </div>


                {userAuthor?._id === id ?(
                  <div className="logout" onClick={handleLogout}>
                    <AiOutlineLogout className="logout_btn"/>
                  </div>
                  ):(
                    <div></div>
                  )}
                

                <div className="name_user">{user?.name}</div>
                <div className="email_user">{user?.email}</div>


              </div>

              <div className="saythanks">
                <div className="saytitle">
                  Say thanks to this creator
                </div>

                <div className="qrcode">
                  <QRCode value={user?.socialmedia ? user?.socialmedia : `mailto:${user?.email}` || '-'} />
                </div>
              </div>

              <div className="user_dashboard_user_notes">

              {notes?.length > 0 && (
                <div className="title_of_user">Notes from {user?.name}</div>
              )}
                {loading ? (
                    <div className="spinner">
                      <Spin />
                    </div>
                ):(
                  <div className="notecard search_notes_main">
                    {notes?.map((post)=>(
                      <NotesCard key={post._id} post={post}/>
                    ))}
                  </div>
                )}
              </div>
            </div>
        <Footer />
    </>
  )
}

export default UserDashboard




// {
//   "name": "Priyansh Sharma",
//   "email": "piyuindia4@gmail.com",
//   "password": "$2a$10$y7l2ValL25VCC8t2j9Osn.PmLJy.y6MJoux4N1xHowZZTUWZ0JjIK",
//   "_id": "647b9da8dde2036ed6889592",
//   "createdAt": "2023-06-03T20:08:08.437Z",
//   "updatedAt": "2023-06-03T20:08:08.437Z",
//   "__v": 0,
//   "avatar": "/src/assets/Cute and adorable cartoon Tom Holland baby.jpg"
// }