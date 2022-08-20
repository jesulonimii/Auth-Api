const path = require('path')
const data = require(path.resolve("admin/data.js"))

let cdn_link = "https://cdn-jesulonimii.mo.cloudinary.net/edgewood/images"



exports.homePage = (req, res) => {

    const feed = {
        title: 'Edgewood College - Leading secondary & sixth-form college',
        cdn: cdn_link,
        ed_name: data.ed_name,
        ed_message:  data.ed_message,
        ed_picture: data.ed_picture,
        header_slideshow: data.header_slideshow,
        feedback_slideshow: data.feedback_slideshow,
        events_calendar: data.events_calendar,
        header_slideshow_buttons_setup: data.header_slideshow_buttons_setup,
        feedback_slideshow_buttons_setup: data.feedback_slideshow_buttons_setup,
        news_update: data.news_update
    }
    res.render('home', feed)
}

exports.about = (req, res) => {
    const feed = {
        title: 'About Us - Edgewood College'
    }
    res.render('about',feed)
}

exports.admissions = (req, res) => {
    const feed = {
        title: 'Admissions - Edgewood College'
    }
    res.render('admissions',feed)
}

exports.apply = (req, res) => {

    if (req.params.programme === "sixth-form"){
        res.redirect("https://www.edgewoodcollege.org/sixth-form-application/")
    }
    else if (req.params.programme === "secondary"){
        res.redirect("https://www.edgewoodcollege.org/secondary-school-application-form/")
    }
    else {
        res.redirect("/error/404")
    }

}

exports.bully = (req, res) => {
    res.redirect("https://docs.google.com/forms/d/e/1FAIpQLSfnN_7Acn1m-WM_sItBtwAU38lqKmTrK-pHjv3S7NCi5tHHgA/viewform")
}

exports.contact = (req, res) => {
    const feed = {
        title: 'Contacts - Edgewood College'
    }
    res.render('contact',feed)
}

exports.calendar = (req, res) => {
    res.redirect("https://www.edgewoodcollege.org/2022-2023-academic-calendar/")
}

exports.edMsg = (req, res) => {
    const feed = {
        title: 'Executive Directors Message - Edgewood College'
    }
    res.render('ed-msg',feed)
}

exports.errorPage = (req, res) => {
    const feed = {
        title: 'Page not found - Edgewood College'
    }
    res.render('error',feed)
}

exports.portal = (req, res) => {
    res.redirect("http://edgewoodcollege.schulup.com/School_Login")
}

exports.programmes = (req, res) => {

    if (req.params.name === "a-levels"){
        res.redirect("https://www.edgewoodcollege.org/cambridge-a-levels/")
    }
    else if (req.params.name === "secondary-school"){
        res.redirect("hhttps://www.edgewoodcollege.org/secondary-school/")
    }
    else if (req.params.name === "ufp"){
        res.redirect("https://www.edgewoodcollege.org/university-foundation-programme/")
    }
    else if (req.params.name === "mfp"){
        res.redirect("https://www.edgewoodcollege.org/medical-foundation-programme/")
    }
    else {
        const feed = {
        title: 'Page not found - Edgewood College'
    }
        res.render('error',feed)
    }

}


exports.redirectToCdn = (req, res) => {
    let link = `${cdn_link}/${req.params.name}`
    //let link = `http://localhost:3000/images/${req.params.name}`
    res.redirect(link);
    //console.log(`redirecting image to ${link}`)
    res.end()
}

exports.sitemap = (req, res) => {
    res.sendFile(path.resolve('app-main/views/sitemap.xml'));
}

exports.robots = (req, res) => {
    res.sendFile(path.resolve('app-main/views/robots.txt'));
}


