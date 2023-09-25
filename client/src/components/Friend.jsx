import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import Container from "./Container";
import ProfilePic from "./ProfilePic";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <Container>
      <Container gap="1rem">
        <ProfilePic image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color="black"
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: "lightsteelblue",
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color="black" fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </Container>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ color: "black", backgroundColor: "lightgray", p: "0.6rem", borderRadius: "10%" }}
      >
        {isFriend ? (
          <Typography> Connecting </Typography>
        ) : (
          <Typography> Connect </Typography>
        )}
      </IconButton>
    </Container>
  );
};

export default Friend;
