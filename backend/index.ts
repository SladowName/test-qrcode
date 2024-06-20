const express = require('express');
const pgp = require('pg-promise')();
const db = pgp('postgres://admin:admin@localhost:5433/testDB');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('', async (req, res) => {
  try {
    const data = await db.any(`SELECT * FROM qr_codes`);
    res.send(data);
  } catch (err) {
    res.sendErr(err);
  }
})

app.post('/add', async (req, res) => {
  try {
    await db.any(`INSERT INTO qr_codes ("value") values(${req.body.value})`);
    const data = await db.any(`SELECT * FROM qr_codes WHERE "value" = '${req.body.value}'`);
    res.send(data[0]);
  } catch (err) {
    res.sendErr(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await db.any(`DELETE FROM qr_codes WHERE id=${req.params.id}`);
    res.send();
  } catch (err) {
    res.sendErr(err);
  }

});

app.listen(3000, () => {
  console.log('start')
})