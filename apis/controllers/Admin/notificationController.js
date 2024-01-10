const express = require("express");
const Notification = require("../../models/Notification");
const User = require("../../models/User");
const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const serviceAccount = require("../../config/rnfitness-app-firebase-admin.json"); // Replace with your service account key

//Add Notification
const addNotification = async (req, res, next) => {
  try {
    const newNoti = await new Notification(req.body);
    const result = await newNoti.save();

    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Notification
const updateNotification = async (req, res, next) => {
  try {
    const noti = await Notification.findById(req.params.id);
    if (!noti) return queryErrorRelatedResponse(req, res, 404, "Notification not found.");

    const isUpdate = await Notification.findByIdAndUpdate(req.params.id, { $set: req.body });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await Notification.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Notification Status
const updateNotiStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const noti = await Notification.findById(id);
    if (!noti) return queryErrorRelatedResponse(req, res, 404, "Notification not found.");

    noti.status = !noti.status;
    const result = await noti.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Notification
const deleteNotification = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const noti = await Notification.findById(id);
    if (!noti) return queryErrorRelatedResponse(req, res, 404, "Notification not found.");
    await Notification.deleteOne({ _id: id });
    deleteResponse(res, "Notification deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Notification
const deleteMultNotification = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);

      const noti = await Notification.findById(id);
      if (!noti) return queryErrorRelatedResponse(req, res, 404, "Notification not found.");

      await Notification.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Get All Notification
const getAllNotification = async (req, res, next) => {
  try {
    const cat = await Notification.find();
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Notification not found.");
    successResponse(res, cat);
  } catch (err) {
    next(err);
  }
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://your-firebase-project-id.firebaseio.com", // Replace with your Firebase project URL
});

//Add Notification
const sendNotification = async (req, res, next) => {
  try {
    const noti = await Notification.findById(req.body.id);
    if (!noti) return queryErrorRelatedResponse(req, res, 404, "Notification not found.");

    // const users = await User.distinct({ status: true, fcm_token: { $exists: true, $ne: null } });
    const uniqueTokens = await User.distinct("fcm_token", { status: true, fcm_token: { $ne: null, $ne: "" } });
    if (!uniqueTokens) return queryErrorRelatedResponse(req, res, 404, "Users not found.");

    for (const token of uniqueTokens) {
      const message = {
        notification: {
          title: noti.title,
          body: noti.description,
        },
        token: token,
      };

      await admin.messaging().send(message);
      // try {
      //   const response = await admin.messaging().send(message);
      // } catch (error) {
      //   next(error);
      // }
    }
    return createResponse(res, "Message send successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addNotification,
  updateNotification,
  deleteNotification,
  deleteMultNotification,
  getAllNotification,
  sendNotification,
  updateNotiStatus,
};
