import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div>
            <button>
                <Link to="/signup">Sign Up</Link>
            </button>
            <button>
                <Link to="/login">Sign In</Link>
            </button>
        </div>
    );
}