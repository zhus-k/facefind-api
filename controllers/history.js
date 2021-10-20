
const getHistory = (req, res, db) => {
    const { id } = req.body;

    // Return history of user of id
    db(`history${id}`).orderBy('date', 'desc')
        .then(sel => {
            res.json(sel);
        });
}

module.exports = {
    getHistory
}