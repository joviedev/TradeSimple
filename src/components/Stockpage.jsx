import React, { useState } from 'react';
import * as echarts from 'echarts';
import TimeFilter from './Timefilter';

const StockPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(7); // Default graph value to 1W

  return (
<div style={styles.outerContainer}>
      {/* Header Section on Background */}
      <div style={styles.headerSection}>
        <h1 style={styles.title}>Stock Analysts</h1>
        <div style={styles.searchAndActions}>
          {/* Dropdown selection */}
          <div style={styles.dropdownWrapper}>
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={styles.dropdown}
            >
              <option value="" disabled>
                Select Stocks
              </option>
              <option value="Stock1">Stock 1</option>
              <option value="Stock2">Stock 2</option>
              <option value="Stock3">Stock 3</option>
            </select>
          </div>
          {/* Buttons */}
          <div style={styles.buttonGroup}>
          <button style={styles.downloadButton}>
            <span style={styles.downloadIcon}>
              {/* New Download Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 28 28"
                fill="none"
              >
                <mask
                  id="mask0_34_130"
                  style={{ maskType: 'alpha' }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="28"
                  height="28"
                >
                  <rect width="28" height="28" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_34_130)">
                  <path
                    d="M14.0001 18.6667L8.16675 12.8334L9.80008 11.1417L12.8334 14.175V4.66669H15.1667V14.175L18.2001 11.1417L19.8334 12.8334L14.0001 18.6667ZM7.00008 23.3334C6.35841 23.3334 5.80911 23.1049 5.35216 22.6479C4.89522 22.191 4.66675 21.6417 4.66675 21V17.5H7.00008V21H21.0001V17.5H23.3334V21C23.3334 21.6417 23.1049 22.191 22.648 22.6479C22.1911 23.1049 21.6417 23.3334 21.0001 23.3334H7.00008Z"
                    fill="#202A3A"
                  />
                </g>
              </svg>
            </span>
            {/* Download Text */}
            <span style={styles.downloadText}>Download</span>
          </button>
            <button style={styles.refreshButton}>
            {/* Refresh Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="19"
                viewBox="0 0 40 40"
                fill="none"
              >
                <mask
                  id="mask0_34_127"
                  style={{ maskType: 'alpha' }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                >
                  <rect width="40" height="40" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_34_127)">
                  <path
                    d="M8.83333 28.0833C8.22222 27.0278 7.76389 25.9444 7.45833 24.8333C7.15278 23.7222 7 22.5833 7 21.4167C7 17.6944 8.29167 14.5278 10.875 11.9167C13.4583 9.30555 16.6111 8 20.3333 8H20.625L17.9583 5.33333L20.2917 3L26.9583 9.66667L20.2917 16.3333L17.9583 14L20.625 11.3333H20.3333C17.5556 11.3333 15.1944 12.3125 13.25 14.2708C11.3056 16.2292 10.3333 18.6111 10.3333 21.4167C10.3333 22.1389 10.4167 22.8472 10.5833 23.5417C10.75 24.2361 11 24.9167 11.3333 25.5833L8.83333 28.0833ZM20.375 39.6667L13.7083 33L20.375 26.3333L22.7083 28.6667L20.0417 31.3333H20.3333C23.1111 31.3333 25.4722 30.3542 27.4167 28.3958C29.3611 26.4375 30.3333 24.0556 30.3333 21.25C30.3333 20.5278 30.25 19.8194 30.0833 19.125C29.9167 18.4306 29.6667 17.75 29.3333 17.0833L31.8333 14.5833C32.4444 15.6389 32.9028 16.7222 33.2083 17.8333C33.5139 18.9444 33.6667 20.0833 33.6667 21.25C33.6667 24.9722 32.375 28.1389 29.7917 30.75C27.2083 33.3611 24.0556 34.6667 20.3333 34.6667H20.0417L22.7083 37.3333L20.375 39.6667Z"
                    fill="#85888C"
                  />
                </g>
              </svg>
          </button>
          </div>
        </div>
      </div>

      {/* White Content Container */}
      <div style={styles.container}>
        {/* Main Content */}
        <div style={styles.mainContent}>
        <div style={styles.stockInfo}>
          <div style={styles.stockIcon}>
            <span style={styles.appleIcon}></span>
          </div>
          <div>
            <h2 style={styles.stockTitle}>Apple Inc. AAPL</h2>
            <p style={styles.stockDescription}>
              One of the world's most valuable companies, Apple creates icons
              like the iPhone and MacBook, shaping how we connect and create.
            </p>
            </div> 
          </div>
          <div style={styles.graphSection}>
          <div style={styles.graphHeader}>
            <h3 style={styles.graphTitle}>Stock forecast</h3>
            <TimeFilter
              onDateChange={(d) => {
                console.log(d);
                setDate(d);
              }}
              onDayChange={(filter) => setDay(filter.value)}
            />
          </div>
           {/* Placeholder Graph */}
           <div style={styles.graphPlaceholder}>
            <p style={{ color: '#CCCCCC' }}>Graph Data Coming Soon...</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  outerContainer: {
    backgroundColor: '#F5F7F9', 
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
  headerSection: {
    marginTop: '75px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginLeft: '50px',
    marginRight: '50px',
  },
  container: {
    padding: '20px',
    fontFamily: 'Inter, sans-serif',
    color: '#333',
    marginTop: '30px',
    marginLeft: '50px',
    marginRight: '50px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    height: '500px',
    minHeight: '500px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
  },
  searchAndActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
  },
  dropdownWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #C4B5FD",
    borderRadius: "8px",
    backgroundColor: "#FFF",
    padding: "6px 10px",
    width: "300px",
    height: "26px",
    justifyContent: "center",
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  mainContent: {
    display: 'flex',
    gap: '20px',
    marginTop: '30px',
  },
  stockInfo: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: '10px',
    padding: '20px',
  },
  appleIcon: {
    fontSize: '50px',
  },
  stockTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  stockDescription: {
    fontSize: '16px',
    color: '#757575',
    lineHeight: '1.6',
    fontWeight: '400px',
  },
  graphSection: {
    flex: 2,
    backgroundColor: '#FFF',
    borderRadius: '10px',
    padding: '0px',
    marginTop: '-30px',
  },
  graphHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  downloadButton: {
    backgroundColor: 'rgba(177, 144, 244, 0.80)',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    height: '39px',
  },
  downloadIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  downloadText: {
    color: '#202A3A',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  refreshButton: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #CCC',
    padding: '8px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  graphTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#676767',
    fontFamily: 'Inter, sans-serif',
  },
  graphPlaceholder: {
    height: '300px',
    backgroundColor: '#F5F7F9',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#AAA',
    height: '400px', 
    width: '100%', 
  },
  dropdown: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "#9299A5",
    flex: 1,
    backgroundColor: "transparent",
    cursor: "pointer",
  },
};

export default StockPage;
