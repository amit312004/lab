import React from 'react';
import './modal.css';

const Modal = ({ setOpenCreate }) => {
  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-titlebox">
          <div className="modal-title">Create New</div>
          <div className="x-btn" onClick={() => setOpenCreate((prev) => !prev)}>
            x
          </div>
        </div>
        <div className="modal-body">
          <div className="inputRowModal">
            <div className="inputBox">
              <div className="input-label">Name</div>
              <input type="text" className="input-modal" placeholder="Enter a Name" />
            </div>
            <div className="inputBox">
              <div className="input-label">Age</div>
              <input type="text" className="input-modal" placeholder="Enter Age" />
            </div>
          </div>

          <div className="inputRowModal">
            <div className="inputBox">
              <div className="input-label">Address</div>
              <input type="text" className="input-modal" placeholder="Enter Address" />
            </div>
            <div className="inputBox">
              <div className="input-label">Mobile</div>
              <input type="text" className="input-modal" placeholder="Enter mobile number" />
            </div>
          </div>

          <div className="inputRowModal">
            <div className="inputBox">
              <div className="input-label">Examined By</div>
              <input type="text" className="input-modal" placeholder="Examined by" />
            </div>
            <div className="inputBox">
              <div className="input-label">Examine Date</div>
              <input type="date" className="input-modal" />
            </div>
          </div>

          <div className="inputRowModal">
            <div className="inputBox">
              <div className="input-label">Selected Test</div>
              <select className="input-modal">
                <option>Test1</option>
                <option>Test2</option>
              </select>
            </div>
            <div className="inputBox">
              <div className="input-label">Report Date</div>
              <input type="date" className="input-modal" />
            </div>
          </div>
          <div className="btnDivModal">
            <div className="submit-modal">Submit</div>
            <div className="submit-modal">Clear</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
