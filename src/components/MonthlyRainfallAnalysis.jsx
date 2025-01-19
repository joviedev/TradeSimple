import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { use } from "echarts/core";

const xAxis = { data: [] };

const MonthlyRainfallAnalysis = () => {
  const [inputValue, setInputValue] = useState("BTC/USD");
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(7);
  const [chartInstance, setChartInstance] = useState(null);
  const [option, setOption] = useState(null);

  const initData = () => {
    setLoading(true);
    fetch("/api2/predict", {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({}),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const chartInstance = echarts.init(chartRef.current);

        // Define the chart options, will update the data dynamically later
        const option = {
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["Predicted Prices", "Actual Prices"],
            right: "0",
            textStyle: {
              fontSize: 10,
            },
            bottom: "5%",
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "12%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: data.dates.splice(0,30), // Initially empty, will be filled by the API response
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "true claims & predicted_claims",
              type: "bar",
              data: data.precipitation.splice(0,30), // Initially empty, will be filled by the API response
            },
          ],
        };
        setChartInstance(chartInstance);
        chartInstance.setOption(option);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  };

  useEffect(() => {
    initData();
  }, []);

  console.log("option", chartInstance?.getOption());
  return (
    <div style={styles.outerContainer}>
      {/* White Content Container */}
      {/* ECharts Graph */}
      {loading ? (
        <div style={styles.graphLoading}>Graph Data is Loading...</div>
      ) : (
        <></>
      )}
      <div
        ref={chartRef}
        style={{
          ...styles.graph,
          ...{ visibility: loading ? "hidden" : "visible" },
        }}
      ></div>
    </div>
  );
};

// Styles
const styles = {
  outerContainer: {
    padding: "20px",
    height: "100%",
    boxSizing: "border-box",
  },
  headerSection: {
    marginTop: "75px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginLeft: "50px",
    marginRight: "50px",
  },
  container: {
    padding: "20px",
    fontFamily: "Inter, sans-serif",
    color: "#333",
    marginTop: "30px",
    marginLeft: "50px",
    marginRight: "50px",
    backgroundColor: "#FFF",
    borderRadius: "8px",
    height: "510px",
    minHeight: "500px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
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
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  mainContent: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
  },
  stockInfo: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: "10px",
    padding: "20px",
  },
  bitcoinIcon: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
  },
  stockTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  stockDescription: {
    fontSize: "16px",
    color: "#757575",
    lineHeight: "1.6",
    fontWeight: "400px",
  },
  graphSection: {
    flex: 2,
    backgroundColor: "#FFF",
    borderRadius: "10px",
    padding: "0px",
    marginTop: "-30px",
  },
  graphHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2px",
  },
  downloadButton: {
    backgroundColor: "rgba(177, 144, 244, 0.80)",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    height: "39px",
  },
  downloadIcon: {
    display: "flex",
    alignItems: "center",
  },
  downloadText: {
    color: "#202A3A",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "normal",
  },
  refreshButton: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #CCC",
    padding: "8px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  graphTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#676767",
    fontFamily: "Inter, sans-serif",
  },
  graph: {
    height: "250px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#AAA",
    height: "420px",
    width: "100%",
  },
  graphLoading: {
    width: "100%",
    height: "250px",
    display: "flex",
    alignItems: "center",
    color: "#888",
    paddingLeft: "30px",
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

export default MonthlyRainfallAnalysis;
