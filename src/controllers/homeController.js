let getHomePage = (req, res) => {
  return res.send("Hi everybody!")
}
let getHomePage2 = (req, res) => {
  return res.render('homepage.ejs')
}
export { getHomePage, getHomePage2 };
