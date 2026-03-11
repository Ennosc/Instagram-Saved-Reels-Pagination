const Saved = require('../models/Upload')

module.exports = {
    getPosts: async ({userId, filter, page, selectedDate}) => {
        //console.log("getPosts", page)
        const query = buildQuery(filter, selectedDate)
        query.userId = userId

        const limit = 12
        const skip = (page - 1) * limit
        const [total, savedItems] = await Promise.all([
            Saved.countDocuments(query),
            Saved.find(query)
                .sort({ savedAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean() 
        ]);
        const totalPages = Math.ceil(total / limit)

        return {
            savedItems,
            filter,
            page,
            totalPages,
            selectedDate
        }
    }
}
const buildQuery = (filter, selectedDate) => {
    let query = {};

    if (filter === 'today') {
        const now = new Date();
        query = {
            $expr: {
                $and: [
                    { $eq: [{ $dayOfMonth: "$savedAt" }, now.getDate()] },
                    { $eq: [{ $month: "$savedAt" }, now.getMonth() + 1] },
                ]
            }
        }
        
    } else if (filter === 'date' && selectedDate) {
        console.log("date build query")
        const start = new Date(selectedDate); 
        const end = new Date(selectedDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        query.savedAt = { 
            $gte: start, 
            $lte: end 
        };
        
        console.log("Start:", start.toISOString());
        console.log("End:", end.toISOString());
    }
    //console.log("build", query)
    return query;
};

