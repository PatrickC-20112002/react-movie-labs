
import { useState } from "react";
import { Link, useLocation } from "react-router";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const browsePages = [
  { label: "Popular", path: "/movies/popular" },
  { label: "Top Rated", path: "/movies/top-rated" },
  { label: "Now Playing", path: "/movies/now-playing" },
  { label: "Upcoming", path: "/movies/upcoming" },
];

const listPages = [
  { label: "Favourites", path: "/movies/favorites" },
  { label: "Must Watch", path: "/movies/must-watch" },
];

const SiteHeader = () => {
  const [browseAnchor, setBrowseAnchor] = useState(null);
  const [listsAnchor, setListsAnchor] = useState(null);
  const [mobileAnchor, setMobileAnchor] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const currentPath = location.pathname;

  const browseActive = browsePages.some(
    (page) => page.path === currentPath
  );

  const listsActive = listPages.some(
    (page) => page.path === currentPath
  );

  const closeMenus = () => {
    setBrowseAnchor(null);
    setListsAnchor(null);
    setMobileAnchor(null);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            onClick={closeMenus}
            sx={{
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            TMDB Client
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="open navigation menu"
                color="inherit"
                onClick={(event) =>
                  setMobileAnchor(event.currentTarget)
                }
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={mobileAnchor}
                open={Boolean(mobileAnchor)}
                onClose={closeMenus}
                slotProps={{
                  paper: {
                    sx: {
                      minWidth: 220,
                      maxHeight: "75vh",
                    },
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to="/"
                  selected={currentPath === "/"}
                  onClick={closeMenus}
                >
                  Home
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/movies/explore"
                  selected={currentPath === "/movies/explore"}
                  onClick={closeMenus}
                >
                  Explore
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/movies/search"
                  selected={currentPath === "/movies/search"}
                  onClick={closeMenus}
                >
                  Search
                </MenuItem>

                <Divider />

                <ListSubheader>Browse</ListSubheader>

                {browsePages.map((page) => (
                  <MenuItem
                    key={page.path}
                    component={Link}
                    to={page.path}
                    selected={currentPath === page.path}
                    onClick={closeMenus}
                  >
                    {page.label}
                  </MenuItem>
                ))}

                <Divider />

                <ListSubheader>My Lists</ListSubheader>

                {listPages.map((page) => (
                  <MenuItem
                    key={page.path}
                    component={Link}
                    to={page.path}
                    selected={currentPath === page.path}
                    onClick={closeMenus}
                  >
                    {page.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{
                  borderBottom: currentPath === "/"
                    ? "2px solid"
                    : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/movies/explore"
                color="inherit"
                sx={{
                  borderBottom: currentPath === "/movies/explore"
                    ? "2px solid"
                    : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                Explore
              </Button>

              <Button
                component={Link}
                to="/movies/search"
                color="inherit"
                sx={{
                  borderBottom: currentPath === "/movies/search"
                    ? "2px solid"
                    : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                Search
              </Button>

              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                onClick={(event) => {
                  setListsAnchor(null);
                  setBrowseAnchor(event.currentTarget);
                }}
                sx={{
                  borderBottom: browseActive
                    ? "2px solid"
                    : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                Browse
              </Button>

              <Menu
                anchorEl={browseAnchor}
                open={Boolean(browseAnchor)}
                onClose={closeMenus}
              >
                {browsePages.map((page) => (
                  <MenuItem
                    key={page.path}
                    component={Link}
                    to={page.path}
                    selected={currentPath === page.path}
                    onClick={closeMenus}
                  >
                    {page.label}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                onClick={(event) => {
                  setBrowseAnchor(null);
                  setListsAnchor(event.currentTarget);
                }}
                sx={{
                  borderBottom: listsActive
                    ? "2px solid"
                    : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                My Lists
              </Button>

              <Menu
                anchorEl={listsAnchor}
                open={Boolean(listsAnchor)}
                onClose={closeMenus}
              >
                {listPages.map((page) => (
                  <MenuItem
                    key={page.path}
                    component={Link}
                    to={page.path}
                    selected={currentPath === page.path}
                    onClick={closeMenus}
                  >
                    {page.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
};

export default SiteHeader;