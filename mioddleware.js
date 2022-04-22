export const csrf_error_handler_middleware = function (err, req, res, next) {
    // res.clearCookie('__session');  //It is found that it is found that removing __session from cookie resolves
    // the EBADCSRFTOKEN error which kept reoccuring during testing 2 days wasted. After removing this __session cookie
    // was able to proceed.
    console.log(err.code, err.message);
    if (err.code !== 'EBADCSRFTOKEN'){

        //Checking the request origin
        const referer = (req.headers.referer? new URL(req.headers.referer).host : req.headers.host);
        const origin = (req.headers.origin? new URL(req.headers.origin).host : null);
        console.log("Orgin Checks");
        console.log(`req.headers.host=${req.headers.host}`);
        console.log(`req.headers.referer=${req.headers.referer}, ${new URL(req.headers.referer).host}`);
        console.log(`req.headers.origin=${req.headers.origin}, ${new URL(req.headers.origin).host}`);
      
        if (req.headers.host == (origin || referer)) {
          next();
        } else {
          return next(new Error('Unallowed origin'));
        }
        // return next(err);
    } 

    // handle CSRF token errors here
    res.status(403).send({message:"CSURF code has been tampered"});
}