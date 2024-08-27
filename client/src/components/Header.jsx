// // new header.

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Dialog,
//   DialogPanel,
//   Popover,
//   PopoverButton,
//   PopoverGroup,
//   PopoverPanel,
// } from "@headlessui/react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   UserCircleIcon,
// } from "@heroicons/react/24/outline";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

// const products = [
//   {
//     name: "Analytics",
//     description: "Get a better understanding of your traffic",
//     href: "#",
//     icon: UserCircleIcon,
//   },
//   // Add other products here
// ];

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   console.log(user);
//   console.log(user);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//         setIsLoggedIn(true);
//       } else {
//         setUser(null);
//         setIsLoggedIn(false);
//       }
//     };

//     handleStorageChange(); // Check immediately on component mount
//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     navigate("/"); // Navigate to the homepage after logout
//   };

//   const renderLinks = () => {
//     if (!isLoggedIn) {
//       return (
//         <>
//           <a
//             href="/admin-login"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Admin
//           </a>
//           <a
//             href="/teacher-login"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Teacher
//           </a>
//           <a
//             href="/student-login"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Student
//           </a>
//         </>
//       );
//     } else if (isLoggedIn && user) {
//       return (
//         <>
//           <Popover className="relative">
//             <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
//               Courses
//               <ChevronDownIcon
//                 aria-hidden="true"
//                 className="h-5 w-5 flex-none text-gray-400"
//               />
//             </PopoverButton>
//             <PopoverPanel
//               transition
//               className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//             >
//               <div className="p-4">
//                 {products.map((item) => (
//                   <div
//                     key={item.name}
//                     className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
//                   >
//                     <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
//                       <item.icon
//                         aria-hidden="true"
//                         className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
//                       />
//                     </div>
//                     <div className="flex-auto">
//                       <a
//                         href={item.href}
//                         className="block font-semibold text-gray-900"
//                       >
//                         {item.name}
//                         <span className="absolute inset-0" />
//                       </a>
//                       <p className="mt-1 text-gray-600">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </PopoverPanel>
//           </Popover>

//           <Popover className="relative">
//             <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
//               Exams
//               <ChevronDownIcon
//                 aria-hidden="true"
//                 className="h-5 w-5 flex-none text-gray-400"
//               />
//             </PopoverButton>
//             <PopoverPanel
//               transition
//               className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//             >
//               <div className="p-4">
//                 {products.map((item) => (
//                   <div
//                     key={item.name}
//                     className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
//                   >
//                     <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
//                       <item.icon
//                         aria-hidden="true"
//                         className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
//                       />
//                     </div>
//                     <div className="flex-auto">
//                       <a
//                         href={item.href}
//                         className="block font-semibold text-gray-900"
//                       >
//                         {item.name}
//                         <span className="absolute inset-0" />
//                       </a>
//                       <p className="mt-1 text-gray-600">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </PopoverPanel>
//           </Popover>
//         </>
//       );
//     }
//     return null;
//   };

//   return (
//     <header className="bg-white border-b">
//       <nav
//         aria-label="Global"
//         className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//       >
//         <div className="flex lg:flex-1">
//           <a href="/" className="-m-1.5 p-1.5">
//             <span className="sr-only">Your Company</span>
//             <img
//               alt="Company Logo"
//               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//               className="h-8 w-auto"
//             />
//           </a>
//         </div>
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//           </button>
//         </div>
//         <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//           <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
//             Home
//           </a>
//           <a
//             href="/about"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             About
//           </a>
//           <a
//             href="/contact"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Contact
//           </a>
//           <a
//             href="/blogs"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Blogs
//           </a>
//           {renderLinks()}
//         </PopoverGroup>

// <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//   {isLoggedIn && user && (
//     <Popover className="relative flex items-center gap-x-3">
//       <span className="text-sm font-semibold leading-6 text-gray-900">
//         {user?.name}
//       </span>
//       <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
//         <UserCircleIcon
//           aria-hidden="true"
//           className="h-8 w-8 text-gray-400"
//         />
//       </Popover.Button>

//       <Popover.Panel
//         transition
//         className="absolute right-0 top-full z-10 mt-3 w-48 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//       >
//         <div className="p-4">
//           {user?.role && user?.id && (
//             <a
//               href={`/${user.role}-profile/${user.id}`}
//               className="block text-sm font-semibold leading-6 text-gray-900"
//             >
//               Profile
//             </a>
//           )}
//           <button
//             onClick={logout}
//             className="mt-2 block w-full text-left text-sm font-semibold leading-6 text-gray-900"
//           >
//             Logout
//           </button>
//         </div>
//       </Popover.Panel>
//     </Popover>
//   )}
// </div>

//       </nav>
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <div className="fixed inset-0 z-10" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-between">
//             <a href="/" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt="Company Logo"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                 className="h-8 w-auto"
//               />
//             </a>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 <a
//                   href="/"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Home
//                 </a>
//                 <a
//                   href="/about"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   About
//                 </a>
//                 <a
//                   href="/contact"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Contact
//                 </a>
//                 <a
//                   href="/blogs"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Blogs
//                 </a>
//                 {renderLinks()}
//               </div>
//               <div className="py-6">
//                 {isLoggedIn && user && (
//                   <button
//                     onClick={logout}
//                     className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Dialog,
//   DialogPanel,
//   Popover,
//   PopoverButton,
//   PopoverGroup,
//   PopoverPanel,
// } from "@headlessui/react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   UserCircleIcon,
// } from "@heroicons/react/24/outline";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

