import React from "react";
import styles from "./Chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { selectOrderHistory } from "../../redux/slice/orderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Order charts",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  ///// order theke lekha ber kore ana.
  const status = [];
  orders.map((item) => {
    const { orderStatus } = item;
    status.push(orderStatus);
  });

  const getOrderCount = (array, value) => {
    return array.filter((n) => n === value).length;
  };
  const placed = getOrderCount(status, "Order Placed...");
  const processing = getOrderCount(status, "Processing...");
  const shipped = getOrderCount(status, "Shipped...");
  const delivered = getOrderCount(status, "Delivered");

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />;
      </Card>
    </div>
  );
};

export default Chart;
