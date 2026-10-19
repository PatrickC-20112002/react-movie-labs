import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        marginTop: 4,
      }}
    >
      <CircularProgress />
      <CircularProgress />
    </Box>
  );
}