export const getAdminStats = (req, res) => {
  res.json({
    message: "Admin data fetched successfully",
    admin: req.user.displayName,
    role: req.user.role
  });
};
