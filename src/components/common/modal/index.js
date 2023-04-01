import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { closeModal, modalSelector } from "../../../store/modal";
import "./index.css";

function Modal({ title, content, actions, type }) {
  const modal = useSelector(modalSelector);
  const dispatch = useDispatch();

  return (
    <div
      className="modalWrapper"
      style={{
        display: modal.type === type && modal.isModalOpen ? "block" : "none",
      }}
      onClick={() => dispatch(closeModal())}
    >
      <div className="modal">
        <div className="modalTitle">{title}</div>
        <div className="modalContent">{content}</div>
        <div className="modalActions">{actions}</div>
      </div>
    </div>
  );
}

export default Modal;
