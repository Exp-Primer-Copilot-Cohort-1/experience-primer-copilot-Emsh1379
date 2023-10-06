// create web service for comment
// create comment
router.post('/', (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        content: req.body.content,
        productId: req.body.productId
    });
    comment.save().then(result => {
        res.status(201).json({
            message: "Created comment successfully",
            createdComment: {
                _id: result._id,
                userId: result.userId,
                content: result.content,
                productId: result.productId
            },
            request: {
                type: 'GET',
                url: "http://localhost:3000/comment/" + result._id
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});
// get all comment
router.get('/', (req, res, next) => {
    Comment.find()
        .select('_id userId content productId')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                comments: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        content: doc.content,
                        productId: doc.productId,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/comment/" + doc._id
                        }
                    }
                })
            };
            if (docs.length >= 0) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});
// get comment by id
router.get('/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    Comment.findById(id)
        .select('_id userId content productId')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    comment: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/comment'
                    }
                });
            }
            else {
                res.status(404).json({ message: "


