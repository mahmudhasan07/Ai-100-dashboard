'use client';
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation"; // Import the hook
import { IoClose } from "react-icons/io5"; // Close icon
import { FiMenu } from "react-icons/fi"; // Menu icon
import users from '@/assests/user.png'
import creators from '@/assests/event-creator.png'
import event from '@/assests/event.png'
import payment from "@/assests/user.png"
import dashboard from "@/assests/dashboard.png"
import logout from '@/assests/logout.png'
import subscription from "@/assests/subscribe.png"
import logo from "@/assests/logo.png"
import complain from '@/assests/complaint.png'
import approve from '@/assests/approved.png'
import { RiAdminFill } from "react-icons/ri";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbMessageReportFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/Redux/ReduxFunction";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/Redux/store";
import { IconType } from "react-icons/lib";
// import { RootState } from "@reduxjs/toolkit/query";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SupAdminRoutes = [
  { label: "Dashboard", route: "/", iconPath: MdDashboard },
  { label: "Users", route: "/users", iconPath: FaUsers },
  { label: "Sellers", route: "/sellers", iconPath: FaUsers },
  { label: "Reports", route: "/reports", iconPath: TbMessageReportFilled },
  { label: "Add Admin", route: "/add-admin", iconPath: RiAdminFill },

];

const adminRoutes = [
  { label: "Dashboard", route: "/", iconPath: MdDashboard },
  { label: "Reports", route: "/reports", iconPath: MdDashboard },
  { label: "Users", route: "/users", iconPath: FaUsers },
  { label: "All Post", route: "/all-post", iconPath: BsFillPostcardFill },
]

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>()

  const { role } = useSelector((state: RootState) => state.Auth)

  const { name } = useSelector((state: RootState) => state.Auth);

  const renderNavItem = (item: { label: string, route: string, iconPath: IconType }) => {
    const isActive = path === item.route;


    return (
      <li key={item.route}>
        <Link
          href={item.route}
          className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-black text-lg transition-all my-3 duration-300 ${isActive
            ? "poppins-semibold  border-l-4 border-primary  bg-gradient-to-r from-primary/80 to-secondary"
            : " border-l-4 border-transparent hover:border-primary hover:bg-gradient-to-r hover:from-primary/80 hover:to-secondary/80 hover:text-black"
            }`}
        >
          {/* <Image src={item.iconPath} alt={item.label} width={20} height={20} className="ml-2" /> */}
          <item.iconPath className="ml-2" size={20} />
          {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate">{item.label}</span>}
        </Link>
      </li>
    );
  };


  const route = useRouter()

  const handleLogOut = () => {
    dispatch(logOut())
    Cookies.remove("accessToken")
    route.push("/login")

  }

  return (
    <div className="relative flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute z-50 top-4 left-4 text-black p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Content */}
      <div
        className={`h-screen bg-white duration-300 flex flex-col  font-inter ${isOpen ? 'w-[320px]' : 'w-[80px]'
          }`}
      >
        {/* Logo */}
        {isOpen && (
          <Link href="/" className="flex justify-center mb-6 pt-[20px] pb-[15px]">
            <Image width={120} height={120} className="max-w-32" src={logo} alt="logo_image" />
          </Link>
        )}

        <div className={`flex flex-col justify-between  h-screen pb-11 ${isOpen ? "pt-0" : 'pt-14'}`}>
          {/* Navigation */}
          <div className="space-y-3">
            {
              role === "SUPERADMIN" ?
                <ul className="pt-2 pb-4 space-y-1 text-sm">{SupAdminRoutes.map(renderNavItem)}</ul>
                :
                <ul className="pt-2 pb-4 space-y-1 text-sm">{adminRoutes.map(renderNavItem)}</ul>

            }
          </div>

          {/* Logout Button */}
          <div>
            <div className="flex px-8 space-x-2  text-lg">
              <FaRegUser className="text-2xl text-black" />
              <p className="font-semibold text-black lg:block hidden">{name}</p>
            </div>
            <button
              onClick={handleLogOut}
              className={`relative flex w-full items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all duration-300 poppins-semibold hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary/60 to-white text-black border-l-4 ${isOpen ? '' : 'justify-center'
                }`}
            >
              <Image src={logout} alt="logout" width={20} height={20} className="ml-2" />
              {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate ">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSlider;
