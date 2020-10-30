let express = require('express');
let Resta = require('../models/restaModel');
const router = express.Router();
router.get('/', paginatedResults(Resta), (req, res) => {
    res.send(res.paginatedResults);
});

function paginatedResults(model) {
    return async (req, res, next) => {

        
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const state = req.query.state
            ? {
                state: {
                    $regex: req.query.state,
                    $options: 'i',
                }
            }
            : {};
        const genre = req.query.genre
            ? {
                genre: {
                    $regex: req.query.genre,
                    $options: 'i',
                }
            }
            : {};
        const searchKeyword = req.query.searchKeyword
            ? {
                name: {
                    $regex: req.query.searchKeyword,
                    $options: 'i',
                },
            }
            : {};
        const sortOrder = req.query.sortOrder
            ? req.query.sortOrder === 'lowest'
                ? { price: 1 }
                : { price: -1 }
            : { _id: -1 };

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {};
        var queryCond = {}
if(req.query.state!='undefined'){
   queryCond={...state}
}
if(req.query.genre!='undefined'){
   queryCond={...queryCond,...genre}
}
if(req.query.searchKeyword!='undefined'){
   queryCond={...queryCond,...searchKeyword}
}


        if (endIndex < await model.find(queryCond).sort({'name': 1}).countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
           
                results.results = await model.find(queryCond).sort({'name': 1}).limit(limit).skip(startIndex).exec()
                res.paginatedResults = results
                next()


        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }



}
router.get('/get1', async (req, res) => {
    // res.send(res.paginatedResults);
    const products = await Resta.find({});
    res.send(products);
})


module.exports = router;