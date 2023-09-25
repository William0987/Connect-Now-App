import {
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import Container from "components/Container";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container padding="1rem 6%" backgroundColor="#5b6770">
      <Container gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="blue"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "lightBlue",
              cursor: "pointer",
            },
          }}
        >
          Connect Now
        </Typography>
      </Container>

        <Container gap="3rem">
            <Typography
              fontWeight="bold"
              fontSize="20px"
              color="blue"
              onClick={() => dispatch(setLogout())}
              sx={{
                "&:hover": {
                  color: "lightBlue",
                  cursor: "pointer",
                },
              }}
            >
              Log Out
            </Typography>
        </Container>
    </Container>
  );
};

export default Navbar;
