const express = require("express");
const Notification = require("../../models/Notification");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

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

//Add Notification
const sendNotification = async (req, res, next) => {
  try {
    const newNoti = await new Notification(req.body);
    const result = await newNoti.save();

    return createResponse(res, result);
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
};
