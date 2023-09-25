import { Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "pages/navbar";
import UserWidget from "pages/widgets/UserWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import ConnectionListWidget from "pages/widgets/ConnectionListWidget";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        padding="2rem 6%"
        display= "flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis= "50%" sx={{ width: "150%"}}>
          <MyPostWidget picturePath={picturePath} />
          <Divider sx={{ margin: "0.5rem 0" }} />
          <UserWidget userId={_id} picturePath={picturePath} />
          <Divider sx={{ margin: "0.5rem 0" }} />
          <ConnectionListWidget userId={_id} />
        </Box>
        <Box sx={{ marginLeft: "100px", width:"100%" }}>
          <PostsWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
