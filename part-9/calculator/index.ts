import express from "express";
import bmiRouter from "./controller/bmiController";
import helloRouter from "./controller/helloController";
import exerciseRouter from "./controller/exerciseController";

const app = express();

app.use(express.json());
app.use('/hello', helloRouter);
app.use('/bmi', bmiRouter);
app.use('/exercise', exerciseRouter);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});