// method 1 using try-catch block

/* const asyncHandler = (func) => async(req , res , next) => {

    try {
        await func(req ,  res , next)
    } catch (error) {
        res.status(error.code || 404).json({
            success:false,
            message : error.message
        })
    }
} */

    // method 2 using promise

    const asyncHandler = (req_Handler) => {
       return (req , res , next) => {
            Promise.resolve(req_Handler(req , res , next)).catch((error) => next(error))
        }
    }

export default asyncHandler;