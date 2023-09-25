import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import Container from "components/Container";
import Friend from "components/Friend";
import WidgetBox from "components/WidgetBox";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  age,
  picturePath,
  userPicturePath,
  likes,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetBox m="0 0 2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={`${age} Years Old`}
        userPicturePath={userPicturePath}
      />
      <Typography color="black" sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <Container mt="0.25rem">
        <Container gap="1rem">
          <Container gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Container>
        </Container>
      </Container>
    </WidgetBox>
  );
};

export default PostWidget;
