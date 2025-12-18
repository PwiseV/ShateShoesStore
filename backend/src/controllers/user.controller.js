export const authMe = async (req, res) => {
    return res.status(200).json({ 
        message: 'User',
        user: req.user
    });
};
