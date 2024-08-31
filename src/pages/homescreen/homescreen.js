import React, { useEffect, useState } from 'react';
import './homescreen.css';
import LabPic from '../../assets/labscientist.webp';
import axios from 'axios';

const Homescreen = () => {
  const [listofTest, setListofTest] = useState([]);
  const [activeIndexNav, setActiveIndexNav] = useState(0);
  const [selectedDetailedTest, setSelectedDetailtest] = useState(null);

  useEffect(() => {
    fetchDataonLoading();
  }, []);

  const fetchDataonLoading = async () => {
    try {
      const response = await axios.get('http://localhost:3000/test/get');
      const data = response.data.data;
      setListofTest(data);
      if (data.length > 0) {
        setSelectedDetailtest(data[0]); // Set the first test as default
      }
      console.log('Fetched Data:', data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleClickNavLink = (index) => {
    setActiveIndexNav(index);
    setSelectedDetailtest(listofTest[index]);
  };

  console.log('Selected Image URL:', selectedDetailedTest?.imgLink);

  return (
    <div className="homescreen">
      <div className="introhomescreen">
        <div className="imghomescreenlogo">
          <div className="imgDiv">
            <img className='lablogohomescreen' src={LabPic} alt='Laboratory' />
          </div>
          <div className="intropart">
            <div className="titlemini">Enterprise Limited</div>
            <div className="titlemajor">Pathotrack</div>
            <div className="description1">
              Foundation of successful laboratory is comprehensive planning and management. This enables building and effectively executing an operating philosophy leading to scientific and business goals.
            </div>
            <div className="description2">
              Pathotrack is a web application that helps you to manage your laboratory and its operations. Our 40 years of experience in day-to-day lab operation using a proven set of methodologies, products, and services is now provided in a new manner to our users.
            </div>
            <div className="topBtnDiv">
              <div className="btns-div">Create</div>
              <div className="btns-div">
                <a style={{ textDecoration: "none", color: "white" }} href='#feedback'>Feedback</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='testhomescreen'>
        <div className="leftparttest">
          <div className="totaltest">
            {listofTest.length} Tests Available
          </div>
          <div className="testNamediv">
            {listofTest.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleClickNavLink(index)}
                className={`testNameTitle ${activeIndexNav === index ? "activeNavLink" : ""}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="rightparttest">
          <div className="topRightPart">
            {selectedDetailedTest?.name}
          </div>
          <div className="bottomRightPart">
            <div className="topbottomRightPart">
              {selectedDetailedTest?.description}
            </div>
            <div className="bottombottomRightPart">
              <div className="bBRightPartLeftSide">
                <div className="detailsBlock">
                  Fasting: <span className='spanColorChange'>{selectedDetailedTest?.fasting}</span>
                </div>
                <div className="detailsBlock">
                  Abnormal Range: <span className='spanColorChange'>{selectedDetailedTest?.abnormalRange}</span>
                </div>
                <div className="detailsBlock">
                  Normal Range: <span className='spanColorChange'>{selectedDetailedTest?.normalRange}</span>
                </div>
                <div className="detailsBlock">
                  Price: <span className='spanColorChange'>{selectedDetailedTest?.price}</span>
                </div>
              </div>
              <div className="bBRightPartRightSide">
                <img
                  src={selectedDetailedTest?.imgLink || 'https://imgs.search.brave.com/vPADSjkYp4Q2Hf3LloXAXuKtCE4WWYhJa3ezMlmj8-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcG9zdC5t/ZWRpY2FsbmV3c3Rv/ZGF5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvMy8y/MDIwLzAxL0dldHR5/SW1hZ2VzLTExMzI4/OTY5NzVfaGVyby0x/MDI0eDU3NS5qcGc_/dz0xMTU1Jmg9MTUy/OA'}
                  alt={selectedDetailedTest?.name || 'Test Image'}
                  className='bBRightImage'
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150.jpg'} // Fallback if the image fails to load
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className='feedbackHomeScreen'>
        <div className='feedbackFormTitle' id="feedback">Feedback Form</div>
        <div className='feedbackForm'>
          <div className='inputFields'>
            <input type='text' className='inputFieldsBox' placeholder='Enter your Name'/>
            <input type='number' className='inputFieldsBox' placeholder='Enter your Mobile Number'/>
            <input type='email' className='inputFieldsBox' placeholder='Enter your Email Id'/>
            <textarea className='inputTextareaMessage' placeholder='Type your message here ...' rows={10} />
          </div>
          <div className='sendEmailButton'>SEND</div>
        </div>
      </div>
      <footer />
    </div>
  );
}
export default Homescreen;
