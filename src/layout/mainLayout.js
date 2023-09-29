import React, { useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";
// import { useLocation } from "react-router-dom";
const MainLayout = (props) => {
	const [sidebar, setSideBar] = useState(true);
	// const location = useLocation();
	// console.log("location: ", location);
	// const user = JSON.parse(localStorage.getItem("auth_admin"));
	return (
		<div className="flex">
			{/* {user && !location.pathname.includes("signin") && ( */}
				<div className={`${sidebar ? "w-[15%]" : ""}  `}>
					<SideBar setSideBar={setSideBar} sidebar={sidebar} />
				</div>
			{/* )} */}
			<div className={`${sidebar ? "w-[85%]":"w-full"}`}>
				{/* {user && !location.pathname.includes("signin") && ( */}
					<Header setSideBar={setSideBar} sidebar={sidebar} />
				{/* )} */}
				{props.children}
			</div>
		</div>
	);
};

export default MainLayout;
