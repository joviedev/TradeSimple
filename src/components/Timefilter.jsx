import { forwardRef, useImperativeHandle, useState } from "react";

const TimeFilter = forwardRef(({ onDateChange, onDayChange }, ref) => {
  const [activeFilter, setActiveFilter] = useState(7); // Default selection is '1W'
  const [date, setDate] = useState(""); // Track selected date

  useImperativeHandle(ref, () => ({
    reset: () => {
      setActiveFilter(7);
      setDate("");
      onDateChange(null);
      onDayChange({ value: 7 });
    },
  }));

  // Current date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  // Future date (365 days from now)
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 365);
  const futureYear = futureDate.getFullYear();
  const futureMonth = String(futureDate.getMonth() + 1).padStart(2, "0");
  const futureDay = String(futureDate.getDate()).padStart(2, "0");
  const maxDate = `${futureYear}-${futureMonth}-${futureDay}`;

  const handleFilterChange = (filter) => {
    setActiveFilter(filter.value);
    setDate(""); // Clear date if a filter is selected
    onDayChange(filter);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate); // Keep selected date visible
    setActiveFilter(null); // Deactivate filter buttons
    onDateChange(selectedDate); // Pass date to parent
  };

  return (
    <div style={styles.filterContainer}>
      {/* Render filters */}
      {[
        { label: "1W", value: 7 },
        { label: "1M", value: 31 },
        { label: "3M", value: 93 },
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
        value={date} // Display the selected date
        onChange={handleDateChange}
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
    width: "90px",
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
