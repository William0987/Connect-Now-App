import { Box, Typography, Divider } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  return (
    <div >
      <Box
        width="100%"
        backgroundColor="#343434"
        paddingBottom="200px"
        textAlign="center"
        marginRight="0"
      >
        <Typography color="#343434">
          .
        </Typography>
        <Divider sx={{ margin: "5rem 0", backgroundColor: "#343434" }} />
        <Typography fontWeight="bold" fontSize="35px" color="white">
          Connect Now
        </Typography>
        <Divider sx={{ margin: "1.25rem 0", backgroundColor: "#343434" }} />
        <Typography fontWeight="500" variant="h5" color="white">
          Connect Now... With Strangers From All Around The World!
        </Typography>
        <Divider sx={{ margin: "1.25rem 0", backgroundColor: "#343434" }} />
        <Box
        p = "2rem"
        backgroundColor="lightyellow"
        >
          <Form />
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
