import React, { useEffect, useState,} from "react";
import "./styles.css";
import { Card, CardContent, CardHeader, CardActions, CardActionArea, ButtonBase } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentBankOutlined } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import ReactModal from 'react-modal';
import axios from "axios";
import Popup from "reactjs-popup";
import { Button } from "@mui/material";



export default function App() {
 
  const [posts, setPosts] = useState([]);
  const [comments,setComments]= useState([]);
  const [isShown, setIsShown] = useState(true);
  let arr=[];
  let arrlenght=arr.length;

  const handleClick = event => {
    setIsShown(false);
  };

  const fetchPostsData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setPosts(data)
      })
  }

  const Example=() =>{
    const [isOpen, setIsOpen] = useState(false);
   
    return (
      <div>
        <button onClick={setIsOpen}>Open Modal</button>
        <ReactModal
          isOpen={isOpen}
          contentLabel="Example Modal"
        >
          This is the content of the modal.
        </ReactModal>
      </div>
    );
  }

  
  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1/comments').then((response) => {
      setComments(response.data);
    });
  }, []);

  useEffect(() => {
    fetchPostsData()
    }, [])

 let deleteQueue=(_id)=>{
    arrlenght++;
  console.log(arrlenght)
 }
 return(
  <div className="App">
      <h1 style={{ color: "green" }}>POSTS</h1>
      <div className="deleteQueue">
      <h1 id='arraylength'>
        {arrlenght}
      </h1>
      </div>
      <center>
        {
          
         posts.map((post,_index) => {
            return (
              <div
                style={{
                  width: "20em",
                  backgroundColor: "#35D841",
                  padding: 5,
                  borderRadius: 10,
                  marginBlock: 10,
                }}
              >
                {(<Card raised={true} sx={{ maxWidth: 400 }}>
                <CardActions> 
                  <CardContent sx={{ bgcolor: "#E8E8E8" }}>
  
                  <ol key = { post.id } >
                    {post.title},
				            <div></div>
                   { post.body},
                   </ol>
                  
                  </CardContent>
                  </CardActions>
                  <IconButton onClick={handleClick}>
                    <DeleteIcon />
                  </IconButton>
                  <Popup trigger={<IconButton>
                    <CommentBankOutlined />
                  </IconButton>} position="right center">
                   <div

                   style={{
                    width: "20em",
                    backgroundColor: "#35D841",
                    padding: 5,
                    borderRadius: 10,
                    marginBlock: 10,
                  }}>
                    pop content here!!! 
                  </div>
                   </Popup>
                </Card>)}
              </div>
            );
         }
        )}  
      </center>
  </div>
 );
}
