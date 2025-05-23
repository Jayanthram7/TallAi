import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom"; // Import Link from React Router
import account from "../Assets/Account-Login.svg"; // Ensure this path is correct
import TallAi from "../Assets/logo.jpg"; // Ensure this path is correct
import { ArrowRight } from "lucide-react";
import { UserPlus } from "lucide-react";

const navigation = [
  { name: "TallAi", path: "/home", current: false }, // Updated path to point to /home
  { name: "Invoice to Tally", path: "../Call records/Callrecords", current: false },
  { name: "Data Visualization", path: "/Data-Vis", current: false },
  { name: "Call Records", path: "/call-records", current: false }, // Update to use path
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full z-50 h-[4rem] bg-white backdrop-blur-lg shadow-md">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 h-full">
        <div className="relative flex h-full items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="TallAi Logo"
                src={TallAi}
                className="h-12 mt-1 w-auto"
              />
            </div>
            <div className="flex text-2xl font-semibold ml-2 items-center justify-center">
  <span className="text-gray-800">Advent</span>
  <span className="text-indigo-500 ml-2 ">Systems </span>
</div>

          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                  <img
                    alt="Profile"
                    src={account}
                    className="size-8 rounded-full hover:opacity-80"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>

            {/* Register Button */}
            <Link
              to="/Register"
              className="ml-4 flex items-center gap-2 rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
            >
              <UserPlus size={16} /> Register
            </Link>
            <Link
              to="/signin"
              className="ml-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-md transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Login <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.path}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-200",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
