import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { returnService } from "./return.service";

const createReturn = tryCatchAsync(async (req, res) => {
  const result = await returnService.createReturn(req.body);

  res.status(200).json({
    success: true,
    status: 200,
    message: result,
  });
});

export const returnController = {
  createReturn,
};
