let ongkir = 0;
let biayaLayanan = 0;
const { rejects } = require("assert");
const { resolve } = require("path");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const formatCurrency = (currencyResult) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(currencyResult);
};

const totalOngkir = () => {
  return new Promise((resolve, reject) => {
    rl.question("Input jarak tempuh: ", (jarak) => {
      if (parseInt(jarak) <= 2) {
        ongkir = 8000;
      } else {
        ongkir = 8000 + 5000 * (jarak - 2);
      }

      biayaLayanan = (ongkir * 4.5) / 100;
      console.log("Total Ongkir: ", formatCurrency(ongkir));
      console.log("Biaya Layanan: ", formatCurrency(biayaLayanan));

      rl.question("Apakah ingin melakukan lagi? ", (answer) => {
        if (answer == "y") {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  });
};

const app = async () => {
  let repeat = true;

  while (repeat) {
    await totalOngkir().catch((err) => {
      repeat = false;
      console.log("Bye!");
      rl.close();
    });
  }
};

app();
