import {useState} from 'react'
const TimeFilter = ({onDateChange,onDayChange}) => {
    const [activeFilter, setActiveFilter] = useState('1D'); // Default selection is '1D'
  
    const handleFilterChange = (filter) => {
      setActiveFilter(filter);
      onDayChange(filter);
      // Trigger actions like updating graphs here
    };
  
    return (
      <div style={styles.filterContainer}>
        {[{label: '1D', value: 1},{label: '1W', value: 7}, {label: '1Y', value: 366}].map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter)}
            style={{
              ...styles.filterButton,
              ...(activeFilter === filter ? styles.activeFilterButton : {}),
            }}
          >
            {filter.label}
          </button>
        ))}
        <input type='date'
          onChange={(e) => onDateChange(e.target.value)}
          style={styles.filterButton}
        />
      </div>
    );
  };
  
  const styles = {
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #E0E0E0',
      borderRadius: '8px',
      padding: '4px',
      backgroundColor: '#F5F7F9',
      gap: '4px',
      width: '350px',
    },
    filterButton: {
      padding: '6px 12px',
      fontSize: '14px',
      color: '#555',
      backgroundColor: '#FFF',
      border: '1px solid #E0E0E0',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '90px', // Ensure consistent width
      textAlign: 'center',
    },
    activeFilterButton: {
      backgroundColor: '#E0E7FF',
      color: '#333',
      fontWeight: 'bold',
    },
    dateInput: {
      padding: '6px 12px',
      fontSize: '14px',
      color: '#555',
      backgroundColor: '#FFF',
      border: '1px solid #E0E0E0',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '90px', 
      textAlign: 'center',
    },
  };

  export default TimeFilter;
  