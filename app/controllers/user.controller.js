exports.allAccess = (req, res) => {
    res.status(200).send("Public content");
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin content");
}

exports.customerBoard = (req, res) => {
    res.status(200).send("Customer content");
}