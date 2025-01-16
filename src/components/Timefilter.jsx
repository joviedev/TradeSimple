import { forwardRef, useImperativeHandle, useState } from "react";
const TimeFilter = forwardRef(({ onDateChange, onDayChange},ref) => {
  const [activeFilter, setActiveFilter] = useState(7); // Default selection is '1D'
  const [date, setDate] = useState(null); // Default selection is '1D'

  // 
  useImperativeHandle(ref, () => ({
    reset:()=>{
      setActiveFilter(7);
      setDate(null);
      onDateChange(null);
      onDayChange({value:activeFilter})
    },
  }));

  // to get current date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;


  // calulate future days - 365 days on calander
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 365);
  const futureYear = futureDate.getFullYear();
  const futureMonth = String(futureDate.getMonth() + 1).padStart(2, "0");
  const futureDay = String(futureDate.getDate()).padStart(2, "0");
  const maxDate = `${futureYear}-${futureMonth}-${futureDay}`;

  const handleFilterChange = (filter) => {
    setActiveFilter(filter.value);
    console.log("filter", filter);
    onDayChange(filter);
    // Trigger actions like updating graphs here
  };

  return (
    <div style={styles.filterContainer}>
      {[
        { label: "1D", value: 1 },
        { label: "1W", value: 7 },
        { label: "1Y", value: 366 },
      ].map((filter) => (
        <div
          key={filter.value}
          onClick={() => handleFilterChange(filter)}
          style={{
            ...styles.filterButton,
            ...(activeFilter === filter.value ? styles.activeFilterButton : {}),
          }}
        >
          {filter.label}
        </div>
      ))}
      <input
        type="date"
        min={minDate}
        max={maxDate}
        value={date}
        onChange={(e) => {
          setActiveFilter(null);
          onDateChange(e.target.value);
        }}
        style={styles.dateInput}
      />
    </div>
  );
});

const styles = {
  filterContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "4px",
    backgroundColor: "#F5F7F9",
    gap: "4px",
    width: "390px",
  },
  filterButton: {
    padding: "6px 12px",
    fontSize: "14px",
    color: "#555",
    borderRadius: "6px",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "90px", // Ensure consistent width
    textAlign: "center",
  },
  activeFilterButton: {
    backgroundColor: "#fff",
    color: "#333",
    fontWeight: "bold",
    border: "1px solid #E0E0E0",
  },
  dateInput: {
    padding: "6px 12px",
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#FFF",
    border: "1px solid #E0E0E0",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "200px",
    textAlign: "center",
  },
};

export default TimeFilter;
