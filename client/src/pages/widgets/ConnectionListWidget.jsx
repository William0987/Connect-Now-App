import { Box, Typography } from "@mui/material";
import Friend from "components/Friend";
import WidgetBox from "components/WidgetBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const ConnectionListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetBox>
      <Typography
        color="black"
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Connections
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={`${friend.age} Years Old`}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetBox>
  );
};

export default ConnectionListWidget;
