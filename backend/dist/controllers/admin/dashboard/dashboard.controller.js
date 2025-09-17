"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const dashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        // Date calculations
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
        // 30 days ago from current date
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgoStart = new Date(thirtyDaysAgo.getFullYear(), thirtyDaysAgo.getMonth(), thirtyDaysAgo.getDate());
        // Current month boundaries
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        // Execute all queries in parallel for better performance
        const [todayNewUsers, totalUsers, last30DaysUsers, todayEarnings, totalEarnings, last30DaysEarnings, top3CoursesData, currentMonthUsersData, last30DaysUsersData, currentMonthPurchasesData, last30DaysPurchasesData] = yield Promise.all([
            // User metrics
            yayinstocks_shared_module_1.User.countDocuments({
                createdAt: { $gte: todayStart, $lte: todayEnd }
            }),
            yayinstocks_shared_module_1.User.countDocuments(),
            yayinstocks_shared_module_1.User.countDocuments({
                createdAt: { $gte: thirtyDaysAgoStart, $lt: now }
            }),
            // Earning metrics - optimized with aggregation
            yayinstocks_shared_module_1.PaymentHistory.aggregate([
                {
                    $match: {
                        createdAt: { $gte: todayStart, $lte: todayEnd }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" }
                    }
                }
            ]),
            yayinstocks_shared_module_1.PaymentHistory.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" }
                    }
                }
            ]),
            yayinstocks_shared_module_1.PaymentHistory.aggregate([
                {
                    $match: {
                        createdAt: { $gte: thirtyDaysAgoStart, $lt: now }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" }
                    }
                }
            ]),
            // Top 3 courses - optimized aggregation
            yayinstocks_shared_module_1.PurchasedCourse.aggregate([
                {
                    $unwind: "$items"
                },
                {
                    $lookup: {
                        from: "courses", // Assuming courses collection name
                        localField: "items",
                        foreignField: "_id",
                        as: "courseDetails",
                        pipeline: [
                            { $project: { _id: 1, title: 1, thumbnail: 1 } }
                        ]
                    }
                },
                {
                    $unwind: "$courseDetails"
                },
                {
                    $group: {
                        _id: "$courseDetails._id",
                        title: { $first: "$courseDetails.title" },
                        thumbnail: { $first: "$courseDetails.thumbnail" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 3
                }
            ]),
            // Current month user registrations
            yayinstocks_shared_module_1.User.aggregate([
                {
                    $match: {
                        createdAt: { $gte: currentMonthStart, $lt: nextMonthStart }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$createdAt"
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ]),
            // Last 30 days user registrations
            yayinstocks_shared_module_1.User.aggregate([
                {
                    $match: {
                        createdAt: { $gte: thirtyDaysAgoStart, $lt: now }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$createdAt"
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ]),
            // Current month purchases
            yayinstocks_shared_module_1.PurchasedCourse.aggregate([
                {
                    $match: {
                        createdAt: { $gte: currentMonthStart, $lt: nextMonthStart }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$createdAt"
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ]),
            // Last 30 days purchases
            yayinstocks_shared_module_1.PurchasedCourse.aggregate([
                {
                    $match: {
                        createdAt: { $gte: thirtyDaysAgoStart, $lt: now }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$createdAt"
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ])
        ]);
        // Helper function to generate date range
        const generateDateRange = (startDate, endDate) => {
            const dates = [];
            const current = new Date(startDate);
            while (current < endDate) {
                const dd = String(current.getDate()).padStart(2, "0");
                const mm = String(current.getMonth() + 1).padStart(2, "0");
                const yyyy = current.getFullYear().toString();
                dates.push(`${dd}-${mm}-${yyyy}`);
                current.setDate(current.getDate() + 1);
            }
            return dates;
        };
        // Generate date ranges
        const currentMonthDates = generateDateRange(currentMonthStart, nextMonthStart);
        const last30DaysDates = generateDateRange(thirtyDaysAgoStart, now);
        // Create maps for quick lookup
        const currentMonthUserMap = new Map(currentMonthUsersData.map(item => [item._id, item.count]));
        const last30DaysUserMap = new Map(last30DaysUsersData.map(item => [item._id, item.count]));
        const currentMonthPurchaseMap = new Map(currentMonthPurchasesData.map(item => [item._id, item.count]));
        const last30DaysPurchaseMap = new Map(last30DaysPurchasesData.map(item => [item._id, item.count]));
        // Generate metrics with fallback to 0
        const currentMonthMetrics = currentMonthDates.map(date => ({
            date,
            user: currentMonthUserMap.get(date) || 0,
            purchase: currentMonthPurchaseMap.get(date) || 0
        }));
        const last30DaysMetrics = last30DaysDates.map(date => ({
            date,
            user: last30DaysUserMap.get(date) || 0,
            purchase: last30DaysPurchaseMap.get(date) || 0
        }));
        // Extract totals from aggregation results
        const todayTotal = ((_a = todayEarnings[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        const total = ((_b = totalEarnings[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
        const last30DaysTotal = ((_c = last30DaysEarnings[0]) === null || _c === void 0 ? void 0 : _c.total) || 0;
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully.",
            data: {
                userMetrics: {
                    todayNewUsers,
                    totalUsers,
                    last30DaysUsers
                },
                earningMetrics: {
                    todayEarning: todayTotal,
                    totalEarning: total,
                    last30DaysEarning: last30DaysTotal
                },
                top3Courses: top3CoursesData,
                currentMonthMetrics,
                last30DaysMetrics
            },
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [dashboard]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});
exports.default = dashboardController;
