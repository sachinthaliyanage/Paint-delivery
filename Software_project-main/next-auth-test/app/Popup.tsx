import React from "react";
import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import "./style.css";

interface PopupProps {
  isPopupActive: boolean;
  isLoginActive: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  isPopupActive,
  isLoginActive,
  onClose,
  children,
}) => {
  return (
    <div className={`wrapper ${isPopupActive ? "active-popup" : ""} ${isLoginActive ? "active" : ""}`}>
      <span className="icon-close" onClick={onClose}>
        <IonIcon icon={close} />
      </span>
      {children}
    </div>
  );
};

export default Popup;
