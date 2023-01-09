class CustomError extends Error {
   public statusCode: number

   constructor(statusCode: number, message: string) {
      super(message)
      this.statusCode = statusCode
   }
}

export function badRequestError(message: string) {
   return new CustomError(400, message)
}

export function unauthorizedError(message: string) {
   return new CustomError(401, message)
}

export function forbiddenError(message: string) {
   return new CustomError(403, message)
}

export function notFoundError(message: string) {
   return new CustomError(404, message)
}

export function conflictError(message: string) {
   return new CustomError(409, message)
}