// const products = [
//   {
//     name: "Analytics",
//     description: "Get a better understanding of your traffic",
//     href: "#",
//     icon: UserCircleIcon,
//   },
//   // Additional products can be added here
// ];

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//         setIsLoggedIn(true);
//       } else {
//         setUser(null);
//         setIsLoggedIn(false);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     handleStorageChange(); // Check immediately on component mount

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     navigate("/"); // Navigate to the homepage after logout
//   };

//   const renderLinks = () => {
//     if (!isLoggedIn) {
//       return (
//         <>
//           <a
//             href="/admin-login"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Admin
//           </a>
//           <a
//             href="/teacher-login"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Teacher
//           </a>
//           <a
//             href="/student-login"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Student
//           </a>
//         </>
//       );
//     } else if (isLoggedIn && user) {
//       return <>{/* Additional Popover components for logged-in user */}</>;
//     }
//     return null;
//   };

//   return (
//     <header className="bg-white border-b">
//       <nav
//         aria-label="Global"
//         className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//       >
//         <div className="flex lg:flex-1">
//           <a href="/" className="-m-1.5 p-1.5">
//             <span className="sr-only">Your Company</span>
//             <img
//               alt="Company Logo"
//               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//               className="h-8 w-auto"
//             />
//           </a>
//         </div>
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//           </button>
//         </div>
//         <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//           <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
//             Home
//           </a>
//           <a
//             href="/about"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             About
//           </a>
//           <a
//             href="/contact"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Contact
//           </a>
//           <a
//             href="/blogs"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Blogs
//           </a>
//           {renderLinks()}
//         </PopoverGroup>
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           {isLoggedIn && user && (
//             <Popover className="relative flex items-center gap-x-3">
//               <span className="text-sm font-semibold leading-6 text-gray-900">
//                 {user?.name}
//               </span>
//               <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
//                 <img
//                   src={user?.avatar || "https://via.placeholder.com/40x40"}
//                   alt="User Avatar"
//                   className="h-8 w-8 rounded-full"
//                 />
//               </Popover.Button>
//               <Popover.Panel
//                 transition
//                 className="absolute right-0 top-full z-10 mt-3 w-48 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//               >
//                 <div className="p-4">
//                   {user?.role && user?.id && (
//                     <a
//                       href={`/${user.role}-profile/${user.id}`}
//                       className="block text-sm font-semibold leading-6 text-gray-900"
//                     >
//                       Profile
//                     </a>
//                   )}
//                   <button
//                     onClick={logout}
//                     className="mt-2 block w-full text-left text-sm font-semibold leading-6 text-gray-900"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </Popover.Panel>
//             </Popover>
//           )}
//         </div>
//       </nav>
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-between">
//             <a href="/" className="-m-1.5 p-1.5">
//               <img
//                 alt="Company Logo"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                 className="h-8 w-auto"
//               />
//             </a>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 <a
//                   href="/"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Home
//                 </a>
//                 <a
//                   href="/about"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   About
//                 </a>
//                 <a
//                   href="/contact"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Contact
//                 </a>
//                 <a
//                   href="/blogs"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Blogs
//                 </a>
//                 {renderLinks()}
//               </div>
//               <div className="py-6">
//                 {isLoggedIn && user && (
//                   <button
//                     onClick={logout}
//                     className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }

// trying to fetch the image.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import company_logo from "../assets/ecoders_logo.png";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: UserCircleIcon,
  },
  // Add other products here
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);

        // Set the avatar based on the role
        let avatarPath = "";
        if (parsedUser.role === "admin") {
          avatarPath = `/uploads/admins/${parsedUser.adminAvatar}`;
        } else if (parsedUser.role === "teacher") {
          avatarPath = `/uploads/teachers/${parsedUser.teacherAvatar}`;
        } else if (parsedUser.role === "student") {
          avatarPath = `/uploads/students/${parsedUser.studentAvatar}`;
        }
        setAvatar(
          avatarPath || "https://via.placeholder.com/150.png?text=User+Image"
        );
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    handleStorageChange(); // Check immediately on component mount
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/"); // Navigate to the homepage after logout
  };

  const renderLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <a
            href="/admin-login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Admin
          </a>
          <a
            href="/teacher-login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Teacher
          </a>
          <a
            href="/student-login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Student
          </a>
        </>
      );
    } else if (isLoggedIn && user) {
      return (
        <>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Courses
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Exams
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </>
      );
    }
    return null;
  };

  return (
    <header className="bg-white border-b">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="Company Logo" src={company_logo} className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </a>
          <a
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact
          </a>
          <a
            href="/blogs"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Blogs
          </a>
          {renderLinks()}
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn && user && (
            <Popover className="relative flex items-center gap-x-3">
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {user?.name}
              </span>
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </Popover.Button>

              <Popover.Panel
                transition
                className="absolute right-0 top-full z-10 mt-3 w-48 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {user?.role && user?.id && (
                    <a
                      href={`/${user.role}-profile/${user.id}`}
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Profile
                    </a>
                  )}
                  <button
                    onClick={logout}
                    className="mt-2 block w-full text-left text-sm font-semibold leading-6 text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              </Popover.Panel>
            </Popover>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Company Logo"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </a>
                <a
                  href="/blogs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Blogs
                </a>
                {renderLinks()}
              </div>
              <div className="py-6">
                {isLoggedIn && user && (
                  <button
                    onClick={logout}
                    className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
