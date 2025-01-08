import React, { useState } from 'react';
import Filter from './Filter'; 

const TopBar = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => {
    console.log('Filter icon clicked!'); // Debug log
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div>
      {/* Top Bar */}
      <div style={styles.TopBar}>
        <div style={styles.TopBarFilter}>
          {/* Filter Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="53"
            viewBox="0 0 54 53"
            fill="none"
            onClick={toggleFilter} 
            style={{ cursor: 'pointer', zIndex: 10 }} 
          >
            <path d="M11.25 15.4584H42.75" stroke="#0F1B2D" strokeWidth="2" strokeLinecap="round" />
            <path d="M11.25 26.5H33.75" stroke="#0F1B2D" strokeWidth="2" strokeLinecap="round" />
            <path d="M11.25 37.5416H24.75" stroke="#0F1B2D" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Usmart */}
          <span style={styles.usText}>
            Us<span style={styles.martText}>mart</span>
          </span>
        </div>

        <div style={styles.TopBarTitle}>
          {/* Us market bot */}
          <div style={styles.usMarketBotText}>
            Us market bot.
          </div>
        </div>

        <div style={styles.TopBarAccount}>
          {/* Account Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 65 65" fill="none">
            <mask id="mask0_34_82" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="65" height="65">
              <rect width="65" height="65" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_34_82)">
              <path
                d="M15.1528 40.3254C17.4612 38.5807 20.0411 37.205 22.8926 36.1985C25.7441 35.1919 28.7314 34.6886 31.8545 34.6886C34.9776 34.6886 37.9648 35.1919 40.8164 36.1985C43.6679 37.205 46.2478 38.5807 48.5562 40.3254C50.1403 38.4912 51.3737 36.411 52.2563 34.0847C53.1389 31.7585 53.5802 29.2756 53.5802 26.6362C53.5802 20.6863 51.4642 15.62 47.2322 11.4372C43.0002 7.25438 37.8743 5.16298 31.8545 5.16298C25.8346 5.16298 20.7087 7.25438 16.4767 11.4372C12.2447 15.62 10.1287 20.6863 10.1287 26.6362C10.1287 29.2756 10.57 31.7585 11.4526 34.0847C12.3352 36.411 13.5686 38.4912 15.1528 40.3254ZM31.8545 29.3203C29.184 29.3203 26.9322 28.4144 25.0991 26.6026C23.266 24.7908 22.3495 22.5652 22.3495 19.9258C22.3495 17.2864 23.266 15.0608 25.0991 13.249C26.9322 11.4372 29.184 10.5313 31.8545 10.5313C34.5249 10.5313 36.7767 11.4372 38.6098 13.249C40.4429 15.0608 41.3595 17.2864 41.3595 19.9258C41.3595 22.5652 40.4429 24.7908 38.6098 26.6026C36.7767 28.4144 34.5249 29.3203 31.8545 29.3203ZM31.8545 53.4777C28.0977 53.4777 24.5673 52.7731 21.2632 51.3639C17.959 49.9548 15.0849 48.0423 12.6407 45.6266C10.1966 43.2108 8.26165 40.3701 6.8359 37.1044C5.41014 33.8387 4.69727 30.3493 4.69727 26.6362C4.69727 22.9231 5.41014 19.4337 6.8359 16.168C8.26165 12.9023 10.1966 10.0616 12.6407 7.64582C15.0849 5.23008 17.959 3.31763 21.2632 1.90845C24.5673 0.499268 28.0977 -0.205322 31.8545 -0.205322C35.6112 -0.205322 39.1417 0.499268 42.4458 1.90845C45.7499 3.31763 48.6241 5.23008 51.0682 7.64582C53.5124 10.0616 55.4473 12.9023 56.8731 16.168C58.2988 19.4337 59.0117 22.9231 59.0117 26.6362C59.0117 30.3493 58.2988 33.8387 56.8731 37.1044C55.4473 40.3701 53.5124 43.2108 51.0682 45.6266C48.6241 48.0423 45.7499 49.9548 42.4458 51.3639C39.1417 52.7731 35.6112 53.4777 31.8545 53.4777ZM31.8545 48.1094C34.2534 48.1094 36.5165 47.7627 38.6438 47.0693C40.7711 46.3759 42.7174 45.3805 44.4826 44.0832C42.7174 42.7858 40.7711 41.7905 38.6438 41.0971C36.5165 40.4037 34.2534 40.057 31.8545 40.057C29.4556 40.057 27.1925 40.4037 25.0652 41.0971C22.9379 41.7905 20.9916 42.7858 19.2264 44.0832C20.9916 45.3805 22.9379 46.3759 25.0652 47.0693C27.1925 47.7627 29.4556 48.1094 31.8545 48.1094ZM31.8545 23.952C33.0313 23.952 34.0044 23.5718 34.7739 22.8113C35.5433 22.0508 35.9281 21.0889 35.9281 19.9258C35.9281 18.7627 35.5433 17.8009 34.7739 17.0404C34.0044 16.2798 33.0313 15.8996 31.8545 15.8996C30.6777 15.8996 29.7045 16.2798 28.9351 17.0404C28.1656 17.8009 27.7809 18.7627 27.7809 19.9258C27.7809 21.0889 28.1656 22.0508 28.9351 22.8113C29.7045 23.5718 30.6777 23.952 31.8545 23.952Z"
                fill="#0F1B2D"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Filter Component */}
      <Filter isVisible={isFilterVisible} onClose={() => setFilterVisible(false)} />
    </div>
  );
};

// Styling
const styles = {
  TopBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px',
    height: '80px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E0E0E0',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },

  TopBarFilter: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  },

  TopBarTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    textAlign: 'center',
  },

  TopBarAccount: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60px',
    overflow: 'visible',
    margin: 0,
    paddingRight: '8px',
    paddingTop: '10px',
  },

  usText: {
    color: '#0F1B2D',
    fontSize: '35px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif',
    lineHeight: '28px',
    marginLeft: '15px',
  },

  martText: {
    color: '#9370DB',
    fontSize: '35px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif',
    lineHeight: '28px',
  },

  usMarketBotText: {
    fontSize: '25px',
    color: '#0F1B2D',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    lineHeight: 'normal',
  },
};

export default TopBar;
