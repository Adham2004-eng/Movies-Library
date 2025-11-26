import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Fade,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search/ui/SearchBar";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navButtons = (
    <>
      <Button
        color="inherit"
        onClick={() => {
          navigate("/");
          handleMenuClose();
          setShowMobileSearch(false);
        }}
        sx={{ whiteSpace: "nowrap", "&:hover": { color: "red", bgcolor: "#333" } }}
      >
        Home 🎬
      </Button>
      <Button
        color="inherit"
        onClick={() => {
          navigate("/trendingmovies");
          handleMenuClose();
          setShowMobileSearch(false);
        }}
        sx={{ whiteSpace: "nowrap", "&:hover": { color: "red", bgcolor: "#333" } }}
      >
        Trending Movies🔥
      </Button>
      <Button
        color="inherit"
        onClick={() => {
          navigate("/HighestRated");
          handleMenuClose();
          setShowMobileSearch(false);
        }}
        sx={{
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          "&:hover": { color: "red", bgcolor: "#333" },
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
          alt="IMDb"
          style={{ width: 30, height: "auto" }}
        />
        <StarIcon sx={{ color: "#F5C518", fontSize: 20 }} />
        IMDb
      </Button>
      <Button
        startIcon={<FilterListIcon />}
        color="inherit"
        onClick={() => {
          navigate("/filtermovies");
          handleMenuClose();
          setShowMobileSearch(false);
        }}
        sx={{
          whiteSpace: "nowrap",
          border: "1px solid #555",
          px: 2,
          py: 1,
          borderRadius: "8px",
          color: "#fff",
          "&:hover": { color: "red", bgcolor: "#333" },
        }}
      >
        Filter Movies
      </Button>
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#141414",
          boxShadow: "none",
          width: "100%",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 1, sm: 3 },
            height: 64,
            position: "relative",
          }}
        >

          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              variant="h6"
              onClick={() => {
                navigate("/");
                setShowMobileSearch(false);
                handleMenuClose();
              }}
              sx={{
                fontWeight: "bold",
                color: "red",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap",
                transition: "text-shadow 0.3s",
                "&:hover": {
                  textShadow: "0 0 10px red",
                },
              }}
            >
              NETFLIX
            </Typography>


            {isMdUp && <Box display="flex" gap={1}>{navButtons}</Box>}
          </Box>


          {isMdUp ? (
            <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 3 }}>
              <SearchBar />
            </Box>
          ) : (
            <>

              <IconButton
                color="inherit"
                aria-label="search"
                onClick={() => setShowMobileSearch((prev) => !prev)}
              >
                {showMobileSearch ? <CloseIcon /> : <SearchIcon />}
              </IconButton>
            </>
          )}


          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              color="inherit"
              aria-label="account"
              sx={{
                transition: "0.3s",
                "&:hover": { color: "red", transform: "scale(1.1)" },
              }}
            >
              <AccountCircleIcon />
            </IconButton>


            {!isMdUp && (
              <>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      handleMenuClose();
                      setShowMobileSearch(false);
                    }}
                  >
                    Home 🎬
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/trendingmovies");
                      handleMenuClose();
                      setShowMobileSearch(false);
                    }}
                  >
                    Trending Movies🔥
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/HighestRated");
                      handleMenuClose();
                      setShowMobileSearch(false);
                    }}
                  >
                    IMDb Highest Rated
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/filtermovies");
                      handleMenuClose();
                      setShowMobileSearch(false);
                    }}
                  >
                    Filter Movies
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>


      {!isMdUp && showMobileSearch && (
        <Fade in={showMobileSearch}>
          <Paper
            sx={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              bgcolor: "#141414",
              p: 2,
              zIndex: theme.zIndex.drawer + 10,
              boxShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            <SearchBar  />
          </Paper>
        </Fade>
      )}
    </>
  );
};

export default Navbar;
