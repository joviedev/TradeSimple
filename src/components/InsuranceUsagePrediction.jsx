import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import TimeFilter from "./Timefilter";
import { use } from "echarts/core";

const xAxis = { data: [] };

const InsuranceUsagePrediction = () => {
  const [inputValue, setInputValue] = useState("BTC/USD");
  const chartRef = useRef(null);
  const timeFilterRef = useRef(null);
  const [loading, setLoading] = useState(true);
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

  const getAccuracy = () => {
    fetch("/api1/accuracy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: inputValue,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("xxxxxxxxxget", data); // Log the data for debugging
        const newOption = { ...option };
        newOption.legend.data[1] = data.series[0].name;
        newOption.series[1] = data.series[0];
        const accuracyXData = data.xAxis.data;
        newOption.xAxis = data.xAxis;
        // const oldXAxisData = option.xAxis.data;
        newOption.xAxis.data = Array.from(
          new Set([...xAxis.data, ...accuracyXData])
        ).sort((a, b) => a.localeCompare(b));
        xAxis.data = newOption.xAxis.data;

        setOption(newOption);
        chartInstance.setOption(newOption);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  };

  const initData = () => {
    setLoading(true);
    fetch("/api1/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: inputValue,
        future_days: day,
      }),
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
        const newOption = { ...option };
        const predict = data.series[0];
        const predictX = data.xAxis;

        newOption.legend.data[0] = data.series[0].name;
        predict.data = predict.data.map((d, i) => [predictX.data[i], d]);
        newOption.series[0] = predict;
        // const oldXAxisData = option.xAxis.data;
        newOption.xAxis.data = Array.from(
          new Set([...xAxis.data, ...predictX.data])
        ).sort((a, b) => a.localeCompare(b));
        xAxis.data = newOption.xAxis.data;
        setOption(newOption);
        chartInstance.setOption(newOption);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  };
  const fetchDate = () => {
    setLoading(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // calculate the days between 2 dates
    const timeDifference = selectedDate - today;

    // change it to days for api
    const dayNum = 1 + Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    fetch("/api1/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: inputValue,
        future_days: dayNum,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        console.log(data); // Log the data for debugging
        const newOption = { ...option };
        const predict = data.series[0];
        const predictX = data.xAxis;

        // predict.data = predict.data[predict.data.length-1];
        // predictX.data = predictX.data[predictX.data.length-1];

        newOption.legend.data[0] = data.series[0].name;
        predict.data = predict.data.map((d, i) => [predictX.data[i], d]);
        newOption.series[0] = predict;
        // const oldXAxisData = option.xAxis.data;
        newOption.xAxis.data = Array.from(new Set([...predictX.data])).sort(
          (a, b) => a.localeCompare(b)
        );
        xAxis.data = newOption.xAxis.data;
        setOption(newOption);

        console.log("newOption", newOption);
        chartInstance.setOption(newOption);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  };

  // useEffect(() => {
  //   getReadRoot();
  //   //initData();
  // }, []);

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
    if (!chartInstance) {
      return;
    }
    if (day != -1) {
      initData();
    }
  }, [day, inputValue, chartInstance]);

  useEffect(() => {
    if (date) {
      fetchDate();
    }
  }, [date, inputValue]);

  useEffect(() => {
    timeFilterRef.current.reset();
  }, [inputValue]);

  useEffect(() => {
    if (!chartInstance) {
      return;
    }
    getAccuracy();
  }, [inputValue, chartInstance]);

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
