"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Import the ApexOptions type

// Dynamically import ApexCharts to avoid SSR issues
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartPage() {
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  // Fetch data from JSONPlaceholder API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsersCount(data.length))
      .catch((error) => console.error("Error fetching users:", error));

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPostsCount(data.length))
      .catch((error) => console.error("Error fetching posts:", error));

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => setCommentsCount(data.length))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  // Chart configuration with explicit type
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: true, // Show toolbar for exporting and zooming
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%", // Adjust the width of the bars
        dataLabels: {
          position: "top", // Show data labels on top of bars
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}`, // Format data labels
      style: {
        colors: ["#000"], // Black color for data labels
      },
    },
    xaxis: {
      categories: ["Users", "Posts", "Comments"],
      title: {
        text: "Categories",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      title: {
        text: "Total Count",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    colors: ["#4CAF50", "#2196F3", "#FF5722"],
    title: {
      text: "Total Counts of Users, Posts, and Comments",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val} items`, // Format tooltip values
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    annotations: {
      yaxis: [
        {
          y: 50,
          borderColor: "#FF0000",
          label: {
            borderColor: "#FF0000",
            style: {
              color: "#fff",
              background: "#FF0000",
            },
            text: "Threshold: 50",
          },
        },
      ],
    },
  };

  const chartSeries = [
    {
      name: "Total Count",
      data: [usersCount, postsCount, commentsCount],
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard Charts</h1>
      <p className="text-center text-gray-700 mb-6">
        This dashboard provides an overview of the total number of users, posts, and comments fetched from the JSONPlaceholder API. The chart below dynamically updates as new data is fetched.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ApexCharts options={chartOptions} series={chartSeries} type="bar" height={400} />
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          The chart above highlights the total counts for each category. Hover over the bars to see detailed information.
        </p>
      </div>
    </div>
  );
}