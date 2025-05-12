"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Import the ApexOptions type
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadCN Card component

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
    responsive: [
      {
        breakpoint: 768, // For tablets and smaller devices
        options: {
          plotOptions: {
            bar: {
              horizontal: true, // Switch to horizontal bars on smaller screens
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
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
        colors: ["#000", "#FFF"], // Black for light mode, white for dark mode
      },
    },
    xaxis: {
      categories: ["Users", "Posts", "Comments"],
      title: {
        text: "Categories",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333", // Default text color for light mode
        },
      },
      labels: {
        style: {
          colors: ["#333", "#FFF"], // Black for light mode, white for dark mode
        },
      },
    },
    yaxis: {
      title: {
        text: "Total Count",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333", // Default text color for light mode
        },
      },
      labels: {
        style: {
          colors: ["#333", "#FFF"], // Black for light mode, white for dark mode
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
        color: "#333", // Default text color for light mode
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark", // Use dark theme for tooltips in dark mode
      y: {
        formatter: (val) => `${val} items`, // Format tooltip values
      },
    },
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: ["#333", "#FFF"], // Black for light mode, white for dark mode
      },
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
    <div className="container mx-auto p-6 dark:bg-gray-900">
      <Card className="shadow-lg dark:bg-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold dark:text-white">
            Dashboard Charts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
            This dashboard provides an overview of the total number of users,
            posts, and comments fetched from the JSONPlaceholder API. The chart
            below dynamically updates as new data is fetched.
          </p>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg">
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={400}
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              The chart above highlights the total counts for each category.
              Hover over the bars to see detailed information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}