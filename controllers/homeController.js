module.exports.home = async function (request, response) {

    try {
        return response.render('home', {
            title: "Placement Cell | Home",
        });

    } catch (err) {
        console.log("error in loading home page", err);
    }
}