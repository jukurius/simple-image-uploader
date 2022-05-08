import React from 'react'
import { useDropzone } from 'react-dropzone';

function Dropzone(props) {

  const isLogged = () => {
    if (props.logged) {
      return false;
    } else {
      return true;
    }
  }
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      disabled: isLogged(),
        onDrop: (acceptedFiles) => {
          props.setSelectedFile(
            acceptedFiles.map((file) => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }))
          )
        }
      });
    
      const img = () => {
        if (props.selectedFile[0] !== undefined) {
          return (
            <img className='image' src={props.selectedFile[0].preview}></img>
          )
        }
      }

    return (
        <div {...getRootProps()} className='dropzone'>
            <input {...getInputProps()} />
            {
            props.selectedFile ? <div>{img()}<br></br><span>{props.selectedFile[0].name} | {props.selectedFile[0].size / 1000000} Mb</span> </div> 
            : props.logged ? <p>Drag 'N' Drop Or Click To Select</p> : <p>Login to upload</p>
            }
        </div>
    )
}

export default Dropzone