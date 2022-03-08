const express = require("express");

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); // add this line
const app = express();
const pg = require("pg");
const Pool = pg.Pool;

const router = require("./routes/pharmacy");

app.use(express.static("public"));

var hbs = exphbs.create({
   helpers: {
      getStringifiedJson: function (value) {
         return JSON.stringify(value);
      }
   },
   defaultLayout: 'main',
   partialsDir: ['views/partials/']
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const connectionString = process.env.DATABASE_URL || 'postgresql://thando:thando123@localhost:5432/pharmacy_db';

const pool = new Pool({
   connectionString
});



const PrescriptionInstance = require("./functions/prescriptionFactory");
const prescriptionInstance = PrescriptionInstance(pool);

const OrderInstance = require("./functions/orderFactory");
const orderInstance = OrderInstance(pool);

const FacilityInstance = require("./functions/facilityFactory");
const facilityInstance = FacilityInstance(pool);

const UnitInstance = require("./functions/unitFactory");
const unitInstance = UnitInstance(pool);


app.get("/", router);
app.get("/add-prescription", router);
app.post("/add-prescription", router);
app.get("/pharmacist", router);
app.get("/pharmacist/:id", router);

app.get("/facility", router);
app.get("/facility/:id", router);



app.get("/update-prescription/:id", async function (req, res) {
   const prescript = await prescriptionInstance.readById(req.params.id);
   res.render('updatePrescript', { prescript });
});

app.post("/update-prescription/:id", async function (req, res) {
   await prescriptionInstance.update(req.params.id, req.body.dosage);
   res.redirect('/');
});

app.get("/delete-prescription/:id", async function (req, res) {
   await prescriptionInstance.remove(req.params.id);
   res.redirect('/');
});

app.get('/orders', async (req, res) => {
   let orders = await orderInstance.allPrescripts();
   console.log("Orders: ", orders);
   //let buttonStatus = createPizza.getButtonStatus();
   let buttonStatus = 'Fulfill order';

   res.render('orders', {
      orders,
      buttonStatus,
      
   });
});

app.get("/update-order/:id", async function (req, res) {
   await orderInstance.update(req.params.id, "Fullfilled");
   res.redirect('orders');
});


// app.get("/", async function (req, res) {
//    const facilities = await facilityInstance.readAll();
//    res.render("home", { facilities });
// });

app.get("/test", async function (req, res) {
   const facilities = await facilityInstance.readAll();
   res.render("test", { facilities });
});

app.get("/facility/:id", async function (req, res) {
   const id = req.params.id;
   const facility = await facilityInstance.readById(id);
   const units = await unitInstance.readAll(id);
   res.render("facility", { facility, units });
});

var port = process.env.PORT || 3000;

//start everything up
app.listen(port, function () {
   console.log('Pharmacy server listening on port:', port);
});
