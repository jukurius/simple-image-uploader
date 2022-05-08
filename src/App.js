import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Login } from './Login.js';
import Dropzone from './Dropzone.js';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [url, setUrl] = useState();
  const [openLogin, setOpenLogin] = useState(false);
  const [logged, setLogged] = useState(false);
  const [uploadPreset, setUploadPreset] = useState("");
  const [cloudName, setCloudName] = useState("");
  const notifyCopy = () => toast('🔥 Copied to clipboard 🔥', {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const uploadImg = async () => {
    const id = toast.loading("Uploading...", { position: "top-center" })
    try {
      const formData = new FormData();
      formData.append("file", selectedFile[0]);
      formData.append("upload_preset", uploadPreset);
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      setUrl(res.data.secure_url);
      toast.update(id, { render: "Done", type: "success", isLoading: false, autoClose: 2800, position: "top-center" });
    } catch (error) {
      toast.update(id, { render: "Something went wrong.. Try again", type: "error", isLoading: false, autoClose: 2800, position: "top-center" });
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    notifyCopy();
  }

  const removeImg = () => {
    setSelectedFile(undefined)
    setUrl(undefined)
  }

  const logOut = () => {
    setLogged(false);
    setSelectedFile(undefined);
    setUrl(undefined);
  }

  return (
    <section className="container">
      <div className='nav-container'>
        <p>Image uploader by <span className='nick'>Jukurius</span></p>
        {
          logged ? <button className='nav-btn' onClick={() => logOut()}>Logout</button> : <button className='nav-btn' onClick={() => setOpenLogin(true)}>Login</button>
        }
      </div>
      {
        openLogin ? <Login setOpenLogin={setOpenLogin} setPreset={setUploadPreset} setCloud={setCloudName} setLogged={setLogged} /> : null
      }
      <div>
        <Dropzone selectedFile={selectedFile} setSelectedFile={setSelectedFile} logged={logged} />
        <div className='btn-container'>
          {
            url ? <div><input className='url-input' type='text' readOnly='readOnly' value={url} /><button className='copy-btn' onClick={() => handleCopy()}>Copy url</button><button className='copy-btn' onClick={() => removeImg()}>Remove</button></div> :
              selectedFile && <div>
                <button onClick={() => uploadImg()} className='copy-btn'>Upload</button>
                <button className='copy-btn' onClick={() => removeImg()}>Remove</button>
              </div>
          }
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default App;
