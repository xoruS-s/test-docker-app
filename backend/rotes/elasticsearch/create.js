const express = require('express');

const router = express.Router();

const { client } = require('../../databases/elasticsearch/index');

const data = []

router.get('/create', (req, res) => {
    const add_es  = async () => {
        // client.cluster.health({},function(err,resp,status) {
        //     console.log("-- Client Health --",resp);
        // });


        // await client.index({
        //     // id: 2,
        //     index: 'course',
        //     body: {
        //         name: "Course name 5",
        //         description: "Course description 5"
        //     }
        // }, (err, resp, status) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(resp);
        //     }
        // })

        // await client.delete({
        //     index: 'game-of-thrones',
        //     id: 'DB0EjoYBgQ-aufFCa3zZ'
        // }, (err, res) => {
        //     console.log(res)
        // });


    }
    add_es().then();
});

module.exports = router;