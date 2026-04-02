/**
 * Authorizes a request based on the user's role
 * @param  {...any} roles - The roles that are allowed to access the resource
 * @returns {Function} - The middleware function
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission",
            });
        }

        next();
    };
};



module.exports = { authorize };