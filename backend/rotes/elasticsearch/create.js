const express = require('express');

const router = express.Router();

const { client } = require('../../databases/elasticsearch/index');

router.post('/create', (req, res) => {
    (async () => {
        await client.index({
            index: 'courses',
            body: {
                name: req.body.name_course,
                description: req.body.description
            }
        }, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                console.log(resp);
            }
        })
    })()
    // console.log(req.body)
    // const add_es  = async () => {
    //
    //     // client.cluster.health({},function(err,resp,status) {
    //     //     console.log("-- Client Health --",resp);
    //     // });
    //
    //
    //     // await client.index({
    //     //     // id: 2,
    //     //     index: 'course',
    //     //     body: {
    //     //         name: "Course name",
    //     //         description: "Course description"
    //     //     }
    //     // }, (err, resp) => {
    //     //     if (err) {
    //     //         console.log(err);
    //     //     } else {
    //     //         console.log(resp);
    //     //     }
    //     // })
    //
    //     // await client.delete({
    //     //     index: 'game-of-thrones',
    //     //     id: 'DB0EjoYBgQ-aufFCa3zZ'
    //     // }, (err, res) => {
    //     //     console.log(res)
    //     // });
    //
    //
    // }
    // add_es().then();
});

module.exports = router;