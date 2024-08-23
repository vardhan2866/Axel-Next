import moment from "moment";

function Reset() {
    return (
        <>

            <div className="max-w-sm mx-auto mt-10 p-6  bg-white rounded-xl shadow-md ">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Reset Password
                </h2>
                <hr className="mb-2" />
                <div className=" w-80 text-gray-500 text-center">
                    <p>
                        We have sent you an e-mail and link will expire after 6 minutes. Please contact us if you do not receive
                        it within a few minutes.
                    </p>
                </div>
            </div>
           <div className="rounded-md shadow-md w-96">
                <div className="flex justify-center items-center bg-slate-100">
                    {/*  eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://www.google.com/logos/doodles/2024/paris-games-breaking-6753651837110566-s.png"
                        alt="logo"
                    ></img>
                </div>
                <hr />
                <h2 className="text-md font-semibold mb-4 mt-5 ">
                        Hey Username,
                    </h2>
                <div className="text-center">
                    
                    <p>Click here to $ emailType === Verify ? Verify : Reset Password<br />
                        <button className="bg-blue-500 hover:bg-blue-400 mb-5 rounded-sm">click to </button>
                    </p>
                </div>
                <hr></hr>
                <footer className="bg-slate-100 text-center">Sent by Dermiatric <br/> <p className="text-center">Address</p></footer>
            </div>
    </>
    );
}

export default Reset;
