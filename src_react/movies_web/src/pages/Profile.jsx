import React, {useState} from 'react'
import "./profile.css"
import profileImg from "../img/profile-img.jpg";
import Header from "../pages/Header";

const Profile = () => {
  <Header />

  const [userData,setUserData] = useState({
    name: "Ho Anh Phuoc",
    image: profileImg,
    email: 'phuoc11102004@gmail.com',
    phone: '0335435578',
    address: 'Yen Son, Do Luong, Nghe An, Viet Nam'
  })
  
  const [isEdit,setIsEdit] = useState(false)

  return (
    <div className='profile-container'>
        <img className='user-img' src={userData.image} alt="" />
        {
          isEdit 
          ? <input type='text' value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>
          : <p>{userData.name}</p>
        }
        <hr />
        <div>
          <p>CONTACT INFORMATION</p>
          <div>
            <p>Email id:</p>
            <p>{userData.email}</p>
            <p>Phone:</p>
            {
              isEdit
              ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))}/>
              : <p>{userData.phone}</p>
            }
          </div>
        </div>
    </div>
  )
}

export default Profile