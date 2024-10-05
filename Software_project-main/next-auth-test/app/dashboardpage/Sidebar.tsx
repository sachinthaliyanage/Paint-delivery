import React from "react";
import { Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PowerIcon,
  DocumentPlusIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface SidebarProps {
  handleLogout: () => void;
  handleAddCsvClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout, handleAddCsvClick }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHistoryClick = () => {
    router.push('/history');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem onClick={handleAddCsvClick}>
          <ListItemPrefix>
            <DocumentPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          Upload CSV
        </ListItem>
        <ListItem onClick={handleHistoryClick}>
          <ListItemPrefix>
            <ClockIcon className="h-5 w-5" />
          </ListItemPrefix>
          History
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      <button onClick={triggerFileInput} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
        Upload CSV
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAddCsvClick}
        accept=".csv,.xlsx"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Sidebar;