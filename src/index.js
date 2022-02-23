const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

const taskRoutes = require('./routes/tasks.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(taskRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})
app.use(bodyParser.urlencoded({ extended: false }))

//MERCADOPAGO

/*
PUBLIC_KEY: TEST-5a11423f-9031-4f7c-a322-3c43591284a6
ACCESS_TOKEN: TEST-7577564942113896-021818-f2952f12eef6e45a1a90ca280d79dbe8-724913249
*/



/* USUARIO DE PRUEBA
{
    "id": 1076768095,
    "nickname": "TETE4630927",
    "password": "qatest3976",
    "site_status": "active",
    "email": "test_user_76314758@testuser.com"
}
*/

/* TARJETAS DE PRUEBA
Mastercard	5031 7557 3453 0604	123	11/25
Visa	4509 9535 6623 3704	123	11/25
American Express	3711 803032 57522	1234	11/25
*/

/* ESTADO DE PAGO : Se ponen en el nombre de titular
APRO	Pago aprobado
CONT	Pago pendiente
*/

mercadopago.configure({
    access_token: 'TEST-7577564942113896-021818-f2952f12eef6e45a1a90ca280d79dbe8-724913249'
});

app.post('/checkout', (req, res) => {
    // Crea un objeto de preferencia
    
    let preference = {
        items: [
            {
                title: "Turno",
                unit_price: Number(req.body.precio),
                quantity: 1,
            }
        ],
        back_urls: {
			"success": `http://localhost:3000/aprobadomp`,
			"failure": "http://localhost:3000/errormp",
		}
    };
      
    mercadopago.preferences.create(preference)
    .then(function(response){

        console.log(response.body.init_point);
        res.set("Access-Control-Allow-Origin", "http://localhost:3000")
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Allow-Credentials", true);
        return res.status(200).send({
            id: response.body.id,
            url: response.body.init_point
        });
        // res.redirect(response.body.init_point);
    }).catch(function(error){

        console.log(error);

    });
});
    



app.listen(4000);
console.log('Server on port 4000');