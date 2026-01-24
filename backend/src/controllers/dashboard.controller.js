import * as DashboardService from "../services/dashboard.service.js";

export const getOverview = async (req, res) => {
  try {
    const data = await DashboardService.getOverviewData();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNewCustomers = async (req, res) => {
  try {
    const data = await DashboardService.getNewCustomersToday();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPopularProducts = async (req, res) => {
  try {
    const data = await DashboardService.getPopularProducts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductViews = async (req, res) => {
  try {
    const data = await DashboardService.getProductViews7Days();
    res.status(200).json({ success: true, data  });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNewComments = async (req, res) => {
  try {
    const data = await DashboardService.getLatestComments();
    res.status(200).json({ success: true,  data  });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};