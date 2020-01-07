import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState();
  const imageRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const choseImageHandler = event => {
    let picked;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      picked = event.target.files[0];
      setFile(picked);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, picked, fileIsValid);
  };
  const imageHandler = () => {
    imageRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        style={{ display: "none" }}
        ref={imageRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={choseImageHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {preview && <img src={preview} alt="Preview" />}
          {!preview && <p>Please pick image.</p>}
        </div>
        <Button type="button" onClick={imageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
