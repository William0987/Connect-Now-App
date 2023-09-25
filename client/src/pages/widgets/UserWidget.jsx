import { Box, Typography } from "@mui/material";
import ProfilePic from "components/ProfilePic";
import Container from "components/Container";
import WidgetBox from "components/WidgetBox";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    age,
    hobby,
    friends,
  } = user;

  return (
    <WidgetBox>
      <Container
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Container gap="1rem">
          <ProfilePic image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color="black"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: "lightsteelblue",
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color="black">Connections: {friends.length}</Typography>
            <Typography color="black">Age: {age} Years Old</Typography>
            <Typography color="black">Hobby: {hobby}</Typography>
          </Box>
        </Container>
      </Container>
    </WidgetBox>
  );
};

export default UserWidget;
