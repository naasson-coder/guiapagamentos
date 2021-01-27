const express = require("express");
const MercadoPago = require("mercadopago")
const app = express()

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-1580772345602321-012700-6291a73b21e75c57ac998c75626a2e15-215173836"
})

app.get("/", (req, res) => {
    res.send("Está Funcionando.")
})

app.get("/pagar", async (req, res) => {
    var id = "" + Date.now();
    var emailDoPagador = "naasson_lemos@hotmail.com"

    var dados = {
        items: [
            item = {
                id: id,
                title: "2x video games",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email: emailDoPagador
        },
        external_reference: id
    }
    try {
        var pagamento = await MercadoPago.preferences.create(dados)
        // console.log(pagamento)
        //Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
        return res.redirect(pagamento.body.init_point)

    } catch (err) {
        return res.send(err.message)
    }
})

app.post("/not", (req, res) => {
    console.log(req.query);
    req.send("OK")
})

app.listen(80, (req, res) => {
    console.log("Servidor rodando!")
})