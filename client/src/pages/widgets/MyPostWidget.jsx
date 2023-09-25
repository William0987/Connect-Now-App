import {
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  IconButton,
} from "@mui/material";
import Container from "components/Container";
import Dropzone from "react-dropzone";
import ProfilePic from "components/ProfilePic";
import WidgetBox from "components/WidgetBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetBox>
      <Container gap="1.5rem">
        <ProfilePic image={picturePath} />
        <InputBase
          placeholder="Post your thoughts..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: "lightgray",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </Container>
      {isImage && (
        <Box
          border="1px solid gray"
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Container>
                <Box
                  {...getRootProps()}
                  border="2px dashed lightblue"
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Place Image Here</p>
                  ) : (
                    <Container>
                      <Typography>{image.name}</Typography>
                      <Typography> Edit File </Typography>
                    </Container>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <Typography> Delete </Typography>
                  </IconButton>
                )}
              </Container>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <Container>
        <Container gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined />
          <Typography
            color="black"
            sx={{ "&:hover": { cursor: "pointer", color: "lightgray" } }}
          >
            Image
          </Typography>
        </Container>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: "black",
            backgroundColor: "lightblue",
            borderRadius: "2.5rem",
          }}
        >
          POST
        </Button>
      </Container>
    </WidgetBox>
  );
};

export default MyPostWidget;
