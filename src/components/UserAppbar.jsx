import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import useAuth from "../hooks/useAuth";

const UserAppbar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { Logout } = useAuth();
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	const menuItems = {
		home: "Home",
		venn: "Venn",
		saved: "Saved",
		rank: "Ranking",
		five_whys: "Five-Whys",
		hmw: "How Might We",
		report: "Report",
		logout: "Log Out",
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogoClick = () => {
		navigate("/home", { replace: true });
	};

	const handleMenuOptionClick = (path) => {
		navigate(`/${path}`, { replace: true });
		handleClose();
	};

	return (
		<Box>
			<AppBar position="static" elevation={0} sx={{ bgcolor: "white" }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						px: 7,
						paddingTop: 5,
						paddingBottom: 5,
					}}>
					<Typography
						variant="h3"
						onClick={handleLogoClick}
						sx={{ cursor: "pointer" }}>
						ElevateMe
					</Typography>
					<IconButton onClick={handleClick}>
						<Avatar sx={{ bgcolor: "#6A6A6A" }} alt="Remy Sharp">
							B
						</Avatar>
					</IconButton>
					<Menu
						id="avatar-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "avatar-menu-button",
						}}>
						{Object.entries(menuItems).map((instance) => {
							const [key, value] = instance;
							return (
								<MenuItem
									onClick={() =>
										value === "Log Out" ? Logout() : handleMenuOptionClick(key)
									}>
									{value}
								</MenuItem>
							);
						})}
						{/* <MenuItem onClick={() => handleMenuOptionClick("home")}>
							Home
						</MenuItem>
						<MenuItem onClick={() => handleMenuOptionClick("saved")}>
							Saved
						</MenuItem>
						<MenuItem onClick={() => handleMenuOptionClick("list")}>
							List
						</MenuItem>
						<MenuItem onClick={handleLogout}>Logout</MenuItem> */}
					</Menu>
				</Box>
			</AppBar>
			<Outlet />
		</Box>
	);
};

export default UserAppbar;
