import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import TimeFilter from "./Timefilter";
import { use } from "echarts/core";

const xAxis = { data: [] };

const getDateStr = (date) => {
  const theDay = new Date(date);
  const theDayStr = `${theDay.getFullYear()}-${(theDay.getMonth() + 1).toString().padStart(2, "0")}-${theDay.getDate().toString().padStart(2, "0")}`;
  return theDayStr;
}

const InsuranceUsagePrediction = () => {
  const [inputValue, setInputValue] = useState("BTC/USD");
  const chartRef = useRef(null);
  const timeFilterRef = useRef(null);

  const [loading, setLoading] = useState(true);  
  // const [accuracyLoading, setAccuracyLoading] = useState(false);
  
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(7);

  const [chartInstance, setChartInstance] = useState(null);
  const [option, setOption] = useState({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Predicted Prices", "Actual Prices"],
      right: "0",
      textStyle: {
        fontSize: 10,
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [], // Initially empty, will be filled by the API response
      axisLabel: {
        rotate: 45, // Rotate labels by 45 degrees
        formatter: (value) => value.slice(0, 10), // Optional: Shorten date strings
      }
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Predicted Prices",
        type: "line",
        data: [], // Initially empty, will be filled by the API response
      },
      {
        name: "Actual Prices",
        type: "line",
        data: [], // Initially empty, will be filled by the API response
      },
    ],
  });

  // const [accuracyData, setAccuracyData] = useState(null);
  const [predictData, setPredictData] = useState(null);
  

  useEffect(() => {
    // Initialize the ECharts instance
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
        data: [], // Initially empty, will be filled by the API response
        axisLabel: {
          rotate: 45, // Rotate labels by 45 degrees
          formatter: (value) => value.slice(0, 10), // Optional: Shorten date strings
        }
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Predicted Prices",
          type: "line",
          data: [], // Initially empty, will be filled by the API response
        },
        {
          name: "Actual Prices",
          type: "line",
          data: [], // Initially empty, will be filled by the API response
        },
      ],
    };

    setChartInstance(chartInstance);
    setOption(option);

    // Cleanup function to dispose of chart instance
    return () => {
      chartInstance.dispose();
    };
  }, []); // Re-run this effect whenever chartData changes

  // const getAccuracy = () => {
  //   setAccuracyLoading(true);
  //   fetch("/api2/accuracy", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify({
  //     //   ticker: inputValue,
  //     // }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAccuracyLoading(true);
  //       setAccuracyData(data);
  //       return;
  //     })
  //     .catch((error) => {
  //       setAccuracyLoading(true);
  //       setLoading(false);
  //       console.error("Fetch error: ", error);
  //     });
  // };

  // const refetchAccruacy = () => {
  //   if (!accuracyLoading && !accuracyData) {
  //     // getAccuracy();
  //   }
  // };

  const initData = () => {
    setLoading(true);
    fetch("/api2/predict", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   ticker: inputValue,
      //   future_days: day,
      // }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); // Log the data for debugging
        // setChartData(data);  // Store the fetched data into state
        setLoading(false);
        setPredictData(data);
        return;
      })
      .catch((error) => {
        setPredictData(null);
        setLoading(false);
        console.error("Fetch error: ", error);
      });
  };
  // const fetchDate = () => {
  //   setLoading(true);
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const selectedDate = new Date(date);
  //   selectedDate.setHours(0, 0, 0, 0);

  //   // calculate the days between 2 dates
  //   const timeDifference = selectedDate - today;

  //   // change it to days for api
  //   const dayNum = 1 + Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  //   fetch("/api2/predict", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify({
  //     //   ticker: inputValue,
  //     //   future_days: dayNum,
  //     // }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setLoading(false);
  //       setPredictData(data);
  //       return;
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       setPredictData(null);
  //       console.error("Fetch error: ", error);
  //     });
  // };

  // Function to handle the download
  const handleDownload = () => {
    const chartInstance = echarts.getInstanceByDom(chartRef.current);
    const dataURL = chartInstance.getDataURL({
      type: "png",
      pixelRatio: 2, // Optional: Adjust resolution
      backgroundColor: "#fff", // Optional: Set a background color
    });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "chart.png"; // File name for the downloaded image
    link.click();
  };

  useEffect(() => {
    initData();
  }, []);

  // useEffect(() => {
  //   if (!chartInstance) {
  //     return;
  //   }
  //   if (day != -1) {
  //     initData();
  //     setTimeout(() => {
  //       refetchAccruacy();
  //     }, 100);
  //   }
  // }, [day, inputValue, chartInstance]);

  // useEffect(() => {
  //   if (date) {
  //     fetchDate();
  //     setTimeout(() => {
  //       refetchAccruacy();
  //     }, 100);
  //   }
  // }, [date, inputValue]);

  // useEffect(() => {
  //   timeFilterRef.current.reset();
  // }, [inputValue]);

  // useEffect(() => {
  //   if (!chartInstance) {
  //     return;
  //   }
  //   getAccuracy();
  // }, [inputValue, chartInstance]);

  useEffect(() => {
    if (!chartInstance) return;
    const {
      dates = [],
      true_claims = [],
      predicted_claims = []
    } = predictData ?? {};

    if (!dates.length) {
      return;
    }

    let lastIndex = dates.length - 1;
    if (day === -1) {
      if (date) {
        const theDayStr = getDateStr(date);
        lastIndex = dates.indexOf(theDayStr);
      }
    } else {
      const todayStr = getDateStr(new Date());
      lastIndex = dates.indexOf(todayStr);
      if (lastIndex === -1) {
        lastIndex = dates.length - 1;
      } else {
        lastIndex += day;
        if (lastIndex > dates.length - 1) {
          lastIndex = dates.length - 1;
        }
      }
    }
    if (lastIndex === -1) {
      lastIndex = dates.length - 1;
    }

    const xData = dates.slice(0, lastIndex + 1);
    const yData = predicted_claims.slice(0, lastIndex + 1);

    const newOption = { ...option };
    newOption.series[0].data = yData;
    newOption.series[1].data = true_claims;

    // x轴数据合并
    newOption.xAxis.data = xData;

    setOption(newOption);
    chartInstance.setOption(newOption);

  }, [day, date, predictData, chartInstance]);

  console.log("option", chartInstance?.getOption());
  return (
    <div style={styles.outerContainer}>
      {/* White Content Container */}

      <TimeFilter
        key={inputValue}
        ref={timeFilterRef}
        onDateChange={(d) => {
          console.log(d);
          setDate(d);
        }}
        onDayChange={(filter) => setDay(filter.value)}
      />
      {/* ECharts Graph */}
      {loading ? (
        <div style={styles.graphLoading}>Graph Data is Loading...</div>
      ) : null}
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
    height:"100%",
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

export default InsuranceUsagePrediction;
