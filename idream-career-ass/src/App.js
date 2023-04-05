import './App.css';
import { useState, useContext, useEffect } from 'react';
import { FaUserTie } from 'react-icons/fa'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import ToastCont from './ToastContext';
import Masonry from '@mui/lab/Masonry';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px ',
  boxShadow: 24,
  p: 4,
};
function App() {
  const [six, setsix] = useState([])
  const [open, setOpen] = useState(false);
  const [eigth, seteigth] = useState(false)
  useEffect(() => {
    const fun = async () => {
      const res = await axios.get('http://localhost:3001/photo')
      console.log(res.data)
      setsix(res.data)
    }
    fun()
  }, [open,eigth])
  const { toast } = useContext(ToastCont)
  const [first, setfirst] = useState(false)
  const [third, setthird] = useState(false)
  const [second, setsecond] = useState({
    lable: '',
    photo: ''
  })
  const [four, setfour] = useState({
    Email: '',
    password: ''
  })
  const [five, setfive] = useState({
    Email: '',
    password: ''
  })
  const handleOpen = () => {
    console.log(localStorage.getItem('t'))
    localStorage.clear()
    let key = localStorage.getItem('t')
    if (key) {
      setfirst(true)
    }
    setOpen(true)
  };
  const handleClose = () => {

    setOpen(false)
  };
  const up = async () => {
    const { lable, photo } = second
    const res = await axios.post('http://localhost:3001/photo', { lable, photo })
    toast.success(res.data)
    console.log(res.data)
    setOpen(false)
  }
  const sinuppage = () => {
    setthird(true)
  }
  const loginpage = () => {
    setthird(false)
  }
  const signup = async () => {
    const { Email, password } = five
    const res = await axios.post('http://localhost:3001/register', { Email, password })
    console.log(res.data)
    if (res.data == 'failed') {
      return toast.error(res.data)
    } else {
      setthird(false)
      toast.success(res.data)
    }
  }
  const login = async () => {
    const { Email, password } = four
    const res = await axios.post('http://localhost:3001/login', { Email, password })
    console.log(res.data)
    if (res.data == 'Register first') {
      return toast.error(res.data)
    } else if (res.data[0] == 'Logged-in') {
      toast.success('Logged-in')
      localStorage.setItem('t', true)
      localStorage.setItem('id',Email)
      setfirst(true)
    }
  }
  const [seven, setseven] = useState()
  
  const [nine, setnine] = useState({
    password:''
  })
  const deleting = () => {
    seteigth(true)
  }
  const del =async(id)=>{
    const {password} =nine
    const d =localStorage.getItem('id')
    const res = await axios.post(`http://localhost:3001/photo/del/${id}`,{password,d})
    console.log(res.data)
    seteigth(false)
  }
  return (
    <div className="App container">
      <div className='header'>
        <span><FaUserTie /> jey.ai</span>
        <input type='text' placeholder='  search by name' />
        <Button onClick={handleOpen}>Add a photo</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {first === true ? <div>
              <h4>Lable :</h4>
              <input type='text' value={second.lable} style={{ width: '100%', height: '2.5em', borderRadius: '.6em' }} onChange={(e) => setsecond({ ...second, lable: e.target.value })} />
              <h4>photo url :</h4>
              <input type='url' value={second.photo} style={{ width: '100%', height: '2.5em', borderRadius: '.6em' }} onChange={(e) => setsecond({ ...second, photo: e.target.value })} />
              <button onClick={up} style={{ width: '100%', height: '2.8em', marginTop: '1em' }}>upload</button>
            </div> : third == false ? <div>
              <h4>email :</h4>
              <input type='email' value={four.Email} onChange={(e) => setfour({ ...four, Email: e.target.value })} style={{ width: '100%', height: '2.5em', borderRadius: '.6em' }} />
              <h4>password :</h4>
              <input type='password' value={four.password} onChange={(e) => setfour({ ...four, password: e.target.value })} style={{ width: '100%', height: '2.5em', borderRadius: '.6em' }} />
              <button onClick={login} style={{ width: '100%', height: '2.8em', marginTop: '1em', cursor: 'pointer' }}>login</button>
              <h5>need an account? <span onClick={sinuppage} style={{ color: 'blue', cursor: 'pointer' }}>sign-up</span> </h5>
            </div> : <div>
              <h4>Email :</h4>
              <input type='email' value={five.Email} onChange={(e) => setfive({ ...five, Email: e.target.value })} style={{ width: '100%', height: '2.5em', borderRadius: '.6em' }} />
              <h4>password :</h4>
              <input type='password' value={five.password} onChange={(e) => setfive({ ...five, password: e.target.value })} style={{ width: '100%', height: '2.5em', borderRadius: '.6em' }} />
              <button onClick={signup} style={{ width: '100%', height: '2.8em', marginTop: '1em', cursor: 'pointer' }}>sign-up</button>
              <h5>Already have an account? <span onClick={loginpage} style={{ color: 'blue', cursor: 'pointer' }}>login</span></h5>
            </div>}
          </Box>
        </Modal>
      </div>
      {/* <Box sx={{ width: 1300, minHeight: 829 }}> */}
        {/* <Masonry columns={4} spacing={5}> */}
        <div style={{display:'flex'}}>
          {six.map((item, index) => (
            <div key={index} onMouseOver={() => setseven(index)} style={{marginLeft:'2em',borderRadius:'1em',position:'relative',width:'450px',height:'300px'}}>
              {seven == index && <><button onClick={() => deleting(item._id)} style={{ marginLeft: '19em', cursor: 'pointer',position:'absolute',top:'1em' }}>delete</button>
                <Modal
                  open={eigth}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <h4>password :</h4>
                    <input type='password' style={{ width: '100%', height: '2.5em', borderRadius: '.6em' }} onChange={(e) => setnine({ ...nine, password: e.target.value })} />
                    <button onClick={()=>del(item._id)}   style={{ width: '100%', height: '2.8em', marginTop: '1em', cursor: 'pointer' }}>Yes</button>
                  </Box>
                </Modal>
              </>}
              <img
                src={item.photo}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                  height:'100%',
                  // padding:'20px',
                  borderRadius:'1em'
                  // height: Math.round(Math.random() * 400)
                }}
              />
              { seven == index &&<> <span style={{marginLeft:'11em',position:'absolute',bottom:'3em',color:'white'}}>{item.lable}</span></>}
            </div>
          ))}
        {/* </Masonry> */}
      {/* </Box> */}
      </div>
    </div>
  );
}

export default App;
