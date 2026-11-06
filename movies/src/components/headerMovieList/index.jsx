
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = ({ title, description }) => {
  return (
    <Box
      sx={{
        mb: 3,
        pb: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 500 }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default Header;