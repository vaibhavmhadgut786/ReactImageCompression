import React, { Component } from "react";
import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";

export class ImageCompression extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compressedLink:
        "https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
    };
  }

  handle = (event) => {
    const imageFile = event.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
    });
  };

  changeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  click = (event) => {
    event.preventDefault();
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then((x) => {
      output = x;
      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
      });
    });

    this.setState({
      clicked: true,
    });
    return 1;
  };

  render() {
    return (
      <div className="m-5">
        <div className="text-light text-center">
          <h1>Image Compressor by using React</h1>
        </div>
        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png"
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={(event) => this.handle(event)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={(event) => this.click(event)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  {" "}
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCompression;
