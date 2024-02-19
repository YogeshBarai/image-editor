import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const imageURL = canvas.toDataURL('image/png');
      // You can save the imageURL or perform further actions here
      console.log('Edited Image:', imageURL);
    }
  };

  return (
    <div className="App">
      <h1>Image Editor App</h1>
      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section className="dropzone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop an image here, or click to select one</p>
            </div>
          </section>
        )}
      </Dropzone>
      {image && (
        <div className="editor">
          <AvatarEditor
            ref={(ref) => setEditor(ref)}
            image={image}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default App;
