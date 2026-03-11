const ServicesGet = require('../services/get')
const ServicesModify = require('../services/modify')


module.exports = {
    getIndex: async (req, res) => {
        try{

            const userId = req.session.isGuest
                ? req.session.guestId
                : req.user.id
            
            const { filter, selectedDate, page } = req.query
            const pageNum = parseInt(page) || 1
            //console.log("getIndex", page, pageNum)
            
            const result = await ServicesGet.getPosts({
                userId,
                page: pageNum,
                filter,
                selectedDate
            })

            //console.log("getIndexSavedController", "page", page, "filter", filter, "selectedDate", selectedDate)
            
            res.json({
                saved: result.savedItems,
                currentPage: result.page,
                totalPages: result.totalPages,
                currentFilter: result.filter,
                selectedDate: result.selectedDate
            });
            
        } catch(err){
            console.error("Controller erro:", err);
        }
    },  
    deletePost: async (req, res) => {
        try{
            const {filter, selectedDate, page} = req.query

            await ServicesModify.deletePostById(req.params.id)

            
            res.status(200).json({ 
                success: true, 
                message: "Post deleted" 
            });
            
            // if (mode === "today"){
            //     res.redirect(`/saved/today?page=${page}`)
            // }else if (mode === "date"){
            //     const selectedDate = req.query.selectedDate
            //     console.log("deletePost", selectedDate)
            //     console.log(`/saved/date?selectedDate=${selectedDate}&page=${page}`)
            //     res.redirect(`/saved/date?selectedDate=${selectedDate}&page=${page}`)
            // }else{
            //     res.redirect(`/saved?page=${page}`)
            //}
            
        } catch(err){
            console.log(err)
        }
    }
}

// getToday: async (req, res) => {
//         try {
//             const page = parseInt(req.query.page) || 1
//             const limit = 12 
//             const skip = (page - 1) * limit

//             const today = new Date()
//             const day = today.getDate()
//             const month = today.getMonth() + 1

//             const query = {
//                 $expr: {
//                     $and: [
//                         { $eq: [{ $dayOfMonth: "$savedAt" }, day] },
//                         { $eq: [{ $month: "$savedAt" }, month] }
//                     ]
//                 }
//             }

//             const total = await Saved.countDocuments(query)

//             const savedItems = await Saved.find(query)
//                 .sort({ savedAt: -1 })
//                 .skip(skip)
//                 .limit(limit)

//             const totalPages = Math.ceil(total / limit)

//             res.render('savedToday.ejs', {
//                 saved: savedItems,
//                 currentPage: page,
//                 totalPages
//             })

//         } catch (err) {
//             console.log(err)
//         }
//     },
//     getByDate: async (req, res) => {
//         try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = 12;
//         const skip = (page - 1) * limit;
        
//         //console.log(req)
//         const selectedDate = new Date(req.query.selectedDate);
//         console.log(selectedDate)
//         if (isNaN(selectedDate)) return res.redirect('/saved?page=1');

//         const startOfDay = new Date(selectedDate.setHours(0,0,0,0));
//         const endOfDay = new Date(selectedDate.setHours(23,59,59,999));

//         const savedItems = await Saved.find({
//             savedAt: { 
//                 $gte: startOfDay,
//                 $lte: endOfDay }
//             })
//                 .sort({ savedAt: -1 })
//                 .skip(skip)
//                 .limit(limit);

//         const total = await Saved.countDocuments({
//             savedAt: { $gte: startOfDay, $lte: endOfDay }
//         });

//         const totalPages = Math.ceil(total / limit);
//         console.log("getByDate", req.query.selectedDate)
//         res.render('savedDate.ejs', {
//             saved: savedItems,
//             currentPage: page,
//             totalPages,
//             selectedDate: req.query.selectedDate
//         });

//         } catch(err) {
//             console.log(err);
//         }
//     },   