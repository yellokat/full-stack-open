import {Router} from "express";
import calculateBmi from "../bmiCalculator";

const bmiRouter = Router();

// bmi calculator endpoint
bmiRouter.get('/', (req, res) => {
  const weightKg:number = Number(req.query.weight);
  const heightCm:number = Number(req.query.height);
  try{
    const message:string = calculateBmi(weightKg, heightCm);
    res.json({
      weight: weightKg,
      height: heightCm,
      message
    });
  } catch(error: unknown){
    let errorMessage: string = 'Unknown error.';
    if(error instanceof Error){
      errorMessage = error.message;
      res.status(400).json({ error: errorMessage });
    }
    console.log(`Error : ${errorMessage}`);
  }

});

export default bmiRouter;