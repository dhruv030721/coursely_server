import { isValidObjectId } from "mongoose";
import { Response } from "express";

export function checkValidObjectId(id: string) {
  if (isValidObjectId(id)) {
    return true;
  } else {
    return false;
  }
}
