"use client";;
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import fileStructure from "@/data/Files";



const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    (<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>)
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    (<SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>)
  );
};

export const SidebarBody = (props) => {
  return (<>
    <DesktopSidebar {...props} />
    <MobileSidebar {...(props)} />
  </>);
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (<>
    <motion.div
      className={cn(
        "h-screen px-4 py-4 hidden  md:flex md:flex-col bg-neutral-800 w-[300px] flex-shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}>
      {children}
    </motion.div>
  </>);
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  return (<>
    <div
      className={cn(
        "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-800 w-full"
      )}
      {...props}>
      <div className="flex justify-end z-20 w-full">
        <IconMenu2
          className="text-neutral-200"
          onClick={() => setOpen(!open)} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0 bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            )}>
            <div
              className="absolute right-10 top-10 z-50 text-neutral-200"
              onClick={() => setOpen(!open)}>
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>);
};

export const SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  return (
    (<Link
      href={link.href}
      className={cn("flex items-center justify-start gap-2  group/sidebar py-2", className)}
      {...props}>
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
        {link.label}
      </motion.span>
    </Link>)
  );
};


export const SidebarFileSystem = ({
  link,
  className,
  setFileLink,
  ...props
}) => {
  const { open, animate } = useSidebar();

  return (
    
      <>
      <FileTreeDemo setFileLink={setFileLink}/>
      </>
  );
};

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
function renderTree(structure, setFileLink, setSelected) {
  return structure.map(item => {
    const handleClick = () => {
      if (item.link) {
        setFileLink(item.link); // Set the file link when item is clicked
        setSelected(item.id); // Set the selected item ID
        console.log("Clicked on " + item.name);
      }
    };

    if (item.item === 'folder') {
      return (
        <Folder element={item.name} value={item.id} key={item.id}>
          {renderTree(item.children, setFileLink, setSelected)} {/* Recursively render child items */}
        </Folder>
      );
    } else {
      return (
        <File value={item.id} key={item.id}>
          <p onClick={handleClick}>{truncateString(item.name, 15)}</p> {/* Clickable item */}
        </File>
      );
    }
  });
}

export function FileTreeDemo({ setFileLink }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log(selected); // Log the selected item ID when it changes
  }, [selected]);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <Tree
        className="p-2 overflow-hidden rounded-md"
        elements={fileStructure}
        initialSelected={selected}
      >
        {renderTree(fileStructure, setFileLink, setSelected)} {/* Pass the functions to renderTree */}
      </Tree>
    </div>
  );
}


const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];
