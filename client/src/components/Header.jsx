"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import ecoders_logo from "../assets/ecoders_logo.png";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blogs", href: "/blogs" },
  { name: "Admin", href: "/admin-login" },
  { name: "Teacher", href: "/teacher-login" },
  { name: "Student", href: "/student-login" },
];

const authenticatedNavigation = [
  { name: "Courses", href: "/courses" },
  { name: "Exams", href: "/exams" },
];

const courses = [
  {
    name: "Course 1",
    description: "Description of Course 1",
    href: "#",
  },
  {
    name: "Course 2",
    description: "Description of Course 2",
    href: "#",
  },
  // Add more courses as needed
];

const exams = [
  {
    name: "Exam 1",
    description: "Details about Exam 1",
    href: "#",
  },
  {
    name: "Exam 2",
    description: "Details about Exam 2",
    href: "#",
  },
  // Add more exams as needed
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Example check for user authentication status
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    // Redirect to homepage if user is not logged in and tries to access restricted pages
    if (!user) {
      const restrictedPaths = [
        "/courses",
        "/exams",
        "/profile",
        "/admin-dashboard",
        "/teacher-dashboard",
        "/student-dashboard",
      ];
      if (restrictedPaths.includes(window.location.pathname)) {
        navigate("/");
        alert("Please log in to access this page.");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data and update state
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const getUserRoleLink = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "admin") return "/admin-dashboard";
    if (user.role === "teacher") return "/teacher-dashboard";
    if (user.role === "student") return "/student-dashboard";
    return "/";
  };

  return (
    <header className="bg-white border-b">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-4"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 d-flex align-items-center">
            <span className="sr-only">Your Company</span>
            <img alt="Company Logo" src={ecoders_logo} className="h-8 w-auto" />
            <span className="ms-2 fw-bold text-gray-700">McDonal Trivan</span>
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
          {navigation.map((item) => (
            <a
              key={item.name}
              href={
                item.name === "Admin" ||
                item.name === "Teacher" ||
                item.name === "Student"
                  ? isLoggedIn
                    ? getUserRoleLink()
                    : item.href
                  : item.href
              }
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
          {isLoggedIn &&
            authenticatedNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <img
                  src={ecoders_logo}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </PopoverButton>
              <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </PopoverPanel>
            </Popover>
          ) : (
            <a
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
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
                src={ecoders_logo}
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
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={
                      item.name === "Admin" ||
                      item.name === "Teacher" ||
                      item.name === "Student"
                        ? isLoggedIn
                          ? getUserRoleLink()
                          : item.href
                        : item.href
                    }
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
                {isLoggedIn && (
                  <>
                    <Disclosure as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Courses
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {courses.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>

                    <Disclosure as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Exams
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {exams.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  </>
                )}
              </div>
              {isLoggedIn ? (
                <div className="py-6">
                  <a
                    href="/profile"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
