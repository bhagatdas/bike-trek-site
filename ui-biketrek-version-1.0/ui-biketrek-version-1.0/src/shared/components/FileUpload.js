import React, { Component, Fragment, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import {uploadImage} from "../../functions/Upload";

const FileUpload = ({values,setValues,setimageLoading}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    console.log("here coming");
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setimageLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (uri) => {
          console.log("resize ",uri);
            uploadImage(uri,user.token).then(res =>{
              console.log("Image upload data ", res);
              setimageLoading(false);
              allUploadedFiles.push(res.data);
              setValues({...values,images : allUploadedFiles});
            }).catch(err=>{
              setimageLoading(false);
              console.log("cloudinary upload failed ",err);
            })
        },"base64");
      }
    }
  };

  return (
    <Fragment>
    <div>
      
    </div>
      <Button as="label" htmlFor="file" type="button" onChange={fileUploadAndResize}>
      <Icon name='cloud upload' />
        Upload image
      </Button>
      <input type="file" id="file" hidden accept="images/*" multiple onChange={fileUploadAndResize} />
      <input type="file" id="file" accept="images/*" multiple onChange={fileUploadAndResize} />
    </Fragment>
  );
};
export default FileUpload;
