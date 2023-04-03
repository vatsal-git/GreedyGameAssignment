import React from "react";
import "./index.css";

import { useDispatch, useSelector } from "react-redux";

import Button from "./../button";
import { closeModal, modalSelector } from "../../../store/modal";

function Modal({ title, actions, type, ...props }) {
  const modal = useSelector(modalSelector);
  const dispatch = useDispatch();

  return (
    <div
      className="modal-wrapper"
      style={{
        display: modal.type === type && modal.isModalOpen ? "block" : "none",
      }}
    >
      <div className="modal">
        <div className="modal-title">{title}</div>
        <div className="modal-content">{props.children}</div>
        <div className="modal-actions">
          <Button type="secondary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
          {actions}
        </div>
      </div>
    </div>
  );
}

export default Modal;
