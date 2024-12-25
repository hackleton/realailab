import Order from "../models/order";
import User from "../models/user";
import Room from "../models/room";
import { connectToDB } from "./database";

export const getTotalRevenue = async () => {
  await connectToDB();
  const allOrders = await Order.find({});
  const totalPrice = allOrders.reduce(
    (accumlator, order) => accumlator + order.price,
    0
  );
  return totalPrice;
};

export const getTotalOrders = async () => {
  await connectToDB();
  const allOrders = await Order.find({});

  return allOrders.length;
};

export const getTotalUsers = async () => {
  await connectToDB();
  const allUsers = await User.find({});

  return allUsers.length;
};

export const getUsers = async () => {
  await connectToDB();
  const allUsers = await User.find({});

  return allUsers;
};

export const getGraphData = async () => {
  await connectToDB();
  const graphData = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];
  const allOrders = await Order.find({});
  allOrders.forEach((order) => {
    const month = order.createdAt.getMonth(); // Get the month (0-11) from the createdAt date
    graphData[month].total += order.price; // 9 + 19
  });
  return graphData;
};

export const getRecentOrders = async () => {
  await connectToDB();
  const recentOrders = await Order.find({})
    .populate("customer")
    .sort({ createdAt: -1 })
    .limit(10);
  recentOrders.forEach((order) => {
    const formattedDate = timeAgo(order.createdAt);
    order.formattedDate = formattedDate;
  });
  return recentOrders;
};

export const getOrders = async () => {
  await connectToDB();
  const orders = await Order.find({})
    .populate("customer")
    .sort({ createdAt: -1 });
  orders.forEach((order) => {
    const formattedDate = timeAgo(order.createdAt);
    order.formattedDate = formattedDate;
  });
  return orders;
};

export const getRoomPhotos = async () => {
  await connectToDB();
  const rooms = await Room.find({}).populate("creator");
  return rooms;
};

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval} year${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? "" : "s"} ago`;
  }
  return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`;
}
