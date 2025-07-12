exports.uploadFile = (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded.');
    }
    const file = req.files.file;
    const uploadPath = __dirname + '/../uploads/' + file.name;

    file.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
        res.json({ filename: file.name, path: '/uploads/' + file.name });
    });
};
