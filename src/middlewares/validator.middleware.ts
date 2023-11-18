import { Schema, typeToFlattenedError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.errors.map((error: any) => error.message) });
    }
  };
